import {Input} from "@arco-design/web-react";
import {useState} from "react";
import {validateEmail} from "../../tools/dataTools.js";

export function InputEmail(props){
    const [emailError, setEmailError] = useState("");

    function emailOnChange(value) {
        props.setEmail(value);
    }
    function changeEmailError() {
        let res = validateEmail(props.email)
        if (res) {
            setEmailError("");
        } else {
            setEmailError("error");
            //console.log("email is not valid");
        }
        return res;
    }

    return(
        <div>
            {emailError === "error"
                ? <Input error
                         className="input" allowClear placeholder='TP Email'
                         onChange={emailOnChange}
                         onBlur={changeEmailError}
                />
                : <Input
                    className="input" allowClear placeholder='Email'
                    onChange={emailOnChange}
                    onBlur={changeEmailError}
                />
            }
        </div>

    )
}