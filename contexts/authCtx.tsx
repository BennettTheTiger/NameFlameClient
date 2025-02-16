import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import useApi from '../hooks/useApi';

export enum UserRoles {
    USER = 'user',
    ADMIN = 'admin'
}

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useToken() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useToken must be wrapped in a <TokenProvider />');
    }
  }

  return value;
}

export function TokenProvider({ children }: PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState('token');
  const api = useApi();

  return (
    <AuthContext.Provider
      value={{
        signIn: (userName, password) => {
          api.post('/auth/login', {
            userName,
            password
            }).then((response: any) => {
              console.log('login response', response);
            if (response.data?.token) {
              console.log('setting token');
              setToken(response.data.token);
            }
          }).catch((err: any) => {
            console.log('failed to login', err);
          })},
        signOut: () => {
            console.log('wiping token');
          setToken(null);
        },
        token,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
