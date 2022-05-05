import React, { Suspense, lazy } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const Lobby = lazy(() => import('./components/lobby'));
const Single = lazy(() => import('./components/single'));
const NotFound = lazy(() => import('./components/not-found'));

function App() {
  return (
    <RecoilRoot>
      <div className="flex justify-center items-center h-screen">
        <ErrorBoundary>
          <Router>
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path="/" element={<Lobby />}></Route>
                <Route path="/single" element={<Single />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
}

export default App;
