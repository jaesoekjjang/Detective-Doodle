import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { Tools } from '../../game/models/Tools';

interface ToolTypeProviderProps {
  children: React.ReactChild;
}

interface Store {
  toolType: Tools;
  setToolType: React.Dispatch<React.SetStateAction<Tools>>;
}

export const ToolTypeContext = createContext<Store>({} as Store);

const ToolTypeProvider: React.FC<ToolTypeProviderProps> = ({ children }) => {
  const [toolType, setToolType] = useState<Tools>('pencil');
  return (
    <ToolTypeContext.Provider value={{ toolType, setToolType }}>
      {children}
    </ToolTypeContext.Provider>
  );
};

export default ToolTypeProvider;
