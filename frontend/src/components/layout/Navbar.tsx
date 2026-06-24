import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Menu, X, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/common/Button'

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white dark:bg-slate-800 border-b-2 border-[#f56d2f] shadow-md">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#fef3e6] dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} className="text-[#1e293b]" /> : <Menu size={20} className="text-[#1e293b]" />}
          </button>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-[#1e293b]">Chess Klub</h1>
            <p className="text-xs text-[#f56d2f] font-semibold">Tournament Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1e293b]">{user?.full_name}</p>
              <p className="text-xs text-[#f56d2f] capitalize">{user?.role}</p>
            </div>
            <div className="w-8 h-8 bg-[#f56d2f] rounded-full flex items-center justify-center text-white font-bold">
              {user?.full_name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-[#fef3e6] dark:hover:bg-slate-700 rounded-lg transition-colors">
              <Settings size={18} className="text-[#1e293b]" />
            </button>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="inline mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
