import "./post.css";
import {Message, Upload} from "@arco-design/web-react";
import {uploadImageWithRandomName} from "../../firebase/storageHandle.js";
import {imageMaxSize} from "../../config.js";
import {StatusContainer} from "../../StatusContainer.js";

export default function Images(props) {

    let defaultFileList2 = [];

    if(Object.keys(StatusContainer.currentRoomData).length !== 0){
        for (let i = 0; i < StatusContainer.currentRoomData.images.length; i++) {
            defaultFileList2.push({
                uid: i,
                name: 'image.png',
                url: StatusContainer.currentRoomData.images[i],
            })
        }
    }

    function addFileList(fileList){
        //console.log("fileList",fileList);

        let imagesList = [];

        for (let file of fileList){
            if(file.hasOwnProperty("response") && file.response !== undefined){
                imagesList.push(file.response);
                continue;
            }
            imagesList.push(file.url);
        }

        props.setImages(imagesList);
    }

    return(
        <div className={"images-con"}>
            <span className={"post-title"}>Images:</span>
            <Upload
                multiple
                imagePreview
                listType='picture-card'
                className={"images-upload"}
                limit={5}
                defaultFileList={defaultFileList2}
                customRequest={(options) => {
                    const {  onError, onSuccess, file } = options;

                    if(file.size > imageMaxSize){
                        onError("size");
                        Message.error("Image size should be less than 10MB");
                        return;
                    }
                    uploadImageWithRandomName(file.name, options.file).then((url) => {
                        //imagesList.push(url);
                        //console.log(url);
                        onSuccess(url);
                    }).catch((error) => {
                        onError(error);
                    } );
                } }
                onChange={addFileList}
                // onChange={getAllImageURLs}
                // onRemove={onRemove}
            />
            {/*<button onClick={()=>{*/}
            {/*    console.log(defaultFileList2)*/}
            {/*}*/}
            {/*}>*/}
            {/*    test*/}
            {/*</button>*/}
        </div>

    );
}