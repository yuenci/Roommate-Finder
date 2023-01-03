import {Header} from "../common/Header/header.jsx";
import "./profile.css"
import {StatusContainer} from "../../StatusContainer.js";
import {User} from "../../ORM/User.js";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import RoomCard from "./roomCard";
import GiveAPost from "./giveAPost.jsx";
import ProfileMainHeader from "./profileMainHeader";

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
                   <ProfileMainHeader user={currentUser} showModal={showModal}/>
               </div>
           }
           <div className={"rooms-con"}>
               {rooms
                   ?  rooms.reverse().map((room,index) => {
                       return <RoomCard room={room} key={index}/>
                   })
                   : <GiveAPost/>
               }
           </div>
       </div>
    );
}