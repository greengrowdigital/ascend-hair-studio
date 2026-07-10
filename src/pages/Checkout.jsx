import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, Lock, ArrowRight, ShoppingBag } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { useCart } from '../state/CartContext.jsx'
import { formatPrice } from '../lib/format.js'
import { PRODUCT, CLAY_DIAGONAL } from '../data/content.js'
import ProductImage from '../components/ProductImage.jsx'

function orderId() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `ASC-${n}`
}

export default function Checkout() {
  const { t, lang } = useI18n()
  const { lines, subtotal, count, currency, clear } = useCart()
  const [status, setStatus] = useState('idle') // idle | placing | success
  const [order, setOrder] = useState(null)
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function handleSubmit(e) {
    e.preventDefault()
    if (!lines.length) return
    setStatus('placing')
    setTimeout(() => {
      setOrder({ id: orderId(), total: subtotal })
      clear()
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 1200)
  }

  const fieldClass =
    'w-full rounded-field border border-line bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-stone transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-sage/40'
  const labelClass = 'block font-geo text-xs font-medium tracking-wide text-slate'

  /* ---------- Success ---------- */
  if (status === 'success' && order) {
    return (
      <PageTransition>
        <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-32 text-center">
          <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage text-ink">
              <Check size={30} />
            </span>
            <h1 className="mt-7 font-serif text-3xl font-semibold text-ink">{t('checkout.successTitle')}</h1>
            <p className="mt-4 font-body font-light leading-relaxed text-stone text-pretty">
              {t('checkout.successBody')}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-snow px-5 py-2.5 font-geo text-sm text-ink">
              {t('checkout.orderNumber')}: <span className="font-semibold tnum">{order.id}</span>
            </div>
            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 font-geo text-sm font-medium text-white transition-colors hover:bg-carbon"
              >
                {t('checkout.continueShopping')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    )
  }

  /* ---------- Empty ---------- */
  if (!lines.length) {
    return (
      <PageTransition>
        <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-32 text-center">
          <ShoppingBag size={44} strokeWidth={1} className="text-line" />
          <h1 className="mt-6 font-serif text-2xl font-semibold text-ink">{t('checkout.empty')}</h1>
          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-geo text-sm font-medium text-white transition-colors hover:bg-carbon"
          >
            {t('checkout.emptyCta')} <ArrowRight size={16} />
          </Link>
        </section>
      </PageTransition>
    )
  }

  /* ---------- Checkout ---------- */
  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-28 sm:px-8 sm:pt-32">
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">{t('checkout.title')}</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="grid gap-8">
            <fieldset className="grid gap-5">
              <legend className="mb-2 font-serif text-lg font-semibold text-ink">
                {t('checkout.contactInfo')}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-name" className={labelClass}>{t('checkout.formName')}</label>
                  <input id="co-name" type="text" required autoComplete="name" className={`mt-2 ${fieldClass}`} />
                </div>
                <div>
                  <label htmlFor="co-email" className={labelClass}>{t('checkout.formEmail')}</label>
                  <input id="co-email" type="email" required autoComplete="email" className={`mt-2 ${fieldClass}`} />
                </div>
              </div>
              <div>
                <label htmlFor="co-address" className={labelClass}>{t('checkout.formAddress')}</label>
                <input id="co-address" type="text" required autoComplete="address-line1" className={`mt-2 ${fieldClass}`} />
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="co-city" className={labelClass}>{t('checkout.formCity')}</label>
                  <input id="co-city" type="text" required autoComplete="address-level2" className={`mt-2 ${fieldClass}`} />
                </div>
                <div>
                  <label htmlFor="co-zip" className={labelClass}>{t('checkout.formZip')}</label>
                  <input id="co-zip" type="text" required autoComplete="postal-code" className={`mt-2 ${fieldClass}`} />
                </div>
                <div>
                  <label htmlFor="co-country" className={labelClass}>{t('checkout.formCountry')}</label>
                  <input id="co-country" type="text" required autoComplete="country-name" defaultValue="Česko" className={`mt-2 ${fieldClass}`} />
                </div>
              </div>
              <div>
                <label htmlFor="co-phone" className={labelClass}>{t('checkout.formPhone')}</label>
                <input id="co-phone" type="tel" autoComplete="tel" className={`mt-2 ${fieldClass}`} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 font-serif text-lg font-semibold text-ink">{t('checkout.payment')}</legend>
              <div className="flex items-center gap-3 rounded-card border border-dashed border-line bg-snow px-5 py-4">
                <Lock size={18} className="shrink-0 text-stone" />
                <p className="font-geo text-xs leading-snug text-stone">{t('checkout.paymentNote')}</p>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={status === 'placing'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-geo text-[0.95rem] font-medium text-white transition-colors hover:bg-carbon disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {status === 'placing' ? t('checkout.placing') : (
                <>
                  {t('checkout.placeOrder')} · {formatPrice(subtotal, currency)} <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-hero border border-line bg-snow p-6 sm:p-8">
              <h2 className="font-serif text-lg font-semibold text-ink">{t('checkout.summary')}</h2>
              <ul className="mt-5 divide-y divide-line">
                {lines.map((line) => (
                  <li key={line.variantId} className="flex gap-4 py-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-field border border-line bg-white">
                      <ProductImage src={CLAY_DIAGONAL} alt={PRODUCT.name[lang]} imgClassName="p-1.5" />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-3">
                      <div>
                        <p className="font-serif text-sm font-semibold text-ink">
                          {PRODUCT.brand} {PRODUCT.name[lang]}
                        </p>
                        <p className="mt-0.5 font-geo text-xs text-stone">
                          {line.variant.label[lang]} · ×{line.qty}
                        </p>
                      </div>
                      <span className="font-geo text-sm font-medium text-ink tnum">
                        {formatPrice(line.lineTotal, currency)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-2 border-t border-line pt-4 font-geo text-sm">
                <div className="flex justify-between text-stone">
                  <dt>{t('checkout.subtotal')} · {count}</dt>
                  <dd className="text-ink tnum">{formatPrice(subtotal, currency)}</dd>
                </div>
                <div className="flex justify-between text-stone">
                  <dt>{t('checkout.shipping')}</dt>
                  <dd className="text-sage-deep">{t('checkout.shippingFree')}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
                  <dt>{t('checkout.total')}</dt>
                  <dd className="tnum">{formatPrice(subtotal, currency)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
