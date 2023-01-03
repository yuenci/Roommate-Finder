import "./profile.css";
import {  useNavigate } from 'react-router-dom';

export default function RoomCard(props) {
    const {room} = props;

    let navigate = useNavigate();

    function goToRoom(){
        navigate(`/room/${room.roomID}`);
    }

    return(
        <div onClick={goToRoom}>

            { room.images.length === 0 &&
                <div className={"room-card-con-text"}>{room.topic}</div>
            }
            { room.images.length >0 &&
                <div style={{
                    backgroundImage: `url(${room.images[0]})`,
                }} className={"room-card-con-img"}>
                    {/*<img src={room.images[0]} alt="user" className={"room-card-avatar"} />*/}
                    <div className={"room-imgCard-text"}>{room.topic}</div>
                </div>
            }
        </div>
    )
}