import React from "react";

export default function Question(props) {
    const allAnswers = props.allAnswers

    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

   const selectedAnswer = (answer) => {
    if (props.quizData.checked) {
        return;
      }
      props.handleSelectedAnswer(props.id, answer);
   }

    const possibleAnswers = allAnswers.map(item => {
        return (<button 
            id={item.id}
            answer={item}
            className={
                props.quizData.selected === item ? 'selected multiple--choice' : 'multiple--choice'}
            onClick={() => selectedAnswer(item)}
            >
            {decodeHtml(item)}
            </button> )
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
        