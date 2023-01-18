import {Header} from "../components/common/Header/header.jsx";
import "./landing.css";
import {useNavigate} from "react-router-dom";


export default function Landing() {
    const navigate = useNavigate();
    function goToHome() {
        navigate("/home");
    }

    return (
        <div className={"landing__container"}>
            <Header type="landing"/>
            <h1 className={"lading__hero"}>
                <div className={"lading__hero__left"}>
                    <div className={"lading__hero__left__title"}>Easily Find APU Student Housing with Us.</div>
                    <div className={"lading__hero__left__subtitle"}>Say goodbye to endless search for rooms and roommates</div>
                    <button className={"lading__hero__left__button"} onClick={goToHome} >Find Rooms</button>
                </div>
                <img src="https://picsum.photos/500/600" alt="product image" className="product__img"/>
            </h1>
            <h1 className={"lading__about"}>
                <img src="https://picsum.photos/500/600" alt="product image" className="product__img"/>
                <div className={"lading__about__right"}>
                    <div className={"lading__about__left__title"}>Now You Can</div>
                    <div className={"lading__about__right__text"}>Easily find people who wants to rent an apartment with you.</div>
                    <div className={"lading__about__right__text"}>Conveniently find available units for you to rent.</div>
                    <div className={"lading__about__right__text"}>Conveniently find available units for you to rent.</div>
                </div>
            </h1>
            <div className={"lading__question"}>
                <h1 className={"lading__question__title"}>Frequently Asked Questions</h1>
                <div className={"lading__question__container"}>
                    <div className={"lading__question__container__item"}>
                        <div className={"lading__question__container__item__title"}>How to find a room?</div>
                        <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.</div>
                    </div>
                    <div className={"lading__question__container__item"}>
                        <div className={"lading__question__container__item__title"}>How to find a roommate?</div>
                        <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.</div>
                    </div>
                    <div className={"lading__question__container__item"}>
                        <div className={"lading__question__container__item__title"}>How to post a room?</div>
                        <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.</div>
                    </div>
                    <div className={"lading__question__container__item"}>
                        <div className={"lading__question__container__item__title"}>How to post a roommate?</div>
                        <div className={"lading__question__container__item__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquet nisl, nec aliquam nisl nisl sit amet lorem.</div>
                    </div>
                </div>
            </div>
            <div className="lading__contact">
                <h1 className={"lading__contact__title"}>Contact Us</h1>
                <div className={"lading__contact__subtitle"}>Have a Question or Concern? We’re Just One Message Away</div>
                <div>
                    <div>Email</div>
                    <input type={"email"} style={{border:" 1px solid black" } }/>
                </div>
                <div>
                    <div >Message</div>
                    <textarea style={{border:" 1px solid black" } } />
                </div>


            </div>

            <div className="lading__final">
                <div className={"lading__final__text"}>Join us, as we revolutionize how you find your next accommodations.</div>
                <button className={"lading__final__button"}>Let’s Start</button>
            </div>
        </div>
    )
}