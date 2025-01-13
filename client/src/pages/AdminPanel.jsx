import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Dash from '../components/Dash'

const AdminPanel = () => {
  return (
    <div className='min-h-screen px-6 sm:px-0'>
      <AdminNavbar />
      <Dash /> 
    </div>
  )
}

export default AdminPanel
