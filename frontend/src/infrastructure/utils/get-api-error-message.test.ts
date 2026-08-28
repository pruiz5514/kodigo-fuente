import { describe, expect, it } from 'vitest'
import { getApiErrorMessage } from './get-api-error-message'

describe('getApiErrorMessage', () => {
  it('joins validation errors when the API returns an errors array', () => {
    expect(getApiErrorMessage({ message: 'Validation error', errors: ['"name" is required', '"end_date" is invalid'] }))
      .toBe('"name" is required, "end_date" is invalid')
  })

  it('falls back to the message field when there is no errors array', () => {
    expect(getApiErrorMessage({ message: 'La promoción especificada no existe' }))
      .toBe('La promoción especificada no existe')
  })

  it('returns a generic message for unexpected error shapes', () => {
    expect(getApiErrorMessage({})).toBe('Ocurrió un error inesperado, intenta de nuevo')
    expect(getApiErrorMessage(null)).toBe('Ocurrió un error inesperado, intenta de nuevo')
    expect(getApiErrorMessage('network down')).toBe('Ocurrió un error inesperado, intenta de nuevo')
  })
})
