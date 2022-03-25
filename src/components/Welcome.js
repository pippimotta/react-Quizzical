import React from 'react';

export default function Welcome(props){
  return(

      <div className='title'>
        <h2>Quizzical</h2>
        <p>Welcome to Quizzical Trivia!<br/>Wanna be the most clever guy in the world?</p>
        <button className='title-button' onClick={()=>props.start(true)}>Start quiz</button>
      </div>


  )
}
