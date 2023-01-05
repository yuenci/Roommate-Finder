import "./post.css";
import {Input} from "@arco-design/web-react";
import {useState} from "react";
import {StatusContainer} from "../../StatusContainer.js";
export  function  Topic (props) {
    function onChange(value) {
        props.setTopic(value);
    }

    let currentRoom = StatusContainer.currentRoomData;



    return (
        <div className={"topic-con"}>
            <span className={"post-title"}>Topic</span>
            {props.isModify
                ? <Input allowClear defaultValue={currentRoom.topic} onChange={onChange} />
                : <Input  allowClear placeholder='I am looking for a room' onChange={onChange}/>
            }
        </div>
    )
}