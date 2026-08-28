export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const apiError = error as { message?: string; errors?: string[] }
    if (Array.isArray(apiError.errors) && apiError.errors.length > 0) {
      return apiError.errors.join(', ')
    }
    if (apiError.message) {
      return apiError.message
    }
  }
  return 'Ocurrió un error inesperado, intenta de nuevo'
}
