import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ErrorBoundary from './ErrorBoundary';
import BaseLayout from './components/BaseLayout';
import SocketProvider from './components/SocketProvider';
import AuthRoute from './components/AuthRoute';

const Login = lazy(() => import('./components/login'));
const Lobby = lazy(() => import('./components/lobby'));
const Single = lazy(() => import('./components/single'));
const NotFound = lazy(() => import('./components/not-found'));

function App() {
  return (
    <SocketProvider>
      <RecoilRoot>
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
                    path="/single"
                    element={
                      <AuthRoute>
                        <Single />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
              </Suspense>
            </Router>
          </ErrorBoundary>
        </BaseLayout>
      </RecoilRoot>
    </SocketProvider>
  );
}

export default App;
