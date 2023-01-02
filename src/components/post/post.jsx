import {Header} from "../common/Header/header.jsx";
import { Button,Notification} from '@arco-design/web-react';
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
import {useState} from "react";
import {validatePost} from "./validate.js";
import {StatusContainer} from "../../StatusContainer.js";
import {User} from "../../ORM/User.js";
import {changeTimeStrListTOStamp, initAllUsersData, writeNewPost} from "../../tools/dataTools.js";
import {useNavigate} from "react-router-dom";

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

    StatusContainer.currentUser = new User("TP061418@mail.apu.edu.my");

    let navigate = useNavigate();

    function post() {
        let data = {
            topic: topic,
            type: type,
            apartment: apartment,
            moveInRange: changeTimeStrListTOStamp(moveInDate),
            bedroomNum: bedroomNum,
            gender: gender,
            size: size,
            priceRange: price,
            description: description,
            images: images,
            postTimeStamp: new Date(),
            posterEmail: StatusContainer.currentUser.email,
            phone: StatusContainer.currentUser.phone,
        }
        console.log(data);
        // let res = validatePost(data);
        // if (res === true) {
        //     writeNewPost(data).then(() => {
        //         Notification.success({
        //             title: 'Success',
        //             content: 'Your post has been successfully posted!',
        //         });
        //         initAllUsersData();
        //         setTimeout(() => {
        //             navigate("/home");
        //         }, 2000);
        // });}
        // else{
        //     Notification.warning({
        //         content: res,
        //     })
        // }

    }

    return (
        <div>
            <Header/>
            <div className="post-container font-sans">
                <Topic setTopic={setTopic}/>
                <Type setType={setType}/>
                <Apartment setApartment={setApartment}/>
                <MoveInDate setMoveInDate={setMoveInDate}/>
                <BedroomNum setBedroomNum={setBedroomNum} bedroomNum={bedroomNum}/>
                <Gender setGender={setGender}/>
                <Size setSize={setSize}/>
                <Price setPrice={setPrice} price={price}/>
                <Description setDescription={setDescription}/>
                {type ? <Images  setImages={setImages}/> : null}
                <Button type='primary' className={"post-btn"} onClick={post}>Post</Button>
            </div>
        </div>
    );
}