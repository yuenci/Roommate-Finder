import "./post.css";
import {Radio} from "@arco-design/web-react";

export function Type(props) {
  const RadioGroup = Radio.Group;

  const options = ['I am looking for a room', "I am offering a room"]

    // true means have room, offer room
    function onChange(value){
    // find value in options
    if (value === options[0]){
        props.setType(false);
    }else {
        props.setType(true);
    }
  }


  return(
      <div className={"type-con"}>
          <span className={"post-title"}>Type</span>
          <RadioGroup options={options} className={"radios"} onChange={onChange}/>
      </div>
  )
}