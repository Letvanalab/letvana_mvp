import { StateCreator } from 'zustand'
import { User } from './authSlice'

export interface UserSlice {
    // State
    user: User | null
    preferences: {
        theme: 'light' | 'dark' | 'system'
        language: string
        notifications: boolean
    }

    // Actions
    updateUser: (updates: Partial<User>) => void
    clearUser: () => void
    updatePreferences: (preferences: Partial<UserSlice['preferences']>) => void
    resetPreferences: () => void
}

export const userSlice: StateCreator<UserSlice> = (set, get) => ({
    // Initial state
    user: null,
    preferences: {
        theme: 'system',
        language: 'en',
        notifications: true,
    },

    // Actions
    updateUser: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
            set({
                user: {
                    ...currentUser,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                },
            })
        }
    },

    clearUser: () => {
        set({ user: null })
    },

    updatePreferences: (newPreferences: Partial<UserSlice['preferences']>) => {
        set((state) => ({
            preferences: {
                ...state.preferences,
                ...newPreferences,
            },
        }))
    },

    resetPreferences: () => {
        set({
            preferences: {
                theme: 'system',
                language: 'en',
                notifications: true,
            },
        })
    },
})
