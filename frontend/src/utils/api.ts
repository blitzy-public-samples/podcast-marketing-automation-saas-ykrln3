import axios, { AxiosInstance, AxiosError } from 'axios';
import { User, Podcast, Episode, MarketingContent, SocialMediaPost, AnalyticsData } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for adding authentication headers
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for handling common errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

const handleApiError = (error: Error | AxiosError): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data.message || 'An error occurred while processing your request.';
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response received from the server. Please try again later.';
    }
  }
  // Something happened in setting up the request that triggered an Error
  return 'An unexpected error occurred. Please try again.';
};

export const get = async <T>(endpoint: string, params?: object): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(endpoint, { params });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as Error | AxiosError));
  }
};

export const post = async <T>(endpoint: string, data: object): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as Error | AxiosError));
  }
};

export const put = async <T>(endpoint: string, data: object): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as Error | AxiosError));
  }
};

export const del = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as Error | AxiosError));
  }
};