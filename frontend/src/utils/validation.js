// Validation Utilities

import { VALIDATION } from '@constants'

export function validateEmail(email) {
  return VALIDATION.EMAIL_REGEX.test(email)
}

export function validatePassword(password) {
  const errors = []

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`)
  }

  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    errors.push(`Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateUsername(username) {
  const errors = []

  if (username.length < VALIDATION.USERNAME_MIN_LENGTH) {
    errors.push(`Username must be at least ${VALIDATION.USERNAME_MIN_LENGTH} characters`)
  }

  if (username.length > VALIDATION.USERNAME_MAX_LENGTH) {
    errors.push(`Username must not exceed ${VALIDATION.USERNAME_MAX_LENGTH} characters`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    }
  }

  return {
    isValid: true,
    error: null,
  }
}

export function validatePhoneNumber(phone) {
  const phoneRegex = /^[\d\s\-\(\)]+$/
  const isValid = phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10

  return {
    isValid,
    error: isValid ? null : 'Please enter a valid phone number',
  }
}
