import { useState } from 'react'

function Tables() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [selectedTable, setSelectedTable] = useState(null)

  const filters = ['All', 'Available', 'Occupied', 'Reserved', 'Cleaning']

  const tables = [
    { id: 'T-01', number: '01', capacity: 4, currentGuests: 4, status: 'Occupied', waiter: 'John Smith', runningBill: 145.50 },
    { id: 'T-02', number: '02', capacity: 2, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-03', number: '03', capacity: 6, currentGuests: 5, status: 'Occupied', waiter: 'Sarah Johnson', runningBill: 289.75 },
    { id: 'T-04', number: '04', capacity: 4, currentGuests: 0, status: 'Reserved', waiter: '', runningBill: 0 },
    { id: 'T-05', number: '05', capacity: 8, currentGuests: 6, status: 'Occupied', waiter: 'Michael Brown', runningBill: 412.25 },
    { id: 'T-06', number: '06', capacity: 2, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-07', number: '07', capacity: 4, currentGuests: 0, status: 'Cleaning', waiter: '', runningBill: 0 },
    { id: 'T-08', number: '08', capacity: 6, currentGuests: 4, status: 'Occupied', waiter: 'Emily Davis', runningBill: 198.50 },
    { id: 'T-09', number: '09', capacity: 4, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-10', number: '10', capacity: 2, currentGuests: 0, status: 'Reserved', waiter: '', runningBill: 0 },
    { id: 'T-11', number: '11', capacity: 8, currentGuests: 7, status: 'Occupied', waiter: 'David Wilson', runningBill: 523.00 },
    { id: 'T-12', number: '12', capacity: 4, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-13', number: '13', capacity: 6, currentGuests: 0, status: 'Reserved', waiter: '', runningBill: 0 },
    { id: 'T-14', number: '14', capacity: 4, currentGuests: 3, status: 'Occupied', waiter: 'Jessica Taylor', runningBill: 167.75 },
    { id: 'T-15', number: '15', capacity: 2, currentGuests: 0, status: 'Cleaning', waiter: '', runningBill: 0 },
    { id: 'T-16', number: '16', capacity: 4, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-17', number: '17', capacity: 6, currentGuests: 5, status: 'Occupied', waiter: 'Robert Anderson', runningBill: 345.25 },
    { id: 'T-18', number: '18', capacity: 8, currentGuests: 0, status: 'Reserved', waiter: '', runningBill: 0 },
    { id: 'T-19', number: '19', capacity: 4, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-20', number: '20', capacity: 2, currentGuests: 2, status: 'Occupied', waiter: 'Lisa Martinez', runningBill: 89.50 },
    { id: 'T-21', number: '21', capacity: 6, currentGuests: 0, status: 'Cleaning', waiter: '', runningBill: 0 },
    { id: 'T-22', number: '22', capacity: 4, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
    { id: 'T-23', number: '23', capacity: 8, currentGuests: 0, status: 'Reserved', waiter: '', runningBill: 0 },
    { id: 'T-24', number: '24', capacity: 4, currentGuests: 0, status: 'Available', waiter: '', runningBill: 0 },
  ]

  const reservations = [
    { id: 'RES-001', customer: 'Alice Cooper', table: 'T-04', time: '6:00 PM', guests: 4, status: 'Confirmed' },
    { id: 'RES-002', customer: 'Bob Martin', table: 'T-10', time: '7:30 PM', guests: 2, status: 'Confirmed' },
    { id: 'RES-003', customer: 'Carol White', table: 'T-13', time: '8:00 PM', guests: 6, status: 'Confirmed' },
    { id: 'RES-004', customer: 'David Lee', table: 'T-18', time: '8:30 PM', guests: 8, status: 'Pending' },
    { id: 'RES-005', customer: 'Eva Green', table: 'T-23', time: '9:00 PM', guests: 6, status: 'Confirmed' },
  ]

  const filteredTables = tables.filter(table => {
    const matchesSearch = table.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         table.number.includes(searchTerm)
    const matchesFilter = selectedFilter === 'All' || table.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const totalTables = tables.length
  const occupiedTables = tables.filter(t => t.status === 'Occupied').length
  const reservedTables = tables.filter(t => t.status === 'Reserved').length
  const availableTables = tables.filter(t => t.status === 'Available').length

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-300'
      case 'Occupied': return 'bg-red-100 text-red-700 border-red-300'
      case 'Reserved': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'Cleaning': return 'bg-orange-100 text-orange-700 border-orange-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500'
      case 'Occupied': return 'bg-red-500'
      case 'Reserved': return 'bg-blue-500'
      case 'Cleaning': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const occupancyRate = 42
  const averageTurnoverTime = 45
  const revenuePerTable = 285
  const peakHour = '7:00 PM - 8:00 PM'

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6">
        <div>
          <h1 className="text-[24px] xs:text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight">Tables Management</h1>
          <div className="flex flex-wrap items-center gap-2 xs:gap-4 mt-2">
            <span className="text-[12px] xs:text-[15px] text-slate-500 font-medium">Total Tables: {totalTables}</span>
            <span className="text-[12px] xs:text-[15px] text-slate-500 font-medium hidden sm:inline">|</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-red-600">Occupied: {occupiedTables}</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-blue-600">Reserved: {reservedTables}</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-green-600">Available: {availableTables}</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-slate-600">24</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{totalTables}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Total Tables</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-red-600">{occupiedTables}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{occupiedTables}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Occupied</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-blue-600">{reservedTables}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{reservedTables}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Reserved</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">{availableTables}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{availableTables}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Available</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Table Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 xs:pl-12 pr-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[15px] font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white focus:border-orange-500 transition-all"
            />
            <svg className="w-4 h-4 xs:w-5 xs:h-5 text-slate-400 absolute left-3 xs:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <div className="flex gap-2 xs:gap-3 flex-wrap">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 xs:px-5 py-2 xs:py-3 rounded-xl text-[11px] xs:text-sm font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'gradient-active text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-[#F8FAFC] border border-[#E5E7EB]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Floor Layout */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Restaurant Floor Layout</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 xs:gap-4">
          {filteredTables.map(table => (
            <div
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className={`p-3 xs:p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(table.status)}`}
            >
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <div className={`w-8 h-8 xs:w-10 xs:h-10 ${getStatusBgColor(table.status)} rounded-xl flex items-center justify-center text-white font-bold text-[12px] xs:text-[14px]`}>
                  {table.number}
                </div>
                <span className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getStatusColor(table.status)}`}>
                  {table.status}
                </span>
              </div>
              <div className="space-y-0.5 xs:space-y-1">
                <p className="text-[11px] xs:text-[13px] text-slate-600">Capacity: {table.capacity} seats</p>
                {table.status === 'Occupied' && (
                  <>
                    <p className="text-[11px] xs:text-[13px] text-slate-600">Guests: {table.currentGuests}</p>
                    <p className="text-[11px] xs:text-[13px] text-slate-600 truncate">Waiter: {table.waiter}</p>
                    <p className="text-[11px] xs:text-[13px] font-bold text-orange-500">Bill: ${table.runningBill.toFixed(2)}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Panel */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Today's Reservations</h2>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Table</th>
                <th className="px-4 py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Guests</th>
                <th className="px-4 py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {reservations.map(reservation => (
                <tr key={reservation.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-4 py-3 text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{reservation.customer}</td>
                  <td className="px-4 py-3 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.table}</td>
                  <td className="px-4 py-3 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.time}</td>
                  <td className="px-4 py-3 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.guests}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${reservation.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all" title="View">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all" title="Cancel">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {reservations.map(reservation => (
            <div key={reservation.id} className="bg-[#F8FAFC] rounded-2xl p-3 xs:p-4 border border-[#E5E7EB]">
              <div className="flex items-start justify-between mb-2 xs:mb-3">
                <div>
                  <p className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">{reservation.customer}</p>
                  <p className="text-[11px] xs:text-[12px] text-slate-500">{reservation.table} • {reservation.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${reservation.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {reservation.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] xs:text-[12px] text-slate-500">{reservation.guests} guests</p>
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <button className="p-1.5 xs:p-2 bg-white border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all">
                    <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button className="p-1.5 xs:p-2 bg-white border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all">
                    <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floor Analytics */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Floor Analytics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{occupancyRate}%</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Occupancy Rate</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{averageTurnoverTime}m</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Avg Turnover Time</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">${revenuePerTable}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Revenue Per Table</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{peakHour}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Peak Hour</p>
          </div>
        </div>
      </div>

      {/* Table Details Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setSelectedTable(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-[#0F172A]">Table {selectedTable.number}</h2>
              <button onClick={() => setSelectedTable(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 xs:p-6">
              <div className="space-y-3 xs:space-y-4 mb-4 xs:mb-6">
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Capacity</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedTable.capacity} seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Current Guests</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedTable.currentGuests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Status</span>
                  <span className={`px-2 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getStatusColor(selectedTable.status)}`}>
                    {selectedTable.status}
                  </span>
                </div>
                {selectedTable.waiter && (
                  <div className="flex justify-between">
                    <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Waiter</span>
                    <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedTable.waiter}</span>
                  </div>
                )}
                {selectedTable.runningBill > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Running Bill</span>
                    <span className="text-[12px] xs:text-[14px] font-bold text-orange-500">${selectedTable.runningBill.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 xs:space-y-3">
                {selectedTable.status === 'Available' && (
                  <>
                    <button className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                      Assign Customer
                    </button>
                    <button className="w-full py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                      Create Reservation
                    </button>
                  </>
                )}
                {selectedTable.status === 'Occupied' && (
                  <>
                    <button className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                      View Order
                    </button>
                    <button className="w-full py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                      Transfer Table
                    </button>
                    <button className="w-full py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                      Print Bill
                    </button>
                    <button className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                      Checkout
                    </button>
                  </>
                )}
                {selectedTable.status === 'Reserved' && (
                  <>
                    <button className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                      View Reservation
                    </button>
                    <button className="w-full py-2.5 xs:py-3 bg-white border-2 border-red-300 text-red-600 rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-red-50 transition-all">
                      Cancel Reservation
                    </button>
                  </>
                )}
                {selectedTable.status === 'Cleaning' && (
                  <button className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                    Mark Available
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tables
