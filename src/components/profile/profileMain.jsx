import {Header} from "../common/Header/header.jsx";
import {IconSettings} from "@arco-design/web-react/icon";
import "./profile.css"
import {StatusContainer} from "../../StatusContainer.js";
import {User} from "../../ORM/User.js";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import RoomCard from "./roomCard";
import GiveAPost from "../about/giveAPost.jsx";


RoomCard.propTypes = {room: PropTypes.any};
export default function ProfileMain(props) {

    function showModal(){
        props.showModal(true);
    }

    const [currentUser, setCurrentUser] = useState(StatusContainer.currentUser);
    const [rooms, setRooms] = useState([]);

    //const currentUser = StatusContainer.currentUser;


    let fbStore = StatusContainer.fireBaseStore;


    useEffect(() => {
        new User("TP061418@mail.apu.edu.my").initUser().then((user) => {
            setCurrentUser(user);
            let query = [["posterEmail", "==", user.email]];
            fbStore.query("rooms", query).then((rooms) => {
                setRooms(rooms);
            });
        });
    },[]);


    return (
       <div>
           <Header/>
           {currentUser &&
               <div className={"profile-main-con"}>
                   <div className={"profile-main-header"}>
                       <img src={`https://api.multiavatar.com/${currentUser.phone}.png`} alt="user" className={"profile-main-avatar"}/>
                       <span className={"text-4xl"}>{currentUser.name}</span>
                       <IconSettings className={"text-4xl hover:cursor-pointer"} onClick={showModal}/>
                   </div>
               </div>
           }
           <div className={"rooms-con"}>
               {rooms
                   ?  rooms.map((room,index) => {
                       return <RoomCard room={room} key={index}/>
                   })
                   : <GiveAPost/>
               }
           </div>
       </div>
    );
}