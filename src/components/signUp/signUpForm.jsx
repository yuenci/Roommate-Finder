import {Input, Modal} from "@arco-design/web-react";
import {InputEmail} from "../common/InputEmail.jsx";
import {IconExclamationCircle} from "@arco-design/web-react/icon";


export function SignUpForm(props) {
    // const [visible, setVisible] = useState(false);

    function warning(){
        Modal.warning({
            title:"Warning",
            content:
                'Please make sure you have a WhatsApp account and that you have correctly entered your WhatsApp phone number in the phone field.',
            okText:"Got it",
        });
    }



    return (
        <div>
            <h2 className="join">Join Us Now</h2>
            <Input className="input-signup" allowClear placeholder='Name' onChange={props.setName}/>
            <div className="phone-container">
                <Input.Group className="input-signup-group" >
                    <Input   value='60' className="phone-zone" onChange={props.setPhoneAreaCode}/>
                    <Input   placeholder='Phone number'  className="phone-num" onChange={props.setPhone}/>
                </Input.Group>
                <IconExclamationCircle className="info-icon" onClick={warning}/>
            </div>
            <InputEmail className="input-signup" email={props.email} setEmail={props.setEmail}/>
            <Input.Password defaultValue='' className="input" onChange={props.setPassword} placeholder={"Password"}/>
        </div>
    )
}