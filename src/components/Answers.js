import React from "react";

export default function Answers(props) {

    console.log(props)

    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    return (

            <button 
                className="multiple--choice"
                onClick={props.handleClickChoice}            
            >{decodeHtml(props.answer)}</button>
        
        )
}   
        