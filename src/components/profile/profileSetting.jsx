import {useNavigate} from "react-router-dom";
import {StatusContainer} from "../../StatusContainer.js";
import {
    deleteLoginExpireTime,
    getRegDateFromUser,
    isNumber,
    isOnlyContainLetterAndSpace
} from "../../tools/dataTools.js";
import {Button, Message, Modal, Input} from "@arco-design/web-react";
import {InputAndText} from "../common/inputAndText.jsx";
import {PasswordInputAndText} from "../common/passwordInputAndText.jsx";
import { useState} from "react";
import ValidInput from "./vaildInput.jsx";
import {FBAuth} from "../../firebase/authHandler.js";

export default function ProfileSetting(props) {

    //StatusContainer.currentUser = new User("TP061418@mail.apu.edu.my");
    let navigate = useNavigate();

    let user = new FBAuth().getCurrentUser();


    const registerDateTime = getRegDateFromUser(user)

    const textCss = {
        fontSize: 16,
        marginBottom: 10
    }

    const inputCss = {
        width: 400,
        marginBottom: 20
    }

    const [visible, setVisible] = useState(false);


    const [name, setName] = useState(getName(user));
    const [phone, setPhone] = useState(getPhone(user));
    const [password, setPassword] = useState("");


    function save() {
        // console.log("name: " + name, "phone: " + phone, "password: " + password);
        // name and phone number cannot be empty
        if (name === "" || phone === "") {
            Message.error({
                content: "Name or phone number cannot be empty",
            });
            return;
        }

        // is name valid
        if (!isOnlyContainLetterAndSpace(name)) {
            return Message.error({
                content: 'Name is not valid',
            });
        }

        // is phone valid
        if (!isNumber(phone)) {
            return Message.error({
                content: 'Phone is not valid',
            });
        }

        if (password === "") {
            new FBAuth().updateUserInfo({displayName: name + "-" + phone}).then((res) => {
                if (res) {
                    Message.success({
                        content: 'Your Profile updated successfully',
                    })
                }
            }).catch((error) => {
                Message.error({
                    content: error.message,
                })
            });
        } else {
            updateProfileAndPassword(name, phone, password);
        }
    }

    async function updateProfileAndPassword(name, phone, password) {
        let fbAuth = new FBAuth();
        let res;
        try{

            let profile =  fbAuth.updateUserInfo({displayName:name+"-"+phone});
            let passwordRes = fbAuth.updatePassword(password);
            res = await Promise.all([profile, passwordRes]);
        }catch (e) {
            setVisible(true);
        }
        if (res) {
            Message.success({
                content: 'Your Profile updated successfully',
            })
        }else {
            Message.error({
                content: "Update failed",
            })
        }
        // console.log(fbAuth.auth.currentUser);
    }

    function cancel() {
        props.setVisible(false);
    }

    let reAuth = false;

    const [oldPassword, setOldPassword] = useState("");
    function reauthenticate() {
        new FBAuth().reauthenticate(oldPassword).then((res) => {
            if (res) {
                reAuth = true;
                setVisible(false);
            }
        }).catch((error) => {
            Message.error({
                content: error.message,
            })
        });
    }


    function logoutHandler() {
        new FBAuth().logout().then((res) => {
            if (res) {
                deleteLoginExpireTime();
                StatusContainer.currentUser = null;
                Message.success('Logout successfully');
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }
        }).catch((error) => {
            Message.error(error.message);
        });
    }

    function getName(user) {
        return user.displayName.split("-")[0];
    }

    function getPhone(user) {
        return user.displayName.split("-")[1];
    }


    return (
        <div>
            <div className={"profile-con"}>
                <div style={{marginTop: 50}}/>
                <InputAndText text={"Name"} textCss={textCss} inputCss={inputCss} disabled={false}
                              defaultValue={getName(user)} setValue={setName}/>
                {/*<InputAndText text={"Email"} textCss={textCss} inputCss={inputCss300}  disabled={true}  defaultValue={currentUser.email}/>*/}
                <ValidInput defaultValue={user.email}/>
                <InputAndText text={"Phone"} textCss={textCss} inputCss={inputCss}
                              defaultValue={getPhone(user)} setValue={setPhone}/>
                <PasswordInputAndText text={"Password"} textCss={textCss} inputCss={inputCss} setValue={setPassword}/>
                <InputAndText text={"Register time"} textCss={textCss} inputCss={inputCss} disabled={true}
                              defaultValue={registerDateTime}/>
                <div className={"btn-con"}>
                    <Button type='secondary' className={"profile-btn-cancel"} onClick={cancel}>Cancel</Button>
                    <Button type='primary' className={"profile-btn-save"} onClick={save}>Save</Button>
                </div>
                <div>
                    <Button type='primary' status='danger' style={
                        {
                            marginTop: 20,
                            width: 400,
                        }}
                            onClick={logoutHandler}
                    >Log out</Button>
                </div>
            </div>
            <Modal
                title='Re-authentication'
                visible={visible}
                onOk={reauthenticate}
                onCancel={() => setVisible(false)}
                autoFocus={true}
                focusLock={true}
                okText={"Confirm"}
                cancelText={"Cancel"}
            >
                <div style={{
                    marginBottom: 10,
                }}>Enter your password:
                </div>
                <Input.Password defaultValue={oldPassword} onChange={setOldPassword}/>
            </Modal>
        </div>
    );
}