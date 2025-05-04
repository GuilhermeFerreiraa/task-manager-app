import { create, createJSONStorage, persist } from '@/libs/zustand';
import { AuthStorage } from '@/storage/auth';

import { StorageIds } from '@/types/enums/StorageIds';
import type { UserType } from '@/types/models/auth';

type AuthStoreType = {
  isLoggedIn: boolean;
  accessToken: string;
  user: UserType;
  login: (state: Omit<InitialState, 'isLoggedIn'>) => void;
  register: (state: Omit<InitialState, 'register' | 'isLoggedIn'>) => void;
  logout: () => void;
};

type InitialState = Omit<AuthStoreType, 'login' | 'logout' | 'register'>;

const INITIAL_STATE: InitialState = {
  accessToken: '',
  user: {
    id: 0,
    created_at: '',
    email: '',
    email_verified_at: '',
    name: '',
    updated_at: '',
  },
  isLoggedIn: false,
};

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      login: ({ accessToken, user }) => {
        set({
          isLoggedIn: true,
          user,
          accessToken,
        });
      },
      register: ({ accessToken, user }) => {
        set({
          user,
          accessToken,
          isLoggedIn: false,
        });
      },
      logout: () => {
        set({ ...INITIAL_STATE });
      },
    }),
    {
      name: StorageIds.AUTH,
      storage: createJSONStorage(() => ({
        setItem: (name, value) => {
          return AuthStorage.set(name, value);
        },
        getItem: (name) => {
          const value = AuthStorage.getString(name);
          return value ?? null;
        },
        removeItem: (name) => {
          return AuthStorage.delete(name);
        },
      })),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);

export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
