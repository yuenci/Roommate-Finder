import "./profile.css";
import {  useNavigate } from 'react-router-dom';

export default function RoomCard(props) {
    const {room} = props;

    let navigate = useNavigate();

    function goToRoom(){
        navigate(`/room/${room.id}`);
    }

    return(
        <div className={"room-card-con hover:cursor-pointer"} onClick={goToRoom}>

            { room.images.length === 0 &&
                <div>{room.topic}</div>
            }
            { room.images.length >0 &&
                <img src={room.images[0]} alt="user" className={"room-card-avatar"}/>
            }
        </div>
    )
}