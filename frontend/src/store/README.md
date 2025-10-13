# Zustand Store Documentation

This project uses Zustand as the state management solution. The store is organized into slices for better maintainability and performance.

## Store Structure

### Main Store (`src/store/index.ts`)
- Combines all slices into one store
- Provides individual hooks for better performance
- Includes persistence and devtools middleware

### Slices

#### Auth Slice (`src/store/slices/authSlice.ts`)
- Authentication state (isAuthenticated, token, user)
- Login, logout, register functionality
- Password reset operations

#### User Slice (`src/store/slices/userSlice.ts`)
- User profile data
- User preferences (theme, language, notifications)
- User update operations

#### UI Slice (`src/store/slices/uiSlice.ts`)
- Loading states
- Error handling
- UI state (sidebar, modals)

## Usage

### Basic Store Access
```tsx
import { useStore } from '../store'

const MyComponent = () => {
  const { user, isLoading } = useStore()
  // ...
}
```

### Using Individual Hooks (Recommended)
```tsx
import { useAuth, useUser, useUI } from '../store'

const MyComponent = () => {
  const { isAuthenticated, login, logout } = useAuth()
  const { user, updateUser } = useUser()
  const { isLoading, error, setLoading } = useUI()
  
  // ...
}
```

### Authentication
```tsx
const { login, logout, isAuthenticated } = useAuth()

// Login
await login('user@example.com', 'password')

// Logout
logout()

// Check auth status
if (isAuthenticated) {
  // User is logged in
}
```

### User Management
```tsx
const { user, updateUser, preferences } = useUser()

// Update user profile
updateUser({ firstName: 'John', lastName: 'Doe' })

// Update preferences
updatePreferences({ theme: 'dark' })
```

### UI State
```tsx
const { isLoading, error, setLoading, setError } = useUI()

// Set loading state
setLoading(true)

// Handle errors
setError({ message: 'Something went wrong', code: 'ERROR_CODE' })

// Clear errors
clearError()
```

## Features

- **Persistence**: Auth and user data are automatically persisted to localStorage
- **DevTools**: Redux DevTools integration for debugging
- **TypeScript**: Full type safety with interfaces
- **Performance**: Individual hooks prevent unnecessary re-renders
- **Middleware**: Built-in persistence and devtools middleware

## Adding New Slices

1. Create a new slice file in `src/store/slices/`
2. Define the slice interface and implementation
3. Import and add to the main store in `src/store/index.ts`
4. Export individual hooks for the new slice

## Example Slice Structure
```tsx
import { StateCreator } from 'zustand'

export interface MySlice {
  // State
  data: string[]
  
  // Actions
  addData: (item: string) => void
  removeData: (index: number) => void
}

export const mySlice: StateCreator<MySlice> = (set, get) => ({
  data: [],
  
  addData: (item: string) => {
    set((state) => ({ data: [...state.data, item] }))
  },
  
  removeData: (index: number) => {
    set((state) => ({ 
      data: state.data.filter((_, i) => i !== index) 
    }))
  },
})
```

## Best Practices

1. Use individual hooks instead of the main store for better performance
2. Keep slices focused on specific domains
3. Use TypeScript interfaces for type safety
4. Handle async operations with try-catch blocks
5. Use the UI slice for loading states and error handling
6. Leverage persistence for important data like auth tokens
