import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContent } from '../context/AppContext'

const BooksManagement = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publication_year, setYear] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')

    const [books, setBooks] = useState([])

    const [categories, setCategories] = useState([])

    const [stetus, setStetus] = useState('Add Book')

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
                toast.error('Something went wrong')
            }
        }

        getBooks()
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get(backendUrl + '/api/books/getCategories')
                if (data.success) {
                    setCategories(data.categories)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error('Something went wrong')
            }
        }

        getCategories()
    }, [])




    const addBookHandler = async (e) => {
        if (stetus === 'Add Book') {
            try {

                e.preventDefault();
                axios.defaults.withCredentials = true

                const { data } = await axios.post(backendUrl + '/api/books/addBook', { title, author, publication_year, category })
                if (data.success) {
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                toast.error('Something went wrong')
            }
        } else {
            try {

                e.preventDefault();
                axios.defaults.withCredentials = true

                const { data } = await axios.put(backendUrl + '/api/books/updateBook/' + id, { title, author, publication_year, category })
                if (data.success) {
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                toast.error(data.message)
            }
        }

    }

    const updateSelectedBook = (id, title, author, year, category) => {
        return () => {
            setTitle(title)
            setAuthor(author)
            setYear(year)
            setCategory(category)
            setStetus('Update Book')
            setId(id)


            const { data } = axios.put(backendUrl + '/api/books/updateBook/' + id, { title, author, year, category })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        }
    }

    const deleteSelectedBook =  (id) => {

        return async () => {
            const { data } = await axios.delete(backendUrl + '/api/books/deleteBook/' + id)
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
                    <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>Books Management</h1>
                    <button onClick={() => navigate('/adminPanel')} className='flex items-center gap-2 bg-[#333A5C] rounded-full mb-2 px-6 py-2 text-white hover:bg-slate-800  transition-all'>Dashboard</button>
                </div>

                <div className='flex flex-col sm:flex-row  gap-5'>
                    <div className='bg-slate-800 p-6 w-full sm:w-1/3 rounded-lg shadow-lg'>

                        <h2 className='text-xl font-normal mb-5'>{stetus === 'Add Book' ? 'Add Book' : 'Update Book'}</h2>

                        <form onSubmit={addBookHandler}>
                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <input onChange={e => setTitle(e.target.value)} value={title} className='bg-transparent outline-none' type="text" placeholder='Book Title' required />
                            </div>

                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <input onChange={e => setAuthor(e.target.value)} value={author} className='bg-transparent outline-none' type="text" placeholder='Author' required />
                            </div>

                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <input onChange={e => setYear(e.target.value)} value={publication_year} className='bg-transparent outline-none' type="text" placeholder='Publication Year' required />
                            </div>
                            <div >
                                <select onChange={e => setCategory(e.target.value)} value={category} className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]' name="" id="">
                                    <option value="0">Select Category</option>
                                    {
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button className='w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>{stetus === 'Add Book' ? 'Add Book' : 'Update Book'}</button>
                            {stetus === 'Update Book' && (
                                <button onClick={() => setStetus('Add Book') & setAuthor('') & setTitle('') & setYear('') & setCategory(0)} className='w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold'>Cancel</button>
                            )}
                        </form>


                    </div>
                    <div className='bg-slate-800 p-6 w-full sm:w-4/6 rounded-lg shadow-lg'>
                        <div className='flex flex-col sm:flex-row justify-between'>
                            <h2 className='text-xl font-normal mb-2'>All Books</h2>
                            <div className='mb-4 flex items-center gap-3 sm:w-2/5 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <input className='bg-transparent outline-none' type="search" placeholder='Search' required />
                            </div>
                        </div>

                        <div className="rounded-md overflow-x-auto h-96 sm:h-80 ">
                            <table className="min-w-full bg-white rounded-md shadow-md">
                                <thead>
                                    <tr className="bg-slate-900 text-gray-300">
                                        <th className="text-left py-3 px-4 font-semibold text-sm">ID</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Title</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Author</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Year</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        books.map((book) => (
                                            <tr key={book} className="bg-[#333A5C] text-nowrap">
                                                <td className="text-left py-3 px-4">{book.id}</td>
                                                <td className="text-left py-3 px-4">{book.title}</td>
                                                <td className="text-left py-3 px-4">{book.author}</td>
                                                <td className="text-left py-3 px-4">{book.publication_year}</td>
                                                <td className="text-left py-3 px-4">
                                                    <button className='bg-gradient-to-r mx-1 from-blue-400 to-purple-500 text-white px-2 py-1 rounded-lg'>View</button>
                                                    <button onClick={updateSelectedBook(book.id, book.title, book.author, book.publication_year, book.categories_id)} className='bg-gradient-to-r mx-1 from-green-500 to-green-600 text-white px-2 py-1 rounded-lg'>Update</button>
                                                    <button onClick={deleteSelectedBook(book.id)} className='bg-gradient-to-r mx-1 from-red-400 to-red-500 text-white px-2 py-1 rounded-lg'>Delete</button>
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

export default BooksManagement
