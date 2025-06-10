import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      tokenType: null,
      user: null,
      permisos: {},
      needs_password_change: false,
      setAuth: ({ token, tokenType, user, permisos, needs_password_change }) =>
        set({ token, tokenType, user, permisos, needs_password_change }),
      clearAuth: () =>
        set({ token: null, tokenType: null, user: null, permisos: {}, needs_password_change: false }),
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
