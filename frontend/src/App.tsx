import React from 'react';
import ToolDataProvider from './components/ToolDataProvider';
import ToolTypeProvider from './components/ToolTypeProvider';
import Main from './components';

function App() {
  return (
    <ToolTypeProvider>
      <ToolDataProvider>
        <Main />
      </ToolDataProvider>
    </ToolTypeProvider>
  );
}

export default App;
