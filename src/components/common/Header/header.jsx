
import "./header.css";
import {useNavigate } from "react-router-dom";

// import {detectLoginExpire} from "../../../tools/dataTools.js";
import {FBAuth} from "../../../firebase/authHandler.js";
import {useEffect, useState} from "react";

export function Header(props) {
    const linkClassName = "link";
    const navigate = useNavigate();
    const {type} = props;
    const [login, setLogin] = useState(false);

    useEffect(() => {
        new FBAuth().getCurrentUser().then((user) => {
            if (user) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        } );
    }, []);



    function goToProfile() {
        navigate("/profile");
    }

    function goToPost() {
        navigate("/post");
    }

    // function goToAbout() {
    //     navigate("/about");
    // }

    function goToLogin() {
        navigate("/login");
    }

    function goToAbout() {
        navigate("/about");
    }

    function goToHome() {
        navigate("/home");
    }

    function goToLanding() {
        navigate("/");
    }



    // function ifLogin() {
    //     //new  FBAuth().auth.currentUser;
    //     return !detectLoginExpire()
    // }

    return (
        <header className="header">
            <div className="logo" onClick={goToLanding}>
                <img src="/logo.png" alt="logo" className="logo-img"/>
                <span className="logo-text">APU Roommate Finder</span>
            </div>
            {type !== "landing"
                ?<nav className="nav-links">
                    <div className={linkClassName} onClick={goToPost}>Post</div>
                    {/*<div className={linkClassName} onClick={goToAbout}>About</div>*/}
                    {login
                        ? <div className={linkClassName} onClick={goToProfile}>Profile</div>
                        : <div className={linkClassName} onClick={goToLogin}>Login</div>
                    }
                </nav>
                :<nav className="nav-links-landing">
                    <div className={linkClassName} onClick={goToHome}>Home</div>
                    <div className={linkClassName} onClick={goToAbout}>About</div>
                    {login
                        ? <div className={linkClassName} onClick={goToProfile}>Profile</div>
                        : <div className={linkClassName} onClick={goToLogin}>Login</div>
                    }
                </nav>
            }

        </header>
    );
}

