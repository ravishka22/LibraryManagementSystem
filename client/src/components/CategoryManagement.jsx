import React, { useContext, useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const CategoryManagement = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [catBooks, setCatBooks] = useState([])

    const { backendUrl } = useContext(AppContent)

    const [categoryID, setCategory] = useState(1)

    const [bookID, setBookID] = useState('')
    const [catID, setCatID] = useState('')




    useEffect(
        () => {
            const getCategories = async () => {
                try {
                    const { data } = await axios.get(backendUrl + '/api/books/getCategories')
                    if (data.success) {
                        setCategories(data.categories)
                    } else {
                        toast.error(data.message)
                    }
                } catch (error) {
                    toast.error(data.message)
                }
            }

            getCategories()
        }, []
    )

    useEffect(
        () => {
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
        }, []
    )

    useEffect(
        () => {

            const getCategoryBooks = async () => {


                try {
                    const { data } = await axios.get(backendUrl + '/api/categories/getCategoryBooks/' + categoryID)
                    if (data.success) {
                        setCatBooks(data.catBooks)
                    } else {
                        toast.error(data.message)
                    }
                } catch (error) {
                    toast.error(data.message)
                }



            }

            getCategoryBooks()
        }, []
    )

    const bookCategoryHandler = async (e) => {
        e.preventDefault()

        const category = e.target[0].value
        const book = e.target[1].value

        try {
            const { data } = await axios.put(backendUrl + '/api/categories/updateBookCategory', { bookID: book, categories_id: category })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    return (
        <div className='flex flex-col w-full p-4 sm:p-6 sm:px-24 gap-10'>
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full text-indigo-300 text-sm mt-20'>

                <div className='flex justify-between items-center align-middle pb-2'>
                    <h1 className='text-2xl sm:text-3xl font-semibold mb-4'>Categories Management</h1>
                    <button onClick={() => navigate('/adminPanel')} className='flex items-center gap-2 bg-[#333A5C] rounded-full mb-2 px-6 py-2 text-white hover:bg-slate-800  transition-all'>Dashboard</button>
                </div>

                <div className='flex flex-col sm:flex-row  gap-5'>
                    <div className='bg-slate-800 p-6 w-full sm:w-1/3 rounded-lg shadow-lg'>

                        <div>
                            <h2 className='text-xl font-normal mb-5'>All Categories</h2>

                            <div className="rounded-md overflow-x-auto h-80 sm:h-48 ">
                                <table className="min-w-full bg-white rounded-md shadow-md">
                                    <thead>
                                        <tr className="bg-slate-900 text-gray-300">
                                            <th className="text-left py-3 px-4 font-semibold text-sm">ID</th>
                                            <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category.id} className="bg-[#333A5C] text-nowrap">
                                                <td className="text-left py-3 px-4 font-normal text-sm">{category.id}</td>
                                                <td className="text-left py-3 px-4 font-normal text-sm">{category.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-10'>
                            <h2 className='text-xl font-normal mb-5'>Add Books Into Category</h2>
                            <form onSubmit={bookCategoryHandler}>
                                <div >
                                    <select onChange={e => setCatID(e.target.value)} value={catID}  className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]' name="" id="">
                                        <option value={0}>Select Category</option>
                                        {
                                            categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div >
                                    <select onChange={e => setBookID(e.target.value)} value={bookID} className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]' name="" id="">
                                        <option value={0}>Select Book</option>
                                        {
                                            books.map(book => (
                                                <option key={book.id} value={book.id}>{book.title}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <button className='w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold'>Add To Category</button>
                            </form>


                        </div>

                    </div>
                    <div className='bg-slate-800 p-6 w-full sm:w-4/6 rounded-lg shadow-lg'>
                        <div className='flex flex-col sm:flex-row justify-between'>
                            <h2 className='text-xl font-normal mb-2'>Books in Category ID: {categoryID}</h2>
                            <div >
                                <select onChange={e => setCategory(e.target.value)} value={categoryID} className='mb-4 flex items-center gap-3 lg:w-64 w-full px-5 py-2.5 rounded-full bg-[#333A5C]' name="" id="">
                                    {
                                        categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="rounded-md overflow-x-auto h-96 sm:h-80 ">
                            <table className="min-w-full bg-white rounded-md shadow-md">
                                <thead>
                                    <tr className="bg-slate-900 text-gray-300">
                                        <th className="text-left py-3 px-4 font-semibold text-sm">id</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Book Title</th>
                                        <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        catBooks.map(catBook => (
                                            <tr key={catBook.id} className="bg-[#333A5C] text-nowrap">
                                                <td className="text-left py-3 px-4 font-normal text-sm">{catBook.id}</td>
                                                <td className="text-left py-3 px-4 font-normal text-sm">{catBook.title}</td>
                                                <td className="text-left py-3 px-4 font-normal text-sm">
                                                    <button className='bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-1 rounded-full'>Remove</button>
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

export default CategoryManagement
