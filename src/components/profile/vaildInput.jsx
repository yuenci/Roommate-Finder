import {Button, Input, Message} from '@arco-design/web-react';
import {useState} from "react";
import {FBAuth} from "../../firebase/authHandler.js";
export  default function ValidInput(props) {
    const {defaultValue} = props;
    let emailValid = new FBAuth().auth.currentUser.emailVerified;

    const  [unverified, setUnverified] = useState("Unverified");



    function sendValidateEmail() {
        new FBAuth().sendEmailVerification().then(() => {
            // count down 60s
            let count = 60;
            let timer = setInterval(() => {
                count--;
                setUnverified(count + "s");
                if (count === 0) {
                    clearInterval(timer);
                    setUnverified("Resend");
                }
            }, 1000);
        }).catch((error) => {
            Message.error(error.message);
        });
    }
    const inputCss300 = {
        // width: 280,
        marginRight: 10,
        marginBottom: 20
    }

    const textCss = {
        fontSize: 16,
        marginBottom: 10
    }

    const buttonCss = {
        width: 99,
    }

    return (
        <div >
            <div style={textCss}>Email</div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between"
            }}>
                <Input style={inputCss300} allowClear  disabled defaultValue={defaultValue} />
                { emailValid
                    ? <Button status='success' disabled style={buttonCss}>Verified</Button>
                    : <Button status='warning' onClick={sendValidateEmail} style={buttonCss}>{unverified}</Button>
                }
            </div>

        </div>
    );
}