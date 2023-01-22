
import { Carousel } from '@arco-design/web-react';
import { StatusContainer } from "../../StatusContainer.js";

export function CarouselPost(props) {
    const imgCSS = {
        height: 400,
        width: "100%",
        objectFit: 'cover',
    };


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