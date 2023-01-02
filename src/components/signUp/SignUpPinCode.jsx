import {Input} from "@arco-design/web-react";

export function SignUpPinCode(props){

    return (
        <div>
            <h2 className="join">Join Us Now</h2>
            <Input className="input-pin" allowClear placeholder='PIN Code' onChange={props.setPinCode}/>
        </div>
    )
}