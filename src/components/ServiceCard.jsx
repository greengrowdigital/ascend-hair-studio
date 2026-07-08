import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function ServiceCard({ service, index = 0 }) {
  const { lang, t } = useI18n()
  const price = typeof service.price === 'object' ? service.price[lang] : service.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-graphite bg-charcoal"
    >
      <div className="relative h-56 overflow-hidden sm:h-64">
        <img
          src={service.img}
          alt={service.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1 font-mono text-[0.66rem] text-porcelain backdrop-blur-md">
          <Clock size={11} /> {service.duration[lang]}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl text-porcelain">{service.name[lang]}</h3>
          <span className="whitespace-nowrap font-mono text-sm text-sage-light">
            <span className="text-stone">{t('services.from')} </span>
            {price}
          </span>
        </div>
        <p className="mt-3 font-body text-sm font-light leading-relaxed text-mist">
          {service.desc[lang]}
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-1.5 font-geo text-[0.74rem] uppercase tracking-[0.14em] text-sage transition-colors hover:text-sage-light"
        >
          {t('services.book')}
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}
