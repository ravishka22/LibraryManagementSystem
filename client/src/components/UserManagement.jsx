import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContent } from '../context/AppContext'

const UserManagement = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/users/getUsers')
                if (data.success) {
                    setUsers(data.users)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error('Something went wrong')
            }
        }

        getUsers()
    }, [])




    const addUserHandler = async (e) => {
        try {

            e.preventDefault();
            axios.defaults.withCredentials = true

            const { data } = await axios.post(backendUrl + '/api/users/addUser', { name, email, password })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='flex flex-col w-full p-4 sm:p-6 sm:px-24 gap-10'>
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 text-sm mt-16'>

                <div className='flex justify-between items-center align-middle pb-2'>
                    <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>User Management</h1>
                    <button onClick={() => navigate('/adminPanel')} className='flex items-center gap-2 bg-[#333A5C] rounded-full mb-2 px-6 py-2 text-white hover:bg-slate-800  transition-all'>Dashboard</button>
                </div>

                <div className='flex flex-col sm:flex-row  gap-5'>
                    <div className='bg-slate-800 p-6 w-full sm:w-1/3 rounded-lg shadow-lg'>

                        <h2 className='text-xl font-normal mb-5'>Add User</h2>

                        <form onSubmit={addUserHandler}>
                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.person_icon} alt="" />
                                <input onChange={e => setName(e.target.value)} value={name} className='bg-transparent outline-none' type="text" placeholder='Full Name' required />
                            </div>

                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.mail_icon} alt="" />
                                <input onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none' type="email" placeholder='Email Address' required />
                            </div>

                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.lock_icon} alt="" />
                                <input onChange={e => setPassword(e.target.value)} value={password} className='bg-transparent outline-none' type="password" placeholder='Password' required />
                            </div>

                            <button className='w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Add User</button>
                        </form>


                    </div>
                    <div className='bg-slate-800 p-6 w-full sm:w-4/6 rounded-lg shadow-lg'>
                        <div className='flex flex-col sm:flex-row justify-between'>
                            <h2 className='text-xl font-normal mb-2'>All Users</h2>
                            <div className='mb-4 flex items-center gap-3 sm:w-2/5 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <input className='bg-transparent outline-none' type="search" placeholder='Search' required />
                            </div>
                        </div>

                        <div className="rounded-md overflow-x-auto h-96 sm:h-80 ">
                            <table className="min-w-full bg-white rounded-md shadow-md">
                                <thead>
                                    <tr className="bg-slate-900 text-gray-300">
                                        <th className="text-left py-3 px-4 font-semibold text-sm">ID</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user) => (
                                            <tr key={user} className="bg-[#333A5C] text-nowrap">
                                                <td className="text-left py-3 px-4">{user.id}</td>
                                                <td className="text-left py-3 px-4">{user.name}</td>
                                                <td className="text-left py-3 px-4">{user.email}</td>
                                                <td className="text-left py-3 px-4">
                                                    <button onClick={() => navigate('/adminPanel/User/'+ user.id)} className='bg-gradient-to-r mx-1 from-blue-400 to-purple-500 text-white px-2 py-1 rounded-lg'>View Reading List</button>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserManagement
