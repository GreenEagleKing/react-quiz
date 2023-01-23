import React from 'react';
import Welcome from './Welcome'
import Question from './components/Question'
import { nanoid } from 'nanoid'


function App() {
  const [showWelcome, setShowWelcome] = React.useState(true)
  const [quizData, setQuizData] = React.useState([])
  const [selectedChoice, setSelectedChoice] = React.useState([])

  React.useEffect(() => {
    const getQuizData = async () => {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple')
      const data = await res.json()

      const customQuizData = []

      data.results.forEach((item) => {
        customQuizData.push({
          id: nanoid(),
          allAnswers: [
            ...item.incorrect_answers,
            item.correct_answer,
          ],
          question: item.question,
          correctAnswer: item.correct_answer,
          selected: null,
          checked: false,
        });
        setQuizData(customQuizData);
      });
    };
    getQuizData()
  }, [showWelcome]);

  function startQuiz() {
    setShowWelcome(prevWelcomeState => !prevWelcomeState)
  }

  const handleSelectedAnswer = (id, selectedAnswer) => {
    console.log(id, selectedAnswer)
    setQuizData((quizData) =>
      quizData.map((data) => {
        return data.id === id ? { ...data, selected: selectedAnswer } : data;
      })
    );
    console.log(quizData)
  };

  const questionElements = quizData.map(item => {
    return (
    <Question 
      id= {item.id}
      key= {item.id}
      question = {item.question} 
      allAnswers = {item.allAnswers}
      correctAnswer = {item.correctAnswer}
      quizData = {item}
      handleSelectedAnswer={handleSelectedAnswer}
    />
    )
  })

  return (
    <>
      <img id='top--blob' src='/topblob.png' alt='background graphic blob'></img>

      {showWelcome && <Welcome startQuiz={startQuiz}/>}

      {!showWelcome && questionElements}

      {!showWelcome && <button className="btn">Submit Answers</button>}
      
      <img id='bottom--blob' src='/bottomblob.png' alt='background graphic blob'></img>
    </>
  );
}

export default App;
