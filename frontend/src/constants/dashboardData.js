// Dashboard Data Constants - Realistic Restaurant Management Data

export const KPI_DATA = {
  totalRevenue: {
    value: 48750,
    change: 12.5,
    trend: 'up',
    period: 'Today',
  },
  totalOrders: {
    value: 342,
    change: 8.2,
    trend: 'up',
    period: 'Today',
  },
  activeTables: {
    value: 18,
    total: 24,
    change: 5.3,
    trend: 'up',
    period: 'Current',
  },
  customerSatisfaction: {
    value: 4.7,
    max: 5,
    change: 2.1,
    trend: 'up',
    period: 'Today',
  },
}

export const REVENUE_TREND_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  currentWeek: [12500, 15800, 14200, 18900, 24750, 31200, 28900],
  previousWeek: [11200, 14500, 13800, 17100, 22300, 28900, 26500],
}

export const ORDER_STATISTICS = {
  byStatus: [
    { status: 'Completed', count: 287, percentage: 84, color: '#10B981' },
    { status: 'Preparing', count: 32, percentage: 9, color: '#FCA311' },
    { status: 'Pending', count: 15, percentage: 4, color: '#3B82F6' },
    { status: 'Cancelled', count: 8, percentage: 3, color: '#EF4444' },
  ],
  byType: [
    { type: 'Dine-in', count: 198, percentage: 58, color: '#C1121F' },
    { type: 'Takeaway', count: 89, percentage: 26, color: '#FCA311' },
    { type: 'Delivery', count: 55, percentage: 16, color: '#1F2937' },
  ],
}

export const TOP_SELLING_CATEGORIES = [
  {
    category: 'Main Course',
    revenue: 18500,
    orders: 145,
    growth: 15.2,
    color: '#C1121F',
    icon: '🍽️',
  },
  {
    category: 'Appetizers',
    revenue: 9800,
    orders: 210,
    growth: 8.7,
    color: '#FCA311',
    icon: '🥗',
  },
  {
    category: 'Beverages',
    revenue: 7200,
    orders: 285,
    growth: 12.3,
    color: '#1F2937',
    icon: '🍹',
  },
  {
    category: 'Desserts',
    revenue: 5400,
    orders: 95,
    growth: 18.5,
    color: '#10B981',
    icon: '🍰',
  },
  {
    category: 'Specials',
    revenue: 7850,
    orders: 62,
    growth: 22.1,
    color: '#3B82F6',
    icon: '⭐',
  },
]

export const LIVE_ORDERS = [
  {
    id: 'ORD-2891',
    table: 'T-12',
    customer: 'John Smith',
    items: ['Grilled Salmon', 'Caesar Salad', 'Red Wine'],
    total: 78.50,
    status: 'Preparing',
    time: '12 min',
    priority: 'high',
  },
  {
    id: 'ORD-2892',
    table: 'T-08',
    customer: 'Sarah Johnson',
    items: ['Ribeye Steak', 'Mashed Potatoes', 'Sparkling Water'],
    total: 95.00,
    status: 'Preparing',
    time: '8 min',
    priority: 'medium',
  },
  {
    id: 'ORD-2893',
    table: 'T-15',
    customer: 'Michael Brown',
    items: ['Lobster Thermidor', 'Chardonnay'],
    total: 145.00,
    status: 'Pending',
    time: '3 min',
    priority: 'high',
  },
  {
    id: 'ORD-2894',
    table: 'Takeaway',
    customer: 'Emily Davis',
    items: ['Chicken Parmesan', 'Garlic Bread', 'Cola'],
    total: 42.50,
    status: 'Ready',
    time: '0 min',
    priority: 'low',
  },
  {
    id: 'ORD-2895',
    table: 'T-03',
    customer: 'David Wilson',
    items: ['Seafood Platter', 'White Wine', 'Chocolate Fondant'],
    total: 168.00,
    status: 'Preparing',
    time: '15 min',
    priority: 'high',
  },
]

export const KITCHEN_QUEUE_STATUS = [
  {
    station: 'Grill Station',
    orders: 8,
    capacity: 10,
    status: 'busy',
    chef: 'Chef Marco',
    avgTime: '18 min',
  },
  {
    station: 'Sauté Station',
    orders: 5,
    capacity: 8,
    status: 'normal',
    chef: 'Chef Lisa',
    avgTime: '12 min',
  },
  {
    station: 'Cold Station',
    orders: 3,
    capacity: 6,
    status: 'normal',
    chef: 'Chef Alex',
    avgTime: '8 min',
  },
  {
    station: 'Pastry Station',
    orders: 2,
    capacity: 4,
    status: 'idle',
    chef: 'Chef Emma',
    avgTime: '15 min',
  },
]

export const TABLE_OCCUPANCY_STATUS = [
  { table: 'T-01', capacity: 4, occupied: 4, status: 'occupied', time: '45 min', server: 'Amy' },
  { table: 'T-02', capacity: 4, occupied: 0, status: 'available', time: '-', server: '-' },
  { table: 'T-03', capacity: 6, occupied: 5, status: 'occupied', time: '32 min', server: 'John' },
  { table: 'T-04', capacity: 2, occupied: 2, status: 'occupied', time: '28 min', server: 'Lisa' },
  { table: 'T-05', capacity: 8, occupied: 0, status: 'available', time: '-', server: '-' },
  { table: 'T-06', capacity: 4, occupied: 4, status: 'occupied', time: '55 min', server: 'Mike' },
  { table: 'T-07', capacity: 4, occupied: 0, status: 'reserved', time: '7:00 PM', server: 'Sarah' },
  { table: 'T-08', capacity: 6, occupied: 6, status: 'occupied', time: '38 min', server: 'David' },
  { table: 'T-09', capacity: 4, occupied: 0, status: 'available', time: '-', server: '-' },
  { table: 'T-10', capacity: 2, occupied: 0, status: 'available', time: '-', server: '-' },
  { table: 'T-11', capacity: 4, occupied: 3, status: 'occupied', time: '22 min', server: 'Emma' },
  { table: 'T-12', capacity: 6, occupied: 6, status: 'occupied', time: '41 min', server: 'Chris' },
]

export const RESERVATION_SUMMARY = {
  today: {
    total: 24,
    confirmed: 18,
    pending: 4,
    cancelled: 2,
  },
  upcoming: [
    { time: '6:00 PM', name: 'Robert Taylor', party: 4, table: 'T-07', status: 'confirmed' },
    { time: '6:30 PM', name: 'Jennifer Martinez', party: 6, table: 'T-05', status: 'confirmed' },
    { time: '7:00 PM', name: 'William Anderson', party: 2, table: 'T-10', status: 'pending' },
    { time: '7:15 PM', name: 'Patricia Thomas', party: 8, table: 'T-13', status: 'confirmed' },
    { time: '7:30 PM', name: 'James Jackson', party: 4, table: 'T-14', status: 'confirmed' },
    { time: '8:00 PM', name: 'Maria White', party: 5, table: 'T-15', status: 'pending' },
  ],
}

export const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'order',
    message: 'New order #2895 received from Table T-03',
    time: '2 min ago',
    icon: '📋',
    color: '#C1121F',
  },
  {
    id: 2,
    type: 'payment',
    message: 'Payment of $145.00 completed for Order #2893',
    time: '5 min ago',
    icon: '💳',
    color: '#10B981',
  },
  {
    id: 3,
    type: 'reservation',
    message: 'New reservation for Robert Taylor (4 guests) at 6:00 PM',
    time: '8 min ago',
    icon: '📅',
    color: '#3B82F6',
  },
  {
    id: 4,
    type: 'kitchen',
    message: 'Order #2891 marked as ready at Grill Station',
    time: '12 min ago',
    icon: '👨‍🍳',
    color: '#FCA311',
  },
  {
    id: 5,
    type: 'table',
    message: 'Table T-04 seated with 2 guests (Server: Lisa)',
    time: '15 min ago',
    icon: '🪑',
    color: '#1F2937',
  },
  {
    id: 6,
    type: 'review',
    message: 'New 5-star review received from Sarah Johnson',
    time: '22 min ago',
    icon: '⭐',
    color: '#FCA311',
  },
  {
    id: 7,
    type: 'inventory',
    message: 'Low stock alert: Salmon (12 units remaining)',
    time: '35 min ago',
    icon: '📦',
    color: '#EF4444',
  },
  {
    id: 8,
    type: 'staff',
    message: 'Chef Marco started shift at Grill Station',
    time: '1 hour ago',
    icon: '👤',
    color: '#3B82F6',
  },
]
