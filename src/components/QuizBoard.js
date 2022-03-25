import React from 'react';
import QuizCard from './QuizCard'
import {nanoid} from 'nanoid';
import he from 'he';


export default function QuizBoard(){
  const [quizs, setQuizData] = React.useState([]);
  const [score, setScore] = React.useState(0)
  const [checked,setChecked] = React.useState(false)
  const [game, setGame] = React.useState(false)
  //function of shuffle Array
    function shuffleArr(arr){
      for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
      }
    return arr
    }

  React.useEffect(() =>{
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(res =>res.json())
      .then(data =>{
        setQuizData(getFormQuestions(data.results))
      })
  },[game])


  function getFormQuestions(list){
    const formQuestions =  list.map(que  =>{
      return({
        id: nanoid(),
        content: he.decode(que.question),
        correctAnswer: he.decode(que.correct_answer),
        answers: formAnswers(shuffleArr([...que.incorrect_answers, que.correct_answer].map(x=>he.decode(x))), que.correct_answer)
      })
    })
    return formQuestions
  }
// Use a new function to set individual option objects at main app
  function formAnswers(answerList,correctAnswer){
    return answerList.map(ans =>{
      return({
        isHeld: false,
        answer: ans,
        isCorrect : ans === correctAnswer ? true :false,
        id:nanoid(),
        heldCorrect:false,
        isIncorrect:false,
        checked:false
      })
    })
  }

  function handleHeld(optId,queId){
    setQuizData(prevState => prevState.map(question =>{
      if (question.id === queId) {
        const ansList = question.answers.map(option =>{
          if (option.id === optId || option.isHeld) {
            return({
              ... option,
              isHeld: !option.isHeld
            })
          } else {
            return option
          }
        })
        return({
          ...question,
          answers: ansList
        })
      } else {
        return question
      }
    }))
  }

  function checkAnswer(){
    setQuizData(prevQuestions => prevQuestions.map(question => {
         const checkedAnswers = question.answers.map(answer => {
             if(answer.isHeld && !answer.isCorrect) {
                 return ({
                     ...answer,
                     heldIncorrect: true,
                     checked: true
                 })
             } else if(answer.isHeld && answer.isCorrect) {
                 setScore(prevScore => prevScore + 1)
                 return({
                     ...answer,
                     heldCorrect: true,
                     checked: true
                 })
             } else {
                 return({
                     ...answer,
                     checked: true
                 })
             }
         })
         return ({
             ...question,
             answers: checkedAnswers
         })
     }))
     setChecked(true)
}

  function newGame(){
    setScore(0)
    setChecked(false)
    setGame(prev=> !prev)
  }

  const quizElements = quizs.map(quiz =>{
    return(
      <QuizCard
        id ={quiz.id}
        key ={quiz.id}
        question={quiz.content}
        answers={quiz.answers}
        heldAnswer={handleHeld}
        pageChecked={checked}

        />
    )
  })

  return(
    <div className='quiz-board'>
    {quizElements}

    {checked ?
        <div className='result'>
          <h3 className='result-tile'>You scored {score}/5 correct answers.</h3>
          <button className='quiz-button' onClick={newGame}>
              Play Again
        </button>
        </div>
         :

        <button className='quiz-button' onClick={checkAnswer}>
            Check Answer
      </button>
    }


   </div>
  )
}
