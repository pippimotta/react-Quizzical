import React from 'react';
import he from 'he';
export default function Choice(props){

  let buttonStyle = {
    pointerEvents: props.pageChecked ? 'none':'auto',
    opacity: props.pageChecked ?'0.7':'1'
  }


  if  (props.checked && props.isCorrect) {
    buttonStyle ={
      ...buttonStyle,
      backgroundColor: '#94D7A2',
      border: 'none',
      color: '#293264',
      opacity: '1'
    }
  } else if (props.checked && props.heldIncorrect){
    buttonStyle ={
      ...buttonStyle,
      backgroundColor: '#F8BCBC',
      border: 'none',
      color: '#4D5B9E',
    }
  } else {
    buttonStyle ={
      ...buttonStyle,
      backgroundColor: props.isHeld? '#D6DBF5':'transparent',
      border: props.isHeld? 'none': "1px solid #4D5B9E"
    }
  }

  return(

    <button className='choice-button'
                  style={buttonStyle}
                  onClick={()=>props.heldAnswer(props.id, props.questionId)}
    >{props.answer}

    </button>
  )
}
