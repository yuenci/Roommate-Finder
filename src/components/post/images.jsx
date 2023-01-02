import "./post.css";
import {Message, Upload} from "@arco-design/web-react";
import {uploadImage} from "../../firebase/storageHandle.js";

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

    function  getAllImageURLs(fileList){
        console.log(fileList);
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if(file.response){
                console.log(file.response);
            }
        }
    }

    defaultFileList = props.images;

    return(
        <div className={"images-con"}>
            <span className={"post-title"}>Images:</span>
            <Upload
                multiple
                imagePreview
                defaultFileList={defaultFileList}
                listType='picture-card'
                // onPreview={(file) => {
                //     Message.info(`click preview icon for ${file.name}`);
                // }}
                className={"images-upload"}
                customRequest={(options) => {
                    const { onProgress, onError, onSuccess, file } = options;

                    uploadImage(options.file.name, options.file).then((url) => {
                        onSuccess(url);
                    }).catch((error) => {
                        onError(error);
                    } );
                } }
                // onChange={getAllImageURLs}
            />
            <button onClick={getAllImageURLs}>Post</button>
        </div>
    );
}