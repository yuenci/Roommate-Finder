import "./post.css";
import {Radio} from "@arco-design/web-react";

export default function Gender(props){
    const RadioGroup = Radio.Group;

    function onChange(value) {
        //console.log(value);
        props.setGender(value);
    }

    return(
        <div className={"gender-con"}>
            <span className={"post-title"}>Gender:</span>
            <RadioGroup options={['Male', "Female","Any"]} className={"radios"} onChange={onChange} />
        </div>
    )
}