import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-white to-[#fef3e6] dark:from-slate-950 dark:to-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
