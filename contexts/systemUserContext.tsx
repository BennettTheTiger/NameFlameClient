import { useContext, createContext, useState, type PropsWithChildren, useEffect } from 'react';
import { useAuth } from './authCtx';
import useApi from '../hooks/useApi';

export type SystemUser = {
    id: string;
    theme: 'light' | 'dark' | 'system';
    email: string;
    allowNotifications: boolean;
};

type SystemUserContextType = {
  systemUser: SystemUser | null;
};

const SystemUserContext = createContext<SystemUserContextType>({
    systemUser: null
});

export const SystemUserContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [context, setContextState] = useState<SystemUserContextType>({
    systemUser: null,
  });

  const api = useApi();
  const { user } = useAuth();

  useEffect(() => {
      if (user) {
        api.get(`/auth/systemUser`).then((resp) => {
            const { data } = resp;
            const userData = {
                id: data.id,
                theme: data.theme || 'system',
                email: data.email || '',
                allowNotifications: data.allowNotifications || false,
            };
            setContextState(() => ({ systemUser: userData}));
        }).catch((err) => {
            console.error('Error fetching system user:', err);
            setContextState(() => ({
                systemUser: null,
            }));
        });
      }
      else {
        setContextState(() => ({
          systemUser: null,
        }));
      }
    }, [user]);

  return (
    <SystemUserContext.Provider value={context}>
      {children}
    </SystemUserContext.Provider>
  );
};

export const useSystemUserContext = () => useContext(SystemUserContext);
