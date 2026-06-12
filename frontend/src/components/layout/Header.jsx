import { useState } from 'react'

function Header({ onMenuClick }) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const [searchExpanded, setSearchExpanded] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div className="bg-white border-b border-[#E5E7EB] px-4 xs:px-6 sm:px-8 py-4 xs:py-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-between lg:hidden">
          <button 
            onClick={onMenuClick}
            className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl hover:bg-[#E5E7EB] transition-colors"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg xs:text-xl font-bold text-[#0F172A] tracking-tight">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl hover:bg-[#E5E7EB] transition-colors"
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-8 h-8 xs:w-10 xs:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg"
            >
              JD
            </button>
          </div>
        </div>

        {/* Expanded Search Bar (Mobile) */}
        {searchExpanded && (
          <div className="mt-3 lg:hidden">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders, tables, customers..." 
                className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white focus:border-orange-500 transition-all"
                autoFocus
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute top-16 right-4 xs:right-6 z-50 w-64 bg-white border border-[#E5E7EB] rounded-xl shadow-xl lg:hidden">
            <div className="p-4 space-y-3">
              <select className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option>SmartResto Downtown</option>
                <option>SmartResto Uptown</option>
                <option>SmartResto Midtown</option>
              </select>
              <button className="w-full p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all shadow-md flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                New Order
              </button>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-[36px] font-bold text-[#0F172A] tracking-tight">Dashboard</h1>
            <span className="text-[15px] text-slate-500 font-medium hidden xl:inline">{today}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders, tables, customers..." 
                className="w-64 xl:w-80 pl-12 pr-4 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[15px] font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white focus:border-orange-500 transition-all"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            {/* Restaurant Switcher */}
            <select className="px-5 py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hidden xl:block">
              <option>SmartResto Downtown</option>
              <option>SmartResto Uptown</option>
              <option>SmartResto Midtown</option>
            </select>
            {/* Quick Actions */}
            <button className="p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
            {/* Avatar Menu */}
            <div className="relative">
              <button className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-[15px] shadow-lg hover:shadow-xl transition-shadow">
                JD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
