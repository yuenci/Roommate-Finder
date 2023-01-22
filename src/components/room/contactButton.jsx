
import ModifyToolBar from "./modifyToolBar.jsx";
import {FBAuth} from "../../firebase/authHandler.js";
import {useNavigate} from "react-router-dom";

export default function ContactButton(props) {
    const {data, roomID, showModify,setVisible} = props;

    const navigate = useNavigate();

    function btnOnClick() {
        let user = new FBAuth().getCurrentUser();
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

    // if data have property status


    if (data &&  data.hasOwnProperty('status') && data.status === "deleted") {
        navigate("./error-404")
    }

    return (
        <div>
            {  data  && !showModify &&
                <button className="contact-button" onClick={btnOnClick}>Contact on Whatsapp</button>
            }
            {data && showModify &&
                <ModifyToolBar roomID={roomID}/>
            }
        </div>
    )
}