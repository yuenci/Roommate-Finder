import "./post.css";
import {InputNumber} from "@arco-design/web-react";
import {StatusContainer} from "../../StatusContainer.js";

export default function BedroomNum(props) {

    function onChange(value) {
        //console.log(value);
        props.setBedroomNum(value);
    }

    let currentRoom = StatusContainer.currentRoomData;


    return(
        <div className={"bedroom-num-con"}>
            <span className={"post-title"}>Bedroom number:</span>
            {props.isModify
                ?<InputNumber
                    mode='button'
                    defaultValue={currentRoom.bedroomNum}
                    style={{ width: 160, margin: '10px 24px 10px 0' }}
                    className={"bedroom-num"}
                    onChange={onChange}
                />
                :<InputNumber
                    mode='button'
                    defaultValue={props.bedroomNum}
                    style={{ width: 160, margin: '10px 24px 10px 0' }}
                    className={"bedroom-num"}
                    onChange={onChange}
                />
            }

        </div>
    );
}