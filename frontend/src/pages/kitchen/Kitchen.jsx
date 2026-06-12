import { useState, useEffect } from 'react'

function Kitchen() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTable, setSelectedTable] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [orders, setOrders] = useState([])

  const tables = ['All', 'Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8']
  const priorities = ['All', 'Normal', 'High', 'Urgent']
  const statuses = ['All', 'Pending', 'Preparing', 'Ready']

  const initialOrders = [
    { id: 'KDS-001', table: 'Table 1', customer: 'John Smith', items: [{ name: 'Grilled Salmon', quantity: 2 }, { name: 'Caesar Salad', quantity: 1 }], status: 'Pending', priority: 'Normal', timeReceived: new Date(Date.now() - 5 * 60000), estimatedTime: 15 },
    { id: 'KDS-002', table: 'Table 2', customer: 'Sarah Johnson', items: [{ name: 'Ribeye Steak', quantity: 1 }, { name: 'French Fries', quantity: 2 }], status: 'Pending', priority: 'High', timeReceived: new Date(Date.now() - 10 * 60000), estimatedTime: 20 },
    { id: 'KDS-003', table: 'Table 3', customer: 'Michael Brown', items: [{ name: 'Chicken Parmesan', quantity: 1 }, { name: 'Pasta Carbonara', quantity: 1 }], status: 'Preparing', priority: 'Normal', timeReceived: new Date(Date.now() - 15 * 60000), estimatedTime: 18 },
    { id: 'KDS-004', table: 'Table 4', customer: 'Emily Davis', items: [{ name: 'Vegetable Stir Fry', quantity: 2 }, { name: 'Steamed Vegetables', quantity: 1 }], status: 'Preparing', priority: 'Urgent', timeReceived: new Date(Date.now() - 20 * 60000), estimatedTime: 12 },
    { id: 'KDS-005', table: 'Table 5', customer: 'David Wilson', items: [{ name: 'Coca-Cola', quantity: 4 }, { name: 'Garlic Bread', quantity: 2 }], status: 'Ready', priority: 'Normal', timeReceived: new Date(Date.now() - 25 * 60000), estimatedTime: 10 },
    { id: 'KDS-006', table: 'Table 1', customer: 'Jessica Taylor', items: [{ name: 'Chocolate Cake', quantity: 1 }, { name: 'Ice Cream', quantity: 2 }], status: 'Pending', priority: 'High', timeReceived: new Date(Date.now() - 2 * 60000), estimatedTime: 8 },
    { id: 'KDS-007', table: 'Table 6', customer: 'Robert Anderson', items: [{ name: 'Soup of the Day', quantity: 2 }, { name: 'Fresh Lemonade', quantity: 2 }], status: 'Pending', priority: 'Normal', timeReceived: new Date(Date.now() - 8 * 60000), estimatedTime: 12 },
    { id: 'KDS-008', table: 'Table 2', customer: 'Lisa Martinez', items: [{ name: 'Grilled Salmon', quantity: 1 }, { name: 'Mashed Potatoes', quantity: 2 }], status: 'Preparing', priority: 'Normal', timeReceived: new Date(Date.now() - 18 * 60000), estimatedTime: 20 },
    { id: 'KDS-009', table: 'Table 7', customer: 'James Thomas', items: [{ name: 'Ribeye Steak', quantity: 2 }, { name: 'Iced Tea', quantity: 2 }], status: 'Ready', priority: 'High', timeReceived: new Date(Date.now() - 30 * 60000), estimatedTime: 25 },
    { id: 'KDS-010', table: 'Table 3', customer: 'Maria Garcia', items: [{ name: 'Chicken Parmesan', quantity: 1 }, { name: 'Cheesecake', quantity: 1 }], status: 'Pending', priority: 'Urgent', timeReceived: new Date(Date.now() - 1 * 60000), estimatedTime: 15 },
    { id: 'KDS-011', table: 'Table 8', customer: 'William Robinson', items: [{ name: 'Pasta Carbonara', quantity: 2 }, { name: 'Coffee', quantity: 2 }], status: 'Preparing', priority: 'Normal', timeReceived: new Date(Date.now() - 22 * 60000), estimatedTime: 18 },
    { id: 'KDS-012', table: 'Table 4', customer: 'Susan Clark', items: [{ name: 'Vegetable Stir Fry', quantity: 1 }, { name: 'French Fries', quantity: 1 }], status: 'Ready', priority: 'Normal', timeReceived: new Date(Date.now() - 28 * 60000), estimatedTime: 15 },
    { id: 'KDS-013', table: 'Table 5', customer: 'Daniel Rodriguez', items: [{ name: 'Grilled Salmon', quantity: 1 }, { name: 'Caesar Salad', quantity: 1 }], status: 'Pending', priority: 'Normal', timeReceived: new Date(Date.now() - 12 * 60000), estimatedTime: 16 },
    { id: 'KDS-014', table: 'Table 1', customer: 'Nancy Lewis', items: [{ name: 'Ribeye Steak', quantity: 1 }, { name: 'Mashed Potatoes', quantity: 1 }], status: 'Preparing', priority: 'High', timeReceived: new Date(Date.now() - 25 * 60000), estimatedTime: 22 },
    { id: 'KDS-015', table: 'Table 6', customer: 'Kevin Lee', items: [{ name: 'Chicken Parmesan', quantity: 2 }, { name: 'Garlic Bread', quantity: 2 }], status: 'Ready', priority: 'Normal', timeReceived: new Date(Date.now() - 35 * 60000), estimatedTime: 20 },
  ]

  useEffect(() => {
    setOrders(initialOrders)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getElapsedTime = (timeReceived) => {
    const elapsed = Math.floor((Date.now() - timeReceived.getTime()) / 1000)
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTable = selectedTable === 'All' || order.table === selectedTable
    const matchesPriority = selectedPriority === 'All' || order.priority === selectedPriority
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus
    return matchesSearch && matchesTable && matchesPriority && matchesStatus
  })

  const pendingOrders = filteredOrders.filter(o => o.status === 'Pending')
  const preparingOrders = filteredOrders.filter(o => o.status === 'Preparing')
  const readyOrders = filteredOrders.filter(o => o.status === 'Ready')

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Normal': return 'bg-gray-100 text-gray-700'
      case 'High': return 'bg-orange-100 text-orange-700'
      case 'Urgent': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Preparing': return 'bg-orange-100 text-orange-700'
      case 'Ready': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getColumnColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 border-yellow-200'
      case 'Preparing': return 'bg-orange-50 border-orange-200'
      case 'Ready': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const averagePrepTime = 18
  const ordersCompletedToday = 42
  const activeChefs = 4
  const kitchenEfficiency = 87

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6">
        <div>
          <h1 className="text-[24px] xs:text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight">Kitchen Display System</h1>
          <div className="flex flex-wrap items-center gap-2 xs:gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[12px] xs:text-[14px] font-semibold text-green-600">Live</span>
            </div>
            <span className="text-[13px] xs:text-[15px] text-slate-500 font-medium">{currentTime.toLocaleTimeString()}</span>
            <span className="text-[13px] xs:text-[15px] text-slate-500 font-medium hidden sm:inline">|</span>
            <span className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{filteredOrders.length} Active Orders</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-yellow-600">+3</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{pendingOrders.length}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Pending Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-orange-600">+2</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{preparingOrders.length}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Preparing Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">+5</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{readyOrders.length}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Ready Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-blue-600">-2min</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{averagePrepTime}m</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Avg Prep Time</p>
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
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {tables.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kitchen Order Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 mb-4 xs:mb-6">
        {/* Pending Column */}
        <div className={`rounded-2xl p-3 xs:p-4 border-2 ${getColumnColor('Pending')}`}>
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A]">Pending</h2>
            <span className="px-2 xs:px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] xs:text-[12px] font-semibold">{pendingOrders.length}</span>
          </div>
          <div className="space-y-3 xs:space-y-4">
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-3 xs:p-4 enterprise-shadow card-hover border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2 xs:mb-3">
                  <span className="text-[12px] xs:text-[14px] font-bold text-[#0F172A]">{order.id}</span>
                  <span className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getPriorityColor(order.priority)}`}>{order.priority}</span>
                </div>
                <div className="mb-2 xs:mb-3">
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500">{order.table}</p>
                  <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{order.customer}</p>
                </div>
                <div className="mb-2 xs:mb-3 space-y-0.5 xs:space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-[11px] xs:text-[13px]">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-semibold text-[#0F172A]">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2 xs:mb-3 text-[10px] xs:text-[12px] text-slate-500">
                  <span>Received: {order.timeReceived.toLocaleTimeString()}</span>
                  <span>Est: {order.estimatedTime}m</span>
                </div>
                <div className="flex items-center justify-between mb-2 xs:mb-3">
                  <span className="text-[10px] xs:text-[12px] text-slate-500">Elapsed: {getElapsedTime(order.timeReceived)}</span>
                </div>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Preparing')}
                  className="w-full py-1.5 xs:py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl text-[11px] xs:text-[13px] font-semibold hover:shadow-lg transition-all shadow-md"
                >
                  Start Cooking
                </button>
              </div>
            ))}
            {pendingOrders.length === 0 && (
              <p className="text-[12px] xs:text-[14px] text-slate-400 text-center py-6 xs:py-8">No pending orders</p>
            )}
          </div>
        </div>

        {/* Preparing Column */}
        <div className={`rounded-2xl p-3 xs:p-4 border-2 ${getColumnColor('Preparing')}`}>
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A]">Preparing</h2>
            <span className="px-2 xs:px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] xs:text-[12px] font-semibold">{preparingOrders.length}</span>
          </div>
          <div className="space-y-3 xs:space-y-4">
            {preparingOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-3 xs:p-4 enterprise-shadow card-hover border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2 xs:mb-3">
                  <span className="text-[12px] xs:text-[14px] font-bold text-[#0F172A]">{order.id}</span>
                  <span className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getPriorityColor(order.priority)}`}>{order.priority}</span>
                </div>
                <div className="mb-2 xs:mb-3">
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500">{order.table}</p>
                  <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{order.customer}</p>
                </div>
                <div className="mb-2 xs:mb-3 space-y-0.5 xs:space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-[11px] xs:text-[13px]">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-semibold text-[#0F172A]">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2 xs:mb-3 text-[10px] xs:text-[12px] text-slate-500">
                  <span>Received: {order.timeReceived.toLocaleTimeString()}</span>
                  <span>Est: {order.estimatedTime}m</span>
                </div>
                <div className="flex items-center justify-between mb-2 xs:mb-3">
                  <span className="text-[10px] xs:text-[12px] text-slate-500">Elapsed: {getElapsedTime(order.timeReceived)}</span>
                </div>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Ready')}
                  className="w-full py-1.5 xs:py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-[11px] xs:text-[13px] font-semibold hover:shadow-lg transition-all shadow-md"
                >
                  Mark Ready
                </button>
              </div>
            ))}
            {preparingOrders.length === 0 && (
              <p className="text-[12px] xs:text-[14px] text-slate-400 text-center py-6 xs:py-8">No orders preparing</p>
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div className={`rounded-2xl p-3 xs:p-4 border-2 ${getColumnColor('Ready')}`}>
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A]">Ready</h2>
            <span className="px-2 xs:px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] xs:text-[12px] font-semibold">{readyOrders.length}</span>
          </div>
          <div className="space-y-3 xs:space-y-4">
            {readyOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-3 xs:p-4 enterprise-shadow card-hover border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2 xs:mb-3">
                  <span className="text-[12px] xs:text-[14px] font-bold text-[#0F172A]">{order.id}</span>
                  <span className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getPriorityColor(order.priority)}`}>{order.priority}</span>
                </div>
                <div className="mb-2 xs:mb-3">
                  <p className="text-[11px] xs:text-[13px] font-semibold text-slate-500">{order.table}</p>
                  <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{order.customer}</p>
                </div>
                <div className="mb-2 xs:mb-3 space-y-0.5 xs:space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-[11px] xs:text-[13px]">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-semibold text-[#0F172A]">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2 xs:mb-3 text-[10px] xs:text-[12px] text-slate-500">
                  <span>Received: {order.timeReceived.toLocaleTimeString()}</span>
                  <span>Est: {order.estimatedTime}m</span>
                </div>
                <div className="flex items-center justify-between mb-2 xs:mb-3">
                  <span className="text-[10px] xs:text-[12px] text-slate-500">Elapsed: {getElapsedTime(order.timeReceived)}</span>
                </div>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Served')}
                  className="w-full py-1.5 xs:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-[11px] xs:text-[13px] font-semibold hover:shadow-lg transition-all shadow-md"
                >
                  Mark Served
                </button>
              </div>
            ))}
            {readyOrders.length === 0 && (
              <p className="text-[12px] xs:text-[14px] text-slate-400 text-center py-6 xs:py-8">No orders ready</p>
            )}
          </div>
        </div>
      </div>

      {/* Kitchen Performance Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Kitchen Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{averagePrepTime}m</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Avg Prep Time</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{ordersCompletedToday}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Completed Today</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{activeChefs}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Active Chefs</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{kitchenEfficiency}%</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Kitchen Efficiency</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kitchen
