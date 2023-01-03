import {Header} from "../common/Header/header.jsx";
import {CardsContainer} from "./cardsContainer.jsx";
import {initAllRoomsData} from "../../tools/dataTools.js";
import {useEffect, useState} from "react";

export function Home(){
    console.log("home.jsx")

    return(
        <div >
            <Header/>
            <CardsContainer/>
        </div>
    )

}