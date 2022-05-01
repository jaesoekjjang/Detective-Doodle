import React,{Suspense, lazy} from 'react'
import './App.css'
import ErrorBoundary from './ErrorBoundary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Lobby = lazy(()=>import('./components/lobby'))
const Game = lazy(()=>import('./components/game'))
const NotFound = lazy(()=>import('./components/not-found'))

function App() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path='/' element={<Lobby/>}></Route>
              <Route path='/game' element={<Game/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
