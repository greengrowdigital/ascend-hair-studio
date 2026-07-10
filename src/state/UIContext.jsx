import { createContext, useContext, useCallback, useMemo, useState } from 'react'

/* =========================================================================
   UI chrome state. `navTheme` tells the floating navbar which surface it is
   sitting over: 'light' → dark text/controls; 'dark' → light text/controls.
   The Home hero drives it as the background scrolls white → black; every other
   page leaves it on the default 'light'.
   ========================================================================= */

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [navTheme, setNavTheme] = useState('light')

  const value = useMemo(() => ({ navTheme, setNavTheme }), [navTheme])
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within a UIProvider')
  return ctx
}
