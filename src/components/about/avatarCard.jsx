import {IconEmail, IconGithub} from "@arco-design/web-react/icon";
import "./avatar.css";
import { ReactComponent  as TeamsIcon } from "./teams-icon.svg";
import {Message} from "@arco-design/web-react";


export default function AvatarCard(props) {
    const {teamInfo} = props;

    let name = teamInfo.name;
    let post = teamInfo.post;
    let desc = teamInfo.desc;
    let github = teamInfo.github;
    let tpNumber = teamInfo.tpNumber;
    let email = teamInfo.email;


    function goToGithub() {
        window.open(github);
    }

    function goToTeams(){
        window.open(`https://teams.microsoft.com/l/chat/0/0?users=${tpNumber}@mail.apu.edu.my`)
    }

    async  function copyEmail(){
        let  res = navigator.clipboard.writeText(email);
        Message.success("Email copied to clipboard");
    }

    return(
        <div className="avatar">
            <img src={`/team/${name}.png`} alt="innis" className={"avatar-img drop-shadow-md"}/>
            <div className="text-xl avatar-name">{name}</div>
            <div className={"text-base avatar-post"}>{post}</div>
            <div className={"text-base avatar-desc"}>{desc}</div>
            <div className={"media-icon"}>
                <IconGithub className={"hover:cursor-pointer"} onClick={goToGithub} />
                <TeamsIcon className={"hover:cursor-pointer"} onClick={goToTeams}/>
                <IconEmail className={"hover:cursor-pointer"} onClick={copyEmail}/>
            </div>
        </div>
    )
}