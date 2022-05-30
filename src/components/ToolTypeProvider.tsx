import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { ToolTypes } from '../drawing/models/TooTypes';

interface ToolTypeProviderProps {
  children: React.ReactChild;
}

interface Store {
  toolType: ToolTypes;
  setToolType: React.Dispatch<React.SetStateAction<ToolTypes>>;
}

export const ToolTypeContext = createContext<Store>({} as Store);

const ToolTypeProvider: React.FC<ToolTypeProviderProps> = ({ children }) => {
  const [toolType, setToolType] = useState<ToolTypes>('pencil');
  return (
    <ToolTypeContext.Provider value={{ toolType, setToolType }}>
      {children}
    </ToolTypeContext.Provider>
  );
};

export default ToolTypeProvider;
