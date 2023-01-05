import { Header } from "../common/Header/header.jsx";
import "./about.css";
import AvatarCard from "./avatarCard.jsx";
import {teamInfo,productInfo} from "./teamInfo.js";

// import "../../index.css";

export function About() {
    return (
        <div>
            <Header />
            <div className={"about-con"}>
                <div>
                    <div className={"text-4xl about-title"}>🤠 Team</div>
                    <div className={"avatar-con"}>
                        <AvatarCard teamInfo={teamInfo.Innis}></AvatarCard>
                        <AvatarCard teamInfo={teamInfo.KK}></AvatarCard>
                        <AvatarCard teamInfo={teamInfo.Lennon}></AvatarCard>
                        <AvatarCard teamInfo={teamInfo.Marco}></AvatarCard>
                        <AvatarCard teamInfo={teamInfo.Pheymin}></AvatarCard>
                        <AvatarCard teamInfo={teamInfo.SengFeng}></AvatarCard>
                        <AvatarCard teamInfo={teamInfo.Yannis}></AvatarCard>
                    </div>
                </div>
                <div>
                    <div className={"text-4xl about-title"}>🚀 Product </div>
                    <div className={"text-base tracking-wide"}>{productInfo}</div>
                </div>
                <div className={"contact-us-con"}>
                    <div className={"text-4xl about-title"}>📫 Contact US</div>
                    <div className={"text-center"}>Need to report bug or request features? </div>
                    <div className={"text-center"}>
                        <span>Contact Us at</span>
                        <a href="https://github.com/yuenci/APU-Roommate-finder/issues" target="_blank"> https://github.com/yuenci/APU-Roommate-finder/issues</a>
                    </div>
                </div>
                <div className={"text-center"}>{`© MIZ ${new Date().getFullYear()}`}</div>
            </div>
        </div>
    )
}