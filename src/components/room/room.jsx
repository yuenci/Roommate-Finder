import {Header} from "../common/Header/header.jsx";
import {CarouselPost} from "./carousel.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {TopicArea} from "./topicArea.jsx";
import "./room.css";
import {Message, Modal,ConfigProvider} from "@arco-design/web-react";
import {stampToDateStr} from "../../tools/dataTools.js";
import {StatusContainer} from "../../StatusContainer.js";
import enUS from '@arco-design/web-react/es/locale/en-US';
import ModifyToolBar from "./modifyToolBar";
import {FBAuth} from "../../firebase/authHandler.js";
import {Analysis} from "../../firebase/analysis.js";


export function Room() {
    const {roomID} = useParams();

    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    // redirect to home page 1 if roomID is missing
    useEffect(() => {
        if (roomID === null || roomID === undefined) {
            navigate("/room/1");
        }

    }, [roomID]);

    new Analysis().logEvent("room_enter", {roomID: roomID});


    //  redirect to home page if roomID is not found
    //  load data if roomID is found
    useEffect(() => {
        StatusContainer.fireBaseStore.readDocument("rooms", roomID).then((res) => {
            if (res == null) {
                Message.error("Room not found");
                setTimeout(() => {
                    navigate("/home");
                }   , 1500);
            } else {
                setData(res);
                StatusContainer.currentRoomData = res;
                //console.log(res);
            }
        })
    }, []);

    function btnOnClick() {
        let user = new FBAuth().auth.currentUser;
        if(user === null) {
            setVisible(true);
        }else{
            goToWhatsapp();
        }
    }

    function goToWhatsapp(){
        const phone = data.phone;
        const text = "Hi, I am interested in your room. Could you please contact me? Thanks!";
        // open on whatsapp
        window.open("https://wa.me/" + phone + "?text=" + text);
    }

    function goToLoginPage(){
        setVisible(false)
        navigate("/login")
    }


    // data, must have data
    // login in && is poster  -- modify
    // login in && is not post  -- contact
    // not login --contact
    let showModify =false;
    let user = new  FBAuth().auth.currentUser;
    if(user !==null && data !== null){
        if (data.posterEmail === user.email){
            showModify = true;
        }
    }

    return (
        <div>
            <Header/>
            {data &&
                <CarouselPost roomID={roomID} roomData={data} />
            }

            {data  &&
                <div>
                    <TopicArea data={data}/>
                    <div className="description">
                        <div className="desc-text">{data.description}</div>
                        <div className="desc-time">{stampToDateStr(data.postTimeStamp)}</div>
                    </div>
                </div>
            }
            {  data  && !showModify &&
                 <button className="contact-button" onClick={btnOnClick}>Contact on Whatsapp</button>
            }
            {data && showModify &&
                <ModifyToolBar roomID={roomID}/>
            }

            <ConfigProvider locale={enUS}>
                <Modal
                    title='Login'
                    visible={visible}
                    onOk={goToLoginPage}
                    onCancel={() => setVisible(false)}
                    autoFocus={false}
                    focusLock={true}
                >
                    <p>
                        You haven’t logged in yet, please login to continue.
                    </p>
                </Modal>
            </ConfigProvider>
        </div>
    )
}