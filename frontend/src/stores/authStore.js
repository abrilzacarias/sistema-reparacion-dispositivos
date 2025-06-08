import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      tokenType: null,
      user: null,
      permisos: {},
      setAuth: ({ token, tokenType, user, permisos }) =>
        set({ token, tokenType, user, permisos }),
      clearAuth: () =>
        set({ token: null, tokenType: null, user: null, permisos: {} }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (key) => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
)
