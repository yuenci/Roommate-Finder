import "./post.css";
import {InputNumber} from "@arco-design/web-react";

export default function BedroomNum(props) {

    function onChange(value) {
        //console.log(value);
        props.setBedroomNum(value);
    }

    return(
        <div className={"bedroom-num-con"}>
            <span className={"post-title"}>Bedroom number:</span>
            <InputNumber
                mode='button'
                defaultValue={props.bedroomNum}
                style={{ width: 160, margin: '10px 24px 10px 0' }}
                className={"bedroom-num"}
                onChange={onChange}
            />
        </div>
    );
}