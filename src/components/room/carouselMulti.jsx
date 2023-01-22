import {useEffect, useState} from "react";
import {FBStore} from "../../firebase/storeHandle.js";
import { Image } from '@arco-design/web-react';
import "./room.css"


export  default  function  CarouselMulti(props){
    const { roomID } = props;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [visible, setVisible] = useState(false);
    const [imageSrcList, setImageSrcList] = useState(null);
    const [picNum, setPicNum] = useState(0);
    const [picIndex, setPicIndex] = useState(0);


    useEffect(() => {
        new FBStore().readDocument("rooms", roomID).then((res) => {
            setImageSrcList(res.images);
            setPicNum(res.images.length)
        });

    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // get screen width
    const screenWidth = document.documentElement.clientWidth;




    if (picNum === 0){
        return null
    }

    if(screenWidth <= 768 && picNum >= 1){
        //console.log("mobile")

        return (
            <div className={"carousel-mobile"}>
                <img
                    width={"100%"}
                    src={imageSrcList[0]}
                    alt='pic'
                    onClick={() => {setVisible(true)}}
                    className={"carousel-mobile-img-1"}
                />
                <div className={"carousel-num"}>{`1 / ${picNum}`}</div>
                <Image.PreviewGroup srcList={imageSrcList} visible={visible} onVisibleChange={setVisible} />
            </div>
        )
    }

    if (picNum ===1){
        console.log("yes")
        return (
           <div className={"carousel-1"}>
               <Image
                   width={"100%"}
                   src={imageSrcList[0]}
                   alt='pic'
               />
           </div>
        );
    }

    function changeVisible(index){
        setPicIndex(index);
        setVisible(true);
        // console.log(index)
    }

    if (picNum ===2){
        return (
            <div>
                <div className={"carousel-2"}>
                    <Image
                        style={{paddingRight: "7px"}}
                        width={"100%"}
                        src={imageSrcList[0]}
                        alt='pic'
                    />
                    <Image
                        width={"100%"}
                        src={imageSrcList[1]}
                        alt='pic'
                    />
                </div>
            </div>
        )
    }

    if (picNum ===3){
        return (
            <div>
                <div className={"carousel-3"}>
                    <img
                        className={"carousel-3-left-img"}
                        src={imageSrcList[0]}
                        alt='pic'
                        onClick={() => {changeVisible(0)}}
                    />
                    <div className={"carousel-3-right"}>
                        <img
                            width={"100%"}
                            src={imageSrcList[1]}
                            style={{paddingBottom: "5px"}}
                            alt='pic'
                            onClick={() =>{changeVisible(1)}}
                        />
                        <img
                            width={"100%"}
                            src={imageSrcList[2]}
                            alt='pic'
                            onClick={() => {changeVisible(2)}}
                        />
                    </div>
                    <Image.PreviewGroup srcList={imageSrcList} visible={visible} onVisibleChange={setVisible} current={picIndex} />
                </div>
            </div>
        )
    }


    if (picNum ===4){
        return (
            <div>
                <div className={"carousel-3"}>
                    <img
                        className={"carousel-3-left-img"}
                        width={"70%"}
                        src={imageSrcList[0]}
                        alt='pic'
                        onClick={() => {changeVisible(0)}}
                    />
                    <div className={"carousel-4-right"}>
                        <img
                            width={"100%"}
                            src={imageSrcList[1]}
                            alt='pic'
                            onClick={() => {changeVisible(1)}}
                        />
                        <img
                            width={"100%"}
                            src={imageSrcList[2]}
                            alt='pic'
                            onClick={() =>{changeVisible(2)}}
                        />
                        <img
                            width={"100%"}
                            src={imageSrcList[3]}
                            alt='pic'
                            onClick={() => {changeVisible(3)}}
                        />
                    </div>
                    <Image.PreviewGroup srcList={imageSrcList} visible={visible} onVisibleChange={setVisible} current={picIndex}/>
                </div>
            </div>
        )
    }
    //
    if (picNum ===5){
        return (
            <div>
                <div className={"carousel-5"}>
                    <img
                        className={"carousel-5-left-img"}
                        src={imageSrcList[0]}
                        alt='pic'
                        onClick={() => {changeVisible(0)}}
                    />
                    <div className={"carousel-5-middle"}>
                        <img
                            src={imageSrcList[1]}
                            style={{paddingBottom: "7px"}}
                            alt='pic'
                            onClick={() => {changeVisible(1)}}
                        />
                        <img
                            src={imageSrcList[2]}
                            alt='pic'
                            onClick={() => {changeVisible(2)}}
                        />
                    </div>
                    <div className={"carousel-5-right"}>
                        <img
                            src={imageSrcList[3]}
                            style={{paddingBottom: "7px"}}
                            alt='pic'
                            onClick={() => {changeVisible(3)}}
                        />
                        <img
                            src={imageSrcList[4]}
                            alt='pic'
                            onClick={() => {changeVisible(4)}}
                        />
                    </div>
                    <Image.PreviewGroup srcList={imageSrcList} visible={visible} onVisibleChange={setVisible} current={picIndex}/>
                </div>
            </div>
        )
    }
}