import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/common/Button'

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold">CK Tournament Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 dark:text-slate-400">{user?.full_name}</span>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="inline mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
