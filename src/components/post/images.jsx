import "./post.css";
import {Message, Upload} from "@arco-design/web-react";
import {uploadImageWithRandomName} from "../../firebase/storageHandle.js";
import {imageMaxSize} from "../../config.js";
import {StatusContainer} from "../../StatusContainer.js";

export default function Images(props) {
    /*
    let defaultFileList= [
        {
            uid: '1',
            name: 'image.png',
            url: 'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/1621259076791.png',
        },
        {
            uid: '2',
            name: 'image.png',
            url: 'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/comment_dBzkNiLIvxjJnG5ABx2CYJlnzhpFYDJV.gif',
        },
        {
            uid: '3',
            name: 'image.png',
            url: 'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/7d037102738da977583b616ea751f8198718e3f0.gif',
        }
    ];
*/
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
    //console.log(defaultFileList2);

    let imagesList = [];


    function addFileList(fileList){
        imagesList = [];

        if (defaultFileList2.length !== 0) {
            for (let i = 0; i < defaultFileList2.length; i++) {
                imagesList.push(defaultFileList2[i].url);
            }
        }

        for (let file of fileList){
            if (file.response !== undefined) imagesList.push(file.response);
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
                limit={4}
                defaultFileList={defaultFileList2}
                customRequest={(options) => {
                    const { onProgress, onError, onSuccess, file } = options;

                    if(file.size > imageMaxSize){
                        onError("size");
                        Message.error("Image size should be less than 10MB");
                        return;
                    }
                    uploadImageWithRandomName(file.name, options.file).then((url) => {
                        imagesList.push(url);
                        //console.log(url);
                        onSuccess(url);
                    }).catch((error) => {
                        onError(error);
                    } );
                } }
                onChange={addFileList}
                // onChange={getAllImageURLs}
            />
        </div>
    );
}