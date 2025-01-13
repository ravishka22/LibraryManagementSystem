import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dash = () => {

    // const {userData} = useContext(AppContent)
    const navigate = useNavigate()

    return (
        <div className='flex flex-col w-full p-4 sm:p-6 sm:px-24 gap-10'>
            <div className='bg-slate-900 p-10 text-center rounded-lg shadow-lg w-full text-indigo-300 text-sm mt-16'>
                <h1 className='text-4xl font-semibold mb-8'>Dashboard</h1>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 text-center'>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <img className='w-28 m-auto' src={assets.users} alt="" />
                        <button onClick={() => navigate('/adminPanel/Users')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Users</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <img className='w-28 m-auto' src={assets.books} alt="" />
                        <button onClick={() => navigate('/adminPanel/Books')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Books</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <img className='w-28 m-auto' src={assets.category} alt="" />
                        <button onClick={() => navigate('/adminPanel/categories')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Categories</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <img className='w-28 m-auto' src={assets.users} alt="" />
                        <button onClick={() => navigate('/adminPanel/Users')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Users</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <img className='w-28 m-auto' src={assets.books} alt="" />
                        <button onClick={() => navigate('/adminPanel/Books')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Books</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <img className='w-28 m-auto' src={assets.category} alt="" />
                        <button onClick={() => navigate('/adminPanel/categories')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Categories</button>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Dash
