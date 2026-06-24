import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '@/store/uiStore'
import { LayoutDashboard, Trophy, Users, Calendar, BarChart3, X } from 'lucide-react'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy },
    { href: '/players', label: 'Players', icon: Users },
    { href: '/rounds', label: 'Rounds', icon: Calendar },
    { href: '/standings', label: 'Standings', icon: BarChart3 },
  ]

  if (!sidebarOpen) return null

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
        onClick={toggleSidebar}
      ></div>

      <aside className="w-64 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white shadow-xl fixed lg:relative h-full z-50 lg:z-auto overflow-y-auto">
        <div className="p-6 flex items-center justify-between border-b-2 border-[#f56d2f]">
          <div>
            <h2 className="text-2xl font-bold">CK</h2>
            <p className="text-xs text-[#f56d2f] font-semibold">Tournament Manager</p>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-8 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link-inactive rounded-lg ${
                  isActive
                    ? 'nav-link-active bg-[#f56d2f] hover:bg-[#e85b1f]'
                    : 'nav-link-inactive'
                }`}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              >
                <Icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#f56d2f] bg-[#0f172a]">
          <p className="text-xs text-slate-400 text-center">
            Chess Klub Tournament Manager
          </p>
          <p className="text-xs text-[#f56d2f] text-center font-semibold">v0.1.0</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
