import { ReactComponent as TranslateIcon } from "./icons/translate.svg";
import { ReactComponent as ShareIcon } from "./icons/share.svg";
import { ReactComponent as LoveIcon } from "./icons/love.svg";
import {FBAuth} from "../../firebase/authHandler.js";
import {FBStore} from "../../firebase/storeHandle.js";
import {useEffect, useState} from "react";
import axios from "axios";
import PubSub from 'pubsub-js';


export default function TopicAreaPro(props) {

    const  [loved, setLoved] = useState(false);
    const [translated, setTranslated] = useState(false);

    let topicOrigin = props.data.topic;
    let descriptionOrigin = props.data.description;

    const [topic, setTopic] = useState(props.data.topic);
    const {setDescription,description} = props;

    let fbStore = new FBStore()
    let email = new FBAuth().auth.currentUser.email;
    let roomID = props.data.roomID;


    function loveClick() {
        setLoved(!loved)
        fbStore.addArrayElement("users", email, "lovedRooms",roomID).then((res) => {
            console.log(res);
        }).catch(
            ()=>{
                fbStore.write("users", {lovedRooms: [roomID]},email).then((res) => {
                    console.log(res);
                })
            }
        )
    }

    function translateClick() {
        setTranslated(!translated)

        if(translated){
            setTopic(topicOrigin)
            setDescription(descriptionOrigin)
            PubSub.publish('translate', { message: 'translateToEnglish' });
            return;
        }

        axios.post("http://167.172.74.237:5001/translate", {
            topic: topic,
            description: description
        }).then(r => {
            //console.log(r.data)
            setTopic(r.data.topic)
            setDescription(r.data.description)
        })

        PubSub.publish('translate', { message: 'translateToChinese' });
    }

    useEffect(() => {
        fbStore.readDocument("users", email).then((res) => {
            if (res.lovedRooms.includes(roomID)) {
                setLoved(true);
            }
        })
    }, [])



    return (
        <div className={"topic-area-pro"}>
           <div className={"topic-area-pro-left"}>
               <div className={"topic-area-pro-translate"}>
                   {
                          !translated
                       ? <TranslateIcon className={"topic-area-pro-translate"} onClick={translateClick} />
                       : <TranslateIcon className={"topic-area-pro-translate-active"} onClick={translateClick} />
                   }
               </div>
               <div className={"topic-area-pro-topic"}>{topic}</div>
           </div>
            <div className={"topic-area-pro-right"}>
                <ShareIcon className={"topic-area-pro-share"}/>
                {
                    !loved
                    ? <LoveIcon className={"topic-area-pro-love"} onClick={loveClick} />
                    : <LoveIcon className={"topic-area-pro-love-active"} onClick={loveClick} />
                }
            </div>
        </div>
    )
}