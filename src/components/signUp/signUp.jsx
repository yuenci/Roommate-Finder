import {LoginLeft} from "../login/loginLeft.jsx";
import "../login/login.css";
import {SignUpRight} from "./signUpRight.jsx";
import {Analysis} from "../../firebase/analysis.js";

export function SignUp(){
    new Analysis().logEvent("signUp_enter");
    sa_event("signUp_enter");

    return(
        <div className="login-container">
            <LoginLeft/>
            <SignUpRight/>
        </div>
    );
}