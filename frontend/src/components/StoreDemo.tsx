import { useAuth, useUser, useUI } from '../store'

export const StoreDemo = () => {
  const { isAuthenticated, login, logout } = useAuth()
  const { user, updateUser } = useUser()
  const { isLoading, error, setLoading, setError, clearError } = useUI()

  const handleLogin = async () => {
    try {
      setLoading(true)
      clearError()
      await login('demo@example.com', 'password123')
    } catch (err) {
      setError({ message: 'Login failed', code: 'LOGIN_ERROR' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const handleUpdateUser = () => {
    if (user) {
      updateUser({ firstName: 'Updated', lastName: 'Name' })
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Zustand Store Demo</h2>
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Authentication Status:</p>
          <p className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
            {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </p>
        </div>

        {user && (
          <div>
            <p className="font-semibold">User Info:</p>
            <p>Email: {user.email}</p>
            <p>Name: {user.firstName} {user.lastName}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error:</p>
            <p>{error.message}</p>
            <button
              onClick={clearError}
              className="mt-2 text-sm underline"
            >
              Clear Error
            </button>
          </div>
        )}

        <div className="space-y-2">
          {!isAuthenticated ? (
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login Demo'}
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleUpdateUser}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Update User
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
