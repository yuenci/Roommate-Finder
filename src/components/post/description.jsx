import "./post.css";
import {Input} from "@arco-design/web-react";
import {StatusContainer} from "../../StatusContainer.js";


export function  Description (props) {
    function onChange(value) {
        props.setDescription(value);
    }

    let currentRoom = StatusContainer.currentRoomData;

    return (
        <div className={"description-con"}>
            <span className={"post-title"}>Description:</span>
            {props.isModify
                ? <Input.TextArea defaultValue={currentRoom.description} className={"post-description"} onChange={onChange}/>
                : <Input.TextArea placeholder='Please enter your description' className={"post-description"} onChange={onChange}/>
            }

        </div>
    )
}