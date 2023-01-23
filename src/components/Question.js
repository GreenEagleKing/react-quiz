import React from "react";
import Answers from "./Answers";

export default function Question(props) {

    console.log(props)

    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

   

    const possibleAnswers = props.allAnswers.map(item => {
        console.log(item)
        return (<Answers 
            answer={item}
            handleClickChoice={props.handleClickChoice}
        />)
    })

    return (
        <>
            <div className="question--container">
                <h2 className="question">{decodeHtml(props.question)}</h2>
                <div className="answer--container">
                {possibleAnswers}
                </div> 
            </div>
        </>
        )
}   
        