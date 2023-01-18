import {Header} from "../common/Header/header.jsx";
import {Button, Notification} from '@arco-design/web-react';
import "./post.css";
import {Topic} from "./topic.jsx";
import {Type} from "./type.jsx";
import Images from "./images.jsx";
import {Description} from "./description.jsx";
import {Price} from "./price.jsx";
import {Size} from "./size.jsx";
import Gender from "./gender.jsx";
import BedroomNum from "./bedroomNum.jsx";
import Apartment from "./apartment.jsx";
import MoveInDate from "./moveInDate";
import {useEffect, useState} from "react";
import {validatePost} from "./validate.js";
import {StatusContainer} from "../../StatusContainer.js";
import {
    changeTimeStrListTOStamp,
    getPhone,
    initAllRoomsData,
    stampToDateObj,
    writeNewPost
} from "../../tools/dataTools.js";
import {useNavigate,useLocation } from "react-router-dom";
import {FBAuth} from "../../firebase/authHandler.js";
import {Analysis} from "../../firebase/analysis.js";

export function Post() {
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("");
    const [apartment, setApartment] = useState("");
    const [moveInDate, setMoveInDate] = useState("");
    const [bedroomNum, setBedroomNum] = useState(3);
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState([0,3200]);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    // StatusContainer.currentUser = new User("TP061418@mail.apu.edu.my").initUser();
    // let currentRoom = StatusContainer.currentRoomData;
    // //console.log(currentRoom);

    new Analysis().logEvent("post_enter");


    const {pathname} = useLocation();
    const regex = /^\/modify\/\d+/;
    const isModify = regex.test(pathname);
    let roomID = "";
    if (isModify) {
        roomID = pathname.split("/")[2]
    }else{
        StatusContainer.currentRoomData = {};
    }

    useEffect(() => {
        if (!isModify) return;
        roomID = pathname.split("/")[2];
        StatusContainer.fireBaseStore.readDocument("rooms", roomID).then((res) => {
            //console.log(res);
            setTopic(res.topic);
            setType(res.type);
            setApartment(res.apartment);
            setMoveInDate( [stampToDateObj(res.moveInStart), stampToDateObj(res.moveInEnd)]);
            setBedroomNum(res.bedroomNum);
            setGender(res.gender);
            setSize(res.size);
            setPrice([res.priceMin, res.priceMax]);
            setDescription(res.description);
            setImages(res.images);
        })

    }, []);


    let navigate = useNavigate();

    function post() {
        let moveInRange= changeTimeStrListTOStamp(moveInDate);
        const  user = new FBAuth().auth.currentUser;
        let data = {
            topic: topic,
            type: type,
            apartment: apartment,
            bedroomNum: bedroomNum,
            gender: gender,
            size: size,
            description: description,
            images: images,
            postTimeStamp: new Date(),
            posterEmail: user.email,
            phone: getPhone(user),
            moveInStart: moveInRange[0],
            moveInEnd: moveInRange[1],
            priceMin: price[0],
            priceMax: price[1]
        }

        let res = validatePost(data);
        if (res === true) {
            writeNewPost(data,roomID).then(() => {
                Notification.success({
                    title: 'Success',
                    content: 'Your post has been successfully posted!',
                });
                initAllRoomsData();
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
        });}
        else{
            Notification.warning({
                content: res,
            })
        }

        new Analysis().logEvent("post_submit");
    }

    return (
        <div>
            <Header/>
            <div className="post-container font-sans">
                <Topic setTopic={setTopic} isModify={isModify}/>
                <Type setType={setType} isModify={isModify} />
                <Apartment setApartment={setApartment} isModify={isModify} />
                <MoveInDate setMoveInDate={setMoveInDate} isModify={isModify} />
                <BedroomNum setBedroomNum={setBedroomNum} bedroomNum={bedroomNum} isModify={isModify} />
                <Gender setGender={setGender} isModify={isModify} />
                <Size setSize={setSize} isModify={isModify} />
                <Price setPrice={setPrice} price={price} isModify={isModify} />
                <Description setDescription={setDescription} isModify={isModify} />
                {type ? <Images  setImages={setImages} isModify={isModify} /> : null}
                <Button type='primary' className={"post-btn"} onClick={post} isModify={isModify} >Post</Button>
            </div>
        </div>
    );
}