import { ReactComponent as Right } from "./right.svg";
import {useState} from "react";
import "./landing1.css";
export  default function QuestionCard(props) {
    const {question, answer} = props;

    const [visible, setVisible] = useState(false);

    function toggleVisible() {
        console.log("toggle");
        setVisible(!visible);
    }


    return (
        <div className="question-card">
            <div className="questionCard-top"  onClick={toggleVisible}>
                <div className="question">{question}</div>
                <div className="arrow">
                    {!visible
                        ? <Right/>
                        : <Right className="arrow-rotate"/>
                    }
                </div>
            </div>
            <div>
                {visible
                    ? <div className="answer">{answer}</div>
                    : null
                }
            </div>
        </div>
    )
}