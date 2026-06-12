import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

function Dashboard() {
  const revenueChartRef = useRef(null)
  const orderStatusChartRef = useRef(null)
  const revenueChartInstanceRef = useRef(null)
  const orderStatusChartInstanceRef = useRef(null)

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  useEffect(() => {
    // Revenue Chart
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext('2d')
      
      if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy()
      }
      
      const gradientThisWeek = ctx.createLinearGradient(0, 0, 0, 300)
      gradientThisWeek.addColorStop(0, 'rgba(249, 115, 22, 0.9)')
      gradientThisWeek.addColorStop(1, 'rgba(249, 115, 22, 0.4)')
      
      const gradientLastWeek = ctx.createLinearGradient(0, 0, 0, 300)
      gradientLastWeek.addColorStop(0, 'rgba(148, 163, 184, 0.6)')
      gradientLastWeek.addColorStop(1, 'rgba(148, 163, 184, 0.2)')

      revenueChartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'This Week',
              data: [6500, 7200, 6800, 8100, 9200, 8800, 7500],
              backgroundColor: gradientThisWeek,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            },
            {
              label: 'Last Week',
              data: [5800, 6400, 6100, 7200, 8300, 7900, 6800],
              backgroundColor: gradientLastWeek,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            }
          ]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  family: 'Plus Jakarta Sans',
                  size: 13,
                  weight: 600
                },
                color: '#64748B'
              }
            },
            tooltip: {
              backgroundColor: '#0F172A',
              titleFont: {
                family: 'Plus Jakarta Sans',
                size: 14,
                weight: 700
              },
              bodyFont: {
                family: 'Plus Jakarta Sans',
                size: 13,
                weight: 500
              },
              padding: 16,
              cornerRadius: 12,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': $' + context.parsed.y.toLocaleString()
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(226, 232, 240, 0.6)',
                drawBorder: false,
              },
              ticks: {
                font: {
                  family: 'Plus Jakarta Sans',
                  size: 12,
                  weight: 500
                },
                color: '#64748B',
                callback: function(value) {
                  return '$' + value.toLocaleString()
                }
              },
              border: {
                display: false
              }
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  family: 'Plus Jakarta Sans',
                  size: 12,
                  weight: 600
                },
                color: '#64748B'
              },
              border: {
                display: false
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      })
    }

    // Order Status Donut Chart
    if (orderStatusChartRef.current) {
      const orderStatusCtx = orderStatusChartRef.current.getContext('2d')
      
      if (Chart.getChart(orderStatusCtx)) {
        Chart.getChart(orderStatusCtx).destroy()
      }
      
      orderStatusChartInstanceRef.current = new Chart(orderStatusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Preparing', 'Pending', 'Cancelled'],
          datasets: [{
            data: [287, 32, 15, 8],
            backgroundColor: [
              '#10B981',
              '#F97316',
              '#F59E0B',
              '#EF4444'
            ],
            borderWidth: 0,
            cutout: '75%',
            borderRadius: 8,
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#0F172A',
              titleFont: {
                family: 'Plus Jakarta Sans',
                size: 14,
                weight: 700
              },
              bodyFont: {
                family: 'Plus Jakarta Sans',
                size: 13,
                weight: 500
              },
              padding: 16,
              cornerRadius: 12,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = ((context.parsed / total) * 100).toFixed(1)
                  return context.label + ': ' + context.parsed + ' orders (' + percentage + '%)'
                }
              }
            }
          }
        }
      })
    }

    return () => {
      if (revenueChartInstanceRef.current) {
        revenueChartInstanceRef.current.destroy()
      }
      if (orderStatusChartInstanceRef.current) {
        orderStatusChartInstanceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 mb-6 xs:mb-8">
        {/* Card 1: Total Revenue */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 xs:w-8 xs:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </div>
          <p className="text-[12px] xs:text-[14px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">Total Revenue</p>
          <p className="text-[32px] xs:text-[40px] lg:text-[48px] font-bold text-[#0F172A] mb-3 leading-none">$48.8k</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-[13px] font-bold text-emerald-700">12.5%</span>
            </div>
            <span className="text-[13px] text-slate-400 font-medium">vs last month</span>
          </div>
          {/* Sparkline */}
          <svg className="w-full h-12 xs:h-16" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="sparkline1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#10B981',stopOpacity:0.3}} />
                <stop offset="100%" style={{stopColor:'#10B981',stopOpacity:0}} />
              </linearGradient>
            </defs>
            <path className="sparkline" d="M0,30 Q10,25 20,28 T40,20 T60,15 T80,10 T100,5" fill="url(#sparkline1)" stroke="none"/>
            <path className="sparkline" d="M0,30 Q10,25 20,28 T40,20 T60,15 T80,10 T100,5" fill="none" stroke="#10B981" strokeWidth="2.5"/>
          </svg>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 xs:w-8 xs:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </div>
          <p className="text-[12px] xs:text-[14px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">Total Orders</p>
          <p className="text-[32px] xs:text-[40px] lg:text-[48px] font-bold text-[#0F172A] mb-3 leading-none">342</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-[13px] font-bold text-emerald-700">8.2%</span>
            </div>
            <span className="text-[13px] text-slate-400 font-medium">vs last month</span>
          </div>
          {/* Sparkline */}
          <svg className="w-full h-12 xs:h-16" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="sparkline2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#3B82F6',stopOpacity:0.3}} />
                <stop offset="100%" style={{stopColor:'#3B82F6',stopOpacity:0}} />
              </linearGradient>
            </defs>
            <path className="sparkline" d="M0,25 Q15,20 30,22 T60,18 T90,12 T100,8" fill="url(#sparkline2)" stroke="none"/>
            <path className="sparkline" d="M0,25 Q15,20 30,22 T60,18 T90,12 T100,8" fill="none" stroke="#3B82F6" strokeWidth="2.5"/>
          </svg>
        </div>

        {/* Card 3: Active Tables */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 xs:w-8 xs:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </div>
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </div>
          <p className="text-[12px] xs:text-[14px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">Active Tables</p>
          <p className="text-[32px] xs:text-[40px] lg:text-[48px] font-bold text-[#0F172A] mb-3 leading-none">18/24</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-[13px] font-bold text-emerald-700">5.3%</span>
            </div>
            <span className="text-[13px] text-slate-400 font-medium">vs last month</span>
          </div>
          {/* Sparkline */}
          <svg className="w-full h-12 xs:h-16" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="sparkline3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#F97316',stopOpacity:0.3}} />
                <stop offset="100%" style={{stopColor:'#F97316',stopOpacity:0}} />
              </linearGradient>
            </defs>
            <path className="sparkline" d="M0,20 Q20,15 40,18 T70,14 T100,10" fill="url(#sparkline3)" stroke="none"/>
            <path className="sparkline" d="M0,20 Q20,15 40,18 T70,14 T100,10" fill="none" stroke="#F97316" strokeWidth="2.5"/>
          </svg>
        </div>

        {/* Card 4: Customer Rating */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 xs:w-8 xs:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <svg className="w-5 h-5 xs:w-6 xs:h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </div>
          <p className="text-[12px] xs:text-[14px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">Customer Rating</p>
          <p className="text-[32px] xs:text-[40px] lg:text-[48px] font-bold text-[#0F172A] mb-3 leading-none">4.7/5</p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-[13px] font-bold text-emerald-700">2.1%</span>
            </div>
            <span className="text-[13px] text-slate-400 font-medium">vs last month</span>
          </div>
          {/* Sparkline */}
          <svg className="w-full h-12 xs:h-16" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="sparkline4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#8B5CF6',stopOpacity:0.3}} />
                <stop offset="100%" style={{stopColor:'#8B5CF6',stopOpacity:0}} />
              </linearGradient>
            </defs>
            <path className="sparkline" d="M0,28 Q25,22 50,20 T75,15 T100,12" fill="url(#sparkline4)" stroke="none"/>
            <path className="sparkline" d="M0,28 Q25,22 50,20 T75,15 T100,12" fill="none" stroke="#8B5CF6" strokeWidth="2.5"/>
          </svg>
        </div>
      </div>

      {/* Row 2: Revenue Trend & Live Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 mb-6 xs:mb-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 xs:mb-6 gap-4">
            <div>
              <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Revenue Analytics</h3>
              <p className="text-[12px] xs:text-[14px] text-slate-500">Weekly revenue comparison and trends</p>
            </div>
            <div className="flex items-center bg-[#F8FAFC] rounded-xl p-1 border border-[#E5E7EB]">
              <button className="px-3 xs:px-4 py-2 text-[12px] xs:text-[13px] font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md transition-all">This Week</button>
              <button className="px-3 xs:px-4 py-2 text-[12px] xs:text-[13px] font-semibold text-slate-600 hover:text-[#0F172A] transition-all">Last Week</button>
            </div>
          </div>
          <div className="flex items-end gap-4 xs:gap-8 mb-4 xs:mb-6">
            <div>
              <p className="text-[12px] xs:text-[13px] text-slate-500 font-medium mb-1">Total Revenue</p>
              <p className="text-[24px] xs:text-[32px] font-bold text-[#0F172A] leading-none">$54,100</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-xl">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-[12px] xs:text-[13px] font-bold text-emerald-700">+12.5%</span>
            </div>
          </div>
          <canvas ref={revenueChartRef} height="180" className="w-full"></canvas>
        </div>

        {/* Live Orders */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4 xs:mb-6">
            <div>
              <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Live Orders</h3>
              <p className="text-[12px] xs:text-[14px] text-slate-500">Real-time order tracking</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-[12px] xs:text-[13px] font-bold text-orange-700">3 Active</span>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-orange-300 transition-all group gap-3">
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-[13px] xs:text-[15px] shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">#2895</div>
                <div>
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">John Smith</p>
                  <p className="text-[12px] xs:text-[13px] text-slate-500">Grilled Salmon • T-12</p>
                </div>
              </div>
              <div className="text-right sm:text-left flex sm:block items-center justify-between sm:justify-end gap-2">
                <p className="text-[16px] xs:text-[18px] font-bold text-[#0F172A]">$78.50</p>
                <div className="flex items-center gap-2 justify-end mt-0 sm:mt-1">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] xs:text-[11px] font-bold rounded-lg">Preparing</span>
                  <span className="text-[12px] xs:text-[13px] text-orange-600 font-semibold">12 min</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-orange-300 transition-all group gap-3">
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-[13px] xs:text-[15px] shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">#2894</div>
                <div>
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">Sarah Johnson</p>
                  <p className="text-[12px] xs:text-[13px] text-slate-500">Ribeye Steak • T-08</p>
                </div>
              </div>
              <div className="text-right sm:text-left flex sm:block items-center justify-between sm:justify-end gap-2">
                <p className="text-[16px] xs:text-[18px] font-bold text-[#0F172A]">$95.00</p>
                <div className="flex items-center gap-2 justify-end mt-0 sm:mt-1">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] xs:text-[11px] font-bold rounded-lg">Priority</span>
                  <span className="text-[12px] xs:text-[13px] text-red-600 font-semibold">8 min</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-orange-300 transition-all group gap-3">
              <div className="flex items-center gap-3 xs:gap-4">
                <div className="w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-[13px] xs:text-[15px] shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">#2893</div>
                <div>
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">Michael Brown</p>
                  <p className="text-[12px] xs:text-[13px] text-slate-500">Pasta • T-15</p>
                </div>
              </div>
              <div className="text-right sm:text-left flex sm:block items-center justify-between sm:justify-end gap-2">
                <p className="text-[16px] xs:text-[18px] font-bold text-[#0F172A]">$62.00</p>
                <div className="flex items-center gap-2 justify-end mt-0 sm:mt-1">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] xs:text-[11px] font-bold rounded-lg">Ready</span>
                  <span className="text-[12px] xs:text-[13px] text-emerald-600 font-semibold">5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Kitchen Queue & Table Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 mb-6 xs:mb-8">
        {/* Kitchen Queue */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4 xs:mb-6">
            <div>
              <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Kitchen Queue</h3>
              <p className="text-[12px] xs:text-[14px] text-slate-500">Real-time station status</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 rounded-xl">
              <span className="text-[12px] xs:text-[13px] font-bold text-red-700">4 Orders</span>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-4">
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-red-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">Grill Station</p>
                    <p className="text-[12px] xs:text-[13px] text-slate-500">Chef Marco</p>
                  </div>
                </div>
                <span className="px-2 xs:px-3 py-1 bg-red-100 text-red-700 text-[11px] xs:text-[12px] font-bold rounded-xl">Busy</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Progress</span>
                <span className="text-[12px] xs:text-[13px] text-slate-900 font-bold">2/3 orders</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{width: '66%'}}></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[12px] xs:text-[13px] text-slate-500">Avg. Time</span>
                <span className="text-[12px] xs:text-[13px] text-red-600 font-bold">15 min</span>
              </div>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-orange-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">Sauté Station</p>
                    <p className="text-[12px] xs:text-[13px] text-slate-500">Chef Lisa</p>
                  </div>
                </div>
                <span className="px-2 xs:px-3 py-1 bg-amber-100 text-amber-700 text-[11px] xs:text-[12px] font-bold rounded-xl">Active</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Progress</span>
                <span className="text-[12px] xs:text-[13px] text-slate-900 font-bold">1/2 orders</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '50%'}}></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[12px] xs:text-[13px] text-slate-500">Avg. Time</span>
                <span className="text-[12px] xs:text-[13px] text-orange-600 font-bold">8 min</span>
              </div>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">Cold Station</p>
                    <p className="text-[12px] xs:text-[13px] text-slate-500">Chef Alex</p>
                  </div>
                </div>
                <span className="px-2 xs:px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] xs:text-[12px] font-bold rounded-xl">Idle</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Progress</span>
                <span className="text-[12px] xs:text-[13px] text-slate-900 font-bold">0/0 orders</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[12px] xs:text-[13px] text-slate-500">Avg. Time</span>
                <span className="text-[12px] xs:text-[13px] text-emerald-600 font-bold">No wait</span>
              </div>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-purple-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px]">Pastry Station</p>
                    <p className="text-[12px] xs:text-[13px] text-slate-500">Chef Emma</p>
                  </div>
                </div>
                <span className="px-2 xs:px-3 py-1 bg-amber-100 text-amber-700 text-[11px] xs:text-[12px] font-bold rounded-xl">Active</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Progress</span>
                <span className="text-[12px] xs:text-[13px] text-slate-900 font-bold">1/1 orders</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[12px] xs:text-[13px] text-slate-500">Avg. Time</span>
                <span className="text-[12px] xs:text-[13px] text-orange-600 font-bold">12 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Occupancy */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 xs:mb-6 gap-4">
            <div>
              <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Table Occupancy</h3>
              <p className="text-[12px] xs:text-[14px] text-slate-500">Real-time table status</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 xs:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-lg"></div>
                <span className="text-[11px] xs:text-[13px] text-slate-600 font-medium">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-lg"></div>
                <span className="text-[11px] xs:text-[13px] text-slate-600 font-medium">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-lg"></div>
                <span className="text-[11px] xs:text-[13px] text-slate-600 font-medium">Available</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 xs:gap-3">
            {/* Row 1 */}
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-01</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-02</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-03</div>
            <div className="table-card aspect-square bg-blue-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-04</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-05</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-06</div>
            {/* Row 2 */}
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-07</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-08</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-09</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-10</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-11</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-12</div>
            {/* Row 3 */}
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-13</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-14</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-15</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-16</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-17</div>
            <div className="table-card aspect-square bg-red-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-18</div>
            {/* Row 4 */}
            <div className="table-card aspect-square bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-19</div>
            <div className="table-card aspect-square bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-20</div>
            <div className="table-card aspect-square bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-21</div>
            <div className="table-card aspect-square bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-22</div>
            <div className="table-card aspect-square bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-23</div>
            <div className="table-card aspect-square bg-blue-500 rounded-2xl flex items-center justify-center text-white text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] font-bold cursor-pointer shadow-md hover:shadow-lg">T-24</div>
          </div>
        </div>
      </div>

      {/* Row 4: Today's Reservations & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 mb-6 xs:mb-8">
        {/* Today's Reservations */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4 xs:mb-6">
            <div>
              <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Today's Reservations</h3>
              <p className="text-[12px] xs:text-[14px] text-slate-500">Upcoming bookings timeline</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-xl">
              <span className="text-[12px] xs:text-[13px] font-bold text-blue-700">4 Bookings</span>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-blue-300 transition-all">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[14px] xs:text-[15px] font-bold text-[#0F172A]">6:00</span>
                <span className="text-[11px] xs:text-[12px] text-slate-500">PM</span>
              </div>
              <div className="w-px h-10 xs:h-12 bg-slate-200 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px] truncate">Robert Taylor</p>
                  <span className="px-2 xs:px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] xs:text-[12px] font-bold rounded-xl flex-shrink-0">Confirmed</span>
                </div>
                <p className="text-[12px] xs:text-[13px] text-slate-500 truncate">4 guests • Table T-07</p>
              </div>
            </div>
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-blue-300 transition-all">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[14px] xs:text-[15px] font-bold text-[#0F172A]">6:30</span>
                <span className="text-[11px] xs:text-[12px] text-slate-500">PM</span>
              </div>
              <div className="w-px h-10 xs:h-12 bg-slate-200 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px] truncate">Jennifer Martinez</p>
                  <span className="px-2 xs:px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] xs:text-[12px] font-bold rounded-xl flex-shrink-0">Confirmed</span>
                </div>
                <p className="text-[12px] xs:text-[13px] text-slate-500 truncate">6 guests • Table T-05</p>
              </div>
            </div>
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-amber-300 transition-all">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[14px] xs:text-[15px] font-bold text-[#0F172A]">7:00</span>
                <span className="text-[11px] xs:text-[12px] text-slate-500">PM</span>
              </div>
              <div className="w-px h-10 xs:h-12 bg-slate-200 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px] truncate">William Anderson</p>
                  <span className="px-2 xs:px-3 py-1 bg-amber-100 text-amber-700 text-[11px] xs:text-[12px] font-bold rounded-xl flex-shrink-0">Pending</span>
                </div>
                <p className="text-[12px] xs:text-[13px] text-slate-500 truncate">2 guests • Table T-10</p>
              </div>
            </div>
            <div className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-blue-300 transition-all">
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[14px] xs:text-[15px] font-bold text-[#0F172A]">7:15</span>
                <span className="text-[11px] xs:text-[12px] text-slate-500">PM</span>
              </div>
              <div className="w-px h-10 xs:h-12 bg-slate-200 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <p className="font-bold text-[#0F172A] text-[14px] xs:text-[15px] truncate">Patricia Thomas</p>
                  <span className="px-2 xs:px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] xs:text-[12px] font-bold rounded-xl flex-shrink-0">Confirmed</span>
                </div>
                <p className="text-[12px] xs:text-[13px] text-slate-500 truncate">8 guests • Table T-13</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4 xs:mb-6">
            <div>
              <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Recent Activity</h3>
              <p className="text-[12px] xs:text-[14px] text-slate-500">Real-time activity feed</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[12px] xs:text-[13px] font-bold text-slate-700">Live</span>
            </div>
          </div>
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-start gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-orange-300 transition-all">
              <div className="w-9 h-9 xs:w-10 xs:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] xs:text-[15px] font-bold text-[#0F172A] truncate">New order #2895 from Table T-03</p>
                <p className="text-[12px] xs:text-[13px] text-slate-500 mt-1">2 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-emerald-300 transition-all">
              <div className="w-9 h-9 xs:w-10 xs:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] xs:text-[15px] font-bold text-[#0F172A] truncate">Payment $145 completed for #2893</p>
                <p className="text-[12px] xs:text-[13px] text-slate-500 mt-1">5 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-blue-300 transition-all">
              <div className="w-9 h-9 xs:w-10 xs:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] xs:text-[15px] font-bold text-[#0F172A] truncate">New reservation Robert Taylor</p>
                <p className="text-[12px] xs:text-[13px] text-slate-500 mt-1">8 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-red-300 transition-all">
              <div className="w-9 h-9 xs:w-10 xs:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] xs:text-[15px] font-bold text-[#0F172A] truncate">Order #2891 ready at Grill</p>
                <p className="text-[12px] xs:text-[13px] text-slate-500 mt-1">12 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 xs:gap-4 p-3 xs:p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] hover:border-purple-300 transition-all">
              <div className="w-9 h-9 xs:w-10 xs:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-4 h-4 xs:w-5 xs:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] xs:text-[15px] font-bold text-[#0F172A] truncate">Table T-04 seated</p>
                <p className="text-[12px] xs:text-[13px] text-slate-500 mt-1">15 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Order Status, Order Type, Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
        {/* Order Status */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div>
            <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Order Statistics</h3>
            <p className="text-[12px] xs:text-[14px] text-slate-500 mb-4 xs:mb-6">Status breakdown</p>
          </div>
          <div className="flex items-center justify-center mb-4 xs:mb-6">
            <canvas ref={orderStatusChartRef} width="150" height="150" className="w-[150px] h-[150px] xs:w-[180px] xs:h-[180px]"></canvas>
          </div>
          <div className="grid grid-cols-2 gap-3 xs:gap-4">
            <div className="flex items-center gap-2 p-2 xs:p-3 bg-[#F8FAFC] rounded-xl">
              <div className="w-3 h-3 bg-emerald-500 rounded-lg"></div>
              <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Completed</span>
              <span className="text-[12px] xs:text-[13px] font-bold text-[#0F172A] ml-auto">287</span>
            </div>
            <div className="flex items-center gap-2 p-2 xs:p-3 bg-[#F8FAFC] rounded-xl">
              <div className="w-3 h-3 bg-orange-500 rounded-lg"></div>
              <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Preparing</span>
              <span className="text-[12px] xs:text-[13px] font-bold text-[#0F172A] ml-auto">32</span>
            </div>
            <div className="flex items-center gap-2 p-2 xs:p-3 bg-[#F8FAFC] rounded-xl">
              <div className="w-3 h-3 bg-amber-500 rounded-lg"></div>
              <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Pending</span>
              <span className="text-[12px] xs:text-[13px] font-bold text-[#0F172A] ml-auto">15</span>
            </div>
            <div className="flex items-center gap-2 p-2 xs:p-3 bg-[#F8FAFC] rounded-xl">
              <div className="w-3 h-3 bg-red-500 rounded-lg"></div>
              <span className="text-[12px] xs:text-[13px] text-slate-600 font-medium">Cancelled</span>
              <span className="text-[12px] xs:text-[13px] font-bold text-[#0F172A] ml-auto">8</span>
            </div>
          </div>
        </div>

        {/* Order Type */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div>
            <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Order Type</h3>
            <p className="text-[12px] xs:text-[14px] text-slate-500 mb-4 xs:mb-6">Distribution by type</p>
          </div>
          <div className="space-y-4 xs:space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] xs:text-[14px] font-semibold text-slate-700">Dine-in</span>
                <span className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">198 <span className="text-slate-400 font-normal">58%</span></span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 xs:h-3">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 xs:h-3 rounded-full" style={{width: '58%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] xs:text-[14px] font-semibold text-slate-700">Takeaway</span>
                <span className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">89 <span className="text-slate-400 font-normal">26%</span></span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 xs:h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 xs:h-3 rounded-full" style={{width: '26%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] xs:text-[14px] font-semibold text-slate-700">Delivery</span>
                <span className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">55 <span className="text-slate-400 font-normal">16%</span></span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 xs:h-3">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 xs:h-3 rounded-full" style={{width: '16%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div>
            <h3 className="text-[18px] xs:text-[22px] font-bold text-[#0F172A] mb-1">Top Categories</h3>
            <p className="text-[12px] xs:text-[14px] text-slate-500 mb-4 xs:mb-6">Revenue by category</p>
          </div>
          <div className="space-y-3 xs:space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 xs:w-8 xs:h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <span className="text-[13px] xs:text-[14px] font-semibold text-slate-700">Main Course</span>
                </div>
                <span className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">$18.5k</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '42%'}}></div>
              </div>
              <p className="text-[11px] xs:text-[12px] text-slate-500 mt-1">145 orders • 42%</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 xs:w-8 xs:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707L17 14"></path>
                    </svg>
                  </div>
                  <span className="text-[13px] xs:text-[14px] font-semibold text-slate-700">Appetizers</span>
                </div>
                <span className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">$9.8k</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '28%'}}></div>
              </div>
              <p className="text-[11px] xs:text-[12px] text-slate-500 mt-1">210 orders • 28%</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 xs:w-8 xs:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                  <span className="text-[13px] xs:text-[14px] font-semibold text-slate-700">Beverages</span>
                </div>
                <span className="text-[13px] xs:text-[14px] font-bold text-[#0F172A]">$7.2k</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: '18%'}}></div>
              </div>
              <p className="text-[11px] xs:text-[12px] text-slate-500 mt-1">285 orders • 18%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
