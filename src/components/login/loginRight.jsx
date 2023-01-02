import {InputEmail} from "../common/InputEmail.jsx";
import {Button, Input, Message} from "@arco-design/web-react";
import {useState} from "react";
import {StatusContainer} from "../../StatusContainer.js";
import {Link, useNavigate} from "react-router-dom";
import {initAllUsersData, loginValidation, setLoginExpireTime, validateEmail} from "../../tools/dataTools.js";


export function LoginRight() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function passwordOnChange(value) {
        setPassword(value);
    }


    async function loginOnClick() {
        // if email format is  valid
        if (!validateEmail(email)) return;

        // if password is valid
        if (password === "") return;

        // if email and password are valid
        let res = await loginValidation(email, password);
        console.log(res);
        if (res) {

            initAllUsersData().then(() => {
                    Message.success("Login successfully");
                    setLoginExpireTime(email);
                    setTimeout(() => {
                        navigate("/home");
                    }, 1500);
                }
            )


        } else {
            Message.error(`${StatusContainer.loginError}`)
        }
    }


    return (
        <div className="login-container-right">
            <h1 className="hello">Hello Again!</h1>
            <InputEmail email={email} setEmail={setEmail}/>
            <Input.Password defaultValue='' className="input" onChange={passwordOnChange}/>
            <div className="recovery">Recovery password</div>
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