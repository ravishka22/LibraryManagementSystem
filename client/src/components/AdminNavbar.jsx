import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full flex justify-between items-center p-5 sm:p-5 sm:px-24 absolute top-0'>
            <img src={assets.logo} alt="" className='w-28 sm:w-32' />
            <button onClick={() => navigate('/login')} className='flex items-center gap-2 bg-gray-900 rounded-full px-6 py-2 text-white hover:bg-red-500 transition-all'>Logout <img src={assets.arrow_icon} alt="" /> </button>
        </div>
    )
}

export default AdminNavbar
