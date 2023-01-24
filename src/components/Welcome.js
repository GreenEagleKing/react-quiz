import React from "react";

// Welcome component to show on arrival at website
export default function Welcome(props) {
    return (
        <section className='start--quiz'>
            <h1>Daily Quiz</h1>
            <h2>Five Question A Day Keeps the Chaser's Away!</h2>
            <button className='btn' onClick={props.startQuiz}>Start Quiz</button>
        </section>
    )
}