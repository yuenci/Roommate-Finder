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

export default function ParameterArea(props) {
    const {data} = props;

    const price = "RM " + data.priceMin + " - RM " + data.priceMax + " / month";
    const moveInRange = joinMoveInRangeDate(data);


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
                    <div className={"parameter-area-bottom-text"}>{data.size}</div>
                </div>
                <div className={"parameter-area-bottom-con"}>
                    <IconUserGroup className={"parameter-area-bottom-icon"}/>
                    <div className={"parameter-area-bottom-text"}>{data.bedroomNum} Bedrooms</div>
                </div>
                <div className={"parameter-area-bottom-con"}>
                    <IconMan className={"parameter-area-bottom-icon"}/>
                    <div className={"parameter-area-bottom-text"}>{data.gender}</div>
                </div>
            </div>
        </div>
    )
}