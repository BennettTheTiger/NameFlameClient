import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';

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

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          // Perform sign-in logic here
          try {
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
            }
            }
            catch (err) {
                console.log('failed to login', err);
            }
        },
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
