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
  updateSystemUser: (updatedUser: Partial<SystemUser>) => void;
};

const SystemUserContext = createContext<SystemUserContextType>({
    systemUser: null,
    updateSystemUser: () => {},
});

export const SystemUserContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [context, setContextState] = useState<SystemUserContextType>({
    systemUser: null,
    updateSystemUser: () => {},
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
            setContextState((prevState) => ({
              ...prevState,
              systemUser: userData
            }));
        }).catch((err) => {
            console.error('Error fetching system user:', err);
            setContextState((prevState) => ({
                ...prevState,
                systemUser: null,
            }));
        });
      }
      else {
        setContextState((prevState) => ({
          ...prevState,
          systemUser: null,
        }));
      }
    }, [user]);

    // Method to update the systemUser
    const updateSystemUser = (updatedUser: Partial<SystemUser>) => {
      setContextState((prevState) => ({
        ...prevState,
        systemUser: prevState.systemUser
          ? { ...prevState.systemUser, ...updatedUser }
          : null,
      }));
    };

  return (
    <SystemUserContext.Provider value={{ ...context, updateSystemUser }}>
      {children}
    </SystemUserContext.Provider>
  );
};

export const useSystemUserContext = () => useContext(SystemUserContext);
