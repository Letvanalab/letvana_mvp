import { ReactNode, useEffect } from 'react'
import { useStore } from './index'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const { token, user, setToken, setUser } = useStore()

  // Initialize store from localStorage on app start
  useEffect(() => {
    // Check if we have stored auth data
    const storedToken = localStorage.getItem('letvana-store')
    if (storedToken) {
      try {
        const parsed = JSON.parse(storedToken)
        if (parsed.state?.token && parsed.state?.user) {
          setToken(parsed.state.token)
          setUser(parsed.state.user)
        }
      } catch (error) {
        console.error('Failed to parse stored auth data:', error)
        // Clear corrupted data
        localStorage.removeItem('letvana-store')
      }
    }
  }, [setToken, setUser])

  return <>{children}</>
}
