import React from 'react'
import { WIDTH, HEIGHT } from './game/util'

const Canvas = () => {
  const changeColor = () =>{}

  const clearAll = () =>{}

  return (
    <div className='flex gap-8'>
      <canvas id='canvas' width={WIDTH} height={HEIGHT}></canvas>
      <div className="flex flex-col gap-2 w-20 border-black border-2 ">
        <button onClick={clearAll}>지우개</button>
        <button className="bg-red-500" onClick={changeColor}>빨강</button>
        <button className="bg-yellow-500" onClick={changeColor}>노랑</button>
        <button className="bg-green-500 " onClick={changeColor}>초록</button>
        <button className="bg-blue-500" onClick={changeColor}>파랑</button>
      </div>
    </div>
  )
}

export default Canvas