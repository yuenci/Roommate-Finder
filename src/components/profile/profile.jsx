import {Header} from "../common/Header/header.jsx";
import {StatusContainer} from "../../StatusContainer.js";
import {InputAndText} from "../common/inputAndText";
import {PasswordInputAndText} from "../common/passwordInputAndText.jsx";
import {isNumber, stampToDateStr} from "../../tools/dataTools.js";
import { Button ,Notification} from '@arco-design/web-react';
import "./profile.css";
import {useEffect, useState} from "react";
import {  useNavigate } from 'react-router-dom';


export function Profile(){

    //StatusContainer.currentUser = new User("TP061418@mail.apu.edu.my");
    let navigate = useNavigate();

    let ifLogin = !StatusContainer.currentUser

    useEffect(() => {
        if (ifLogin){
            return navigate("/home");
        }
    },[ifLogin]);


    const currentUser = StatusContainer.currentUser;
    const registerDate = stampToDateStr(currentUser.regTimeStamp);


    const textCss = {
        fontSize: 16,
    marginBottom: 10
    }

    const inputCss = {
        width: 400,
        marginBottom: 20
    }


    const [name, setName] = useState(currentUser.name);
    const [phone, setPhone] = useState(currentUser.phone);
    const [password, setPassword] = useState("");

    function save(){
        currentUser.name = name;
        currentUser.phone = phone;
        currentUser.password = password;

        if (isNumber(phone)){
            currentUser.updateData();
            Notification.success({
                title: 'Success',
                content: 'Your Profile updated successfully',
            })
        }else{
            Notification.error({
                title: 'Error',
                content: 'Phone number is not valid',
            })
        }
    }

    function  cancel() {
        navigate("/profile");
    }

    function logout(){
        StatusContainer.currentUser = null;
        localStorage.removeItem("loginExpireTime");
        navigate("/home");
    }


    return (
        <div>
            <Header/>
            <div className={"profile-con"}>
                <div style={{marginTop:50}} />
                <InputAndText text={"Name"} textCss={textCss} inputCss={inputCss} disabled={false}  defaultValue={currentUser.name} setValue={setName}/>
                <InputAndText text={"Email"} textCss={textCss} inputCss={inputCss}  disabled={true}  defaultValue={currentUser.email} />
                <InputAndText text={"Phone"} textCss={textCss} inputCss={inputCss}  defaultValue={currentUser.phone} setValue={setPhone} />
                <PasswordInputAndText text={"Password"} textCss={textCss} inputCss={inputCss} setValue={setPassword} />
                <InputAndText text={"Register time"} textCss={textCss} inputCss={inputCss}   disabled={true}  defaultValue={registerDate}/>
                <div className={"btn-con"}>
                    <Button type='secondary' className={"profile-btn-cancel"} onClick={cancel} >Cancel</Button>
                    <Button type='primary' className={"profile-btn-save"} onClick={save} >Save</Button>
                </div>
                <div>
                    <Button type='primary' status='danger' style={
                        {
                            marginTop: 20,
                            width: 400,
                        }}
                            onClick={logout}
                    >Log out</Button>
                </div>
            </div>
        </div>
    );
}