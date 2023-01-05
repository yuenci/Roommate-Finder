import {Login} from "../login/login.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {SignUp} from "../signUp/signUp.jsx";
import {Home} from "../home/home";
import {VersionInfoFooter} from "../common/versionInfoFooter.jsx";
import "@arco-design/web-react/dist/css/arco.css";

import "./App.css";
import {Room} from "../room/room.jsx";
import {Analysis} from "../../firebase/analysis.js";
import {initAllRoomsData, initFirebase} from "../../tools/dataTools.js";
import {Post} from "../post/post";
import {Profile} from "../profile/profile";
import {About} from "../about/about";


function App() {
    initFirebase();
    // get the data from firebase

    new Analysis().logEvent("app_start");

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signUp" element={<SignUp/>} />
                <Route path="/home/search" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/room" element={<Room/>} />
                <Route path="/room/:roomID" element={<Room/>} />
                <Route path="/post" element={<Post/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/modify/:roomID" element={<Post/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
            {/*<VersionInfoFooter/>*/}
        </Router>
    )
}

export default App
