import React, { Suspense, lazy } from 'react';
import { RecoilRoot } from 'recoil';
import ToolDataContext from './components/ToolDataProvider';
import ToolTypeProvider from './components/ToolTypeProvider';

import ErrorBoundary from './ErrorBoundary';

const Game = lazy(() => import('./components'));

function App() {
  return (
    <RecoilRoot>
      <ToolTypeProvider>
        <ToolDataContext>
          <ErrorBoundary>
            <Game />
          </ErrorBoundary>
        </ToolDataContext>
      </ToolTypeProvider>
    </RecoilRoot>
  );
}

export default App;
