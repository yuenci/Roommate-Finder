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
    const [filterVisible, setFilterVisible] = useState(true);

    let entries;

    const [allEntries1, setAllEntries1] = useState(Object.entries(StatusContainer.currentAllRoomsData));

    useEffect(() => {
       if(Object.keys(StatusContainer.currentAllRoomsData).length === 0){
           initAllUsersData().then((data) => {
               StatusContainer.currentAllRoomsData = data;
               setAllEntries1(Object.entries(data));
           });
       }

    }, []);

    let searchEntries = Object.entries(StatusContainer.currentSearchRoomsData);

    function filter() {
        setFilterVisible(!filterVisible);
    }
    const {pathname} = useLocation();


    if(pathname ==="/home/search"){
        entries = searchEntries;
    }else if(pathname ==="/home" || pathname ==="/"){
        entries = allEntries1;
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