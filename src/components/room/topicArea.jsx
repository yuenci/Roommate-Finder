import "./topicArea.css";
import {
    IconHome,
    IconLocation,
    IconMan,
    IconUserGroup,
    IconWoman
} from "@arco-design/web-react/icon";

export function TopicArea(props) {
    const data = props.data;

    function joinMoveInRangeDate() {
        let st = data.moveInStart.seconds;
        let ed = data.moveInEnd.seconds;

        let duration = (ed - st + 1) / (86400 * 30);

        // Carry up
        duration = Math.ceil(duration);
        duration = duration === 1 ? "1 month" : duration + " months";

        let stStr = new Date(st * 1000).toLocaleDateString();
        //let edStr = new Date(ed * 1000).toLocaleDateString();

        return stStr + " || " + duration;
    }

    const price = "RM " + data.priceMin + " - RM " + data.priceMax + " / month";

    return (
        //topic,type,apartment, moveInRange, bedroomNum.jsx,gender,size,priceRange,phone,images,description,postTimeStamp


        <div className="topic-area">
            <div className="topic-topic">{data.topic}</div>
            <div className="important-info">
                <div className="priceRange">
                    {price}</div>
                <div className="moveInRange">
                    {joinMoveInRangeDate()}</div>
            </div>
            <div className="tags">


                <div className="apartment">
                    <div className="icon-con">
                        <IconLocation className={"room-topic-icon"}/>
                    </div>
                    {data.apartment}
                </div>

                <div className="size">
                    <div className="icon-con">
                        <IconHome className={"room-topic-icon"}/>
                    </div>
                    {data.size}</div>
                <div className="bedroom-num-r">
                    <div className="icon-con">
                        <IconUserGroup className={"room-topic-icon"}/>
                    </div>
                    {data.bedroomNum} Bedrooms
                </div>
                {data.gender === "Male" &&
                    <div className="gender">
                        <div className="icon-con">
                            <IconMan className={"room-topic-icon"}/>
                        </div>
                        {data.gender}</div>
                }
                {data.gender === "Female" &&
                    <div className="gender">
                        <div className="icon-con">
                            <IconWoman className={"room-topic-icon"}/>
                        </div>
                        {data.gender}</div>
                }
                {data.gender === "Any" &&
                    <div className="gender">
                        <div className="gender-icons">
                            <div className="icon-con">
                                <IconMan className={"room-topic-icon"}/>
                            </div>
                            <div className="icon-con">
                                <IconWoman className={"room-topic-icon"}/>
                            </div>
                        </div>
                        {data.gender}</div>
                }

            </div>
        </div>
    )
}