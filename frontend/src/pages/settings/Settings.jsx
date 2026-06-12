import { useState, useEffect } from 'react'

function Settings() {
  const [activeTab, setActiveTab] = useState('General')
  const [showToast, setShowToast] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: 'SmartResto',
    businessEmail: 'info@smartresto.com',
    contactNumber: '+1 555-0123',
    address: '123 Restaurant Street, Food City, FC 12345',
    timeZone: 'UTC-5 (Eastern Time)',
    currency: 'USD ($)',
    language: 'English'
  })

  // Restaurant Settings State
  const [restaurantSettings, setRestaurantSettings] = useState({
    taxRate: 8.5,
    serviceCharges: 10,
    openingTime: '11:00',
    closingTime: '23:00',
    table2Seater: 6,
    table4Seater: 10,
    table6Seater: 5,
    table8Seater: 3
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    reservations: true,
    inventoryAlerts: true,
    paymentNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: true,
    loginActivityMonitoring: true
  })

  // Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    paymentGateway: 'Stripe',
    apiKey: 'sk_live_xxxxx',
    secretKey: 'sk_secret_xxxxx'
  })

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    themeMode: 'light',
    themeColor: '#EF4444',
    sidebarStyle: 'Default'
  })

  // Backup Settings State
  const [backupSettings, setBackupSettings] = useState({
    autoBackupSchedule: 'Daily'
  })

  // Users State
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@smartresto.com', role: 'Owner', status: 'Active', lastLogin: '2024-06-06 09:30 AM' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@smartresto.com', role: 'Admin', status: 'Active', lastLogin: '2024-06-06 08:45 AM' },
    { id: 3, name: 'Michael Brown', email: 'michael@smartresto.com', role: 'Manager', status: 'Active', lastLogin: '2024-06-05 06:15 PM' },
    { id: 4, name: 'Emily Davis', email: 'emily@smartresto.com', role: 'Cashier', status: 'Active', lastLogin: '2024-06-06 10:00 AM' },
    { id: 5, name: 'David Wilson', email: 'david@smartresto.com', role: 'Waiter', status: 'Active', lastLogin: '2024-06-06 11:30 AM' },
    { id: 6, name: 'Jessica Taylor', email: 'jessica@smartresto.com', role: 'Chef', status: 'Active', lastLogin: '2024-06-06 07:00 AM' },
  ])

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Cashier'
  })

  const tabs = ['General', 'Restaurant', 'Users & Roles', 'Notifications', 'Payments', 'Security', 'Integrations', 'Appearance', 'Backup & Restore']

  const auditLogs = [
    { id: 1, user: 'John Doe', action: 'Updated restaurant settings', time: '2024-06-06 09:30 AM', type: 'System Change' },
    { id: 2, user: 'Sarah Johnson', action: 'Added new user', time: '2024-06-06 08:45 AM', type: 'User Action' },
    { id: 3, user: 'System', action: 'Auto backup completed', time: '2024-06-06 04:00 AM', type: 'System Event' },
    { id: 4, user: 'Michael Brown', action: 'Login attempt failed', time: '2024-06-05 11:20 PM', type: 'Security Event' },
    { id: 5, user: 'Emily Davis', action: 'Modified payment settings', time: '2024-06-05 05:30 PM', type: 'User Action' },
  ]

  // Default settings for reset
  const defaultSettings = {
    general: { restaurantName: 'SmartResto', businessEmail: 'info@smartresto.com', contactNumber: '+1 555-0123', address: '123 Restaurant Street, Food City, FC 12345', timeZone: 'UTC-5 (Eastern Time)', currency: 'USD ($)', language: 'English' },
    restaurant: { taxRate: 8.5, serviceCharges: 10, openingTime: '11:00', closingTime: '23:00', table2Seater: 6, table4Seater: 10, table6Seater: 5, table8Seater: 3 },
    notifications: { newOrders: true, reservations: true, inventoryAlerts: true, paymentNotifications: true, emailNotifications: true, smsNotifications: false },
    security: { twoFactorAuth: true, sessionTimeout: true, loginActivityMonitoring: true },
    payment: { paymentGateway: 'Stripe', apiKey: 'sk_live_xxxxx', secretKey: 'sk_secret_xxxxx' },
    appearance: { themeMode: 'light', themeColor: '#EF4444', sidebarStyle: 'Default' },
    backup: { autoBackupSchedule: 'Daily' }
  }

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('smartresto_settings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      if (parsed.general) setGeneralSettings(parsed.general)
      if (parsed.restaurant) setRestaurantSettings(parsed.restaurant)
      if (parsed.notifications) setNotificationSettings(parsed.notifications)
      if (parsed.security) setSecuritySettings(parsed.security)
      if (parsed.payment) setPaymentSettings(parsed.payment)
      if (parsed.appearance) setAppearanceSettings(parsed.appearance)
      if (parsed.backup) setBackupSettings(parsed.backup)
      if (parsed.users) setUsers(parsed.users)
    }
  }, [])

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return re.test(phone)
  }

  // Save settings to localStorage
  const handleSaveSettings = () => {
    // Validate required fields
    if (!generalSettings.restaurantName || !generalSettings.businessEmail || !generalSettings.contactNumber) {
      setToastMessage('Please fill in all required fields')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    if (!validateEmail(generalSettings.businessEmail)) {
      setToastMessage('Please enter a valid email address')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    if (!validatePhone(generalSettings.contactNumber)) {
      setToastMessage('Please enter a valid phone number')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    const settingsToSave = {
      general: generalSettings,
      restaurant: restaurantSettings,
      notifications: notificationSettings,
      security: securitySettings,
      payment: paymentSettings,
      appearance: appearanceSettings,
      backup: backupSettings,
      users: users
    }

    localStorage.setItem('smartresto_settings', JSON.stringify(settingsToSave))
    setToastMessage('Settings saved successfully')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Reset settings to default
  const handleResetSettings = () => {
    setGeneralSettings(defaultSettings.general)
    setRestaurantSettings(defaultSettings.restaurant)
    setNotificationSettings(defaultSettings.notifications)
    setSecuritySettings(defaultSettings.security)
    setPaymentSettings(defaultSettings.payment)
    setAppearanceSettings(defaultSettings.appearance)
    setBackupSettings(defaultSettings.backup)
    localStorage.removeItem('smartresto_settings')
    setShowResetModal(false)
    setToastMessage('Settings reset to default')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Toggle notification setting
  const toggleNotification = (key) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Toggle security setting
  const toggleSecurity = (key) => {
    setSecuritySettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      setToastMessage('Please fill in all required fields')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    if (!validateEmail(newUser.email)) {
      setToastMessage('Please enter a valid email address')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
      lastLogin: 'Never'
    }

    setUsers([...users, user])
    setNewUser({ name: '', email: '', role: 'Cashier' })
    setShowAddUserModal(false)
    setToastMessage('User added successfully')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Delete user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
    setToastMessage('User deleted successfully')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Create backup
  const handleCreateBackup = () => {
    const backupData = {
      general: generalSettings,
      restaurant: restaurantSettings,
      notifications: notificationSettings,
      security: securitySettings,
      payment: paymentSettings,
      appearance: appearanceSettings,
      backup: backupSettings,
      users: users,
      timestamp: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smartresto-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setToastMessage('Backup created successfully')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Restore backup
  const handleRestoreBackup = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target.result)
        if (backupData.general) setGeneralSettings(backupData.general)
        if (backupData.restaurant) setRestaurantSettings(backupData.restaurant)
        if (backupData.notifications) setNotificationSettings(backupData.notifications)
        if (backupData.security) setSecuritySettings(backupData.security)
        if (backupData.payment) setPaymentSettings(backupData.payment)
        if (backupData.appearance) setAppearanceSettings(backupData.appearance)
        if (backupData.backup) setBackupSettings(backupData.backup)
        if (backupData.users) setUsers(backupData.users)

        setToastMessage('Backup restored successfully')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } catch (error) {
        setToastMessage('Invalid backup file')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
        <div>
          <h1 className="text-[24px] xs:text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight">Settings</h1>
          <p className="text-[12px] xs:text-[15px] text-slate-500 font-medium mt-1 xs:mt-2">Manage your restaurant configuration</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 xs:gap-3">
          <button onClick={() => setShowResetModal(true)} className="px-4 xs:px-6 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[12px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
            Reset Settings
          </button>
          <button onClick={handleSaveSettings} className="px-4 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[12px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white rounded-2xl enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="flex overflow-x-auto p-3 xs:p-4 gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 xs:px-5 py-2.5 xs:py-3 rounded-xl text-[12px] xs:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'gradient-active text-white shadow-md'
                  : 'bg-[#F8FAFC] text-slate-600 hover:bg-[#E5E7EB]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl enterprise-shadow card-hover border border-[#E5E7EB] p-4 xs:p-6">
        {/* General Settings */}
        {activeTab === 'General' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">General Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Restaurant Name</label>
                <input type="text" value={generalSettings.restaurantName} onChange={(e) => setGeneralSettings({ ...generalSettings, restaurantName: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Business Email</label>
                <input type="email" value={generalSettings.businessEmail} onChange={(e) => setGeneralSettings({ ...generalSettings, businessEmail: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Contact Number</label>
                <input type="tel" value={generalSettings.contactNumber} onChange={(e) => setGeneralSettings({ ...generalSettings, contactNumber: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Time Zone</label>
                <select value={generalSettings.timeZone} onChange={(e) => setGeneralSettings({ ...generalSettings, timeZone: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Currency</label>
                <select value={generalSettings.currency} onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Language</label>
                <select value={generalSettings.language} onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Address</label>
                <textarea value={generalSettings.address} onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" rows="2"></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Restaurant Settings */}
        {activeTab === 'Restaurant' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Restaurant Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Restaurant Logo</label>
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 xs:w-10 xs:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <button className="px-3 xs:px-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[11px] xs:text-[13px] font-semibold hover:bg-[#E5E7EB] transition-all">
                    Upload Logo
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Cover Image</label>
                <button className="px-3 xs:px-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[11px] xs:text-[13px] font-semibold hover:bg-[#E5E7EB] transition-all">
                  Upload Cover Image
                </button>
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Tax Rate (%)</label>
                <input type="number" value={restaurantSettings.taxRate} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, taxRate: parseFloat(e.target.value) })} step="0.1" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Service Charges (%)</label>
                <input type="number" value={restaurantSettings.serviceCharges} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, serviceCharges: parseFloat(e.target.value) })} step="0.1" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Operating Hours</label>
                <div className="grid grid-cols-2 gap-3 xs:gap-4">
                  <div>
                    <label className="text-[10px] xs:text-[12px] text-slate-500">Opening Time</label>
                    <input type="time" value={restaurantSettings.openingTime} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, openingTime: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="text-[10px] xs:text-[12px] text-slate-500">Closing Time</label>
                    <input type="time" value={restaurantSettings.closingTime} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, closingTime: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Table Capacity Settings</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4">
                  <div>
                    <label className="text-[10px] xs:text-[12px] text-slate-500">2-Seater</label>
                    <input type="number" value={restaurantSettings.table2Seater} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, table2Seater: parseInt(e.target.value) })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="text-[10px] xs:text-[12px] text-slate-500">4-Seater</label>
                    <input type="number" value={restaurantSettings.table4Seater} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, table4Seater: parseInt(e.target.value) })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="text-[10px] xs:text-[12px] text-slate-500">6-Seater</label>
                    <input type="number" value={restaurantSettings.table6Seater} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, table6Seater: parseInt(e.target.value) })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="text-[10px] xs:text-[12px] text-slate-500">8-Seater</label>
                    <input type="number" value={restaurantSettings.table8Seater} onChange={(e) => setRestaurantSettings({ ...restaurantSettings, table8Seater: parseInt(e.target.value) })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users & Roles */}
        {activeTab === 'Users & Roles' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
              <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A]">User & Role Management</h2>
              <button onClick={() => setShowAddUserModal(true)} className="px-3 xs:px-4 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[12px] xs:text-[14px] font-semibold hover:shadow-lg transition-all shadow-md">
                + Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-3 xs:px-4 py-2.5 xs:py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 xs:px-4 py-2.5 xs:py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-3 xs:px-4 py-2.5 xs:py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-3 xs:px-4 py-2.5 xs:py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 xs:px-4 py-2.5 xs:py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Last Login</th>
                    <th className="px-3 xs:px-4 py-2.5 xs:py-3 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-3 xs:px-4 py-2.5 xs:py-3 text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{user.name}</td>
                      <td className="px-3 xs:px-4 py-2.5 xs:py-3 text-[12px] xs:text-[14px] font-medium text-slate-700">{user.email}</td>
                      <td className="px-3 xs:px-4 py-2.5 xs:py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] xs:text-[11px] font-semibold">{user.role}</span>
                      </td>
                      <td className="px-3 xs:px-4 py-2.5 xs:py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] xs:text-[11px] font-semibold">{user.status}</span>
                      </td>
                      <td className="px-3 xs:px-4 py-2.5 xs:py-3 text-[11px] xs:text-[13px] text-slate-600 hidden sm:table-cell">{user.lastLogin}</td>
                      <td className="px-3 xs:px-4 py-2.5 xs:py-3">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all text-[10px] xs:text-xs">Edit</button>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all text-[10px] xs:text-xs">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'Notifications' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Notification Settings</h2>
            <div className="space-y-3 xs:space-y-4">
              {[
                { label: 'New Orders', desc: 'Receive notifications for new orders', key: 'newOrders' },
                { label: 'Reservations', desc: 'Get notified for new reservations', key: 'reservations' },
                { label: 'Inventory Alerts', desc: 'Alert when stock is low', key: 'inventoryAlerts' },
                { label: 'Payment Notifications', desc: 'Notifications for payment updates', key: 'paymentNotifications' },
                { label: 'Email Notifications', desc: 'Receive notifications via email', key: 'emailNotifications' },
                { label: 'SMS Notifications', desc: 'Receive notifications via SMS', key: 'smsNotifications' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                  <div>
                    <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{item.label}</p>
                    <p className="text-[11px] xs:text-[13px] text-slate-500">{item.desc}</p>
                  </div>
                  <div onClick={() => toggleNotification(item.key)} className={`w-10 h-5 xs:w-12 xs:h-6 rounded-full relative cursor-pointer transition-colors ${notificationSettings[item.key] ? 'bg-green-500' : 'bg-slate-300'}`}>
                    <div className={`absolute top-0.5 xs:top-1 w-3.5 h-3.5 xs:w-4 xs:h-4 bg-white rounded-full shadow transition-all ${notificationSettings[item.key] ? 'right-0.5 xs:right-1' : 'left-0.5 xs:left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'Payments' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Payment Settings</h2>
            <div className="space-y-4 xs:space-y-6">
              <div>
                <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A] mb-3 xs:mb-4">Payment Methods</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 xs:gap-4">
                  {['Cash', 'Credit Card', 'Debit Card', 'Online Payment', 'QR Payment'].map((method, index) => (
                    <div key={index} className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center gap-2 xs:gap-3">
                      <div className="w-4 h-4 xs:w-5 xs:h-5 bg-green-500 rounded flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-[11px] xs:text-[13px] font-medium text-[#0F172A]">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
                <div>
                  <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Payment Gateway Name</label>
                  <input type="text" value={paymentSettings.paymentGateway} onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentGateway: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">API Key</label>
                  <input type="password" value={paymentSettings.apiKey} onChange={(e) => setPaymentSettings({ ...paymentSettings, apiKey: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Secret Key</label>
                  <input type="password" value={paymentSettings.secretKey} onChange={(e) => setPaymentSettings({ ...paymentSettings, secretKey: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === 'Security' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Security Settings</h2>
            <div className="space-y-4 xs:space-y-6">
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Change Password</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4">
                  <input type="password" placeholder="Current Password" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  <input type="password" placeholder="New Password" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  <input type="password" placeholder="Confirm Password" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
              <div className="space-y-3 xs:space-y-4">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', key: 'twoFactorAuth' },
                  { label: 'Session Timeout', desc: 'Auto logout after inactivity', key: 'sessionTimeout' },
                  { label: 'Login Activity Monitoring', desc: 'Track login attempts', key: 'loginActivityMonitoring' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                    <div>
                      <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{item.label}</p>
                      <p className="text-[11px] xs:text-[13px] text-slate-500">{item.desc}</p>
                    </div>
                    <div onClick={() => toggleSecurity(item.key)} className={`w-10 h-5 xs:w-12 xs:h-6 rounded-full relative cursor-pointer transition-colors ${securitySettings[item.key] ? 'bg-green-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 xs:top-1 w-3.5 h-3.5 xs:w-4 xs:h-4 bg-white rounded-full shadow transition-all ${securitySettings[item.key] ? 'right-0.5 xs:right-1' : 'left-0.5 xs:left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Integrations */}
        {activeTab === 'Integrations' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Integrations</h2>
            <div className="space-y-3 xs:space-y-4">
              {[
                { name: 'POS Integration', status: 'Connected', icon: '🖥️' },
                { name: 'Delivery Services', status: 'Connected', icon: '🚚' },
                { name: 'Accounting Software', status: 'Not Connected', icon: '📊' },
                { name: 'SMS Gateway', status: 'Connected', icon: '📱' },
                { name: 'Email Service', status: 'Connected', icon: '✉️' },
                { name: 'Third-Party APIs', status: 'Not Connected', icon: '🔌' },
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                  <div className="flex items-center gap-3 xs:gap-4">
                    <span className="text-xl xs:text-2xl">{integration.icon}</span>
                    <div>
                      <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{integration.name}</p>
                      <p className={`text-[11px] xs:text-[13px] font-semibold ${integration.status === 'Connected' ? 'text-green-600' : 'text-slate-500'}`}>{integration.status}</p>
                    </div>
                  </div>
                  <button className="px-3 xs:px-4 py-2 bg-white border-2 border-[#E5E7EB] rounded-xl text-[11px] xs:text-[13px] font-semibold hover:bg-[#F8FAFC] transition-all">
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appearance */}
        {activeTab === 'Appearance' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Appearance Settings</h2>
            <div className="space-y-4 xs:space-y-6">
              <div>
                <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A] mb-3 xs:mb-4">Theme Mode</p>
                <div className="flex gap-3 xs:gap-4">
                  <div onClick={() => setAppearanceSettings({ ...appearanceSettings, themeMode: 'light' })} className={`flex-1 p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border-2 cursor-pointer ${appearanceSettings.themeMode === 'light' ? 'border-orange-500' : 'border-[#E5E7EB]'}`}>
                    <div className="w-10 h-10 xs:w-12 xs:h-12 bg-white rounded-xl mb-2 border border-[#E5E7EB]"></div>
                    <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">Light Mode</p>
                  </div>
                  <div onClick={() => setAppearanceSettings({ ...appearanceSettings, themeMode: 'dark' })} className={`flex-1 p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border-2 cursor-pointer ${appearanceSettings.themeMode === 'dark' ? 'border-orange-500' : 'border-[#E5E7EB]'}`}>
                    <div className="w-10 h-10 xs:w-12 xs:h-12 bg-[#0F172A] rounded-xl mb-2"></div>
                    <p className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">Dark Mode</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A] mb-3 xs:mb-4">Theme Color</p>
                <div className="flex gap-2 xs:gap-3">
                  {['#EF4444', '#F97316', '#3B82F6', '#10B981', '#8B5CF6'].map((color) => (
                    <div key={color} onClick={() => setAppearanceSettings({ ...appearanceSettings, themeColor: color })} className={`w-8 h-8 xs:w-10 xs:h-10 rounded-xl cursor-pointer ${appearanceSettings.themeColor === color ? 'ring-2 ring-offset-2 ring-orange-500' : ''}`} style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A] mb-3 xs:mb-4">Sidebar Style</p>
                <select value={appearanceSettings.sidebarStyle} onChange={(e) => setAppearanceSettings({ ...appearanceSettings, sidebarStyle: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Default</option>
                  <option>Compact</option>
                  <option>Expanded</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Backup & Restore */}
        {activeTab === 'Backup & Restore' && (
          <div>
            <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Backup & Restore</h2>
            <div className="space-y-4 xs:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4">
                <button onClick={handleCreateBackup} className="p-4 xs:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 text-center hover:shadow-lg transition-all">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">Create Backup</p>
                </button>
                <button onClick={handleCreateBackup} className="p-4 xs:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 text-center hover:shadow-lg transition-all">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                  </div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">Download Backup</p>
                </button>
                <label className="p-4 xs:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 text-center hover:shadow-lg transition-all cursor-pointer">
                  <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2 xs:mb-3">
                    <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">Restore Backup</p>
                </label>
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Auto Backup Schedule</label>
                <select value={backupSettings.autoBackupSchedule} onChange={(e) => setBackupSettings({ ...backupSettings, autoBackupSchedule: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* System Information */}
        <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">System Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 xs:gap-4">
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">App Version</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">v2.1.0</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Database Status</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-green-600">Connected</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Server Status</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-green-600">Online</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Storage Usage</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">45%</p>
            </div>
            <div className="p-3 xs:p-4 bg-[#F8FAFC] rounded-xl">
              <p className="text-[11px] xs:text-[13px] text-slate-500 font-medium">Last Backup</p>
              <p className="text-[14px] xs:text-[18px] font-bold text-[#0F172A]">2h ago</p>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Audit Logs</h2>
          <div className="space-y-2 xs:space-y-3">
            {auditLogs.map(log => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] gap-3">
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-xl flex items-center justify-center ${
                    log.type === 'User Action' ? 'bg-blue-100' :
                    log.type === 'System Change' ? 'bg-green-100' :
                    log.type === 'Security Event' ? 'bg-red-100' : 'bg-purple-100'
                  }`}>
                    <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{log.user}</p>
                    <p className="text-[11px] xs:text-[13px] text-slate-500">{log.action}</p>
                  </div>
                </div>
                <div className="text-right sm:text-left">
                  <span className={`px-2 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${
                    log.type === 'User Action' ? 'bg-blue-100 text-blue-700' :
                    log.type === 'System Change' ? 'bg-green-100 text-green-700' :
                    log.type === 'Security Event' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                  }`}>{log.type}</span>
                  <p className="text-[10px] xs:text-[12px] text-slate-500 mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 xs:left-auto xs:right-4 xs:bottom-4 bg-green-500 text-white px-4 xs:px-6 py-2.5 xs:py-3 rounded-xl shadow-lg z-50 animate-pulse text-center xs:text-left">
          {toastMessage}
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 xs:p-6 max-w-md w-full enterprise-shadow">
            <h3 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Reset Settings</h3>
            <p className="text-[13px] xs:text-[15px] text-slate-600 mb-4 xs:mb-6">Reset all settings to default values?</p>
            <div className="flex gap-2 xs:gap-3 justify-end">
              <button onClick={() => setShowResetModal(false)} className="px-4 xs:px-6 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[12px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                Cancel
              </button>
              <button onClick={handleResetSettings} className="px-4 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[12px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 xs:p-6 max-w-md w-full enterprise-shadow">
            <h3 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Add New User</h3>
            <div className="space-y-3 xs:space-y-4">
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Name</label>
                <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Email</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[11px] xs:text-[13px] font-semibold text-slate-500 mb-2">Role</label>
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[12px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Owner</option>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Cashier</option>
                  <option>Waiter</option>
                  <option>Chef</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 xs:gap-3 justify-end mt-4 xs:mt-6">
              <button onClick={() => setShowAddUserModal(false)} className="px-4 xs:px-6 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[12px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                Cancel
              </button>
              <button onClick={handleAddUser} className="px-4 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[12px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                Save User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
