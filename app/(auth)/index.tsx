import { useEffect } from 'react';

import { router } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export default function AuthIndex() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/login');
    }
  }, [isLoggedIn]);

  return null;
}
