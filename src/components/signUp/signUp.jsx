import { BrowserRouter as Router } from 'react-router-dom';
import {LoginLeft} from "../login/loginLeft.jsx";
import "../login/login.css";
import {SignUpRight} from "./signUpRight.jsx";

export function SignUp(){
    return(
        <div className="login-container">
            <LoginLeft/>
            <SignUpRight/>
        </div>
    );
}