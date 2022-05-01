import React from 'react'
import { WIDTH, HEIGHT } from '../../game/api'

const useCavnas = () => {
  

  return (
    <canvas id='canvas' width={WIDTH} height={HEIGHT}></canvas>
  )
}

export default useCavnas