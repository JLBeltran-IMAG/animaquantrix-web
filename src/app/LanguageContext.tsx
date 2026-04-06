import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { getPreferredLanguage, type Language } from './i18n'
import { LanguageContext } from './language-context'

type LanguageProviderProps = {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(getPreferredLanguage)

  useEffect(() => {
    window.localStorage.setItem('language', language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
