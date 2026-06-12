import { useState } from 'react'

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const filters = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Expiring Soon']

  const inventoryItems = [
    { id: 'INV-001', name: 'Tomatoes', category: 'Vegetables', supplier: 'Fresh Farms Ltd', quantity: 50, unit: 'kg', costPrice: 2.50, sellingPrice: 4.99, minStock: 20, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-002', name: 'Lettuce', category: 'Vegetables', supplier: 'Fresh Farms Ltd', quantity: 15, unit: 'kg', costPrice: 1.80, sellingPrice: 3.99, minStock: 20, stockStatus: 'Low Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-003', name: 'Carrots', category: 'Vegetables', supplier: 'Fresh Farms Ltd', quantity: 0, unit: 'kg', costPrice: 1.50, sellingPrice: 2.99, minStock: 15, stockStatus: 'Out of Stock', lastUpdated: '2024-06-05' },
    { id: 'INV-004', name: 'Onions', category: 'Vegetables', supplier: 'Fresh Farms Ltd', quantity: 40, unit: 'kg', costPrice: 1.20, sellingPrice: 2.49, minStock: 25, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-005', name: 'Apples', category: 'Fruits', supplier: 'Orchard Fresh', quantity: 30, unit: 'kg', costPrice: 3.00, sellingPrice: 5.99, minStock: 20, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-006', name: 'Bananas', category: 'Fruits', supplier: 'Orchard Fresh', quantity: 25, unit: 'kg', costPrice: 1.80, sellingPrice: 3.49, minStock: 20, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-007', name: 'Oranges', category: 'Fruits', supplier: 'Orchard Fresh', quantity: 10, unit: 'kg', costPrice: 2.50, sellingPrice: 4.99, minStock: 15, stockStatus: 'Low Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-008', name: 'Beef', category: 'Meat', supplier: 'Prime Meats Co', quantity: 20, unit: 'kg', costPrice: 15.00, sellingPrice: 28.99, minStock: 10, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-009', name: 'Chicken', category: 'Meat', supplier: 'Prime Meats Co', quantity: 35, unit: 'kg', costPrice: 8.00, sellingPrice: 16.99, minStock: 15, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-010', name: 'Pork', category: 'Meat', supplier: 'Prime Meats Co', quantity: 5, unit: 'kg', costPrice: 10.00, sellingPrice: 19.99, minStock: 10, stockStatus: 'Low Stock', lastUpdated: '2024-06-05' },
    { id: 'INV-011', name: 'Salmon', category: 'Seafood', supplier: 'Ocean Catch', quantity: 15, unit: 'kg', costPrice: 18.00, sellingPrice: 32.99, minStock: 10, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-012', name: 'Shrimp', category: 'Seafood', supplier: 'Ocean Catch', quantity: 8, unit: 'kg', costPrice: 22.00, sellingPrice: 39.99, minStock: 10, stockStatus: 'Low Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-013', name: 'Tuna', category: 'Seafood', supplier: 'Ocean Catch', quantity: 0, unit: 'kg', costPrice: 25.00, sellingPrice: 45.99, minStock: 5, stockStatus: 'Out of Stock', lastUpdated: '2024-06-04' },
    { id: 'INV-014', name: 'Milk', category: 'Dairy', supplier: 'Dairy Fresh', quantity: 60, unit: 'liters', costPrice: 1.50, sellingPrice: 3.49, minStock: 30, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-015', name: 'Cheese', category: 'Dairy', supplier: 'Dairy Fresh', quantity: 20, unit: 'kg', costPrice: 12.00, sellingPrice: 24.99, minStock: 10, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-016', name: 'Butter', category: 'Dairy', supplier: 'Dairy Fresh', quantity: 12, unit: 'kg', costPrice: 8.00, sellingPrice: 15.99, minStock: 10, stockStatus: 'In Stock', lastUpdated: '2024-06-05' },
    { id: 'INV-017', name: 'Coca-Cola', category: 'Beverages', supplier: 'Beverage World', quantity: 100, unit: 'bottles', costPrice: 0.50, sellingPrice: 2.99, minStock: 50, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-018', name: 'Orange Juice', category: 'Beverages', supplier: 'Beverage World', quantity: 40, unit: 'liters', costPrice: 2.00, sellingPrice: 4.99, minStock: 30, stockStatus: 'Low Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-019', name: 'Coffee Beans', category: 'Beverages', supplier: 'Coffee Roasters', quantity: 25, unit: 'kg', costPrice: 15.00, sellingPrice: 29.99, minStock: 15, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-020', name: 'Chocolate Cake', category: 'Desserts', supplier: 'Sweet Treats', quantity: 8, unit: 'pieces', costPrice: 5.00, sellingPrice: 12.99, minStock: 10, stockStatus: 'Low Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-021', name: 'Ice Cream', category: 'Desserts', supplier: 'Sweet Treats', quantity: 15, unit: 'liters', costPrice: 4.00, sellingPrice: 8.99, minStock: 10, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-022', name: 'Rice', category: 'Dry Goods', supplier: 'Grain Suppliers', quantity: 50, unit: 'kg', costPrice: 2.00, sellingPrice: 4.49, minStock: 30, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-023', name: 'Pasta', category: 'Dry Goods', supplier: 'Grain Suppliers', quantity: 30, unit: 'kg', costPrice: 3.00, sellingPrice: 5.99, minStock: 20, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-024', name: 'Flour', category: 'Dry Goods', supplier: 'Grain Suppliers', quantity: 0, unit: 'kg', costPrice: 1.50, sellingPrice: 3.49, minStock: 20, stockStatus: 'Out of Stock', lastUpdated: '2024-06-04' },
    { id: 'INV-025', name: 'Black Pepper', category: 'Spices', supplier: 'Spice World', quantity: 5, unit: 'kg', costPrice: 20.00, sellingPrice: 45.99, minStock: 3, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-026', name: 'Salt', category: 'Spices', supplier: 'Spice World', quantity: 15, unit: 'kg', costPrice: 1.00, sellingPrice: 2.49, minStock: 10, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-027', name: 'Oregano', category: 'Spices', supplier: 'Spice World', quantity: 2, unit: 'kg', costPrice: 25.00, sellingPrice: 55.99, minStock: 3, stockStatus: 'Low Stock', lastUpdated: '2024-06-05' },
    { id: 'INV-028', name: 'Cinnamon', category: 'Spices', supplier: 'Spice World', quantity: 3, unit: 'kg', costPrice: 30.00, sellingPrice: 65.99, minStock: 2, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-029', name: 'Yogurt', category: 'Dairy', supplier: 'Dairy Fresh', quantity: 25, unit: 'liters', costPrice: 2.50, sellingPrice: 5.49, minStock: 15, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
    { id: 'INV-030', name: 'Cream', category: 'Dairy', supplier: 'Dairy Fresh', quantity: 10, unit: 'liters', costPrice: 4.00, sellingPrice: 8.99, minStock: 8, stockStatus: 'In Stock', lastUpdated: '2024-06-06' },
  ]

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'All' || item.stockStatus === selectedFilter
    return matchesSearch && matchesFilter
  })

  const totalProducts = inventoryItems.length
  const lowStockItems = inventoryItems.filter(i => i.stockStatus === 'Low Stock').length
  const outOfStockItems = inventoryItems.filter(i => i.stockStatus === 'Out of Stock').length
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.costPrice), 0)

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-700'
      case 'Low Stock': return 'bg-orange-100 text-orange-700'
      case 'Out of Stock': return 'bg-red-100 text-red-700'
      case 'Expiring Soon': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const lowStockAlerts = inventoryItems.filter(i => i.stockStatus === 'Low Stock' || i.stockStatus === 'Out of Stock')

  const suppliers = [
    { name: 'Fresh Farms Ltd', contact: '+1 555-0101', email: 'fresh@farms.com', products: 4, lastDelivery: '2024-06-06' },
    { name: 'Orchard Fresh', contact: '+1 555-0102', email: 'orchard@fresh.com', products: 3, lastDelivery: '2024-06-06' },
    { name: 'Prime Meats Co', contact: '+1 555-0103', email: 'prime@meats.com', products: 3, lastDelivery: '2024-06-06' },
    { name: 'Ocean Catch', contact: '+1 555-0104', email: 'ocean@catch.com', products: 3, lastDelivery: '2024-06-06' },
    { name: 'Dairy Fresh', contact: '+1 555-0105', email: 'dairy@fresh.com', products: 5, lastDelivery: '2024-06-06' },
  ]

  const recentActivities = [
    { type: 'Stock Added', item: 'Tomatoes', quantity: '+20 kg', time: '2 hours ago' },
    { type: 'Stock Removed', item: 'Chicken', quantity: '-5 kg', time: '3 hours ago' },
    { type: 'Product Updated', item: 'Beef', quantity: 'Price updated', time: '5 hours ago' },
    { type: 'New Product', item: 'Cream', quantity: 'Added to inventory', time: '1 day ago' },
  ]

  const monthlyConsumption = 12500
  const fastMovingProducts = 18
  const slowMovingProducts = 5
  const wastePercentage = 3.5
  const stockTurnoverRate = 4.2

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 xs:mb-6 gap-3">
        <div>
          <h1 className="text-[24px] xs:text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#0F172A] tracking-tight">Inventory Management</h1>
          <div className="flex flex-wrap items-center gap-2 xs:gap-4 mt-2">
            <span className="text-[12px] xs:text-[15px] text-slate-500 font-medium">Total Items: {totalProducts}</span>
            <span className="text-[12px] xs:text-[15px] text-slate-500 font-medium hidden sm:inline">|</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-orange-600">Low Stock: {lowStockItems}</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-red-600">Out of Stock: {outOfStockItems}</span>
            <span className="text-[12px] xs:text-[15px] font-semibold text-green-600">Value: ${totalInventoryValue.toFixed(0)}</span>
          </div>
        </div>
        <button
          onClick={() => setShowAddProductForm(true)}
          className="px-4 xs:px-6 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md"
        >
          + Add Product
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-slate-600">+3</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{totalProducts}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Total Products</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-orange-600">{lowStockItems}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{lowStockItems}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Low Stock</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-red-600">{outOfStockItems}</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">{outOfStockItems}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Out of Stock</p>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="text-[12px] xs:text-[13px] font-semibold text-green-600">+8%</span>
          </div>
          <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-[#0F172A]">${totalInventoryValue.toFixed(0)}</h3>
          <p className="text-[12px] xs:text-[14px] text-slate-500 font-medium">Inventory Value</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Product, Category, or Supplier..."
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

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl enterprise-shadow card-hover border border-[#E5E7EB] overflow-hidden mb-4 xs:mb-6">
        {/* Desktop Table with horizontal scroll */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Item ID</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Cost</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Selling</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 xs:py-4 text-left text-[11px] xs:text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-4 py-3 xs:py-4 text-[12px] xs:text-[13px] font-semibold text-[#0F172A]">{item.id}</td>
                  <td className="px-4 py-3 xs:py-4 text-[13px] xs:text-[14px] font-medium text-slate-700">{item.name}</td>
                  <td className="px-4 py-3 xs:py-4 text-[12px] xs:text-[13px] font-medium text-slate-600">{item.category}</td>
                  <td className="px-4 py-3 xs:py-4 text-[12px] xs:text-[13px] font-medium text-slate-600">{item.supplier}</td>
                  <td className="px-4 py-3 xs:py-4 text-[13px] xs:text-[14px] font-semibold text-[#0F172A]">{item.quantity} {item.unit}</td>
                  <td className="px-4 py-3 xs:py-4 text-[13px] xs:text-[14px] font-semibold text-slate-600">${item.costPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 xs:py-4 text-[13px] xs:text-[14px] font-bold text-orange-500">${item.sellingPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 xs:py-4">
                    <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${getStockStatusColor(item.stockStatus)}`}>
                      {item.stockStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 xs:py-4">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
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
                      <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500 transition-all" title="Update Stock">
                        <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
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
          {filteredItems.map(item => (
            <div key={item.id} className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E5E7EB]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">{item.name}</p>
                  <p className="text-[12px] text-slate-500">{item.id}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${getStockStatusColor(item.stockStatus)}`}>
                  {item.stockStatus}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-[11px] text-slate-500">Category</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{item.category}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Quantity</p>
                  <p className="text-[13px] font-semibold text-[#0F172A]">{item.quantity} {item.unit}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Cost</p>
                  <p className="text-[13px] font-semibold text-slate-600">${item.costPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">Selling</p>
                  <p className="text-[13px] font-bold text-orange-500">${item.sellingPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => setSelectedItem(item)}
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

      {/* Low Stock Alerts and Supplier Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 mb-4 xs:mb-6">
        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Low Stock Alerts</h2>
          <div className="space-y-2 xs:space-y-3">
            {lowStockAlerts.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 xs:p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{item.name}</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">{item.category} • {item.quantity} {item.unit} remaining</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getStockStatusColor(item.stockStatus)}`}>
                  {item.stockStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
          <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Supplier Management</h2>
          <div className="space-y-2 xs:space-y-3">
            {suppliers.map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{supplier.name}</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">{supplier.products} products • Last: {supplier.lastDelivery}</p>
                </div>
                <button className="p-1.5 xs:p-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-500 transition-all">
                  <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Stock Activity */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Recent Stock Activity</h2>
        <div className="space-y-2 xs:space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 xs:p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
              <div className="flex items-center gap-3 xs:gap-4">
                <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-xl flex items-center justify-center ${
                  activity.type === 'Stock Added' ? 'bg-green-100' :
                  activity.type === 'Stock Removed' ? 'bg-red-100' :
                  activity.type === 'Product Updated' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'Stock Added' && <svg className="w-4 h-4 xs:w-5 xs:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>}
                  {activity.type === 'Stock Removed' && <svg className="w-4 h-4 xs:w-5 xs:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>}
                  {activity.type === 'Product Updated' && <svg className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>}
                  {activity.type === 'New Product' && <svg className="w-4 h-4 xs:w-5 xs:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                </div>
                <div>
                  <p className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{activity.type}</p>
                  <p className="text-[11px] xs:text-[13px] text-slate-500">{activity.item} • {activity.quantity}</p>
                </div>
              </div>
              <span className="text-[11px] xs:text-[13px] text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Analytics */}
      <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB]">
        <h2 className="text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-[#0F172A] mb-4 xs:mb-6">Inventory Analytics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">${monthlyConsumption}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Monthly Consumption</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4 4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{fastMovingProducts}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Fast Moving</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{slowMovingProducts}</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Slow Moving</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-lg">
              <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-[20px] xs:text-[24px] sm:text-[28px] font-bold text-[#0F172A]">{stockTurnoverRate}x</h3>
            <p className="text-[11px] xs:text-[13px] sm:text-[14px] text-slate-500 font-medium">Turnover Rate</p>
          </div>
        </div>
      </div>

      {/* Add Product Form Modal */}
      {showAddProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setShowAddProductForm(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-[#0F172A]">Add New Product</h2>
              <button onClick={() => setShowAddProductForm(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 xs:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Product Name</label>
                  <input type="text" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter product name" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Category</label>
                  <select className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Select category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Meat">Meat</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Dry Goods">Dry Goods</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Supplier</label>
                  <input type="text" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter supplier name" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Quantity</label>
                  <input type="number" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter quantity" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Unit</label>
                  <input type="text" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="kg, liters, etc." />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Cost Price ($)</label>
                  <input type="number" step="0.01" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter cost price" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Selling Price ($)</label>
                  <input type="number" step="0.01" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter selling price" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Minimum Stock Level</label>
                  <input type="number" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Enter minimum stock" />
                </div>
                <div>
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Expiry Date</label>
                  <input type="date" className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-2">Notes</label>
                  <textarea className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500" rows="3" placeholder="Enter any notes"></textarea>
                </div>
              </div>
              <div className="flex gap-2 xs:gap-3 mt-4 xs:mt-6">
                <button onClick={() => setShowAddProductForm(false)} className="flex-1 py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all">
                  Cancel
                </button>
                <button onClick={() => setShowAddProductForm(false)} className="flex-1 py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-[#0F172A]">Item Details</h2>
              <button onClick={() => setSelectedItem(null)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 xs:p-6">
              <div className="space-y-3 xs:space-y-4 mb-4 xs:mb-6">
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Item ID</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedItem.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Product Name</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Category</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedItem.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Supplier</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedItem.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Quantity</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedItem.quantity} {selectedItem.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Cost Price</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">${selectedItem.costPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Selling Price</span>
                  <span className="text-[12px] xs:text-[14px] font-bold text-orange-500">${selectedItem.sellingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Stock Status</span>
                  <span className={`px-2 py-1 rounded-full text-[10px] xs:text-[11px] font-semibold ${getStockStatusColor(selectedItem.stockStatus)}`}>
                    {selectedItem.stockStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] xs:text-[14px] font-semibold text-slate-500">Last Updated</span>
                  <span className="text-[12px] xs:text-[14px] font-semibold text-[#0F172A]">{selectedItem.lastUpdated}</span>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventory
