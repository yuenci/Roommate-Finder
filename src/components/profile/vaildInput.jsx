import {Button, Input, Message} from '@arco-design/web-react';
export  default function ValidInput(props) {
    const {defaultValue} = props;
    let emailValid = false;

    function sendValidateEmail() {
        Message.success('The verification email was sent successfully. Please check your email.');
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
                    ? <Button status='success' disabled>Verified</Button>
                    : <Button status='warning' onClick={sendValidateEmail}>Unverified</Button>
                }
            </div>

        </div>
    );
}