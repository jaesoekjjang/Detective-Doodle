import React, { Suspense, lazy } from 'react';
import { RecoilRoot } from 'recoil';
import DrawDataProvider from './components/game/DrawDataProvider';
import ToolTypeProvider from './components/game/ToolTypeProvider';

import ErrorBoundary from './ErrorBoundary';

const Game = lazy(() => import('./components/game'));

function App() {
  return (
    <RecoilRoot>
      <ToolTypeProvider>
        <DrawDataProvider>
          <ErrorBoundary>
            <Game />
          </ErrorBoundary>
        </DrawDataProvider>
      </ToolTypeProvider>
    </RecoilRoot>
  );
}

export default App;
