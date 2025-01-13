import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import AdminPanel from './pages/AdminPanel';
import Users from './pages/Users';
import Books from './pages/Books';
import SingleUser from './pages/SingleUser';
import Categories from './pages/Categories';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/adminPanel/users" element={<Users/>}/>
        <Route path="/adminPanel/books" element={<Books/>}/>
        <Route path="/adminPanel/user/:id" element={<SingleUser/>}/>
        <Route path="/adminPanel/categories" element={<Categories/>}/>

      </Routes>
    </div>
  )
}

export default App
