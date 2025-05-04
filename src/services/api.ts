import Constants from 'expo-constants';

import { axios } from '@/libs/axios';

import { useAuthStore } from '@/store/auth';

const baseURL = Constants.expoConfig?.extra?.EXPO_BASE_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
