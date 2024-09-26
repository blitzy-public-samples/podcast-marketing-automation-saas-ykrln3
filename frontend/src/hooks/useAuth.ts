import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { login, logout, refreshToken, isAuthenticated, getCurrentUser } from '../utils/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthFunctions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = (): AuthState & AuthFunctions => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  const checkAuth = useCallback(async () => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    const authenticated = isAuthenticated();
    if (authenticated) {
      const user = getCurrentUser();
      setAuthState({ user, isAuthenticated: true, loading: false });
    } else {
      setAuthState({ user: null, isAuthenticated: false, loading: false });
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    try {
      const user = await login(email, password);
      setAuthState({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      setAuthState({ user: null, isAuthenticated: false, loading: false });
      throw error;
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setAuthState({ user: null, isAuthenticated: false, loading: false });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...authState,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  };
};