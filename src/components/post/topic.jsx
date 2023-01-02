import "./post.css";
import {Input} from "@arco-design/web-react";
export  function  Topic (props) {
    function onChange(value) {
        props.setTopic(value);
    }

    return (
        <div className={"topic-con"}>
            <span className={"post-title"}>Topic</span>
            <Input  allowClear placeholder='I am looking for a room' onChange={onChange}/>
        </div>
    )
}