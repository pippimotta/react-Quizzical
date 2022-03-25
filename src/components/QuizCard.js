import React from 'react';
import Choice from './Choice';
import he from 'he';
export default function QuizCard(props){

  const answerElements = props.answers.map(answer =>{
    return (
      <Choice
      key={answer.key}
      id={answer.id}
      answer={answer.answer}
      isHeld ={answer.isHeld}
      questionId={props.id}
      heldCorrect={answer.heldCorrect}
      heldIncorrect={answer.heldIncorrect}
      checked={answer.checked}
      heldAnswer={props.heldAnswer}
      isCorrect={answer.isCorrect}
      pageChecked={props.pageChecked}
    />
    )

  })



  return (
    <div className='quiz-card'>
      <h2 className='question'>{props.question}</h2>
        <div className='choice-container'>
          {answerElements}
        </div>
    </div>
  )
}
