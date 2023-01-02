import React, {useEffect, useState} from "react";
import "./header.css";
import {Link,useNavigate } from "react-router-dom";
import {StatusContainer} from "../../../StatusContainer.js";
import {User} from "../../../ORM/User.js";
import {detectLoginExpire, getStoredLoginEmail} from "../../../tools/dataTools.js";

export function Header() {
    const linkClassName = "link";
    const navigate = useNavigate();

    const [user, setUser] = useState(StatusContainer.currentUser);


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

    useEffect(() => {
        if(!detectLoginExpire()){
            new User(getStoredLoginEmail()).initUser().then((res) => {
                StatusContainer.currentUser = res;
                setUser(res);
            })
        }
    }, []);



    return (
        <header className="header">
            <div className="logo" onClick={backToLogin}>
                <img src="/logo.png" alt="logo" className="logo-img"/>
                <span className="logo-text">APU Roommate Finder</span>
            </div>
            <nav className="nav-links">
                <div className={linkClassName} onClick={goToPost}>Post</div>
                <div className={linkClassName} onClick={goToAbout}>About</div>
                {StatusContainer.currentUser
                    ? <div className={linkClassName} onClick={goToProfile}>Profile</div>
                    : <div className={linkClassName} onClick={goToLogin}>Login</div>
                }

            </nav>
        </header>
    );
}

