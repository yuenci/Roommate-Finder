import "@arco-design/web-react/dist/css/arco.css";
import "./login.css";
import {LoginLeft} from "./loginLeft.jsx";
import {LoginRight} from "./loginRight.jsx";
import {Analysis} from "../../firebase/analysis.js";


export function Login() {
    // initAllUsersData();
    new Analysis().logEvent("login_enter");
    sa_event("login_enter");
    return (
            <div>
                <div className="login-container">
                    <LoginLeft/>
                    <LoginRight/>
                </div>
            </div>
    );
}