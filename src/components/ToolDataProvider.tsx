import React, { createContext } from 'react';
import { useState } from 'react';

interface DrawDataProviderProps {
  children: React.ReactChild;
}

interface Store {
  toolData: { color: string; width: number };
  setToolData: React.Dispatch<
    React.SetStateAction<{
      color: string;
      width: number;
    }>
  >;
}

export const ToolDataContext = createContext<Store>({} as Store);

const DrawDataProvider: React.FC<DrawDataProviderProps> = ({ children }) => {
  const [toolData, setToolData] = useState({ color: '#000000', width: 8 });
  return (
    <ToolDataContext.Provider value={{ toolData, setToolData }}>
      {children}
    </ToolDataContext.Provider>
  );
};

export default DrawDataProvider;
