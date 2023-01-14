import React from 'react';
import {Modal, Message} from '@arco-design/web-react';
export function ModalForContent(props) {
    const {visible, setVisible, user} = props;

    const btnStyle = {
        width:"100px",
        height:"40px",
        backgroundColor:"#20c997",
        border:"none",
        borderRadius:"5px",
        cursor:"pointer",
    }

    function handleOk() {
        //console.log('ok');
        // copy user phone to clipboard
        navigator.clipboard.writeText(user.phone)
        Message.success('Phone number copied to clipboard')

    }

    return (
        <Modal
            title= {user.name}
            visible={visible}
            footer={null}
            onCancel={() => {
                //console.log("cancel");
                setVisible(false);
            }}
        >
            <h3>{user.title}</h3>
            <p>{user.content}</p>
            <p style={{textAlign:"right"}}>{new Date(user.postTimeStamp.seconds * 1000).toLocaleString()}</p>
            <button style={btnStyle} onClick={handleOk}>Have a talk</button>
        </Modal>
    )
}