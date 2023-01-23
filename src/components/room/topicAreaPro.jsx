import {ReactComponent as TranslateIcon} from "./icons/translate.svg";
import {ReactComponent as ShareIcon} from "./icons/share.svg";
import {ReactComponent as LoveIcon} from "./icons/love.svg";
import {FBAuth} from "../../firebase/authHandler.js";
import {FBStore} from "../../firebase/storeHandle.js";
import {useEffect, useState} from "react";
import axios from "axios";
import PubSub from 'pubsub-js';
import {Modal, Message} from '@arco-design/web-react';
import {IconShareAlt} from '@arco-design/web-react/icon';

export default function TopicAreaPro(props) {

    const [loved, setLoved] = useState(false);
    const [translated, setTranslated] = useState(false);

    let topicOrigin = props.data.topic;
    let descriptionOrigin = props.data.description;

    const [topic, setTopic] = useState(props.data.topic);
    const {setDescription, description} = props;

    let fbStore = new FBStore()
    let email = new FBAuth().auth.currentUser.email;
    let roomID = props.data.roomID;
    let currentUrl = window.location.href;


    function loveClick() {
        setLoved(!loved)
        fbStore.addArrayElement("users", email, "lovedRooms", roomID).then((res) => {
            console.log(res);
        }).catch(
            () => {
                fbStore.write("users", {lovedRooms: [roomID]}, email).then((res) => {
                    console.log(res);
                })
            }
        )
    }

    function translateClick() {
        setTranslated(!translated)

        if (translated) {
            setTopic(topicOrigin)
            setDescription(descriptionOrigin)
            PubSub.publish('translate', {message: 'translateToEnglish'});
            return;
        }

        axios.post("https://emailproxy.azurewebsites.net/api/httptrigger3", {
            topic: topic,
            description: description
        }).then(r => {
            //console.log(r.data)
            setTopic(r.data.topic)
            setDescription(r.data.description)
        })

        PubSub.publish('translate', {message: 'translateToChinese'});
    }

    useEffect(() => {
        fbStore.readDocument("users", email).then((res) => {
            if (res.lovedRooms.includes(roomID)) {
                setLoved(true);
            }
        })
    }, [])

    let modalIns = null;

    function goToWebsite(url) {
        window.open(url, "_blank")
        modalIns.close()
    }

    const goToFacebook = () => { goToWebsite(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`) }
    const goToInstagram = () => { goToWebsite("https://www.instagram.com") }
    const goToTwitter = () => { goToWebsite(`https://twitter.com/intent/tweet?url=${currentUrl}`) }
    const goToWhatsapp = () => { goToWebsite(`https://api.whatsapp.com/send?text==${currentUrl}`) }
    const copyLink = () => {
        navigator.clipboard.writeText(currentUrl).then(
            () => {
                Message.success('Copied to clipboard!')
                modalIns.close()
            }
        )
    }

    function shareClick() {
        console.log("share")
        modalIns = Modal.confirm({
            title: 'Share',
            icon: <IconShareAlt/>,
            content: (
                <div className={"share-container"}>
                    <div onClick={goToFacebook}>
                        <img src="../../../public/facebook.png" alt="facebook"/>
                    </div>
                    <div onClick={goToInstagram}>
                        <img src="../../../public/instagram.png" alt="instagram"/>
                    </div>
                    <div onClick={goToTwitter}>
                        <img src="../../../public/twitter.png" alt="twitter"/>
                    </div>
                    <div onClick={goToWhatsapp}>
                        <img src="../../../public/whatsapp.png" alt="whatsapp"/>
                    </div>
                    <div onClick={copyLink}>
                        <img src="../../../public/copy.png" alt="copy"/>
                    </div>
                </div>
            ),
            footer: null,
        });
    }


    return (
        <div className={"topic-area-pro"}>
            <div className={"topic-area-pro-left"}>
                <div className={"topic-area-pro-translate"}>
                    {
                        !translated
                            ? <TranslateIcon className={"topic-area-pro-translate"} onClick={translateClick}/>
                            : <TranslateIcon className={"topic-area-pro-translate-active"} onClick={translateClick}/>
                    }
                </div>
                <div className={"topic-area-pro-topic"}>{topic}</div>
            </div>
            <div className={"topic-area-pro-right"}>
                <ShareIcon className={"topic-area-pro-share"} onClick={shareClick}/>
                {
                    !loved
                        ? <LoveIcon className={"topic-area-pro-love"} onClick={loveClick}/>
                        : <LoveIcon className={"topic-area-pro-love-active"} onClick={loveClick}/>
                }
            </div>
        </div>
    )
}