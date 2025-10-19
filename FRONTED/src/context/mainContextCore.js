import { createContext, useContext } from 'react';

export const mainContext = createContext();
export const useMainContext = () => useContext(mainContext);
