import { useState } from 'react'

function Reservations() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [showNewReservationForm, setShowNewReservationForm] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)

  const filters = ['All', 'Confirmed', 'Pending', 'Cancelled', 'Completed']

  const reservations = [
    { id: 'RES-001', customer: 'Alice Cooper', phone: '+1 555-0101', email: 'alice@email.com', date: '2024-06-06', time: '6:00 PM', guests: 4, table: 'T-04', status: 'Confirmed', notes: 'Birthday celebration' },
    { id: 'RES-002', customer: 'Bob Martin', phone: '+1 555-0102', email: 'bob@email.com', date: '2024-06-06', time: '7:30 PM', guests: 2, table: 'T-10', status: 'Confirmed', notes: 'Anniversary dinner' },
    { id: 'RES-003', customer: 'Carol White', phone: '+1 555-0103', email: 'carol@email.com', date: '2024-06-06', time: '8:00 PM', guests: 6, table: 'T-13', status: 'Pending', notes: 'Business meeting' },
    { id: 'RES-004', customer: 'David Lee', phone: '+1 555-0104', email: 'david@email.com', date: '2024-06-06', time: '8:30 PM', guests: 8, table: 'T-18', status: 'Pending', notes: '' },
    { id: 'RES-005', customer: 'Eva Green', phone: '+1 555-0105', email: 'eva@email.com', date: '2024-06-06', time: '9:00 PM', guests: 6, table: 'T-23', status: 'Confirmed', notes: 'Family gathering' },
    { id: 'RES-006', customer: 'Frank Black', phone: '+1 555-0106', email: 'frank@email.com', date: '2024-06-07', time: '6:00 PM', guests: 4, table: 'T-02', status: 'Confirmed', notes: '' },
    { id: 'RES-007', customer: 'Grace Brown', phone: '+1 555-0107', email: 'grace@email.com', date: '2024-06-07', time: '7:00 PM', guests: 2, table: 'T-06', status: 'Pending', notes: 'Vegan meal required' },
    { id: 'RES-008', customer: 'Henry Davis', phone: '+1 555-0108', email: 'henry@email.com', date: '2024-06-07', time: '8:00 PM', guests: 5, table: 'T-11', status: 'Confirmed', notes: '' },
    { id: 'RES-009', customer: 'Ivy Wilson', phone: '+1 555-0109', email: 'ivy@email.com', date: '2024-06-08', time: '6:30 PM', guests: 3, table: 'T-05', status: 'Confirmed', notes: 'Allergy to nuts' },
    { id: 'RES-010', customer: 'Jack Taylor', phone: '+1 555-0110', email: 'jack@email.com', date: '2024-06-08', time: '7:30 PM', guests: 4, table: 'T-09', status: 'Pending', notes: '' },
    { id: 'RES-011', customer: 'Karen Anderson', phone: '+1 555-0111', email: 'karen@email.com', date: '2024-06-08', time: '8:30 PM', guests: 6, table: 'T-14', status: 'Confirmed', notes: 'Corporate event' },
    { id: 'RES-012', customer: 'Leo Martinez', phone: '+1 555-0112', email: 'leo@email.com', date: '2024-06-09', time: '6:00 PM', guests: 2, table: 'T-01', status: 'Cancelled', notes: 'Customer cancelled' },
    { id: 'RES-013', customer: 'Mia Thomas', phone: '+1 555-0113', email: 'mia@email.com', date: '2024-06-09', time: '7:00 PM', guests: 4, table: 'T-03', status: 'Confirmed', notes: '' },
    { id: 'RES-014', customer: 'Noah Garcia', phone: '+1 555-0114', email: 'noah@email.com', date: '2024-06-09', time: '8:00 PM', guests: 8, table: 'T-17', status: 'Pending', notes: 'Large party' },
    { id: 'RES-015', customer: 'Olivia Robinson', phone: '+1 555-0115', email: 'olivia@email.com', date: '2024-06-10', time: '6:30 PM', guests: 3, table: 'T-07', status: 'Confirmed', notes: '' },
    { id: 'RES-016', customer: 'Peter Clark', phone: '+1 555-0116', email: 'peter@email.com', date: '2024-06-10', time: '7:30 PM', guests: 5, table: 'T-12', status: 'Confirmed', notes: 'Gluten-free menu' },
    { id: 'RES-017', customer: 'Quinn Lewis', phone: '+1 555-0117', email: 'quinn@email.com', date: '2024-06-11', time: '8:00 PM', guests: 4, table: 'T-16', status: 'Pending', notes: '' },
    { id: 'RES-018', customer: 'Rachel Walker', phone: '+1 555-0118', email: 'rachel@email.com', date: '2024-06-11', time: '9:00 PM', guests: 2, table: 'T-19', status: 'Confirmed', notes: 'Date night' },
    { id: 'RES-019', customer: 'Sam Hall', phone: '+1 555-0119', email: 'sam@email.com', date: '2024-06-12', time: '6:00 PM', guests: 6, table: 'T-21', status: 'Confirmed', notes: 'Reunion dinner' },
    { id: 'RES-020', customer: 'Tina Young', phone: '+1 555-0120', email: 'tina@email.com', date: '2024-06-12', time: '7:30 PM', guests: 4, table: 'T-24', status: 'Completed', notes: 'Already served' },
  ]

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reservation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.phone.includes(searchTerm)
    const matchesFilter = selectedFilter === 'All' || reservation.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const totalReservations = reservations.length
  const confirmedReservations = reservations.filter(r => r.status === 'Confirmed').length
  const pendingReservations = reservations.filter(r => r.status === 'Pending').length
  const cancelledReservations = reservations.filter(r => r.status === 'Cancelled').length

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-orange-100 text-orange-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      case 'Completed': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const updateReservationStatus = (reservationId, newStatus) => {
    setSelectedReservation(null)
  }

  const upcomingReservations = reservations.filter(r => r.status === 'Confirmed' && r.date >= '2024-06-06').slice(0, 5)

  const reservationSuccessRate = 85
  const peakReservationHours = '7:00 PM - 8:00 PM'
  const averagePartySize = 4
  const weeklyReservationTrends = '+12%'

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
        <div>
          <h1 className="text-[24px] xs:text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight">Reservations</h1>
          <div className="flex flex-wrap items-center gap-2 xs:gap-4 mt-2">
            <span className="text-[12px] xs:text-[15px] text-slate-500 font-medium">Today's Reservations: 5</span>
            <span className="text-[12px] xs:text-[15px] text-slate-500 font-medium hidden sm:inline">|</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-green-600">Confirmed: {confirmedReservations}</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-orange-600">Pending: {pendingReservations}</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-red-600">Cancelled: {cancelledReservations}</span>
          </div>
        </div>
        <button
          onClick={() => setShowNewReservationForm(true)}
          className="px-4 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md"
        >
          + New Reservation
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-slate-600">+5</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{totalReservations}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Total Reservations</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">{confirmedReservations}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{confirmedReservations}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Confirmed</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-orange-600">{pendingReservations}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{pendingReservations}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Pending</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-red-600">{cancelledReservations}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{cancelledReservations}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Cancelled</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Name, Phone, or Reservation ID..."
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

      {/* Reservation Management Table */}
      <div className="bg-white rounded-2xl enterprise-shadow card-hover border border-[#E5E7EB] overflow-hidden mb-4 xs:mb-6">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Reservation ID</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Guests</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Table</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 xs:px-6 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredReservations.map(reservation => (
                <tr key={reservation.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{reservation.id}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.customer}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.phone}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.date}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.time}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.guests}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4 text-[12px] xs:text-[14px] font-medium text-slate-700">{reservation.table}</td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4">
                    <span className={`px-2 xs:px-3 py-1 rounded-full text-[11px] xs:text-[12px] font-semibold ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-4 xs:px-6 py-3 xs:py-4">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <button
                        onClick={() => setSelectedReservation(reservation)}
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
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-green-50 hover:text-green-500 hover:border-green-500 transition-all" title="Confirm">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </button>
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all" title="Cancel">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all" title="Delete">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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
          {filteredReservations.map(reservation => (
            <div key={reservation.id} className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E5E7EB]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">{reservation.customer}</p>
                  <p className="text-[12px] text-slate-500">{reservation.id}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${getStatusColor(reservation.status)}`}>
                  {reservation.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-[11px] text-slate-500">Date</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{reservation.date}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Time</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{reservation.time}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Guests</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{reservation.guests}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Table</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{reservation.table}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => setSelectedReservation(reservation)}
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
      </div>

      {/* Table Availability Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Table Availability</h2>
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center justify-between p-3 xs:p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">Available Tables</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">Ready for reservation</p>
                </div>
              </div>
              <span className="text-[20px] xs:text-[24px] font-bold text-green-600">8</span>
            </div>

            <div className="flex items-center justify-between p-3 xs:p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">Reserved Tables</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">Currently reserved</p>
                </div>
              </div>
              <span className="text-[20px] xs:text-[24px] font-bold text-blue-600">5</span>
            </div>

            <div className="flex items-center justify-between p-3 xs:p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="w-8 h-8 xs:w-10 xs:h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">Occupied Tables</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">Currently in use</p>
                </div>
              </div>
              <span className="text-[20px] xs:text-[24px] font-bold text-red-600">8</span>
            </div>
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Upcoming Reservations</h2>
          <div className="space-y-2 xs:space-y-3">
            {upcomingReservations.map(reservation => (
              <div key={reservation.id} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{reservation.customer}</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">{reservation.date} at {reservation.time} • {reservation.guests} guests</p>
                </div>
                <span className={`px-2 xs:px-3 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getStatusColor(reservation.status)}`}>
                  {reservation.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Reservation Analytics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{reservationSuccessRate}%</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Success Rate</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{peakReservationHours}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Peak Hours</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{averagePartySize}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Avg Party Size</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{weeklyReservationTrends}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Weekly Trends</p>
          </div>
        </div>
      </div>

      {/* New Reservation Form Modal */}
      {showNewReservationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setShowNewReservationForm(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-[#0F172A]">New Reservation</h2>
              <button onClick={() => setShowNewReservationForm(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 xs:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Customer Name</label>
                  <input type="text" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter customer name" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Phone Number</label>
                  <input type="text" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Email</label>
                  <input type="email" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter email" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Reservation Date</label>
                  <input type="date" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Reservation Time</label>
                  <input type="time" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Number of Guests</label>
                  <input type="number" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter number of guests" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Preferred Table</label>
                  <select className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Select table</option>
                    <option value="T-01">T-01 (2 seats)</option>
                    <option value="T-02">T-02 (2 seats)</option>
                    <option value="T-03">T-03 (4 seats)</option>
                    <option value="T-04">T-04 (4 seats)</option>
                    <option value="T-05">T-05 (6 seats)</option>
                    <option value="T-06">T-06 (2 seats)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Special Notes</label>
                  <textarea className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" rows="3" placeholder="Enter any special requests or notes"></textarea>
                </div>
              </div>
              <div className="flex gap-2 xs:gap-3 mt-4 xs:mt-6">
                <button onClick={() => setShowNewReservationForm(false)} className="flex-1 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                  Cancel
                </button>
                <button onClick={() => setShowNewReservationForm(false)} className="flex-1 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                  Create Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Details Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setSelectedReservation(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-[#0F172A]">Reservation Details</h2>
              <button onClick={() => setSelectedReservation(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 xs:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Reservation ID</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.id}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Status</p>
                  <span className={`px-2 xs:px-3 py-1 rounded-full text-[11px] xs:text-[12px] font-semibold ${getStatusColor(selectedReservation.status)}`}>
                    {selectedReservation.status}
                  </span>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Customer Name</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.customer}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Phone</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.phone}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Email</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.email}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Table</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.table}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Date</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.date}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Time</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.time}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Guests</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.guests}</p>
                </div>
                <div>
                  <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Special Notes</p>
                  <p className="text-[14px] xs:text-[16px] font-semibold text-[#0F172A]">{selectedReservation.notes || 'None'}</p>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-4 xs:pt-6">
                <h3 className="text-[16px] xs:text-[18px] font-bold text-[#0F172A] mb-3 xs:mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-3 xs:gap-4">
                  <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
                    <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Total Reservations</p>
                    <p className="text-[18px] xs:text-[20px] font-bold text-[#0F172A]">5</p>
                  </div>
                  <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
                    <p className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1">Visit History</p>
                    <p className="text-[18px] xs:text-[20px] font-bold text-[#0F172A]">3 visits</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 xs:gap-3 mt-4 xs:mt-6">
                <button onClick={() => setSelectedReservation(null)} className="flex-1 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                  Close
                </button>
                {selectedReservation.status === 'Pending' && (
                  <button onClick={() => updateReservationStatus(selectedReservation.id, 'Confirmed')} className="flex-1 py-2.5 xs:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                    Confirm Reservation
                  </button>
                )}
                {selectedReservation.status === 'Confirmed' && (
                  <button onClick={() => updateReservationStatus(selectedReservation.id, 'Cancelled')} className="flex-1 py-2.5 xs:py-3 bg-white border-2 border-red-300 text-red-600 rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-red-50 transition-all">
                    Cancel Reservation
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

export default Reservations
