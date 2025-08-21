import React from 'react'
import { Outlet } from 'react-router'


const AuthLayout = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='flex flex-col items-center justify-center h-screen w-full'>
                <Outlet />
            </div>
        </div>
    </>
  )
}

export default AuthLayout