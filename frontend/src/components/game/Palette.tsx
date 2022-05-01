import React from 'react'
import { clear} from '../../game/api'

const Palette = () => {
  const changeColor:React.MouseEventHandler<HTMLButtonElement> = (e) =>{
  }

  const clearCanvas = () =>{
    clear();
  }

  return (
    <div className="relative flex flex-col gap-2 w-20 border-black border-2">
      <button className="bg-black w-full h-10" onClick={changeColor} value='rgb(0, 0, 0)'></button>
      <button className="bg-red-500 w-full h-10" onClick={changeColor} value='rgb(239 68 68)'></button>
      <button className="bg-yellow-500 w-full h-10" onClick={changeColor} value='rgb(234 179 8)'></button>
      <button className="bg-green-500 w-full h-10" onClick={changeColor} value='rgb(34 197 94)'></button>
      <button className="bg-blue-500 w-full h-10" onClick={changeColor} value='rgb(59 130 246)'></button>
    </div>
  )
}

export default Palette;