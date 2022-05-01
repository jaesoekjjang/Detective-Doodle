import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Palette from './Palette'
import Tools from './Tools'
import { WIDTH, HEIGHT, startGame, endGame } from '../../game/api'

const Game = () => {

  useEffect(()=>{
    startGame();
  }, [])

  return (
    <div className='flex gap-8'>
      <Link className="absolute top-0" to='/' onClick={()=>endGame()}>나가기</Link>
      <Palette />
      <canvas id='canvas' width={WIDTH} height={HEIGHT}></canvas>
      <Tools />
    </div>
  )
}

export default Game