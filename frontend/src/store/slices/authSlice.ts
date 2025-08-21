import { StateCreator } from 'zustand'

export interface User {
    id: string
    email: string
    firstName?: string
    lastName?: string
    avatar?: string
    createdAt: string
    updatedAt: string
}

export interface AuthSlice {
    // State
    isAuthenticated: boolean
    token: string | null
    user: User | null

    // Actions
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>
    forgotPassword: (email: string) => Promise<void>
    resetPassword: (token: string, newPassword: string) => Promise<void>
    setToken: (token: string) => void
    setUser: (user: User) => void
}

export const authSlice: StateCreator<AuthSlice> = (set, get) => ({
    // Initial state
    isAuthenticated: false,
    token: null,
    user: null,

    // Actions
    login: async (email: string, password: string) => {
        try {
            // TODO: Replace with actual API call
            const mockResponse = {
                token: 'mock-jwt-token',
                user: {
                    id: '1',
                    email,
                    firstName: 'John',
                    lastName: 'Doe',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                } as User,
            }

            set({
                isAuthenticated: true,
                token: mockResponse.token,
                user: mockResponse.user,
            })
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    },

    logout: () => {
        set({
            isAuthenticated: false,
            token: null,
            user: null,
        })
    },

    register: async (email: string, password: string, firstName?: string, lastName?: string) => {
        try {
            // TODO: Replace with actual API call
            const mockResponse = {
                token: 'mock-jwt-token',
                user: {
                    id: '1',
                    email,
                    firstName,
                    lastName,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                } as User,
            }

            set({
                isAuthenticated: true,
                token: mockResponse.token,
                user: mockResponse.user,
            })
        } catch (error) {
            console.error('Registration failed:', error)
            throw error
        }
    },

    forgotPassword: async (email: string) => {
        try {
            // TODO: Replace with actual API call
            console.log('Password reset email sent to:', email)
        } catch (error) {
            console.error('Forgot password failed:', error)
            throw error
        }
    },

    resetPassword: async (token: string, newPassword: string) => {
        try {
            // TODO: Replace with actual API call
            console.log('Password reset successful')
        } catch (error) {
            console.error('Reset password failed:', error)
            throw error
        }
    },

    setToken: (token: string) => {
        set({ token, isAuthenticated: true })
    },

    setUser: (user: User) => {
        set({ user })
    },
})
