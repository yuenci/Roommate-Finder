import "@arco-design/web-react/dist/css/arco.css";
import "./login.css";
import {LoginLeft} from "./loginLeft.jsx";
import {LoginRight} from "./loginRight.jsx";
// import {initAllUsersData} from "../../Tools.js";
import {VersionInfoFooter} from "../common/versionInfoFooter";


export function Login() {
    // initAllUsersData();
    return (
            <div>
                <div className="login-container">
                    <LoginLeft/>
                    <LoginRight/>
                </div>
            </div>
    );
}