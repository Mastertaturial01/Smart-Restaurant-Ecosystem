import { useState } from 'react'

function POS() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState('Walk-in Customer')
  const [selectedTable, setSelectedTable] = useState('Table 1')

  const categories = ['All', 'Appetizers', 'Main Course', 'Beverages', 'Desserts', 'Sides']

  const products = [
    { id: 1, name: 'Caesar Salad', price: 12.99, category: 'Appetizers', image: '🥗' },
    { id: 2, name: 'Garlic Bread', price: 6.99, category: 'Appetizers', image: '🥖' },
    { id: 3, name: 'Soup of the Day', price: 8.99, category: 'Appetizers', image: '🍲' },
    { id: 4, name: 'Grilled Salmon', price: 24.99, category: 'Main Course', image: '🐟' },
    { id: 5, name: 'Ribeye Steak', price: 32.99, category: 'Main Course', image: '🥩' },
    { id: 6, name: 'Chicken Parmesan', price: 18.99, category: 'Main Course', image: '🍗' },
    { id: 7, name: 'Pasta Carbonara', price: 16.99, category: 'Main Course', image: '🍝' },
    { id: 8, name: 'Vegetable Stir Fry', price: 14.99, category: 'Main Course', image: '🥦' },
    { id: 9, name: 'Coca-Cola', price: 2.99, category: 'Beverages', image: '🥤' },
    { id: 10, name: 'Fresh Lemonade', price: 4.99, category: 'Beverages', image: '🍋' },
    { id: 11, name: 'Iced Tea', price: 3.99, category: 'Beverages', image: '🧊' },
    { id: 12, name: 'Coffee', price: 3.49, category: 'Beverages', image: '☕' },
    { id: 13, name: 'Chocolate Cake', price: 7.99, category: 'Desserts', image: '🍰' },
    { id: 14, name: 'Ice Cream', price: 5.99, category: 'Desserts', image: '🍨' },
    { id: 15, name: 'Cheesecake', price: 8.99, category: 'Desserts', image: '🧀' },
    { id: 16, name: 'French Fries', price: 4.99, category: 'Sides', image: '🍟' },
    { id: 17, name: 'Mashed Potatoes', price: 4.49, category: 'Sides', image: '🥔' },
    { id: 18, name: 'Steamed Vegetables', price: 5.49, category: 'Sides', image: '🥬' },
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const discount = subtotal * 0.05
  const grandTotal = subtotal + tax - discount

  return (
    <div className="max-w-[1600px] mx-auto p-4 xs:p-6 sm:p-6 md:p-8 lg:p-8">
      <h1 className="text-[28px] xs:text-[32px] sm:text-[36px] font-bold text-[#0F172A] tracking-tight mb-4 xs:mb-6">Point of Sale</h1>
      
      <div className="flex flex-col lg:flex-row gap-4 xs:gap-6">
        {/* LEFT SECTION */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 xs:p-6 enterprise-shadow card-hover border border-[#E5E7EB] mb-4 xs:mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 xs:pl-12 pr-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[15px] font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white focus:border-orange-500 transition-all"
              />
              <svg className="w-4 h-4 xs:w-5 xs:h-5 text-slate-400 absolute left-3 xs:left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 xs:gap-3 mb-4 xs:mb-6 flex-wrap overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 xs:px-5 py-2 xs:py-3 rounded-xl text-[12px] xs:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'gradient-active text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-[#F8FAFC] border border-[#E5E7EB]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3 xs:p-4 enterprise-shadow card-hover border border-[#E5E7EB] cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <div className="text-4xl xs:text-5xl mb-2 xs:mb-3 text-center">{product.image}</div>
                <h3 className="text-[13px] xs:text-[15px] font-semibold text-[#0F172A] mb-1 truncate">{product.name}</h3>
                <p className="text-[13px] xs:text-[14px] font-bold text-orange-500 mb-2 xs:mb-3">${product.price.toFixed(2)}</p>
                <button className="w-full py-1.5 xs:py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[12px] xs:text-sm font-semibold hover:shadow-lg transition-all shadow-md">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white rounded-2xl enterprise-shadow card-hover border border-[#E5E7EB] sticky top-4 lg:top-8">
            {/* Current Order Header */}
            <div className="p-4 xs:p-6 border-b border-[#E5E7EB]">
              <h2 className="text-[18px] xs:text-[20px] font-bold text-[#0F172A] mb-3 xs:mb-4">Current Order</h2>
              
              {/* Customer Selector */}
              <div className="mb-3 xs:mb-4">
                <label className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1.5 xs:mb-2 block">Customer</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option>Walk-in Customer</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Michael Brown</option>
                </select>
              </div>

              {/* Table Selector */}
              <div>
                <label className="text-[12px] xs:text-[13px] font-semibold text-slate-500 mb-1.5 xs:mb-2 block">Table</label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[13px] xs:text-[14px] font-semibold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option>Table 1</option>
                  <option>Table 2</option>
                  <option>Table 3</option>
                  <option>Table 4</option>
                  <option>Table 5</option>
                </select>
              </div>
            </div>

            {/* Cart Items */}
            <div className="p-4 xs:p-6 max-h-[300px] xs:max-h-[400px] overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-[13px] xs:text-[15px] text-slate-400 text-center py-6 xs:py-8">No items in cart</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4 pb-3 xs:pb-4 border-b border-[#E5E7EB]">
                    <div className="text-2xl xs:text-3xl flex-shrink-0">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] xs:text-[14px] font-semibold text-[#0F172A] truncate">{item.name}</h4>
                      <p className="text-[12px] xs:text-[13px] font-bold text-orange-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 xs:gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 xs:w-8 xs:h-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[14px] xs:text-[16px] font-bold text-slate-600 hover:bg-[#E5E7EB] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 xs:w-8 text-center text-[13px] xs:text-[15px] font-semibold text-[#0F172A]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 xs:w-8 xs:h-8 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[14px] xs:text-[16px] font-bold text-slate-600 hover:bg-[#E5E7EB] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* BOTTOM SECTION */}
            <div className="p-4 xs:p-6 border-t border-[#E5E7EB] bg-[#F8FAFC]">
              <div className="space-y-2 xs:space-y-3 mb-4 xs:mb-6">
                <div className="flex justify-between text-[12px] xs:text-[14px]">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-[#0F172A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[12px] xs:text-[14px]">
                  <span className="text-slate-500">Tax (8%)</span>
                  <span className="font-semibold text-[#0F172A]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[12px] xs:text-[14px]">
                  <span className="text-slate-500">Discount (5%)</span>
                  <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[16px] xs:text-[18px] font-bold pt-2 xs:pt-3 border-t border-[#E5E7EB]">
                  <span className="text-[#0F172A]">Grand Total</span>
                  <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* PAYMENT SECTION */}
              <div className="space-y-2 xs:space-y-3">
                <button className="w-full py-2.5 xs:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-[13px] xs:text-[15px] font-semibold hover:shadow-lg transition-all shadow-md flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Cash
                </button>
                <button className="w-full py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Card
                </button>
                <button className="w-full py-2.5 xs:py-3 bg-white border-2 border-[#E5E7EB] text-[#0F172A] rounded-xl text-[13px] xs:text-[15px] font-semibold hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                  Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POS
