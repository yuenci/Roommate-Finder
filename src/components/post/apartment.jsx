import "./post.css";
import {Select} from "@arco-design/web-react";
import {apartments} from "../../config.js";
import {StatusContainer} from "../../StatusContainer.js";

export default function Apartment(props) {
    const Option = Select.Option;
    function handleChange(value) {
        //console.log(value);
        props.setApartment(value);
    }

    let currentRoom = StatusContainer.currentRoomData;

    return(
        <div className={"apartment-con"}>
            <span className={"post-title"}>Apartment</span>
            <Select placeholder='Please select' style={{ width: 154 }} allowClear allowCreate
                    className={"select-apartment"} onChange={handleChange}
                    defaultValue={props.isModify ? currentRoom.apartment : null}>
                {apartments.map((option, index) => (
                    <Option key={index} value={option}>
                        {option}
                    </Option>
                ))}
            </Select>
        </div>
    )
}