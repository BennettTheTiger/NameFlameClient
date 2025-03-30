import { useContext, createContext, useState, type PropsWithChildren } from 'react';

export type Invite = {
  id: string;
  expiresAt: string;
  email: string;
};

type InviteContextType = {
  invites: Invite[];
  nameContextId: string;
  setInviteContext: (context: Partial<InviteContextType>) => void;
  resetInviteContext: () => void;
};

const InviteContext = createContext<InviteContextType>({
    invites: [],
    nameContextId: '',
    setInviteContext: ()    => {},
    resetInviteContext: () => {},
});

export const InviteContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [context, setContextState] = useState<InviteContextType>({
    invites: [],
    nameContextId: '',
    setInviteContext: () => {},
    resetInviteContext: () => {},
  });

  const setInviteContext = (newContext: Partial<InviteContextType>) => {
    setContextState((prevContext: InviteContextType) => ({
      ...prevContext,
      ...newContext,
    }));
  };

  const resetInviteContext = () => {
    setContextState(() => ({
        invites: [],
        nameContextId: '',
        setInviteContext: () => {},
        resetInviteContext: () => {},
    }));
  };

  return (
    <InviteContext.Provider value={{ ...context, setInviteContext, resetInviteContext }}>
      {children}
    </InviteContext.Provider>
  );
};

export const useInviteContext = () => useContext(InviteContext);
