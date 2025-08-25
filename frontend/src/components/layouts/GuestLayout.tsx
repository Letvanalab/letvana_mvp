import { Outlet } from 'react-router'

const GuestLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <Outlet />
    </div>
  )
}

export default GuestLayout