import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, Leaf } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function ProductCard({ product }) {
  const { lang, t } = useI18n()
  const [added, setAdded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-graphite bg-charcoal transition-colors duration-500 hover:border-sage-deep"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.img}
          alt={product.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-porcelain/20 bg-ink/50 px-3 py-1 font-geo text-[0.6rem] uppercase tracking-[0.18em] text-porcelain backdrop-blur-md">
            {product.badge[lang]}
          </span>
        )}
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-sage/90 px-3 py-1 font-geo text-[0.62rem] font-medium tracking-wide text-ink">
          <Leaf size={11} /> {product.hero[lang]}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl text-porcelain">{product.name[lang]}</h3>
          <span className="font-mono text-sm text-sage-light">{product.price}</span>
        </div>
        <p className="mt-1 font-geo text-[0.68rem] uppercase tracking-[0.16em] text-stone">
          {product.type[lang]}
        </p>
        <p className="mt-3 flex-1 font-body text-sm font-light leading-relaxed text-mist">
          {product.tagline[lang]}
        </p>

        <button
          type="button"
          onClick={() => setAdded((v) => !v)}
          className={`mt-5 flex items-center justify-center gap-2 rounded-full border py-3 font-geo text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-300 ${
            added
              ? 'border-sage bg-sage text-ink'
              : 'border-graphite text-mist hover:border-sage hover:text-porcelain'
          }`}
        >
          {added ? (
            <>
              <Check size={14} /> {t('contact.successTitle')}
            </>
          ) : (
            <>
              <Plus size={14} /> {t('products.addToBag')}
            </>
          )}
        </button>
      </div>
    </motion.article>
  )
}
