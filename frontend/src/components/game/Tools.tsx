import React from 'react'
import { setTool, setPencilWidth, setEraserWidth } from '../../game/api'

const Tools = () => {
  return (
    <div>
      <button className="h-10 w-20 border-2 border-black" onClick={()=>setTool('eraser')}>지우개</button>
      <button className="h-10 w-20 border-2 border-black" onClick={()=>setTool('pencil')}>연필</button>
    </div>
  )
}

export default Tools