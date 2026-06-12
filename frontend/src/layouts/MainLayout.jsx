import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '@components/layout/Sidebar'
import Header from '@components/layout/Header'

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex-1 lg:ml-0 bg-[#F8FAFC]">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout
