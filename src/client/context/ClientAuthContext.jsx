// src/client/context/ClientAuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const ClientAuthContext = createContext();

export const ClientAuthProvider = ({ children }) => {
  const [clientUser, setClientUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setClientUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <ClientAuthContext.Provider value={{ clientUser, signup, login, logout, loading }}>
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => useContext(ClientAuthContext);