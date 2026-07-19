'use client';

import {createContext, useContext, useState, useEffect, ReactNode} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({children}: {children: ReactNode}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const auth = localStorage.getItem('nae_auth');
    if (auth) {
      try {
        const data = JSON.parse(auth);
        if (data.token === 'nae_admin_token_2024') {
          setIsAuthenticated(true);
          setIsAdmin(true);
        }
      } catch (e) {
        console.error('Auth error', e);
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Admin credentials - in production this should be server-side
    if (email === 'admin@nae.com' && password === 'nae2024admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('nae_auth', JSON.stringify({
        token: 'nae_admin_token_2024',
        email,
        timestamp: Date.now()
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('nae_auth');
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, isAdmin, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
