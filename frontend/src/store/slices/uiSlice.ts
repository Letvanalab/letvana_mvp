import { StateCreator } from 'zustand'

export interface UIError {
    message: string
    code?: string
    field?: string
}

export interface UISlice {
    // State
    isLoading: boolean
    error: UIError | null
    sidebarOpen: boolean
    modalOpen: boolean
    currentModal: string | null

    // Actions
    setLoading: (loading: boolean) => void
    setError: (error: UIError | null) => void
    clearError: () => void
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
    openModal: (modalName: string) => void
    closeModal: () => void
}

export const uiSlice: StateCreator<UISlice> = (set, get) => ({
    // Initial state
    isLoading: false,
    error: null,
    sidebarOpen: false,
    modalOpen: false,
    currentModal: null,

    // Actions
    setLoading: (loading: boolean) => {
        set({ isLoading: loading })
    },

    setError: (error: UIError | null) => {
        set({ error })
    },

    clearError: () => {
        set({ error: null })
    },

    toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }))
    },

    setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open })
    },

    openModal: (modalName: string) => {
        set({ modalOpen: true, currentModal: modalName })
    },

    closeModal: () => {
        set({ modalOpen: false, currentModal: null })
    },
})
