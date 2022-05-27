import React, { createContext } from 'react';
import { useState } from 'react';

interface DrawDataProviderProps {
  children: React.ReactChild;
}

interface Store {
  drawData: { color: string; width: number };
  setDrawData: React.Dispatch<
    React.SetStateAction<{
      color: string;
      width: number;
    }>
  >;
}

export const DrawDataContext = createContext<Store>({} as Store);

const DrawDataProvider: React.FC<DrawDataProviderProps> = ({ children }) => {
  const [drawData, setDrawData] = useState({ color: '#000000', width: 8 });
  return (
    <DrawDataContext.Provider value={{ drawData, setDrawData }}>
      {children}
    </DrawDataContext.Provider>
  );
};

export default DrawDataProvider;
