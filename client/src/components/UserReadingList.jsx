import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { data, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContent } from '../context/AppContext'

const UserReadingList = () => {

    const userID = useParams().id


    const [users_id, setUserID] = useState(userID)
    const [books_id, setBook] = useState('')

    const [user, setUser] = useState({})
    const [userEmail, setUserEmail] = useState({})

    const [books, setBooks] = useState([])
    const [readingList, setReadingList] = useState([])

    const navigate = useNavigate()

    const { backendUrl } = useContext(AppContent)



    useEffect(() => {
        const getBooks = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/books/getBooks')
                if (data.success) {
                    setBooks(data.books)

                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(data.message)
            }
        }

        getBooks()

    }, [])

    useEffect(() => {
        const getReadingList = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/readingList/getReadingList/' + userID)
                if (data.success) {
                    setReadingList(data.readingList)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(data.message)
            }
        }

        getReadingList()
    }, [])


    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/users/getUser/' + userID)
                if (data.success) {
                    setUser(data.userData)

                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(data.message)
            }

        }

        getUser()
    }, [])

    const addReadingListHandler = async (e) => {
        try {

            e.preventDefault();
            axios.defaults.withCredentials = true

            const { data } = await axios.post(backendUrl + '/api/readingList/addBookToReadingList', { users_id, books_id })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(data.message)
        }
    }

    const removeReadingListHandler = (id) => {
        return async () => {
            const { data } = await axios.delete(`${backendUrl}/api/readingList/removeBook/${id}`, {
                params: { userID },
            })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        }
    }



    return (
        <div className='flex flex-col w-full p-4 sm:p-6 sm:px-24 gap-10'>
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 text-sm mt-16'>

                <div className='flex justify-between items-center align-middle pb-2'>
                    <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>User ID: {userID}</h1>
                    <button onClick={() => navigate('/adminPanel')} className='flex items-center gap-2 bg-[#333A5C] rounded-full mb-2 px-6 py-2 text-white hover:bg-slate-800  transition-all'>Dashboard</button>
                </div>

                <div className='flex flex-col sm:flex-row  gap-5'>
                    <div className='bg-slate-800 p-6 w-full sm:w-1/3 rounded-lg shadow-lg'>

                        <div>
                            <h2 className='text-xl font-normal mb-5'>User Details</h2>

                            <p></p>
                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.person_icon} alt="" />
                                <input value={user.name} className='bg-transparent outline-none' type="text" placeholder='Full Name' required disabled />
                            </div>

                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.mail_icon} alt="" />
                                <input className='bg-transparent outline-none' type="email" placeholder='Email Address' required disabled />
                            </div>
                        </div>
                        <div className='mt-10'>
                            <h2 className='text-xl font-normal mb-5'>Add Books Into Reading List</h2>
                            <form onSubmit={addReadingListHandler}>
                                <div >
                                    <select onChange={e => setBook(e.target.value)} value={books_id} className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]' name="" id="">
                                        <option value={0}>Select Book</option>
                                        {
                                            books.map((book) => (
                                                <option key={book.id} value={book.id}>{book.title}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                                <button className='w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Add To List</button>
                            </form>


                        </div>

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
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Added Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Book Title</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        readingList.map((readingList) => (
                                            <tr key={readingList} className="bg-[#333A5C] text-nowrap">
                                                <td className="text-left py-3 px-4">{readingList.added_date}</td>
                                                <td className="text-left py-3 px-4">{readingList.title}</td>
                                                <td className="text-left py-3 px-4">
                                                    <button onClick={removeReadingListHandler(readingList.books_id)} className='bg-gradient-to-r mx-1 from-red-500 to-red-700 text-white px-2 py-1 rounded-lg'>Remove</button>
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

export default UserReadingList
