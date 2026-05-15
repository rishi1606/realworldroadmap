import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Only call the API if we know the user might be logged in
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await authAPI.checkAuth();
        setUser(data);
      } catch (error) {
        setUser(null);
        localStorage.removeItem('isAuthenticated');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const requireAuth = () => {
    if (!user) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, showLoginModal, setShowLoginModal, requireAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
