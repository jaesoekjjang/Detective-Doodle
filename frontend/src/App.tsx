import React,{Suspense, lazy} from 'react'
import './App.css'
import { useState } from 'react'
import {startGame} from './game/api'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Lobby = lazy(()=>import('./components/lobby'))
const Game = lazy(()=>import('./components/game'))

function App() {
  const [start, setStart] = useState(false)

  const onClick = () =>{
    setStart(true);
    startGame();
  }

  return (
    <div className='flex justify-center items-center h-screen'>
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path='/' element={<Lobby/>}></Route>
          <Route path='/game' element={<Game/>}></Route>
        </Routes>
      </Suspense>
    </Router>
    </div>
  )
}

export default App
