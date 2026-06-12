// Type Definitions for Smart Restaurant Ecosystem

// User Types
export const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  KITCHEN: 'kitchen',
  WAITER: 'waiter',
}

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
}

// Order Types
export const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  SERVED: 'served',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const OrderType = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
}

// Inventory Types
export const InventoryStatus = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
}

// Payment Types
export const PaymentStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  REFUNDED: 'refunded',
  FAILED: 'failed',
}

export const PaymentMethod = {
  CASH: 'cash',
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
}

// Table Types
export const TableStatus = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
}

// API Response Types
export const ApiResponseStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
}
