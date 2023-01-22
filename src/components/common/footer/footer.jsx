import "./footer.css"
import {Link} from "react-router-dom";

export default function Footer() {


    return (
        <div className={"footer"}>
            <div className={"footer-col0"}>
                <div className={"footer-logo-container"}>
                    <img src="/logo.png" alt="logo" className={"footer-logo"}/>
                    <div>APU Roommate Finder</div>
                </div>
                <div className={"foot-slogan"}>Say goodbye to endless search for rooms and roommates</div>
                <div className={"footer-made-by"}>{`© MIZ ${new Date().getFullYear()} Made with ❤️`}</div>
                <Link to={"/Terms-and-Privacy"}>Term & Privacy</Link>
            </div>
            <div className={"footer-col2"}>
                <div className={"footer-headers"}>Product</div>
                <Link to={"/"}>Update</Link>
                <Link to={"/about"}>About</Link>
            </div>
            <div className={"footer-col2"}>
                <div className={"footer-headers"}>Support</div>
                <Link to={"/"}>Tutorial</Link>
                <Link to={"/"}>FAQs</Link>

                <a href={"https://github.com/yuenci/APU-Roommate-finder/issues"} target="_blank">Contact</a>
            </div>
            <div className={"footer-col3"}>
                <div className={"footer-headers"}>Social</div>
                <a href={"https://www.instagram.com/apufindroommate/"} target="_blank">Instagram</a>
            </div>
        </div>
    )
}