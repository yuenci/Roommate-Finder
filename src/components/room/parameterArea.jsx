import {joinMoveInRangeDate} from "../../tools/dataTools.js";
import {ReactComponent as DollarIcon} from "./icons/dollar.svg";
import {ReactComponent as DurationIcon} from "./icons/duration.svg";

import {
    IconHome,
    IconLocation,
    IconMan,
    IconUserGroup,
    IconWoman
} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import PubSub from "pubsub-js";

export default function ParameterArea(props) {
    const {data} = props;
    const priceOrigin = "RM " + data.priceMin + " - RM " + data.priceMax + " / month";
    const moveInRangeOrigin = joinMoveInRangeDate(data);
    const sizeOrigin = data.size;
    const bedroomNumOrigin = data.bedroomNum;
    const genderOrigin = data.gender;

    const [price, setPrice] = useState(priceOrigin);
    const [moveInRange, setMoveInRange] = useState(moveInRangeOrigin);
    const [size, setSize] = useState(sizeOrigin);
    const [bedroomNum, setBedroomNum] = useState(bedroomNumOrigin + " Bedrooms");
    const [gender, setGender] = useState(genderOrigin);

    useEffect(() => {
        const subscription = PubSub.subscribe('translate', (msg, data) => {
            if(data.message === "translateToChinese"){
                translateToChinese();
            }else{
                setPrice(priceOrigin);
                setMoveInRange(moveInRangeOrigin);
                setSize(sizeOrigin);
                setBedroomNum(bedroomNumOrigin + " Bedrooms");
                setGender(genderOrigin);
            }
        });
        // 取消订阅
        return () => PubSub.unsubscribe(subscription);
    }, []);


    function translateToChinese(){
        let priceCN = priceOrigin.replace("month", "月");
        setPrice(priceCN)

        let moveInRangeCN = moveInRangeOrigin.replace("months", "月");
        moveInRangeCN = moveInRangeCN.replace("month", "月");
        setMoveInRange(moveInRangeCN)

        let sizeCN;
        console.log(sizeOrigin)
        if(sizeOrigin === "Small"){
            sizeCN = "小房间"
        }else if (sizeOrigin === "Medium"){
            sizeCN = "中房间"
        }else if (sizeOrigin === "Master"){
            sizeCN = "大房间"
        }
        setSize(sizeCN)

        setBedroomNum(bedroomNumOrigin + " 个卧室")

        let genderCN;
        if (genderOrigin === "Male"){
            genderCN = "男性"
        } else if (genderOrigin === "Female"){
            genderCN = "女性"
        }else{
            genderCN = "男女不限"
        }
        setGender(genderCN)
    }


    return (
        <div className={"parameter-area"}>
            <div className={"parameter-area-top"}>
                <div className={"parameter-area-top-price-con"}>
                    <div className={"parameter-area-top-icon-con"}>
                        <DollarIcon className={"parameter-area-top-price-icon"}/>
                    </div>
                    <div className={"parameter-area-top-price-text"}>{price}</div>
                </div>
                <div className={"parameter-area-top-duration-con"}>
                    <div className={"parameter-area-top-icon-con"}>
                        <DurationIcon className={"parameter-area-top-duration-icon"}/>
                    </div>
                    <div className={"parameter-area-top-duration-text"}>{moveInRange}</div>
                </div>
            </div>
            <div className={"parameter-area-bottom"}>
                <div className={"parameter-area-bottom-con"}>
                    <IconLocation className={"parameter-area-bottom-icon"}/>
                    <div className={"parameter-area-bottom-text"}>{data.apartment}</div>
                </div>
                <div className={"parameter-area-bottom-con"}>
                    <IconHome className={"parameter-area-bottom-icon"}/>
                    <div className={"parameter-area-bottom-text"}>{size}</div>
                </div>
                <div className={"parameter-area-bottom-con"}>
                    <IconUserGroup className={"parameter-area-bottom-icon"}/>
                    <div className={"parameter-area-bottom-text"}>{bedroomNum}</div>
                </div>
                <div className={"parameter-area-bottom-con"}>
                    <IconMan className={"parameter-area-bottom-icon"}/>
                    <div className={"parameter-area-bottom-text"}>{gender}</div>
                </div>
            </div>
        </div>
    )
}