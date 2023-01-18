import { Modal} from '@arco-design/web-react';
import "./profile.css";
import {useEffect, useState} from "react";
import ProfileMain from "./profileMain";
import ProfileSetting from "./profileSetting";
import {useNavigate} from "react-router-dom";
import {FBAuth} from "../../firebase/authHandler.js";
import {Analysis} from "../../firebase/analysis.js";


export function Profile(){
    const [visible2, setVisible2] = useState(false);

    let navigate = useNavigate();
    let user = new FBAuth().auth.currentUser;

    useEffect(() => {
        if (user === null){
            navigate('/home');
        }
    },[]);

    function modalClose() {
        new Analysis().logEvent("profileSetting_enter");
        sa_event("profileSetting_enter");
        setVisible2(false);
    }


    new Analysis().logEvent("profile_enter");
    sa_event("profile_enter");

    return (
        <div>
            <ProfileMain showModal={setVisible2}/>
            <Modal
                title='Settings'
                visible={visible2}
                footer={null}
                onCancel={modalClose}
            >
                <ProfileSetting setVisible={setVisible2}/>
            </Modal>
        </div>
    )
}