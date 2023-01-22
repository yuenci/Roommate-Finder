import {Header} from "../common/Header/header.jsx";
import "./404.css";
import {useNavigate} from "react-router-dom";
export default function Error404() {
    function contact() {
        window.open("https://github.com/yuenci/APU-Roommate-finder/issues")
    }

    // go to previous page
    const navigate = useNavigate();

    function back() {
        navigate(-1);
    }

    return (
        <div>
            <Header/>
            <div className="error-404">
                <div className={"error-header"}>
                    <button className={"error-contact-btn"} onClick={contact}>Contact Us</button>
                </div>
                <div className={"error-body"}>
                    <div className={"error-body-line1"}>
                        whoops... this page
                    </div>
                    <div className={"error-body-line2"}>
                        is not available
                    </div>
                </div>
                <div className={"error-footer"}>
                    <button className={"error-back-btn"} onClick={back}>Turn Back</button>
                </div>
            </div>
        </div>


    )
}