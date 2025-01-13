import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {useNavigate } from 'react-router-dom'

const Dash = () => {

    // const {userData} = useContext(AppContent)
    const navigate = useNavigate()

    return (
        <div className='flex flex-col w-full p-4 sm:p-6 sm:px-24 gap-10'>
            <div className='bg-slate-900 p-10 text-center rounded-lg shadow-lg w-full text-indigo-300 text-sm mt-16'>
                <h1 className='text-4xl font-semibold mb-8'>Dashboard</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-center'>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <p className='text-6xl font-semibold mb-2'>10</p>
                        <h2 className='text-xl font-normal'>Total Users</h2>
                        <button onClick={()=>navigate('/adminPanel/Users')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Users</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <p className='text-6xl font-semibold'>20</p>
                        <h2 className='text-xl font-normal mt-2'>Total Books</h2>
                        <button onClick={()=>navigate('/adminPanel/Books')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Books</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <p className='text-6xl font-semibold'>5</p>
                        <h2 className='text-xl font-normal mt-2'>Total Categories</h2>
                        <button onClick={()=>navigate('/adminPanel/categories')} className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Issues</button>
                    </div>
                    <div className='bg-slate-800 p-6 rounded-lg shadow-lg'>
                        <p className='text-6xl font-semibold'>5</p>
                        <h2 className='text-xl font-normal mt-2'>Reading List Count</h2>
                        <button className='w-full mt-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Manage Returns</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dash
