import "./userCard.css"
// import {useState} from "react";

import {useNavigate} from "react-router-dom";

import { timeStampToDateStr} from "../../tools/dataTools.js";

export function UserCard(props) {
    const {room,roomID} = props;
    // console.log(room)

    //const [visible, setVisible] = useState(false);

    const navigate = useNavigate();


    function goToPost() {
        navigate("/room/" + roomID);
    }


    return (
        <div className="user-card" onClick={goToPost}>
            <div className="userCard-left">
                <img src={`https://api.multiavatar.com/${room.posterEmail}.png`} alt="user" className="avatar-img"/>
            </div>
            <div className="userCard-right">
                <div className="userCard-right-top">
                    <div className="title">{room.topic}</div>
                    {room.type
                        ? <div>🏠</div>
                        : <div>💰</div>
                    }
                </div>
                <div className="content">{room.description}</div>
                <div className="time">{timeStampToDateStr(room.postTimeStamp)}</div>
            </div>
        </div>
    )
}