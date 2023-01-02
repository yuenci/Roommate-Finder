import { ReactComponent as House } from "./house-icon.svg";
import {Link} from "react-router-dom";
export default function GiveAPost() {

    const conCss={
        display: "flex",
        height: "120px",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        margin: "40px auto",
    }



    return(
        <div style={conCss}>
            <House/>
            <div>No Post</div>
            <Link to="/post">Give a post to start your founding</Link>
        </div>
    );
}