import axios from 'axios';
import { User } from '../types';
import jwtDecode from 'jwt-decode';
import { post } from './api';

const LOCAL_STORAGE_TOKEN_KEY = 'auth_token';
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refresh_token';

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await post('/auth/login', { email, password });
    const { access_token, refresh_token } = response.data;
    setTokens(access_token, refresh_token);
    const user = jwtDecode<User>(access_token);
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = (): void => {
  removeTokens();
  // Optionally, make a request to the server to invalidate the token
};

export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await post('/auth/refresh', { refresh_token: refreshToken });
    const { access_token, refresh_token } = response.data;
    setTokens(access_token, refresh_token);
    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

const getAccessToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
};

const removeTokens = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const user = jwtDecode<User>(token);
    return user;
  } catch (error) {
    console.error('Failed to decode user token:', error);
    return null;
  }
};

// Human tasks:
// TODO: Implement secure storage mechanisms for tokens (consider using HttpOnly cookies for added security)
// TODO: Add support for multi-factor authentication
// TODO: Implement token rotation strategy for enhanced security
// TODO: Add error handling and logging for authentication failures
// TODO: Implement a mechanism to handle concurrent requests during token refresh
// TODO: Consider adding support for social media authentication