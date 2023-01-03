import "../login/login.css";
import "./signUp.css";
import {Button, Notification} from "@arco-design/web-react";
import {Link} from "react-router-dom";
import {SignUpForm} from "./signUpForm";
import {SignUpPinCode} from "./SignUpPinCode.jsx";
import {useState} from "react";
import {User} from "../../ORM/User.js";
import {StatusContainer} from "../../StatusContainer.js";
import { useNavigate } from "react-router-dom";
import {ifAllValid} from "./validate.js";
import {pinCodeStr} from "../../config.js";
import {setLoginExpireTime} from "../../tools/dataTools.js";

export function SignUpRight() {
    const [page, setPage] = useState('signUpForm');

    const [name, setName] = useState('');
    const [phoneAreaCode, setPhoneAreaCode] = useState('60');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pinCode, setPinCode] = useState('');

    const navigate = useNavigate();

    let newUser = new User();

    async function signUpOnClick() {
        // console.log("name: " + name, "phone: " +phoneAreaCode+ phone , "email: " + email, "password: " + password);

        let validRes = await ifAllValid(name,phoneAreaCode, phone, email, password);
        if (!validRes)  return;

        if (page === 'signUpForm') {
            Notification.success({
                content: 'Information validate successfully!',
            });
            setTimeout(() => {

                setPage('signUpPinCode');
            }, 1000);
        }else if (page === 'signUpPinCode') {

            if( pinCode === pinCodeStr){
                //731459
                registerUser();
                console.log(newUser);
                StatusContainer.currentUser = newUser;

                Notification.success({
                    content: 'Sign up successfully',
                });

                // navigate to home page after 2 seconds
                setTimeout(() => {
                    navigate('/home');
                }, 1500);

            }else {
                Notification.error({
                    title: 'Error',
                    content: 'Pin code is not correct',
                });
                console.log("pin code is not correct", `[${pinCode}]`);
            }

        }
    }
    function registerUser(){
        newUser.name = name.trim();
        newUser.phone = phoneAreaCode.trim()+ phone.trim();
        newUser.email = email.trim();
        newUser.password = password.trim();

        newUser.registerUser(name, phone, email, password).then(
            () => setLoginExpireTime()
        );
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