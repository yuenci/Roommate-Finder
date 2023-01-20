import {Header} from "../components/common/Header/header.jsx";
import "./landing1.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import axios from "axios";
import { ReactComponent as Check } from "./check.svg";
import QuestionCard from "./questionCard.jsx";
import {Button, Message} from "@arco-design/web-react";
import {logEmailSendTimes, validateEmail} from "../tools/dataTools.js";


export default function Landing() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading1, setLoading1] = useState(false);

    function goToHome() {
        navigate("/home");
    }

    function sentMessage() {

        let data ={
            email: email,
            message: message
        }


        if(!logEmailSendTimes()){
            Message.error("Email sent failed");
            return;
        }


        if(!validateEmail(email)){
            Message.error("Invalid email");
            return;
        }

        if(message === ""){
            Message.error("Message cannot be empty");
            return;
        }
        //console.log(email, message);
        setLoading1(true);

        axios.post("https://emailproxy.azurewebsites.net/api/httptrigger1", data).then(
            (res) => {
                if(res.data.status === "200") {
                    setLoading1(false);
                    Message.success("Message sent successfully, \nwe will get back to you soon!");
                }
            }
        )
        //Message.success("Message sent successfully, \nwe will get back to you soon!");
    }

    function blurHandler(e) {
        // console.log("blur");
        if (e.target.value === "") {
            e.target.classList.add("border-error");
        } else {
            e.target.classList.remove("border-error");
        }
    }

    function focusHandler(e) {
        e.target.classList.remove("border-error");
    }

    let questions = ["What is APUFindRoommate?","How Can I Create a Room Listing?",
    "How Do I Find Rooms/ Roommates?", "I Can’t Contact the Poster of the Listing, What Should I Do?"];

    let answers = ["APUFindRoommate is a platform for us APU students to find and connect with potential roommates or accommodations near campus.",
        "You should register as user before creating any room listing.",
        "You can look for available listings of rooms in the “Find Room” button in the home page or by clicking the “APU Roommate Finder” in the navigation bar on top of the page.",
        "You should register as user before contacting the poster of the listing."];


    return (
        <div>
            <Header type="landing"/>
            <div className={"landing__container"}>
                <div className={"lading__hero"}>
                    <div className={"lading__hero__left"}>
                        <div className={"lading__hero__left__title"}>Easily
                            <span className={"lading__hero__left__title--purple"}>Find APU Student Housing</span>
                            with Us.
                        </div>
                        <div className={"lading__hero__left__subtitle"}>Say goodbye to endless search for rooms and
                            roommates
                        </div>
                        <button className={"lading__hero__left__button"} onClick={goToHome}>Find Rooms</button>
                    </div>
                    <div className={"lading__hero__right"}>
                        <img src="/landingPic1.jpg" alt="product image" className="product__img"/>
                    </div>
                </div>
                <div className={"lading__about"}>
                    <div className={"lading__about__left"}>
                        <img src="/landingPic2.jpg" alt="product image" className="product__img"/>
                    </div>
                    <div className={"lading__about__right"}>
                        <div>
                            <div className={"lading__about__left__title"}>Now You Can</div>
                            <div className={"lading__about__right__text"}>
                                <div><Check /></div>
                                <div>Easily find people who wants to rent an apartment with you.</div>
                            </div>
                            <div className={"lading__about__right__text"}>
                                <div><Check /></div>
                                <div>Conveniently find available units for you to rent. dwdasdasdsadasasdasd</div>
                            </div>
                            <div className={"lading__about__right__text"}>
                                <div><Check /></div>
                                <div>Discover people who wants to rent the extra room in your unit.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"lading__question"}>
                    <h1 className={"lading__question__title"}>Frequently Asked Questions</h1>
                    <div className={"lading__question__container"}>
                        <QuestionCard question={questions[0]} answer={answers[0]}/>
                        <QuestionCard question={questions[1]} answer={answers[1]}/>
                        <QuestionCard question={questions[2]} answer={answers[2]}/>
                        <QuestionCard question={questions[3]} answer={answers[3]}/>
                    </div>
                </div>
                <div className="lading__contact">
                    <h1 className={"lading__contact__title"}>Contact Us</h1>
                    <div className={"lading__contact__subtitle"}>Have a Question or Concern? We're Just One Message Away
                    </div>
                    <div className={"lading__contact__form"}>
                        <div>
                            <div>Email</div>
                            <input type={"email"} onInput={(e) => setEmail(e.target.value)}
                                   onBlur={blurHandler}
                                   onFocus={focusHandler}
                            />
                        </div>
                        <div>
                            <div>Message</div>
                            <textarea onInput={e => setMessage(e.target.value)}
                                      onBlur={blurHandler}
                                      onFocus={focusHandler}
                            />
                        </div>
                        <Button type='primary'
                                className={"lading__contact__form__button"}
                                loading={loading1}
                                onClick={sentMessage}
                        >Let Us Know</Button>
                        {/*<button className={"lading__contact__form__button"} onClick={sentMessage}>Let Us Know</button>*/}
                    </div>


                </div>

                <div className="lading__final">
                    <div className={"lading__final__text"}>Join us, as we revolutionize how you find your next
                        accommodations.
                    </div>
                    <button className={"lading__final__button"} onClick={goToHome}>Let’s Start</button>
                </div>
                <div className={"text-center"}>{`© MIZ ${new Date().getFullYear()} Made with ❤️`}</div>
            </div>
        </div>
    )
}