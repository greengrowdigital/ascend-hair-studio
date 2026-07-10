import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'
import { VARIANTS, PRODUCT } from '../data/content.js'

/* =========================================================================
   Cart — a single-product store, so a cart line is just { variantId, qty }.
   Persisted to localStorage; exposes totals + the slide-over drawer state.
   ========================================================================= */

const STORAGE_KEY = 'ascend-cart'
const CartContext = createContext(null)

export function variantById(id) {
  return VARIANTS.find((v) => v.id === id) || null
}

function loadInitial() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Keep only lines that still map to a real variant.
    return parsed
      .filter((l) => l && variantById(l.variantId))
      .map((l) => ({ variantId: l.variantId, qty: Math.max(1, Math.min(99, Number(l.qty) || 1)) }))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitial)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage may be blocked — non-fatal */
    }
  }, [items])

  const addItem = useCallback((variantId, qty = 1) => {
    if (!variantById(variantId)) return
    setItems((prev) => {
      const found = prev.find((l) => l.variantId === variantId)
      if (found) {
        return prev.map((l) =>
          l.variantId === variantId ? { ...l, qty: Math.min(99, l.qty + qty) } : l,
        )
      }
      return [...prev, { variantId, qty: Math.min(99, Math.max(1, qty)) }]
    })
  }, [])

  const setQty = useCallback((variantId, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((l) => l.variantId !== variantId)
      return prev.map((l) => (l.variantId === variantId ? { ...l, qty: Math.min(99, qty) } : l))
    })
  }, [])

  const removeItem = useCallback((variantId) => {
    setItems((prev) => prev.filter((l) => l.variantId !== variantId))
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const count = useMemo(() => items.reduce((n, l) => n + l.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + (variantById(l.variantId)?.price || 0) * l.qty, 0),
    [items],
  )

  /* Detailed lines for rendering (variant resolved). */
  const lines = useMemo(
    () =>
      items
        .map((l) => {
          const variant = variantById(l.variantId)
          if (!variant) return null
          return { ...l, variant, lineTotal: variant.price * l.qty }
        })
        .filter(Boolean),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      lines,
      count,
      subtotal,
      currency: PRODUCT.currency,
      isOpen,
      addItem,
      setQty,
      removeItem,
      clear,
      openCart,
      closeCart,
    }),
    [items, lines, count, subtotal, isOpen, addItem, setQty, removeItem, clear, openCart, closeCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
