import {Header} from "../common/Header/header.jsx";
import {CardsContainer} from "./cardsContainer.jsx";

export function Home(){
    //console.log("home.jsx");
    //console.log(new FBAuth().auth.currentUser);

    return(
        <div >
            <Header/>
            <CardsContainer/>
        </div>
    )

}