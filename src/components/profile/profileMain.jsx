import {Header} from "../common/Header/header.jsx";
import "./profile.css"
import {StatusContainer} from "../../StatusContainer.js";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import RoomCard from "./roomCard";
import GiveAPost from "./giveAPost.jsx";
import ProfileMainHeader from "./profileMainHeader";
import {FBAuth} from "../../firebase/authHandler.js";

RoomCard.propTypes = {room: PropTypes.any};
export default function ProfileMain(props) {

    function showModal(){
        props.showModal(true);
    }

    //console.log(StatusContainer.currentUser);
    let user = new FBAuth().auth.currentUser;

    const [currentUser, setCurrentUser] = useState(user);
    const [rooms, setRooms] = useState([]);

    //const currentUser = StatusContainer.currentUser;


    let fbStore = StatusContainer.fireBaseStore;

    // console.log(currentUser.email)


    useEffect(() => {
        let query = [["posterEmail", "==", currentUser.email]];
        fbStore.query("rooms", query).then((rooms) => {
            //console.log(rooms);
            setRooms(rooms);
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