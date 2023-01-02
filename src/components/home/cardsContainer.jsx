import {StatusContainer} from "../../StatusContainer.js";
import {UserCard} from "./userCard.jsx";
import {useEffect, useState} from "react";
import {initAllUsersData} from "../../tools/dataTools.js";
import { Button } from '@arco-design/web-react';
import {IconFilter} from "@arco-design/web-react/icon";
import "./userCard.css";
import {Filter} from "./filter.jsx";
import { useLocation } from 'react-router-dom';


export function CardsContainer() {
    // const [data, setData] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);

    // console.log("CardsContainer render");

    let entries;

    let  allEntries = Object.entries(StatusContainer.currentAllRoomsData);

    let searchEntries = Object.entries(StatusContainer.currentSearchRoomsData);

    function filter() {
        setFilterVisible(!filterVisible);
    }

    const {pathname} = useLocation();
    // console.log(pathname);

    if(pathname ==="/home/search"){
        entries = searchEntries;
    }else if(pathname ==="/home"){
        entries = allEntries;
    }

    return (
        <div className={"cards-filter-con"}>
            <div className={"cards-con"}>
                { entries && entries.reverse().map((entry) => {
                    return <UserCard key={entry[0]} room={entry[1]} roomID={entry[0]}/>
                })}
            </div>
            <div>
                <Button shape='circle' type='primary' icon={<IconFilter />}  className={"filter-icon"} onClick={filter} />
            </div>
            <div>
                {filterVisible && <Filter/>}
            </div>
        </div>

    );
}