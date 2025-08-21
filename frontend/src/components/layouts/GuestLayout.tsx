import React from 'react'
import { Outlet } from 'react-router'

const GuestLayout = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <div className='flex justify-between items-center w-full px-10'>
        <h1 className='text-2xl font-bold text-gray-800'>Letvana Properties</h1>
        <div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md mr-4'>Login</button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Register</button>
        </div>
    </div>
</div>
<div className='flex flex-col items-center justify-center h-screen'>
    <div className='flex flex-col items-center justify-center h-screen w-full'>
        <Outlet />
    </div>
</div>
</>
  )
}

export default GuestLayout