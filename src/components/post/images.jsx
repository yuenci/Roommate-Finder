import "./post.css";
import {Message, Upload} from "@arco-design/web-react";
import {uploadImageWithRandomName} from "../../firebase/storageHandle.js";
import {imageMaxSize} from "../../config.js";
import {useState} from "react";

export default function Images(props) {
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

    let imagesList = [];



    function addFileList(fileList){
        imagesList = [];
        for (let file of fileList){
            imagesList.push(file.response);
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

                customRequest={(options) => {
                    const { onProgress, onError, onSuccess, file } = options;

                    if(file.size > imageMaxSize){
                        onError("size");
                        Message.error("Image size should be less than 1MB");
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