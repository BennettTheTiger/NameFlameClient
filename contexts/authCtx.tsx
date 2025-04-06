import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: any;
  token: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: '',
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      const userToken = await user?.getIdToken();
      setToken(userToken || '');
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setIsLoading(false);
  }
  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
  const signOutUser = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOutUser, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
