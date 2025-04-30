import { create } from '../libs/store';
import { AuthResponse } from '../types/auth';

interface AuthState {
  token: string | null;
  user: AuthResponse['user'] | null;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (data) => set({ token: data.token, user: data.user }),
  clearAuth: () => set({ token: null, user: null }),
})); 