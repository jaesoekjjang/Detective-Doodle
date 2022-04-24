import React from 'react'
import { useEffect } from 'react'
import Canvas from './Canvas'
import {startGame} from './game/util'

const Game = () => {
  useEffect(()=>{
    startGame()
  },[])
  return (
    <div>
      <Canvas />
    </div>
  )
} 

export default Game