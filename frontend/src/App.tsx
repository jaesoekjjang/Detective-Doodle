import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from './ErrorBoundary';

const Game = lazy(() => import('./components/game'));

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
