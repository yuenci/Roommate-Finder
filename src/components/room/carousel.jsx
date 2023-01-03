
import { Carousel, Image } from '@arco-design/web-react';
import {createRef, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { StatusContainer } from "../../StatusContainer.js";

export function CarouselPost(props) {
    const imgCSS = {
        height: 400,
        width: "100%",
        objectFit: 'cover',
    };

    let imageSrc = [
        'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/1621259076791.png',
        'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/comment_dBzkNiLIvxjJnG5ABx2CYJlnzhpFYDJV.gif',
        'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/7d037102738da977583b616ea751f8198718e3f0.gif',
        'https://utoolsfigurebed.oss-cn-hangzhou.aliyuncs.com/1620799055630.png',
    ];

    const { roomID, roomData } = props;

    ///console.log("roomData.type" + roomData.type);


    let imageSrcList
    try {
        let cache = StatusContainer.fireBaseStore.cache;
        // console.log("cache")
        // console.log(cache)
        imageSrcList = cache["rooms"][roomID].images;
        //console.log(imageSrcList)
    } catch (e) {
        //console.log(e);
    }

    // const [currentImageSrc, setCurrentImageSrc] = useState("");
    // const [currentImageShow, setCurrentImageShow] = useState("");
    //
    // function onChangeHandler(index) {
    //     //console.log(index);
    //     //console.log(imageSrcList[index]);
    //     setCurrentImageSrc(imageSrcList[index]);
    // }
    //
    // const [visible, setVisible] = useState(false);
    // function onClickHandler() {
    //     setCurrentImageShow(currentImageSrc);
    //     setVisible(true);
    //
    // }


    return (
        <div>
            {roomData.type && imageSrcList &&
                <Carousel
                    autoPlay
                    animation='card'
                    // showArrow='never'
                    indicatorPosition='outer'
                    style={{ width: '100%', height: 400, marginTop: 0 }}
                    // onChange={onChangeHandler}
                    // onClick={onClickHandler}
                >
                    {imageSrcList.map((src, index) => (
                        <div
                            key={index}
                            style={{ width: '60%' }}
                        >
                            <img
                                src={src}
                                style={imgCSS}
                                alt="img" />
                        </div>
                    ))}
                </Carousel>
            }

            {/*<Image.Preview*/}
            {/*    src={currentImageShow}*/}
            {/*    visible={visible}*/}
            {/*    onVisibleChange={setVisible}*/}
            {/*/>*/}
        </div>
    );
}