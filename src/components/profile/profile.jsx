import { Modal} from '@arco-design/web-react';
import "./profile.css";
import {useEffect, useState} from "react";
import ProfileMain from "./profileMain";
import ProfileSetting from "./profileSetting";
import {useNavigate} from "react-router-dom";
import {FBAuth} from "../../firebase/authHandler.js";


export function Profile(){
    const [visible2, setVisible2] = useState(false);

    let navigate = useNavigate();
    let user = new FBAuth().auth.currentUser;

    useEffect(() => {
        if (user === null){
            navigate('/home');
        }
    },[]);

    return (
        <div>
            <ProfileMain showModal={setVisible2}/>
            <Modal
                title='Settings'
                visible={visible2}
                footer={null}
                onCancel={() => {
                    setVisible2(false);
                }}
            >
                <ProfileSetting setVisible={setVisible2}/>
            </Modal>
        </div>
    )
}