import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { DICT, LANGS } from './dictionary.js'

const STORAGE_KEY = 'ascend-lang'
const DEFAULT_LANG = 'cs'

const LanguageContext = createContext(null)

function resolveInitial() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && DICT[stored]) return stored
  const nav = (window.navigator.language || '').slice(0, 2).toLowerCase()
  if (DICT[nav]) return nav
  return DEFAULT_LANG
}

/** Safe dotted-path lookup: t('hero.line1') -> falls back to key if missing. */
function pick(tree, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), tree)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(resolveInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage may be blocked — non-fatal */
    }
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((code) => {
    if (DICT[code]) setLangState(code)
  }, [])

  const t = useCallback(
    (path) => {
      const val = pick(DICT[lang], path)
      if (val !== undefined) return val
      const fallback = pick(DICT.en, path)
      return fallback !== undefined ? fallback : path
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, langs: LANGS }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider')
  return ctx
}
