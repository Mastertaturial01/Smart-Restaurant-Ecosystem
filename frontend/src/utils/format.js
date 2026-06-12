// Date and Number Formatting Utilities

export function formatDate(date, format = 'DISPLAY') {
  if (!date) return '-'
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return '-'

  const formats = {
    DISPLAY: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    DISPLAY_WITH_TIME: d.toLocaleString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    API: d.toISOString().split('T')[0],
    API_WITH_TIME: d.toISOString().replace('T', ' ').split('.')[0],
  }

  return formats[format] || formats.DISPLAY
}

export function formatCurrency(amount, currency = 'USD') {
  if (amount === null || amount === undefined) return '-'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined) return '-'
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatPhoneNumber(phone) {
  if (!phone) return '-'
  
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}
