import React from "react";

// Question component contains the question, possible answers and line design
export default function Question(props) {
    const allAnswers = props.allAnswers

    // Used to decode the HTML code from the API
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    // If the answer is clicked, the question ID and value is passed to handleSelectedAnswer on to App.js
   function selectedAnswer(answer) {
    if (props.quizData.checked) {
        return;
      }
      props.handleSelectedAnswer(props.id, answer);
   }

   //Mapping each answer into a button element
    const possibleAnswers = allAnswers.map(item => {

        // These conditionals set what styling is applied to the button
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