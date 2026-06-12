import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'

function Sidebar({ isOpen, setIsOpen }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpen])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-[#1E293B] transform transition-transform duration-300 lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 xs:p-6 border-b border-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 xs:w-7 xs:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-lg xs:text-xl font-bold text-white tracking-tight">SmartResto</h1>
                <p className="text-xs text-slate-400 hidden sm:block">Enterprise Edition</p>
              </div>
            </div>
          </div>
        
          {/* Navigation */}
          <nav className="flex-1 p-3 xs:p-4 space-y-2 overflow-y-auto">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 xs:px-4 py-2">Main</p>
            <NavLink 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-semibold rounded-xl ${isActive ? 'gradient-active text-white shadow-md' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'} transition-all`}
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span className="hidden sm:inline">Dashboard</span>
              <span className="ml-auto w-2 h-2 bg-red-500 rounded-full opacity-0 group-[.active]:opacity-100"></span>
            </NavLink>
            <NavLink 
              to="/pos" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl ${isActive ? 'gradient-active text-white shadow-md' : 'text-slate-300 hover:bg-[#1E293B] hover:text-white'} transition-all`}
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span className="hidden sm:inline">POS</span>
            </NavLink>
            <NavLink 
              to="/orders" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <span className="hidden sm:inline">Orders</span>
              <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">12</span>
            </NavLink>
            <NavLink 
              to="/kitchen" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
              </svg>
              <span className="hidden sm:inline">Kitchen</span>
            </NavLink>
            <NavLink 
              to="/tables" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="hidden sm:inline">Tables</span>
            </NavLink>
            <NavLink 
              to="/reservations" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="hidden sm:inline">Reservations</span>
            </NavLink>
          
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 xs:px-4 py-2 mt-6">Management</p>
            <NavLink 
              to="/inventory" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <span className="hidden sm:inline">Inventory</span>
            </NavLink>
            <NavLink 
              to="/analytics" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span className="hidden sm:inline">Analytics</span>
            </NavLink>
            <NavLink 
              to="/settings" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 xs:px-4 py-3 text-xs xs:text-sm font-medium rounded-xl text-slate-300 hover:bg-[#1E293B] hover:text-white transition-all"
            >
              <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="hidden sm:inline">Settings</span>
            </NavLink>
        </nav>
        
          {/* User Profile */}
          <div className="p-3 xs:p-4 border-t border-[#1E293B]">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer">
              <div className="w-8 h-8 xs:w-10 xs:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs xs:text-sm shadow-md">
                JD
              </div>
              <div className="flex-1 hidden sm:block">
                <p className="text-xs xs:text-sm font-semibold text-white">John Doe</p>
                <p className="text-xs text-slate-400">Manager</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
              </svg>
            </div>
          </div>
      </div>
      </aside>
    </>
  )
}

export default Sidebar
