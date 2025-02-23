import { useContext, createContext, useState, type PropsWithChildren } from 'react';

type ActiveNameContextType = {
  id: string;
  name: string;
  isOwner: boolean;
  setContext: (context: Partial<ActiveNameContextType>) => void;
  resetContext: () => void;
};

const ActiveNameContext = createContext<ActiveNameContextType>({
  id: '',
  name: '',
  isOwner: false,
  setContext: () => {},
  resetContext: () => {},
});

export const ActiveNameProvider = ({ children }: PropsWithChildren<{}>) => {
  const [context, setContextState] = useState({
    id: '',
    name: '',
    isOwner: false,
  });

  const setContext = (newContext: Partial<ActiveNameContextType>) => {
    setContextState((prevContext) => ({
      ...prevContext,
      ...newContext,
    }));
  };

  const resetContext = () => {
    setContextState({
      id: '',
      name: '',
      isOwner: false,
    });
  };

  return (
    <ActiveNameContext.Provider value={{ ...context, setContext, resetContext }}>
      {children}
    </ActiveNameContext.Provider>
  );
};

export const useActiveNameContext = () => useContext(ActiveNameContext);

