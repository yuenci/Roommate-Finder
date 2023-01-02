import {Header} from "../common/Header/header.jsx";
import {CardsContainer} from "./cardsContainer.jsx";
import {initAllUsersData} from "../../tools/dataTools.js";
import {useEffect, useState} from "react";

export function Home(){

    return(
        <div >
            <Header/>
            <CardsContainer/>
        </div>
    )

}