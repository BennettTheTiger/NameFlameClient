import { useContext, createContext, useState, type PropsWithChildren } from 'react';

type ActiveNameContextType = {
  id: string;
  name: string;
  isOwner: boolean;
  likedNames: string[];
  setContext: (context: Partial<ActiveNameContextType>) => void;
  resetContext: () => void;
};

const ActiveNameContext = createContext<ActiveNameContextType>({
  id: '',
  name: '',
  isOwner: false,
  likedNames: [],
  setContext: () => {},
  resetContext: () => {},
});

export const ActiveNameProvider = ({ children }: PropsWithChildren<{}>) => {
  const [context, setContextState] = useState<ActiveNameContextType>({
    id: '',
    name: '',
    likedNames: [],
    isOwner: false,
    setContext: () => {},
    resetContext: () => {},
  });

  const setContext = (newContext: Partial<ActiveNameContextType>) => {
    setContextState((prevContext) => ({
      ...prevContext,
      ...newContext,
    }));
  };

  const resetContext = () => {
    setContextState((prevContext) => ({
      id: '',
      name: '',
      likedNames: [],
      isOwner: false,
      setContext: prevContext.setContext,
      resetContext: prevContext.resetContext,
    }));
  };

  return (
    <ActiveNameContext.Provider value={{ ...context, setContext, resetContext }}>
      {children}
    </ActiveNameContext.Provider>
  );
};

export const useActiveNameContext = () => useContext(ActiveNameContext);

