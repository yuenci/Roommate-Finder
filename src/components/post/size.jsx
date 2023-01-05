import "./post.css";
import {Radio} from "@arco-design/web-react";
import {StatusContainer} from "../../StatusContainer.js";

export function Size(props) {
    const RadioGroup = Radio.Group;
    const options = ["Small", "Medium", "Master"]

    function onChange(value) {
        if (value === "a")  props.setSize("Small");
        else if (value === "b") props.setSize("Medium");
        else props.setSize("Master");
    }

    let currentRoom = StatusContainer.currentRoomData;
    let defaultType;
    if(currentRoom){
        if (currentRoom.size==="Small") defaultType = "a";
        else if (currentRoom.size==="Medium") defaultType = "b";
        else defaultType = "c";
    }


    return (
        <div className={"size-con"}>
            <span className={"post-title"}>Size:</span>
            {/*<RadioGroup options={["Small", "Medium", "Master"]} className={"radios"} onChange={onChange}/>*/}
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