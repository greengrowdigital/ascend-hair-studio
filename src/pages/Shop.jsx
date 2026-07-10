import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  Check,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Leaf,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import ProductImage from '../components/ProductImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { useCart, variantById } from '../state/CartContext.jsx'
import { formatPrice } from '../lib/format.js'
import { PRODUCT, VARIANTS, DEFAULT_VARIANT, INGREDIENTS, RITUAL, SPECS, FAQ } from '../data/content.js'

export default function Shop() {
  const { t, lang } = useI18n()
  const { addItem, openCart } = useCart()
  const [variantId, setVariantId] = useState(DEFAULT_VARIANT)
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)
  const [added, setAdded] = useState(false)

  const variant = variantById(variantId) || VARIANTS[0]
  const galleryAlts = [t('shop.galleryDiagonal'), t('shop.galleryTop'), t('shop.galleryLifestyle')]

  function handleAdd() {
    addItem(variantId, qty)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-8 sm:pt-32">
        {/* ===================== BUY BLOCK ===================== */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-hero border border-line bg-snow">
              <div className="aspect-square w-full p-6 sm:p-10">
                <ProductImage
                  key={active}
                  src={PRODUCT.gallery[active]}
                  alt={galleryAlts[active]}
                  eager
                  imgClassName={
                    PRODUCT.gallery[active].endsWith('.png')
                      ? 'object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]'
                      : 'object-cover'
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              {PRODUCT.gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={galleryAlts[i]}
                  aria-pressed={active === i}
                  className={`h-20 w-20 overflow-hidden rounded-field border bg-snow transition-colors ${
                    active === i ? 'border-ink' : 'border-line hover:border-stone'
                  }`}
                >
                  <ProductImage
                    src={src}
                    alt=""
                    imgClassName={src.endsWith('.png') ? 'object-contain p-1' : 'object-cover'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Config */}
          <div>
            <SectionLabel className="text-sage-deep">{t('shop.eyebrow')}</SectionLabel>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-ink text-balance sm:text-5xl">
              {PRODUCT.brand} {PRODUCT.name[lang]}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5" aria-label={t('shop.reviewsValue')}>
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={15} className="fill-sage text-sage" />
                  ))}
                </span>
                <span className="font-geo text-sm text-stone">{t('shop.reviewsValue')}</span>
              </div>
            </div>

            <p className="mt-5 max-w-md font-body text-lg font-light leading-relaxed text-slate text-pretty">
              {PRODUCT.tagline[lang]}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-ink tnum">
                {formatPrice(variant.price, PRODUCT.currency)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-geo text-sm text-sage-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" /> {t('shop.inStock')}
              </span>
            </div>

            {/* Size selector */}
            <fieldset className="mt-8">
              <legend className="label-stencil text-stone">{t('shop.chooseSize')}</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {VARIANTS.map((v) => {
                  const selected = v.id === variantId
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariantId(v.id)}
                      aria-pressed={selected}
                      className={`relative rounded-card border p-4 text-left transition-all duration-200 ${
                        selected ? 'border-ink bg-snow' : 'border-line hover:border-stone'
                      }`}
                    >
                      {v.badge && (
                        <span className="absolute -top-2 right-3 rounded-full bg-sage px-2 py-0.5 font-geo text-[0.6rem] font-semibold uppercase tracking-wide text-ink">
                          {v.badge[lang]}
                        </span>
                      )}
                      <span className="block font-serif text-base font-semibold text-ink">{v.label[lang]}</span>
                      <span className="mt-0.5 block font-geo text-xs text-stone">{v.note[lang]}</span>
                      <span className="mt-2 block font-geo text-sm font-medium text-ink tnum">
                        {formatPrice(v.price, PRODUCT.currency)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {/* Quantity + add */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="inline-flex items-center justify-between rounded-full border border-line px-1.5 py-1.5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label={t('cart.decrease')}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-snow"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-geo text-base font-medium text-ink tnum" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label={t('cart.increase')}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-snow"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 font-geo text-[0.95rem] font-medium text-white transition-colors duration-300 hover:bg-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {added ? (
                  <>
                    <Check size={18} /> {t('shop.added')}
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} strokeWidth={1.75} /> {t('shop.addToBag')} ·{' '}
                    {formatPrice(variant.price * qty, PRODUCT.currency)}
                  </>
                )}
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-8 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
              {[
                { Icon: Truck, label: t('shop.freeShipping') },
                { Icon: ShieldCheck, label: t('shop.shippingNote') },
                { Icon: Leaf, label: t('shop.demoNote') },
              ].map(({ Icon, label }, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Icon size={17} className="mt-0.5 shrink-0 text-sage-deep" />
                  <span className="font-geo text-xs leading-snug text-stone">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================== HOW TO USE ===================== */}
        <section className="mt-28">
          <SectionLabel className="text-sage-deep">{t('shop.howToUse')}</SectionLabel>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RITUAL.map((step) => (
              <Reveal key={step.id} className="rounded-card border border-line bg-snow p-6">
                <span className="font-mono text-sm font-medium text-sage-deep tnum">{step.id}</span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{step.name[lang]}</h3>
                <p className="mt-2 font-body text-sm font-light leading-relaxed text-stone text-pretty">
                  {step.desc[lang]}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== FORMULA ===================== */}
        <section className="mt-24">
          <SectionLabel className="text-sage-deep">{t('shop.ingredientsTab')}</SectionLabel>
          <div className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENTS.map((ing) => (
              <div key={ing.id} className="bg-white p-6">
                <h3 className="font-serif text-base font-semibold text-ink">{ing.name[lang]}</h3>
                <span className="mt-0.5 block font-mono text-[0.7rem] italic text-sage-deep">{ing.latin}</span>
                <p className="mt-2 font-body text-sm font-light leading-relaxed text-stone text-pretty">
                  {ing.note[lang]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== SPECS + FAQ ===================== */}
        <section className="mt-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionLabel className="text-sage-deep">{t('shop.specsTab')}</SectionLabel>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {SPECS.map((s, i) => (
                <div key={i} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="font-geo text-sm text-stone">{s.label[lang]}</dt>
                  <dd className="text-right font-body text-sm font-medium text-ink">{s.value[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionLabel className="text-sage-deep">{t('shop.faqTab')}</SectionLabel>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {FAQ.map((item, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.q[lang]}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-stone transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 max-w-prose font-body text-sm font-light leading-relaxed text-stone text-pretty">
                    {item.a[lang]}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <p className="mt-16 text-center font-geo text-xs text-stone">{t('shop.demoNote')}</p>
      </div>
    </PageTransition>
  )
}
