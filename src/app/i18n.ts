export type Language = 'en' | 'es'

export function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const storedLanguage = window.localStorage.getItem('language')
  if (storedLanguage === 'en' || storedLanguage === 'es') {
    return storedLanguage
  }

  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}
