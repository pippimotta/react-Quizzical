import React from 'react';
import Welcome from './Welcome';
import QuizBoard from './QuizBoard';
function App() {

  const[showQuiz, setShowQuiz]= React.useState(false)


  return(
    <main>
    {showQuiz ? (<QuizBoard />): (<Welcome start={setShowQuiz}/>)}
    </main>
  )
    }

export default App;
