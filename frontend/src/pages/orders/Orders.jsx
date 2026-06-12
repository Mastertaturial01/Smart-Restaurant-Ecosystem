import { useState } from 'react'

function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedDate, setSelectedDate] = useState('All')
  const [selectedTable, setSelectedTable] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('time')
  const [sortOrder, setSortOrder] = useState('desc')
  const itemsPerPage = 10

  const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled']
  const tables = ['All', 'Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8']

  const orders = [
    { id: 'ORD-001', customer: 'John Smith', table: 'Table 1', items: [{ name: 'Grilled Salmon', quantity: 2, price: 24.99 }, { name: 'Caesar Salad', quantity: 1, price: 12.99 }], amount: 62.97, status: 'Pending', time: '10:30 AM' },
    { id: 'ORD-002', customer: 'Sarah Johnson', table: 'Table 2', items: [{ name: 'Ribeye Steak', quantity: 1, price: 32.99 }, { name: 'French Fries', quantity: 2, price: 4.99 }], amount: 42.97, status: 'Preparing', time: '10:45 AM' },
    { id: 'ORD-003', customer: 'Michael Brown', table: 'Table 3', items: [{ name: 'Chicken Parmesan', quantity: 1, price: 18.99 }, { name: 'Pasta Carbonara', quantity: 1, price: 16.99 }], amount: 35.98, status: 'Ready', time: '11:00 AM' },
    { id: 'ORD-004', customer: 'Emily Davis', table: 'Table 4', items: [{ name: 'Vegetable Stir Fry', quantity: 2, price: 14.99 }, { name: 'Steamed Vegetables', quantity: 1, price: 5.49 }], amount: 35.47, status: 'Completed', time: '11:15 AM' },
    { id: 'ORD-005', customer: 'David Wilson', table: 'Table 5', items: [{ name: 'Coca-Cola', quantity: 4, price: 2.99 }, { name: 'Garlic Bread', quantity: 2, price: 6.99 }], amount: 25.94, status: 'Pending', time: '11:30 AM' },
    { id: 'ORD-006', customer: 'Jessica Taylor', table: 'Table 1', items: [{ name: 'Chocolate Cake', quantity: 1, price: 7.99 }, { name: 'Ice Cream', quantity: 2, price: 5.99 }], amount: 19.97, status: 'Preparing', time: '11:45 AM' },
    { id: 'ORD-007', customer: 'Robert Anderson', table: 'Table 6', items: [{ name: 'Soup of the Day', quantity: 2, price: 8.99 }, { name: 'Fresh Lemonade', quantity: 2, price: 4.99 }], amount: 27.96, status: 'Ready', time: '12:00 PM' },
    { id: 'ORD-008', customer: 'Lisa Martinez', table: 'Table 2', items: [{ name: 'Grilled Salmon', quantity: 1, price: 24.99 }, { name: 'Mashed Potatoes', quantity: 2, price: 4.49 }], amount: 33.97, status: 'Completed', time: '12:15 PM' },
    { id: 'ORD-009', customer: 'James Thomas', table: 'Table 7', items: [{ name: 'Ribeye Steak', quantity: 2, price: 32.99 }, { name: 'Iced Tea', quantity: 2, price: 3.99 }], amount: 73.96, status: 'Pending', time: '12:30 PM' },
    { id: 'ORD-010', customer: 'Maria Garcia', table: 'Table 3', items: [{ name: 'Chicken Parmesan', quantity: 1, price: 18.99 }, { name: 'Cheesecake', quantity: 1, price: 8.99 }], amount: 27.98, status: 'Preparing', time: '12:45 PM' },
    { id: 'ORD-011', customer: 'William Robinson', table: 'Table 8', items: [{ name: 'Pasta Carbonara', quantity: 2, price: 16.99 }, { name: 'Coffee', quantity: 2, price: 3.49 }], amount: 40.96, status: 'Ready', time: '1:00 PM' },
    { id: 'ORD-012', customer: 'Susan Clark', table: 'Table 4', items: [{ name: 'Vegetable Stir Fry', quantity: 1, price: 14.99 }, { name: 'French Fries', quantity: 1, price: 4.99 }], amount: 19.98, status: 'Completed', time: '1:15 PM' },
    { id: 'ORD-013', customer: 'Daniel Rodriguez', table: 'Table 5', items: [{ name: 'Grilled Salmon', quantity: 1, price: 24.99 }, { name: 'Caesar Salad', quantity: 1, price: 12.99 }], amount: 37.98, status: 'Pending', time: '1:30 PM' },
    { id: 'ORD-014', customer: 'Nancy Lewis', table: 'Table 1', items: [{ name: 'Ribeye Steak', quantity: 1, price: 32.99 }, { name: 'Mashed Potatoes', quantity: 1, price: 4.49 }], amount: 37.48, status: 'Preparing', time: '1:45 PM' },
    { id: 'ORD-015', customer: 'Kevin Lee', table: 'Table 6', items: [{ name: 'Chicken Parmesan', quantity: 2, price: 18.99 }, { name: 'Garlic Bread', quantity: 2, price: 6.99 }], amount: 53.96, status: 'Ready', time: '2:00 PM' },
    { id: 'ORD-016', customer: 'Betty Walker', table: 'Table 2', items: [{ name: 'Pasta Carbonara', quantity: 1, price: 16.99 }, { name: 'Steamed Vegetables', quantity: 1, price: 5.49 }], amount: 22.48, status: 'Completed', time: '2:15 PM' },
    { id: 'ORD-017', customer: 'Mark Hall', table: 'Table 7', items: [{ name: 'Vegetable Stir Fry', quantity: 2, price: 14.99 }, { name: 'Fresh Lemonade', quantity: 2, price: 4.99 }], amount: 39.96, status: 'Pending', time: '2:30 PM' },
    { id: 'ORD-018', customer: 'Dorothy Young', table: 'Table 3', items: [{ name: 'Grilled Salmon', quantity: 1, price: 24.99 }, { name: 'Chocolate Cake', quantity: 1, price: 7.99 }], amount: 32.98, status: 'Preparing', time: '2:45 PM' },
    { id: 'ORD-019', customer: 'Paul King', table: 'Table 8', items: [{ name: 'Ribeye Steak', quantity: 1, price: 32.99 }, { name: 'French Fries', quantity: 2, price: 4.99 }], amount: 42.97, status: 'Ready', time: '3:00 PM' },
    { id: 'ORD-020', customer: 'Patricia Wright', table: 'Table 4', items: [{ name: 'Chicken Parmesan', quantity: 1, price: 18.99 }, { name: 'Ice Cream', quantity: 1, price: 5.99 }], amount: 24.98, status: 'Completed', time: '3:15 PM' },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus
    const matchesTable = selectedTable === 'All' || order.table === selectedTable
    return matchesSearch && matchesStatus && matchesTable
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0
    if (sortBy === 'time') {
      comparison = a.time.localeCompare(b.time)
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount
    } else if (sortBy === 'status') {
      comparison = a.status.localeCompare(b.status)
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === 'Pending').length
  const preparingOrders = orders.filter(o => o.status === 'Preparing').length
  const completedOrders = orders.filter(o => o.status === 'Completed').length

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Preparing': return 'bg-blue-100 text-blue-700'
      case 'Ready': return 'bg-green-100 text-green-700'
      case 'Completed': return 'bg-gray-100 text-gray-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      <h1 className="text-[28px] xs:text-[32px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight mb-4 xs:mb-6">Orders</h1>

      {/* Order Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6 sm:mb-8">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">+12%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{totalOrders}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-yellow-600">+5%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{pendingOrders}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Pending Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-blue-600">+8%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{preparingOrders}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Preparing Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">+15%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{completedOrders}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Completed Orders</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Order ID / Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 xs:pl-12 pr-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[15px] font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white focus:border-orange-500 transition-all"
            />
            <svg className="w-4 h-4 xs:w-5 xs:h-5 text-slate-400 absolute left-3 xs:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>

          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {tables.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl enterprise-shadow card-hover border border-[#E5E7EB] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-orange-500" onClick={() => handleSort('id')}>
                  Order ID {sortBy === 'id' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Table</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-orange-500" onClick={() => handleSort('amount')}>
                  Amount {sortBy === 'amount' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-orange-500" onClick={() => handleSort('status')}>
                  Status {sortBy === 'status' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-orange-500" onClick={() => handleSort('time')}>
                  Time {sortBy === 'time' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {paginatedOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{order.id}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{order.customer}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{order.table}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{order.items.length}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-bold text-orange-500">${order.amount.toFixed(2)}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4">
                    <span className={`px-2 xs:px-3 py-1 rounded-full text-[10px] xs:text-[12px] font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{order.time}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all"
                        title="View"
                      >
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all" title="Edit">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all" title="Print">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
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
        <div className="md:hidden p-4 space-y-4">
          {paginatedOrders.map(order => (
            <div key={order.id} className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E5E7EB]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">{order.id}</p>
                  <p className="text-[12px] text-slate-500">{order.customer}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-[11px] text-slate-500">Table</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{order.table}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Items</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{order.items.length}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Amount</p>
                  <p className="text-[13px] font-bold text-orange-500">${order.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Time</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{order.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all"
                >
                  View
                </button>
                <button className="flex-1 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[12px] font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 xs:px-6 py-3 xs:py-4 bg-[#F8FAFC] border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] xs:text-[14px] text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders
          </p>
          <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 xs:px-4 py-1.5 xs:py-2 bg-white border border-[#E5E7EB] rounded-lg text-[12px] xs:text-[14px] font-semibold text-slate-700 hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 xs:px-4 py-1.5 xs:py-2 rounded-lg text-[12px] xs:text-[14px] font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'bg-white border border-[#E5E7EB] text-slate-700 hover:bg-[#F8FAFC]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 xs:px-4 py-1.5 xs:py-2 bg-white border border-[#E5E7EB] rounded-lg text-[12px] xs:text-[14px] font-semibold text-slate-700 hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Drawer/Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-[#0F172A]">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 xs:p-6">
              <div className="grid grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
                <div>
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-1">Customer</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-1">Table</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedOrder.table}</p>
                </div>
                <div>
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-1">Order ID</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-1">Time</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedOrder.time}</p>
                </div>
              </div>

              <div className="mb-4 xs:mb-6">
                <h3 className="text-[16px] xs:text-[18px] font-bold text-[#0F172A] mb-3 xs:mb-4">Ordered Items</h3>
                <div className="space-y-2 xs:space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
                      <div>
                        <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{item.name}</p>
                        <p className="text-[11px] xs:text-[13px] text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[14px] xs:text-[16px] font-bold text-orange-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-4 xs:pt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] xs:text-[15px] font-semibold text-slate-500">Subtotal</span>
                  <span className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">${selectedOrder.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] xs:text-[15px] font-semibold text-slate-500">Tax (8%)</span>
                  <span className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">${(selectedOrder.amount * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[16px] xs:text-[18px] font-bold pt-2 border-t border-[#E5E7EB]">
                  <span className="text-[#0F172A]">Total</span>
                  <span className="text-orange-500">${(selectedOrder.amount * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 xs:mt-6 pt-4 xs:pt-6 border-t border-[#E5E7EB]">
                <h3 className="text-[16px] xs:text-[18px] font-bold text-[#0F172A] mb-3 xs:mb-4">Order Status Timeline</h3>
                <div className="space-y-3 xs:space-y-4">
                  <div className="flex items-center gap-3 xs:gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-[12px] xs:text-[14px] font-medium text-slate-700">Order Placed - {selectedOrder.time}</p>
                  </div>
                  <div className="flex items-center gap-3 xs:gap-4">
                    <div className={`w-3 h-3 rounded-full ${['Pending', 'Preparing', 'Ready', 'Completed'].includes(selectedOrder.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <p className="text-[12px] xs:text-[14px] font-medium text-slate-700">Order Confirmed</p>
                  </div>
                  <div className="flex items-center gap-3 xs:gap-4">
                    <div className={`w-3 h-3 rounded-full ${['Preparing', 'Ready', 'Completed'].includes(selectedOrder.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <p className="text-[12px] xs:text-[14px] font-medium text-slate-700">Preparing</p>
                  </div>
                  <div className="flex items-center gap-3 xs:gap-4">
                    <div className={`w-3 h-3 rounded-full ${['Ready', 'Completed'].includes(selectedOrder.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <p className="text-[12px] xs:text-[14px] font-medium text-slate-700">Ready</p>
                  </div>
                  <div className="flex items-center gap-3 xs:gap-4">
                    <div className={`w-3 h-3 rounded-full ${selectedOrder.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <p className="text-[12px] xs:text-[14px] font-medium text-slate-700">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
