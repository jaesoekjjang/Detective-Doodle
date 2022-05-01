import React, { useEffect, lazy } from 'react'
import { Link } from 'react-router-dom'
import Palette from './Palette'
import { WIDTH, HEIGHT, startGame } from '../../game/api'

const Game = () => {
  useEffect(()=>{
    startGame();
  }, [])


  return (
    <div className='flex gap-8'>
      <Link to='/'>나가기</Link>
      <canvas id='canvas' width={WIDTH} height={HEIGHT}></canvas>
      <Palette />
    </div>
  )
}

export default Game