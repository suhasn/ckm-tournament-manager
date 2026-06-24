import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'
import { LayoutDashboard, Trophy, Users, Calendar, BarChart3 } from 'lucide-react'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { sidebarOpen } = useUIStore()

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy },
    { href: '/players', label: 'Players', icon: Users },
    { href: '/rounds', label: 'Rounds', icon: Calendar },
    { href: '/standings', label: 'Standings', icon: BarChart3 },
  ]

  if (!sidebarOpen) return null

  return (
    <aside className="w-64 bg-slate-900 text-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold">CKM</h2>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
