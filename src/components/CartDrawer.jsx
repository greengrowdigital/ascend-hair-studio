import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../state/CartContext.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { formatPrice } from '../lib/format.js'
import { PRODUCT, CLAY_DIAGONAL } from '../data/content.js'
import ProductImage from './ProductImage.jsx'

export default function CartDrawer() {
  const { t, lang } = useI18n()
  const { isOpen, closeCart, lines, subtotal, count, setQty, removeItem, currency } = useCart()
  const navigate = useNavigate()
  const closeRef = useRef(null)

  // Body scroll lock + Esc to close + focus the close control on open.
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeCart()
    window.addEventListener('keydown', onKey)
    const id = requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(id)
    }
  }, [isOpen, closeCart])

  function goCheckout() {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={t('cart.title')}>
          <motion.button
            type="button"
            aria-label={t('nav.close')}
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                <ShoppingBag size={18} strokeWidth={1.75} />
                {t('cart.title')}
                {count > 0 && <span className="font-geo text-sm font-normal text-stone tnum">· {count}</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                aria-label={t('nav.close')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lines */}
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <ShoppingBag size={40} strokeWidth={1} className="text-line" />
                <p className="font-body text-stone">{t('cart.empty')}</p>
                <button
                  type="button"
                  onClick={goCheckoutSafe(closeCart, navigate, '/shop')}
                  className="font-geo text-sm font-medium text-sage-deep underline underline-offset-4 hover:text-ink"
                >
                  {t('cart.emptyCta')}
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="divide-y divide-line">
                  {lines.map((line) => (
                    <li key={line.variantId} className="flex gap-4 py-5">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-field bg-snow">
                        <ProductImage src={CLAY_DIAGONAL} alt={PRODUCT.name[lang]} imgClassName="p-1.5" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-serif text-sm font-semibold text-ink">
                              {PRODUCT.brand} {PRODUCT.name[lang]}
                            </p>
                            <p className="mt-0.5 font-geo text-xs text-stone">{line.variant.label[lang]}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(line.variantId)}
                            aria-label={`${t('cart.remove')} — ${line.variant.label[lang]}`}
                            className="text-stone transition-colors hover:text-ink"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center rounded-full border border-line">
                            <button
                              type="button"
                              onClick={() => setQty(line.variantId, line.qty - 1)}
                              aria-label={t('cart.decrease')}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-snow"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-geo text-sm text-ink tnum">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.variantId, line.qty + 1)}
                              aria-label={t('cart.increase')}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-snow"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-geo text-sm font-medium text-ink tnum">
                            {formatPrice(line.lineTotal, currency)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-line px-6 py-5">
                <div className="flex items-center justify-between font-geo">
                  <span className="text-sm text-stone">{t('cart.subtotal')}</span>
                  <span className="text-lg font-semibold text-ink tnum">{formatPrice(subtotal, currency)}</span>
                </div>
                <p className="mt-1 font-geo text-xs text-sage-deep">{t('cart.shippingFree')}</p>
                <button
                  type="button"
                  onClick={goCheckout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-geo text-sm font-medium text-white transition-colors hover:bg-carbon"
                >
                  {t('cart.checkout')} <ArrowRight size={16} />
                </button>
                <p className="mt-3 text-center font-geo text-[0.68rem] text-stone">{t('cart.note')}</p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

/* Small helper so the empty-state CTA both closes the drawer and navigates. */
function goCheckoutSafe(close, navigate, to) {
  return () => {
    close()
    navigate(to)
  }
}
