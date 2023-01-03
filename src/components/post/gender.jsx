import "./post.css";
import {Radio} from "@arco-design/web-react";
import {StatusContainer} from "../../StatusContainer.js";

export default function Gender(props){
    const RadioGroup = Radio.Group;

    const options = ['Male', "Female","Any"]

    function onChange(value) {
        props.setGender(value);
    }

    let currentRoom = StatusContainer.currentRoomData;
    let defaultType;
    if(currentRoom){
        if (currentRoom.gender==="Male") defaultType = "a";
        else if (currentRoom.gender==="Female") defaultType = "b";
        else defaultType = "c";
    }

    return(
        <div className={"gender-con"}>
            <span className={"post-title"}>Gender:</span>
            {/*<RadioGroup options={['Male', "Female","Any"]} className={"radios"} onChange={onChange} />*/}
            {props.isModify
                ?<RadioGroup defaultValue={defaultType} className={"radios"} onChange={onChange} >
                    <Radio value='a'>{options[0]}</Radio>
                    <Radio value='b'>{options[1]}</Radio>
                    <Radio value='c'>{options[2]}</Radio>
                </RadioGroup>
                :<RadioGroup  className={"radios"} onChange={onChange}>
                    <Radio value='a'>{options[0]}</Radio>
                    <Radio value='b'>{options[1]}</Radio>
                    <Radio value='c'>{options[2]}</Radio>
                </RadioGroup>
            }
        </div>
    )
}