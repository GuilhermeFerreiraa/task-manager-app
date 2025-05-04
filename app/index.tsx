import { Redirect } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export default function Index() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
