import React from 'react'
import { WIDTH, HEIGHT } from './game/api'
import { clear, setTool, setPencilWidth, setEraserWidth } from './game/api'

const Canvas = () => {
  const changeColor:React.MouseEventHandler<HTMLButtonElement> = (e) =>{
  }

  const clearCanvas = () =>{
    clear();
  }

  return (
    <div className='flex gap-8'>
      <canvas id='canvas' width={WIDTH} height={HEIGHT}></canvas>
      <div className="relative flex flex-col gap-2 w-20 border-black border-2">
        <button className="h-10 border-b-2 border-black" onClick={()=>setTool('eraser')}>지우개</button>
        <button className="h-10 border-b-2 border-black" onClick={()=>setTool('pencil')}>연필</button>
        <button className="bg-black w-full h-10" onClick={changeColor} value='rgb(0, 0, 0)'></button>
        <button className="bg-red-500 w-full h-10" onClick={changeColor} value='rgb(239 68 68)'></button>
        <button className="bg-yellow-500 w-full h-10" onClick={changeColor} value='rgb(234 179 8)'></button>
        <button className="bg-green-500 w-full h-10" onClick={changeColor} value='rgb(34 197 94)'></button>
        <button className="bg-blue-500 w-full h-10" onClick={changeColor} value='rgb(59 130 246)'></button>

        <div className="absolute flex gap-2 flex-col left-24 w-10 ">
          <input className='h-10 border-black border-2' type="text" onChange={(e)=>setEraserWidth(+e.target.value)}/>
          <input className='h-10 border-black border-2' type="text" onChange={(e)=>setPencilWidth(+e.target.value)}/>
        </div>
      </div>
    </div>
  )
}

export default Canvas