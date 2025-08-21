import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { authSlice, type AuthSlice } from './slices/authSlice'
import { uiSlice, type UISlice } from './slices/uiSlice'
import { userSlice, type UserSlice } from './slices/userSlice'

// Combine all slices into one store
export interface StoreState extends AuthSlice, UISlice, UserSlice { }

// Create the main store
export const useStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...authSlice(...a),
                ...uiSlice(...a),
                ...userSlice(...a),
            }),
            {
                name: 'letvana-store',
                partialize: (state) => ({
                    // Only persist auth and user data, not UI state
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                    token: state.token,
                }),
            }
        ),
        {
            name: 'letvana-store',
        }
    )
)

// Export individual hooks for better performance
export const useAuth = () => useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    token: state.token,
    login: state.login,
    logout: state.logout,
    register: state.register,
    forgotPassword: state.forgotPassword,
    resetPassword: state.resetPassword,
}))

export const useUser = () => useStore((state) => ({
    user: state.user,
    updateUser: state.updateUser,
    clearUser: state.clearUser,
}))

export const useUI = () => useStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
    setLoading: state.setLoading,
    setError: state.setError,
    clearError: state.clearError,
}))
