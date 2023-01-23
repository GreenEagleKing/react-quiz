import React from "react";

export default function Welcome(props) {
    return (
        <section className='start--quiz'>
            <h1>Quizzical</h1>
            <p>Challenge yourself with your daily 5 general knowledge questions.</p>
            <button className='btn' onClick={props.startQuiz}>Start Quiz</button>
        </section>
    )
}