import {InputEmail} from "../common/InputEmail.jsx";
import {Button, Checkbox, Input, Message} from "@arco-design/web-react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {setLoginExpireTime, validateEmail} from "../../tools/dataTools.js";
import {FBAuth} from "../../firebase/authHandler.js";


export function LoginRight() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    function passwordOnChange(value) {
        setPassword(value);
    }


    async function loginOnClick() {
        // if email format is  valid
        if (!validateEmail(email)) return;

        // if password is valid
        if (password === "") return;

        let fbAuth = new FBAuth();
        fbAuth.login(email.toLowerCase(), password).then((result) => {
            if (result){
                Message.success("Login successfully");
                setLoginExpireTime(email,rememberMe);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }
        }).catch((error) => {
            Message.error(shortError(error.message));
        });
    }

    function shortError(error){
        // Firebase: Error (auth/wrong-password). to wrong-password
        return error.split("/")[1].replace(")","");
    }

    function goToLanding() {
        navigate("/");
    }


    return (
        <div className="login-container-right">
            <img src="/logo.png" alt={"logo"} className={"login-logo"} onClick={goToLanding}/>
            <h1 className="hello">Hello Again!</h1>
            <InputEmail email={email} setEmail={setEmail}/>
            <Input.Password defaultValue='' className="input" onChange={passwordOnChange} placeholder={"Password"}/>
            <div className={"login-container-middle"}>
                <Checkbox className={"remember"} onChange={setRememberMe}>Remember me</Checkbox>
                <div className="recovery">Recovery password</div>
            </div>

            <Button type='primary' className="login-btn" onClick={loginOnClick}>Login</Button>
            <div className="login-container-bottom">
                <span className="account-text">Don't have an account?</span>
                <Link to="/signup">
                    <span className="sign-up">Sign Up</span>
                </Link>
            </div>
        </div>
    )
}