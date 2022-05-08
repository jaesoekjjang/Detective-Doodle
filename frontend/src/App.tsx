import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import BaseLayout from './components/BaseLayout';

const Lobby = lazy(() => import('./components/lobby'));
const Single = lazy(() => import('./components/single'));
const NotFound = lazy(() => import('./components/not-found'));

function App() {
  return (
    <RecoilRoot>
      <BaseLayout>
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
      </BaseLayout>
    </RecoilRoot>
  );
}

export default App;
