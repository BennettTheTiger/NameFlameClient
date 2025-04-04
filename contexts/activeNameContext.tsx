import { useContext, createContext, useState, type PropsWithChildren } from 'react';

type Participant = {
  email: string;
  name: string; // may be empty if not set
  id: string;
}

type ActiveNameContextType = {
  id: string;
  name: string;
  owner: string;
  likedNames: string[];
  participants: Participant[];
  matches: string[];
  setContext: (context: Partial<ActiveNameContextType>) => void;
  resetContext: () => void;
};

const ActiveNameContext = createContext<ActiveNameContextType>({
  id: '',
  name: '',
  owner: '',
  likedNames: [],
  matches: [],
  participants: [],
  setContext: () => {},
  resetContext: () => {},
});

export const ActiveNameProvider = ({ children }: PropsWithChildren<{}>) => {
  const [context, setContextState] = useState<ActiveNameContextType>({
    id: '',
    name: '',
    likedNames: [],
    participants: [],
    matches: [],
    owner: '',
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
      participants: [],
      matches: [],
      owner: '',
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
