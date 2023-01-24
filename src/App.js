import React from 'react';
import Welcome from './components/Welcome'
import Question from './components/Question'
import { nanoid } from 'nanoid'


function App() {

  // All the useState variables
  const [showWelcome, setShowWelcome] = React.useState(true)
  const [showCount, setShowCount] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [count, setCount] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  const [playQuiz, setPlayQuiz] = React.useState(false)

  // If the showWelcome state is false a new API call is made and populates quizdata state
  React.useEffect(() => {
    if(!showWelcome) {
    const getQuizData = async () => {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple')
      const data = await res.json()

      const customQuizData = []

      const randomizeAnswers = (arr) => arr.sort(() => Math.random() - 0.5);

      data.results.forEach((item) => {
        customQuizData.push({
          id: nanoid(),
          allAnswers: randomizeAnswers([
            ...item.incorrect_answers,
            item.correct_answer,
          ]),
          question: item.question,
          correctAnswer: item.correct_answer,
          selected: null,
          checked: false,
        });
        setQuizData(customQuizData);
      });
    };
    getQuizData()
    }
  }, [showWelcome]);

  // Run when the start quiz button is clicked
  function startQuiz() {
    setShowWelcome(prevWelcomeState => !prevWelcomeState)
    setPlayQuiz(prevPlayQuiz => !prevPlayQuiz)
  }
  
  // Updates quizData with which answer has been selected
  const handleSelectedAnswer = (id, selectedAnswer) => {
    setQuizData((quizData) =>
      quizData.map((data) => {
        return data.id === id ? { ...data, selected: selectedAnswer } : data;
      })
    );
  };

  // When check answer button is clicked the score is added up and quizData checked is updated to true
  function handleCheckAnswers() {
    let currentScore = 0
    quizData.forEach(item => {
      if(item.selected === item.correctAnswer) {
        currentScore += 1
      }
    })
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return {...data, checked: !data.checked}
      })
    )
    setCount(currentScore)
    setShowCount(true)
    setChecked(true)
  }

  // When answers have been checked the button changes to play again option
  function playAgain() {
    setChecked(false)
    startQuiz()
  }

  const questionElements = quizData.map(item => {
    return (
    <Question 
      id= {item.id}
      key= {item.id}
      question = {item.question} 
      allAnswers = {item.allAnswers}
      correctAnswer = {item.correctAnswer}
      quizData = {item}
      checked = {item.checked}
      handleSelectedAnswer={handleSelectedAnswer}
    />
    )
  })

  return (
    <>
      {playQuiz ? (
        <div className='quiz--container'>
          {questionElements}
          <div className='submit--answer--container'>
            <button className="btn" onClick={!checked ? handleCheckAnswers : playAgain }>{!checked ? 'Submit Answers' : 'Play Again'}</button>
            {checked && <h3>You scored {count}/5</h3>}
          </div>
        </div>
      ) : (
        <Welcome startQuiz={startQuiz}/>
      )}

      <img id='top--blob' src='/topblob.png' alt='background graphic blob'></img>
      <img id='bottom--blob' src='/bottomblob.png' alt='background graphic blob'></img>
    </>
  );
}

export default App;
