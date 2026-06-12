import { useState } from 'react'

function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState('This Month')
  const [showExportMenu, setShowExportMenu] = useState(false)

  const filters = ['Today', 'This Week', 'This Month', 'Last Month', 'This Year', 'Custom Date Range']

  const topSellingItems = [
    { name: 'Grilled Salmon', orders: 156, revenue: 4680 },
    { name: 'Beef Burger', orders: 142, revenue: 2840 },
    { name: 'Caesar Salad', orders: 128, revenue: 1920 },
    { name: 'Margherita Pizza', orders: 115, revenue: 2300 },
    { name: 'Chicken Pasta', orders: 98, revenue: 1960 },
  ]

  const worstPerformingItems = [
    { name: 'Vegetable Soup', orders: 12, revenue: 180 },
    { name: 'Fish Tacos', orders: 18, revenue: 360 },
    { name: 'Vegan Burger', orders: 22, revenue: 440 },
    { name: 'Fruit Salad', orders: 25, revenue: 375 },
    { name: 'Eggplant Parmesan', orders: 28, revenue: 560 },
  ]

  const categoryPerformance = [
    { category: 'Main Course', revenue: 15200, percentage: 45 },
    { category: 'Appetizers', revenue: 6800, percentage: 20 },
    { category: 'Beverages', revenue: 8400, percentage: 25 },
    { category: 'Desserts', revenue: 3400, percentage: 10 },
  ]

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
        <div>
          <h1 className="text-[24px] xs:text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight">Analytics & Reports</h1>
          <p className="text-[12px] xs:text-[15px] text-slate-500 font-medium mt-1 xs:mt-2">Business Intelligence Dashboard</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 xs:gap-3">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {filters.map(filter => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>
          <button className="px-3 xs:px-4 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[12px] xs:text-[14px] font-semibold hover:bg-[#F8FAFC] transition-all flex items-center gap-2">
            <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span className="hidden xs:inline">Refresh</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 xs:px-4 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[12px] xs:text-[14px] font-semibold hover:shadow-lg transition-all shadow-md flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span className="hidden sm:inline">Export Report</span>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E5E7EB] z-10">
                <button className="w-full px-4 py-3 text-left text-[12px] xs:text-[14px] font-medium text-slate-700 hover:bg-[#F8FAFC] transition-colors">PDF Report</button>
                <button className="w-full px-4 py-3 text-left text-[12px] xs:text-[14px] font-medium text-slate-700 hover:bg-[#F8FAFC] transition-colors">Excel Report</button>
                <button className="w-full px-4 py-3 text-left text-[12px] xs:text-[14px] font-medium text-slate-700 hover:bg-[#F8FAFC] transition-colors">CSV Report</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">+12.5%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">$33,800</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Total Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-blue-600">+8.3%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">1,248</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-orange-600">+4.2%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">$27.08</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Avg Order Value</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-purple-600">92%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">4.6/5</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Customer Satisfaction</p>
        </div>
      </div>

      {/* Revenue Analytics Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A]">Revenue Analytics</h2>
          <div className="flex flex-wrap items-center gap-2 xs:gap-4">
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Revenue Growth</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-green-600">+12.5%</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Best Sales Day</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">Saturday</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Lowest Sales Day</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">Monday</p>
            </div>
          </div>
        </div>
        
        {/* Simple Bar Chart Visualization */}
        <div className="space-y-3 xs:space-y-4">
          <div>
            <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Daily Revenue Trend</p>
            <div className="flex items-end gap-1 xs:gap-2 h-24 xs:h-32">
              {[3200, 2800, 3500, 4100, 3800, 5200, 4800, 4200, 3900, 4500, 5100, 5600, 4900, 4300].map((value, index) => (
                <div key={index} className="flex-1 bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg" style={{ height: `${(value / 5600) * 100}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] xs:text-[11px] text-slate-500">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-lg">
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A] text-center">$35,200</h3>
          <p className="text-[11px] xs:text-[14px] text-slate-500 font-medium text-center">Gross Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-lg">
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A] text-center">$33,800</h3>
          <p className="text-[11px] xs:text-[14px] text-slate-500 font-medium text-center">Net Revenue</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-lg">
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A] text-center">$1,400</h3>
          <p className="text-[11px] xs:text-[14px] text-slate-500 font-medium text-center">Tax Collected</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-lg">
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
          </div>
          <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A] text-center">$840</h3>
          <p className="text-[11px] xs:text-[14px] text-slate-500 font-medium text-center">Discounts Given</p>
        </div>
      </div>

      {/* Order Analytics */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A]">Order Analytics</h2>
          <div className="flex flex-wrap items-center gap-2 xs:gap-4">
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Total Orders</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">1,248</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Completed</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-green-600">1,180</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Cancelled</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-red-600">68</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Avg Prep Time</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">18m</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          <div>
            <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Orders by Day</p>
            <div className="space-y-1.5 xs:space-y-2">
              {[
                { day: 'Monday', orders: 145 },
                { day: 'Tuesday', orders: 128 },
                { day: 'Wednesday', orders: 156 },
                { day: 'Thursday', orders: 172 },
                { day: 'Friday', orders: 198 },
                { day: 'Saturday', orders: 245 },
                { day: 'Sunday', orders: 204 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 xs:gap-3">
                  <span className="text-[10px] xs:text-[12px] text-slate-600 w-12 xs:w-16">{item.day}</span>
                  <div className="flex-1 bg-[#F8FAFC] rounded-full h-2 xs:h-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 xs:h-3 rounded-full" style={{ width: `${(item.orders / 245) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] xs:text-[12px] font-semibold text-[#0F172A]">{item.orders}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Orders by Hour</p>
            <div className="space-y-1.5 xs:space-y-2">
              {[
                { hour: '11AM-1PM', orders: 280 },
                { hour: '1PM-3PM', orders: 198 },
                { hour: '3PM-5PM', orders: 145 },
                { hour: '5PM-7PM', orders: 320 },
                { hour: '7PM-9PM', orders: 305 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 xs:gap-3">
                  <span className="text-[10px] xs:text-[12px] text-slate-600 w-16 xs:w-20">{item.hour}</span>
                  <div className="flex-1 bg-[#F8FAFC] rounded-full h-2 xs:h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 xs:h-3 rounded-full" style={{ width: `${(item.orders / 320) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] xs:text-[12px] font-semibold text-[#0F172A]">{item.orders}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Orders by Category</p>
            <div className="space-y-1.5 xs:space-y-2">
              {[
                { category: 'Main Course', orders: 520 },
                { category: 'Appetizers', orders: 245 },
                { category: 'Beverages', orders: 312 },
                { category: 'Desserts', orders: 171 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 xs:gap-3">
                  <span className="text-[10px] xs:text-[12px] text-slate-600 w-16 xs:w-20">{item.category}</span>
                  <div className="flex-1 bg-[#F8FAFC] rounded-full h-2 xs:h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 xs:h-3 rounded-full" style={{ width: `${(item.orders / 520) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] xs:text-[12px] font-semibold text-[#0F172A]">{item.orders}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Customer Analytics</h2>
          <div className="grid grid-cols-2 gap-3 xs:gap-4 mb-4 xs:mb-6">
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Total Customers</p>
              <p className="text-[18px] xs:text-[24px] font-bold text-[#0F172A]">856</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Returning</p>
              <p className="text-[18px] xs:text-[24px] font-bold text-green-600">524</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">New Customers</p>
              <p className="text-[18px] xs:text-[24px] font-bold text-blue-600">332</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Retention Rate</p>
              <p className="text-[18px] xs:text-[24px] font-bold text-orange-600">61%</p>
            </div>
          </div>
          <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Customer Growth</p>
          <div className="flex items-end gap-1 xs:gap-2 h-20 xs:h-24">
            {[45, 52, 48, 61, 55, 68, 72, 65, 78, 82, 75, 88].map((value, index) => (
              <div key={index} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg" style={{ height: `${(value / 88) * 100}%` }}></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Menu Performance</h2>
          <div className="mb-4 xs:mb-6">
            <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2 xs:mb-3">Top Selling Items</p>
            <div className="space-y-1.5 xs:space-y-2">
              {topSellingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 xs:p-3 bg-[#F8FAFC] rounded-xl">
                  <div>
                    <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{item.name}</p>
                    <p className="text-[10px] xs:text-[12px] text-slate-500">{item.orders} orders</p>
                  </div>
                  <span className="text-[12px] xs:text-[14px] font-bold text-green-600">${item.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2 xs:mb-3">Worst Performing Items</p>
            <div className="space-y-1.5 xs:space-y-2">
              {worstPerformingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 xs:p-3 bg-[#F8FAFC] rounded-xl">
                  <div>
                    <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{item.name}</p>
                    <p className="text-[10px] xs:text-[12px] text-slate-500">{item.orders} orders</p>
                  </div>
                  <span className="text-[12px] xs:text-[14px] font-bold text-red-600">${item.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Category Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          {categoryPerformance.map((cat, index) => (
            <div key={index} className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{cat.category}</p>
                <span className="text-[11px] xs:text-[13px] font-semibold text-orange-500">{cat.percentage}%</span>
              </div>
              <p className="text-[18px] xs:text-[24px] font-bold text-[#0F172A]">${cat.revenue.toLocaleString()}</p>
              <div className="mt-2 xs:mt-3 bg-white rounded-full h-1.5 xs:h-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 xs:h-2 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kitchen, Table, Reservation, Inventory Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h3 className="text-[14px] xs:text-[16px] font-bold text-[#0F172A] mb-3 xs:mb-4">Kitchen Analytics</h3>
          <div className="space-y-2 xs:space-y-3">
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Avg Cooking Time</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">22m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Kitchen Efficiency</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-green-600">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Orders Today</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Active Chefs</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">6</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h3 className="text-[14px] xs:text-[16px] font-bold text-[#0F172A] mb-3 xs:mb-4">Table Analytics</h3>
          <div className="space-y-2 xs:space-y-3">
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Occupancy Rate</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">42%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Avg Turnover</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">45m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Peak Hours</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">7-8PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Revenue/Table</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">$285</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h3 className="text-[14px] xs:text-[16px] font-bold text-[#0F172A] mb-3 xs:mb-4">Reservation Analytics</h3>
          <div className="space-y-2 xs:space-y-3">
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Total Reservations</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Confirmation Rate</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-green-600">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Cancellation Rate</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-red-600">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Peak Hours</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">7-8PM</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h3 className="text-[14px] xs:text-[16px] font-bold text-[#0F172A] mb-3 xs:mb-4">Inventory Analytics</h3>
          <div className="space-y-2 xs:space-y-3">
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Inventory Value</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-[#0F172A]">$1,018</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Fast Moving</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-green-600">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Slow Moving</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-orange-600">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] xs:text-[13px] text-slate-500">Waste %</span>
              <span className="text-[11px] xs:text-[13px] font-semibold text-red-600">3.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Reports */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Financial Reports</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="p-4 xs:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <p className="text-[11px] xs:text-[13px] font-semibold text-green-600 mb-2">Revenue Summary</p>
            <p className="text-[20px] xs:text-[28px] font-bold text-[#0F172A]">$33,800</p>
            <p className="text-[10px] xs:text-[12px] text-slate-500 mt-1">+12.5% from last month</p>
          </div>
          <div className="p-4 xs:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <p className="text-[11px] xs:text-[13px] font-semibold text-blue-600 mb-2">Profit Summary</p>
            <p className="text-[20px] xs:text-[28px] font-bold text-[#0F172A]">$12,450</p>
            <p className="text-[10px] xs:text-[12px] text-slate-500 mt-1">36.8% profit margin</p>
          </div>
          <div className="p-4 xs:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <p className="text-[11px] xs:text-[13px] font-semibold text-orange-600 mb-2">Expense Summary</p>
            <p className="text-[20px] xs:text-[28px] font-bold text-[#0F172A]">$21,350</p>
            <p className="text-[10px] xs:text-[12px] text-slate-500 mt-1">63.2% of revenue</p>
          </div>
          <div className="p-4 xs:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <p className="text-[11px] xs:text-[13px] font-semibold text-purple-600 mb-2">Tax Summary</p>
            <p className="text-[20px] xs:text-[28px] font-bold text-[#0F172A]">$1,400</p>
            <p className="text-[10px] xs:text-[12px] text-slate-500 mt-1">4.1% of revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
