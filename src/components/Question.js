import React from "react";

export default function Question(props) {
    const allAnswers = props.allAnswers

    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

   function selectedAnswer(answer) {
    if (props.quizData.checked) {
        return;
      }
      props.handleSelectedAnswer(props.id, answer);
   }

    const possibleAnswers = allAnswers.map(item => {
        let selectedClass = ''
        if(props.checked && item === props.quizData.selected) {
            selectedClass = props.quizData.selected === props.quizData.correctAnswer ? 'multiple--choice correct--selected' : 'multiple--choice incorrect--selected'
        } else if (props.checked && item === props.quizData.correctAnswer) {   
            selectedClass = 'multiple--choice correct--selected'
        } else {
            selectedClass = props.quizData.selected === item ? 'multiple--choice selected' : 'multiple--choice'
        } 
        
        return (
        <button 
            id={item.id}
            answer={item}
            selected={item.selected}
            checked={item.checked}
            className={selectedClass}
            onClick={() => selectedAnswer(item)}
            >
            {decodeHtml(item)}
        </button> 
        )
    })

    return (
        <>
            <div className="question--container">
                <h2 className="question">{decodeHtml(props.question)}</h2>
                <div className="answer--container">
                {possibleAnswers}
                </div> 
                <div className="line"></div>
            </div>
        </>
        )
}   
        

// className={
//     props.quizData.selected === item ? 'selected multiple--choice' : 'multiple--choice'}