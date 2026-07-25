import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUserData = localStorage.getItem('userData');

      if (token) {
        try {
          const response = await authApi.getMe();
          setCurrentUser(response.user);
          setUserData(response.user);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
          setUserData(null);
          setIsAuthenticated(false);
        }
      }

      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }

      setAuthLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    const response = await authApi.login({ email, password });
    const user = response.user;

    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    setCurrentUser(user);
    setUserData(user);
    setIsAuthenticated(true);
    return true;
  };

  const register = async (formData) => {
    const response = await authApi.register(formData);
    localStorage.setItem('userData', JSON.stringify(response.user));
    setUserData(response.user);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    userData,
    isAuthenticated,
    authLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
