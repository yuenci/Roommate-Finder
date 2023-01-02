import "./post.css";
import {Input} from "@arco-design/web-react";


export function  Description (props) {
    function onChange(value) {
        props.setDescription(value);
    }


    return (
        <div className={"description-con"}>
            <span className={"post-title"}>Description:</span>
            <Input.TextArea placeholder='Please enter your description' className={"post-description"} onChange={onChange}/>
        </div>
    )
}