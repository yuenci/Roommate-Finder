import { ReactComponent as TranslateIcon } from "./icons/translate.svg";
import { ReactComponent as ShareIcon } from "./icons/share.svg";
import { ReactComponent as LoveIcon } from "./icons/love.svg";
export default function TopicAreaPro(props) {
    return (
        <div className={"topic-area-pro"}>
           <div className={"topic-area-pro-left"}>
               <div className={"topic-area-pro-translate"}>
                   <TranslateIcon className={"topic-area-pro-translate"}/>
               </div>
               <div className={"topic-area-pro-topic"}>{props.topicText}</div>
           </div>
            <div className={"topic-area-pro-right"}>
                <ShareIcon className={"topic-area-pro-share"}/>
                <LoveIcon className={"topic-area-pro-love"}/>
            </div>
        </div>
    )
}