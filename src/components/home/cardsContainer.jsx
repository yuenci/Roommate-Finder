import {StatusContainer} from "../../StatusContainer.js";
import {UserCard} from "./userCard.jsx";
import {useEffect, useState} from "react";
import {initAllRoomsData} from "../../tools/dataTools.js";
import { Button } from '@arco-design/web-react';
import {IconFilter} from "@arco-design/web-react/icon";
import "./userCard.css";
import {Filter} from "./filter.jsx";
import { useLocation } from 'react-router-dom';
import {Analysis} from "../../firebase/analysis.js";


export function CardsContainer() {
    const [filterVisible, setFilterVisible] = useState(false);

    let entries;

    const [allEntries1, setAllEntries1] = useState(Object.entries(StatusContainer.currentAllRoomsData));

    useEffect(() => {
       if(Object.keys(StatusContainer.currentAllRoomsData).length === 0){
           initAllRoomsData().then((data) => {
               StatusContainer.currentAllRoomsData = data;
               setAllEntries1(Object.entries(data));
           });
       }

    }, []);

    let searchEntries = Object.entries(StatusContainer.currentSearchRoomsData);

    function filter() {
        if(!filterVisible){
            new Analysis().logEvent("filter_show");
        }
        setFilterVisible(!filterVisible);
    }
    const {pathname} = useLocation();


    if(pathname ==="/home/search"){
        entries = searchEntries;
    }else if(pathname ==="/home" || pathname ==="/"){
        entries = allEntries1;
    }
    //console.log(entries);
    return (
        <div className={"cards-filter-con"}>
            <div className={"cards-con"}>
                { entries && entries.slice().reverse().map((entry) => {
                    return <UserCard key={entry[0]} room={entry[1]} roomID={entry[0]}/>
                })}
            </div>
            <div className={"filter-icon-con"}>
                <Button shape='circle' type='primary' icon={<IconFilter />}  className={"filter-icon"} onClick={filter}  />
            </div>
            <div className={"filter-con"}>
                {filterVisible && <Filter/>}
            </div>
        </div>

    );
}