import "./room.css";
import {IconDelete, IconPen} from "@arco-design/web-react/icon";
import {Button, Message, Modal} from '@arco-design/web-react';
import {StatusContainer} from "../../StatusContainer.js";
import {initAllRoomsData} from "../../tools/dataTools.js";
import {  useNavigate } from 'react-router-dom';
import {Analysis} from "../../firebase/analysis.js";

export default function ModifyToolBar(props) {

    const {roomID} = props;
    const navigate = useNavigate();

    function deleteRoom(){
        new Analysis().logEvent("room_delete", {roomID: roomID});
        StatusContainer.fireBaseStore.delete("rooms",roomID).then(
            ()=>{
                Message.success('Delete successfully')
                initAllRoomsData().then(() => {
                    setTimeout(()=>navigate("/home"),1000)
                })
            }
        )
    }

    function goToModifyPage(){
        new Analysis().logEvent("room_modify", {roomID: roomID});
        navigate(`/modify/${roomID}`);
    }

    function confirm() {
        Modal.confirm({
            title: 'Confirm deletion',
            content:
                'Are you sure you want to delete this post? Once you press the delete button, the post will be deleted immediately. You can’t undo this action.',
            okButtonProps: {
                status: 'danger',
            },
            onOk: () => {
                deleteRoom();
            },
        });
    }


    return (
        <div className={"modify-tool-bar"}>
            <Button type='secondary' icon={<IconPen />} className={"modify-tool-modify"} onClick={goToModifyPage}>Modify</Button>
            <Button status='danger' icon={<IconDelete />} className={"modify-tool-delete"} onClick={confirm}>Finish</Button>
        </div>
    );
}