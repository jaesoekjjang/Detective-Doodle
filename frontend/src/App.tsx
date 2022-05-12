import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from './ErrorBoundary';
import BaseLayout from './components/BaseLayout';
import SocketProvider from './components/SocketProvider';
import AuthRoute from './components/AuthRoute';

const Login = lazy(() => import('./components/login'));
const Lobby = lazy(() => import('./components/lobby'));
const Room = lazy(() => import('./components/room'));
const Game = lazy(() => import('./components/game'));
const NotFound = lazy(() => import('./components/not-found'));

function App() {
  return (
    <RecoilRoot>
      <SocketProvider>
        <BaseLayout>
          <ErrorBoundary>
            <Router>
              <Suspense fallback={<div>loading...</div>}>
                <Routes>
                  <Route path="/login" element={<Login />}></Route>
                  <Route
                    path="/"
                    element={
                      <AuthRoute>
                        <Lobby />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route
                    path="/lobby"
                    element={
                      <AuthRoute>
                        <Lobby />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route
                    path="/room/:id"
                    element={
                      <AuthRoute>
                        <Room />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route
                    path="/single"
                    element={
                      <AuthRoute>
                        <Game />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
              </Suspense>
            </Router>
          </ErrorBoundary>
        </BaseLayout>
      </SocketProvider>
    </RecoilRoot>
  );
}

export default App;
