import {Header} from "../components/common/Header/header.jsx";
import "./landing1.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Message} from "@arco-design/web-react";


export default function Landing() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function goToHome() {
        navigate("/home");
    }

    function sentMessage() {
        console.log(email, message);
        Message.success("Message sent successfully, \nwe will get back to you soon!");
    }


    return (
        <div>
            <Header type="landing"/>
            <div className={"landing__container"}>
                <div className={"lading__hero"}>
                    <div className={"lading__hero__left"}>
                        <div className={"lading__hero__left__title"}>Easily Find APU Student Housing with Us.</div>
                        <div className={"lading__hero__left__subtitle"}>Say goodbye to endless search for rooms and
                            roommates
                        </div>
                        <button className={"lading__hero__left__button"} onClick={goToHome}>Find Rooms</button>
                    </div>
                    <div className={"lading__hero__right"}>
                        <img src="https://picsum.photos/500/600" alt="product image" className="product__img"/>
                    </div>
                </div>
                <div className={"lading__about"}>
                    <div className={"lading__about__left"}>
                        <img src="https://picsum.photos/500/600" alt="product image" className="product__img"/>
                    </div>
                    <div className={"lading__about__right"}>
                        <div>
                            <div className={"lading__about__left__title"}>Now You Can</div>
                            <div className={"lading__about__right__text"}>Easily find people who wants to rent an apartment
                                with
                                you.
                            </div>
                            <div className={"lading__about__right__text"}>Conveniently find available units for you to rent.
                            </div>
                            <div className={"lading__about__right__text"}>Conveniently find available units for you to rent.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"lading__question"}>
                    <h1 className={"lading__question__title"}>Frequently Asked Questions</h1>
                    <div className={"lading__question__container"}>
                        <div className={"lading__question__container__item"}>
                            <div className={"lading__question__container__item__title"}>How to find a room?</div>
                            <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet
                                nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia,
                                nisl
                                nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.
                            </div>
                        </div>
                        <div className={"lading__question__container__item"}>
                            <div className={"lading__question__container__item__title"}>How to find a roommate?</div>
                            <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet
                                nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia,
                                nisl
                                nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.
                            </div>
                        </div>
                        <div className={"lading__question__container__item"}>
                            <div className={"lading__question__container__item__title"}>How to post a room?</div>
                            <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet
                                nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia,
                                nisl
                                nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.
                            </div>
                        </div>
                        <div className={"lading__question__container__item"}>
                            <div className={"lading__question__container__item__title"}>How to post a roommate?</div>
                            <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet
                                nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia,
                                nisl
                                nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lading__contact">
                    <h1 className={"lading__contact__title"}>Contact Us</h1>
                    <div className={"lading__contact__subtitle"}>Have a Question or Concern? We're Just One Message Away
                    </div>
                    <div className={"lading__contact__form"}>
                        <div>
                            <div>Email</div>
                            <input type={"email"} style={{border: " 1px solid black"}} onInput={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <div>Message</div>
                            <textarea style={{border: " 1px solid black"}} onInput={e=>setMessage(e.target.value)}/>
                        </div>
                        <button className={"lading__contact__form__button"} onClick={sentMessage}>Let Us Know</button>
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