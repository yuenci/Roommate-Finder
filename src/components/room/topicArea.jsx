import "./topicArea.css";
import {IconCalendar, IconFire, IconHome, IconLocation, IconMan, IconWoman} from "@arco-design/web-react/icon";
export function TopicArea(props) {
    const data = props.data;

    function joinMoveInRangeDate(){
        let st = data.moveInStart.seconds;
        let ed = data.moveInEnd.seconds;

        let stStr = new Date(st *1000).toLocaleDateString();
        let edStr = new Date(ed *1000).toLocaleDateString();

        return stStr + " - " + edStr;
    }

    const price = "RM " + data.priceMin + " - RM " + data.priceMax;

    return(
        //topic,type,apartment, moveInRange, bedroomNum.jsx,gender,size,priceRange,phone,images,description,postTimeStamp


        <div className="topic-area">
            <div className="topic-topic">{data.topic}</div>
            <div className="tags">
                <div className="apartment" >
                    <IconLocation className={"room-topic-icon"} />
                    {data.apartment}
                </div>
                {/*<div className="type" >{data.type}</div>*/}
                <div className="priceRange">
                    <IconFire className={"room-topic-icon"}  />
                    {price}</div>
                <div className="size" >
                    <IconHome className={"room-topic-icon"}  />
                    {data.size}</div>
                { data.gender === "Male" &&
                    <div className="gender" >
                        <IconMan className={"room-topic-icon"}  />
                        {data.gender}</div>
                }
                { data.gender === "Female" &&
                    <div className="gender" >
                        <IconWoman className={"room-topic-icon"}  />
                        {data.gender}</div>
                }
                { data.gender === "Any" &&
                    <div className="gender" >
                        <IconMan className={"room-topic-icon"}  />
                        <IconWoman className={"room-topic-icon"}  />
                        {data.gender}</div>
                }
                <div className="moveInRange" >
                    <IconCalendar className={"room-topic-icon"}  />
                    {joinMoveInRangeDate()}</div>
            </div>
        </div>
    )
}