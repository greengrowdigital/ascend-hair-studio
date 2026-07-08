import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, ArrowRight, Check } from 'lucide-react'
import Logo from './Logo.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t } = useI18n()
  const [subscribed, setSubscribed] = useState(false)

  const year = 2026

  return (
    <footer className="relative mt-px rounded-t-[2.5rem] border-t border-graphite bg-obsidian pt-16 sm:rounded-t-[3.5rem] sm:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="text-porcelain">
            <Logo size={34} />
          </Link>
          <p className="mt-5 max-w-xs font-body text-sm font-light leading-relaxed text-mist">
            {t('footer.tagline')}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Mail, label: 'Email' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite text-mist transition-all duration-300 hover:border-sage hover:text-sage"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label={t('footer.explore')}>
          <h4 className="label-stencil text-stone">{t('footer.explore')}</h4>
          <ul className="mt-5 space-y-3 font-geo text-sm text-mist">
            <li><Link to="/products" className="transition-colors hover:text-porcelain">{t('nav.products')}</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-porcelain">{t('nav.services')}</Link></li>
            <li><Link to="/philosophy" className="transition-colors hover:text-porcelain">{t('nav.philosophy')}</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-porcelain">{t('nav.contact')}</Link></li>
          </ul>
        </nav>

        {/* Studio */}
        <div>
          <h4 className="label-stencil text-stone">{t('footer.studio')}</h4>
          <ul className="mt-5 space-y-3 font-body text-sm font-light text-mist">
            <li>{t('contact.hours')}</li>
            <li>{t('contact.address')}</li>
            <li>+420 212 340 118</li>
            <li>ahoj@ascendstudio.cz</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="label-stencil text-stone">{t('footer.newsletterLabel')}</h4>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault()
              setSubscribed(true)
            }}
          >
            <div className="flex items-center gap-2 border-b border-graphite pb-2 transition-colors focus-within:border-sage">
              <input
                type="email"
                required
                disabled={subscribed}
                placeholder={t('footer.newsletterPlaceholder')}
                aria-label={t('footer.newsletterPlaceholder')}
                className="w-full bg-transparent font-body text-sm text-porcelain placeholder:text-stone focus:outline-none"
              />
              <button
                type="submit"
                aria-label={t('footer.newsletterBtn')}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage text-ink transition-transform hover:scale-105"
              >
                {subscribed ? <Check size={15} /> : <ArrowRight size={15} />}
              </button>
            </div>
            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-[1rem] font-geo text-xs tracking-wide text-sage"
            >
              {subscribed ? `✓ ${t('contact.successTitle')}` : ''}
            </p>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-14 max-w-6xl px-6 sm:px-8">
        <div className="divider-hair" />
        <div className="flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-geo text-xs text-stone">
            <span>© {year} Ascend Hair Studio</span>
            <span className="hidden sm:inline text-graphite">·</span>
            <span>{t('footer.made')} 🇨🇿</span>
          </div>
          <div className="flex items-center gap-2 font-geo text-xs text-mist">
            <span className="h-2 w-2 rounded-full bg-sage animate-pulse-dot" />
            {t('footer.status')}
          </div>
        </div>
        <p className="pb-8 text-center font-geo text-[0.68rem] tracking-wide text-slate sm:text-left">
          {t('footer.demo')}
        </p>
      </div>
    </footer>
  )
}
