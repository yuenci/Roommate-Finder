import "../login/login.css";
import "./signUp.css";
import {Button, Message} from "@arco-design/web-react";
import {Link} from "react-router-dom";
import {SignUpForm} from "./signUpForm";
import {SignUpPinCode} from "./SignUpPinCode.jsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {ifAllValid} from "./validate.js";
import {pinCodeStr} from "../../config.js";
import {setLoginExpireTime} from "../../tools/dataTools.js";
import  {FBAuth} from "../../firebase/authHandler.js";
import {Analysis} from "../../firebase/analysis.js";

export function SignUpRight() {
    const [page, setPage] = useState('signUpForm');

    const [name, setName] = useState('');
    const [phoneAreaCode, setPhoneAreaCode] = useState('60');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pinCode, setPinCode] = useState('731459');

    const navigate = useNavigate();

    async function signUpOnClick() {
        //console.log("name: " + name, "phone: " +phoneAreaCode+ phone , "email: " + email, "password: " + password);

        let validRes = await ifAllValid(name,phoneAreaCode, phone, email, password);
        if (!validRes)  return;

        if (page === 'signUpForm') {
            Message.success('Information validate successfully!');


            setTimeout(() => {

                setPage('signUpPinCode');
            }, 1000);
        }else if (page === 'signUpPinCode') {
            if( pinCode === pinCodeStr){
                //731459
                await registerUser();

                Message.success("Sign up successfully");

                // navigate to home page after 2 seconds
                setTimeout(() => {
                    navigate('/home');
                }, 1500);

            }else {
                Message.error("Pin code is not correct");
                //console.log("pin code is not correct", `[${pinCode}]`);
            }
            new Analysis().logEvent("sign_up_submit");
        }
    }
    async function registerUser(){
        let fbAuth = new FBAuth();
        try {
            await fbAuth.register(email.toLowerCase(), password);
        }catch (e) {
            Message.error("e.message")
        }

        let data ={
            displayName: name + "-" + phoneAreaCode + phone,
        }
        await fbAuth.updateUserInfo(data)

        setLoginExpireTime()
    }

    return (
        <div className="login-container-right">
            {(page === 'signUpForm')
                ? <SignUpForm setName={setName}
                              setPhone={setPhone}
                              setPhoneAreaCode={setPhoneAreaCode}
                              email={email} setEmail={setEmail}
                              setPassword={setPassword}/>
                : <SignUpPinCode setPinCode={setPinCode}/>
            }

            <Button type='primary' className="sign-btn" onClick={signUpOnClick}>Sign Up</Button>
            <div className="login-container-bottom">
                <span className="account-text">Already have an account?</span>
                <Link to="/login">
                    <span className="sign-up">Login</span>
                </Link>
            </div>
        </div>
    )
}