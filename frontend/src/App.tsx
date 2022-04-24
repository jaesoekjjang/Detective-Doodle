import React from 'react'
import './App.css'
import Canvas from './Canvas'
import { useState } from 'react'
import {startGame} from './game/api'

function App() {
  const [start, setStart] = useState(false)

  const onClick = () =>{
    setStart(true);
    startGame();
  }

  return (
    <div className="App">
      <button className="absolute top-0 border-2 border-black" onClick={onClick}>
        {start ? '떠나기' : '참여하기'}
      </button>
      <Canvas />
    </div>
  )
}

export default App
