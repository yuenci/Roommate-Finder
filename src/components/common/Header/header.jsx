
import "./header.css";
import {useNavigate } from "react-router-dom";

import {detectLoginExpire} from "../../../tools/dataTools.js";
import {FBAuth} from "../../../firebase/authHandler.js";

export function Header() {
    const linkClassName = "link";
    const navigate = useNavigate();

    function backToLogin() {
        navigate("/home");
    }

    function goToProfile() {
        navigate("/profile");
    }

    function goToPost() {
        navigate("/post");
    }

    function goToAbout() {
        navigate("/about");
    }

    function goToLogin() {
        navigate("/login");
    }



    function ifLogin() {
        if(!detectLoginExpire()){
            const fbAuth = new FBAuth();
            const user = fbAuth.auth.currentUser;
            if (user !== null)  return true;
        }
        return false;
    }

    return (
        <header className="header">
            <div className="logo" onClick={backToLogin}>
                <img src="/logo.png" alt="logo" className="logo-img"/>
                <span className="logo-text">APU Roommate Finder</span>
            </div>
            <nav className="nav-links">
                <div className={linkClassName} onClick={goToPost}>Post</div>
                <div className={linkClassName} onClick={goToAbout}>About</div>
                {ifLogin()
                    ? <div className={linkClassName} onClick={goToProfile}>Profile</div>
                    : <div className={linkClassName} onClick={goToLogin}>Login</div>
                }

            </nav>
        </header>
    );
}

