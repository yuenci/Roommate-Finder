import {Avatar, Message} from "@arco-design/web-react";
import {IconCamera, IconSettings} from "@arco-design/web-react/icon";
import {createRef, useState} from "react";
import {uploadImageWithRandomName} from "../../firebase/storageHandle.js";
import {avatarMaxSize} from "../../config.js";
import {StatusContainer} from "../../StatusContainer.js";
import {FBAuth} from "../../firebase/authHandler.js";
import {captionFirstCharToUpper} from "../../tools/dataTools.js";
import {Analysis} from "../../firebase/analysis.js";

export default function ProfileMainHeader(props) {
    const {user,showModal} = props;

    let avatarUrlOrigin = user.photoURL === null ? `https://api.multiavatar.com/${user.posterEmail}.png` : user.photoURL;

    const [avatarUrl, setAvatarUrl] = useState(avatarUrlOrigin);

    //console.log(user.avatarUrl);



    const triggerIconCSS ={
        color: '#3491FA',
        width: '30px',
        height: '30px',
        fontSize: '20px',
    }

    const avatarCSS = {
        width: 150,
        height: 150,
    }

    const fileInputRef = createRef();
    let avatarfile = null;

    function uploadAvatar(){
        new Analysis().logEvent("profileSetting_uploadAvatar");

        fileInputRef.current.click();
    }
    
    function onFileChange(e){
        avatarfile = e.target.files[0];
        let name = avatarfile.name;
        //console.log(name);

        if(avatarfile.size > avatarMaxSize){
            Message.error("File size cannot exceed 3MB");
            return;
        }

        // upload image and set new avatar
        uploadImageWithRandomName(name,avatarfile).then((url) => {
            new  FBAuth().updateUserInfo({photoURL: url}).then(() => {
                setAvatarUrl(url);
            });
        });

        // write avatar log to database
    }

    const fbAuth = new FBAuth();
    const currentUser = fbAuth.auth.currentUser;
    StatusContainer.currentUser = currentUser;
    const currentUserName = captionFirstCharToUpper(currentUser.displayName.split("-")[0]);



    return(
        <div className={"profile-main-header"}>
            {/*<img src={`https://api.multiavatar.com/${currentUser.phone}.png`} alt="user" className={"profile-main-avatar"}/>*/}
            <Avatar
                triggerIcon={<IconCamera />}
                triggerIconStyle={triggerIconCSS}
                onClick={uploadAvatar}
                style={avatarCSS}
            >
                <img
                    alt='avatar'
                    src={avatarUrl}
                />
            </Avatar>
            <span className={"text-4xl"}>{currentUserName}</span>
            <IconSettings className={"text-4xl hover:cursor-pointer"} onClick={showModal}/>
            <input type="file" style={{display:"none"}} ref={fileInputRef} onChange={onFileChange}/>
        </div>
    )
}