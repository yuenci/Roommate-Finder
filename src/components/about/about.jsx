import {Header} from "../common/Header/header.jsx";
import "./about.css";

// import "../../index.css";

export function About() {
    return (
        <div>
            <Header/>
            <div className={"drop-shadow-2xl about-con"}>
                <h1 className={"text-2xl"}>🤠 About </h1>
                <div>
                    <div className={"text-xl"}>Team</div>
                </div>
                <div>
                    <div className={"text-xl"}>Product</div>
                </div>
                <div>
                    <div className={"text-xl"}>Contact US</div>
                </div>
            </div>
        </div>
    )
}