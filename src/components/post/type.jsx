import "./post.css";
import {Radio} from "@arco-design/web-react";
import {StatusContainer} from "../../StatusContainer.js";

export function Type(props) {
    const RadioGroup = Radio.Group;

    const options = ['I am looking for a room', "I am offering a room"]

    // true means have room, offer room
    function onChange(value) {
        // find value in options
        console.log(value);
        if (value === "a") {
            props.setType(false);
        } else {
            props.setType(true);
        }
    }

    let currentRoom = StatusContainer.currentRoomData;
    let defaultType;
    if (currentRoom) {
        defaultType = currentRoom.type === false ? "a" : "b";
    }


    return (
        <div className={"type-con"}>
            <span className={"post-title"}>Type</span>
            {/*{ props.isModify*/}
            {/* ? <RadioGroup options={options} className={"radios"} onChange={onChange} defaultValue={defaultType}/>*/}
            {/* : <RadioGroup options={options} className={"radios"} onChange={onChange}/>*/}
            {/*}*/}
            {props.isModify
                ? <RadioGroup defaultValue={defaultType} className={"radios"} onChange={onChange}>
                    <Radio value='a'>{options[0]}</Radio>
                    <Radio value='b'>{options[1]}</Radio>
                </RadioGroup>
                : <RadioGroup className={"radios"} onChange={onChange}>
                    <Radio value='a'>{options[0]}</Radio>
                    <Radio value='b'>{options[1]}</Radio>
                </RadioGroup>
            }
        </div>
    )
}