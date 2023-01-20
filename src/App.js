import React from 'react';
import Welcome from './Welcome'
import Question from './Question'

function App() {
  const [showWelcome, setShowWelcome] = React.useState(true)

  React.useEffect( () => {
    fetch("https://opentdb.com/api.php?amount=5&category=9")
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  function startQuiz() {
    setShowWelcome(prevWelcomeState => !prevWelcomeState)
  }

  return (
    <>
      <img id='top--blob' src='/topblob.png' alt='background graphic blob'></img>

      {showWelcome && <Welcome startQuiz={startQuiz}/>}
      
      <img id='bottom--blob' src='/bottomblob.png' alt='background graphic blob'></img>
    </>
  );
}

export default App;
