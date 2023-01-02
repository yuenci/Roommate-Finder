import "./post.css";
import {Radio} from "@arco-design/web-react";

export function Size(props) {
    const RadioGroup = Radio.Group;

    function onChange(value) {
        //console.log(value);
        props.setSize(value);
    }


    return (
        <div className={"size-con"}>
            <span className={"post-title"}>Size:</span>
            <RadioGroup options={["Small", "Medium", "Master"]} className={"radios"} onChange={onChange}/>
        </div>
    )
}