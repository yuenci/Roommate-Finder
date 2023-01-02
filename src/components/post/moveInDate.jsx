import "./post.css";
import {ConfigProvider, DatePicker} from "@arco-design/web-react";
import enUS from "@arco-design/web-react/es/locale/en-US.js";

export default function MoveInDate(props) {
    const { RangePicker } = DatePicker;

    function onSelect(value) {
        //console.log(value);
        props.setMoveInDate(value);
    }

    return (
        <div className={"move-in-date-con"}>
            <span className={"post-title"}>Move in date</span>
            <ConfigProvider locale={enUS}>
                <RangePicker
                    // style={{ ...style, width: 360 }}
                    format='YYYY-MM-DD'
                    className={"date-picker"}
                    // onChange={onChange}
                    onSelect={onSelect}
                    // onOk={onOk}
                />
            </ConfigProvider>
        </div>
    )
}