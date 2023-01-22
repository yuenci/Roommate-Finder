import {Login} from "../login/login.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {SignUp} from "../signUp/signUp.jsx";
import {Home} from "../home/home";
import "@arco-design/web-react/dist/css/arco.css";

import "./App.css";
import {Room} from "../room/room.jsx";
import {Analysis} from "../../firebase/analysis.js";
import {initFirebase} from "../../tools/dataTools.js";
import {Post} from "../post/post";
import {Profile} from "../profile/profile";
import {About} from "../about/about";
import Landing from "../landing/landing.jsx";
import Privacy from "../TermsAndPrivacy/privacy.jsx";
import Error404 from "../404/404.jsx";


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
                <Route path="/modify" element={<Post/>} />
                <Route path="/Terms-and-Privacy" element={<Privacy />} />
                <Route path="/error-404" element={<Error404 />} />
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            {/*<VersionInfoFooter/>*/}
        </Router>
    )
}

export default App
