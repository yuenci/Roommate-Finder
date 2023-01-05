import "./post.css";
import {ConfigProvider, DatePicker} from "@arco-design/web-react";
import enUS from "@arco-design/web-react/es/locale/en-US.js";
import {StatusContainer} from "../../StatusContainer.js";
import {stampToDateObj} from "../../tools/dataTools.js";

export default function MoveInDate(props) {
    const { RangePicker } = DatePicker;

    function onSelect(value) {
        //console.log(value);
        props.setMoveInDate(value);
    }

    let currentRoom = StatusContainer.currentRoomData;
    let defaultDate;
    if(currentRoom){
        defaultDate = [stampToDateObj(currentRoom.moveInStart), stampToDateObj(currentRoom.moveInEnd)];
    }

    return (
        <div className={"move-in-date-con"}>
            <span className={"post-title"}>Move in date</span>
            {props.isModify
                ?<ConfigProvider locale={enUS}>
                    <RangePicker
                        format='YYYY-MM-DD'
                        className={"date-picker"}
                        onSelect={onSelect}
                        defaultValue={defaultDate}
                    />
                </ConfigProvider>
                :<ConfigProvider locale={enUS}>
                    <RangePicker
                        format='YYYY-MM-DD'
                        className={"date-picker"}
                        onSelect={onSelect}
                    />
                </ConfigProvider>

            }
        </div>
    )
}