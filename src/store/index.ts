import { User } from '@/@types/User';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage, PersistStorage } from 'zustand/middleware'


type State = {
  user: User | null;
  accessToken: string | null;
};

type Actions = {
  setUser: (user: User | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  resetAuth: () => void; // Resets the auth state
};

const useAuthStore = create<State & Actions>()(
  persist(immer((set) => ({
    user: null,
    accessToken: null,

    setUser: (user) =>
      set((state) => {
        state.user = user;
        if (!user) {
          state.accessToken = null;
        }
      }),

    setAccessToken: (accessToken) =>
      set((state) => {
        state.accessToken = accessToken;
      }),

    resetAuth: () =>
      set(() => ({
        user: null,
        accessToken: null,
      })),
  })),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => sessionStorage) as PersistStorage<State & Actions>,
  }
),
);

export default useAuthStore;
