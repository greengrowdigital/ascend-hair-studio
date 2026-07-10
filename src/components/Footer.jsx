import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, ArrowRight, Check } from 'lucide-react'
import Logo from './Logo.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const YEAR = 2026

export default function Footer() {
  const { t } = useI18n()
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="border-t border-line bg-snow px-6 pt-16 sm:px-8 sm:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="text-ink">
            <Logo className="text-base" />
          </Link>
          <p className="mt-5 max-w-xs font-body text-sm font-light leading-relaxed text-stone">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-stone transition-all duration-300 hover:border-sage hover:text-sage-deep"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <nav aria-label={t('footer.shop')}>
          <h4 className="label-stencil text-stone">{t('footer.shop')}</h4>
          <ul className="mt-5 space-y-3 font-geo text-sm text-slate">
            <li><Link to="/shop" className="transition-colors hover:text-ink">{t('nav.shop')}</Link></li>
            <li><Link to="/science" className="transition-colors hover:text-ink">{t('nav.science')}</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-ink">{t('nav.contact')}</Link></li>
          </ul>
        </nav>

        {/* Info */}
        <div>
          <h4 className="label-stencil text-stone">{t('footer.connect')}</h4>
          <ul className="mt-5 space-y-3 font-body text-sm font-light text-slate">
            <li>{t('contact.hours')}</li>
            <li>{t('contact.mapLocation')}</li>
            <li>ahoj@ascendclay.cz</li>
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
            <div className="flex items-center gap-2 border-b border-line pb-2 transition-colors focus-within:border-sage">
              <input
                type="email"
                id="footer-newsletter-email"
                name="email"
                required
                disabled={subscribed}
                placeholder={t('footer.newsletterPlaceholder')}
                aria-label={t('footer.newsletterPlaceholder')}
                autoComplete="email"
                className="w-full bg-transparent font-body text-sm text-ink placeholder:text-stone focus:outline-none"
              />
              <button
                type="submit"
                aria-label={t('footer.newsletterBtn')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105"
              >
                {subscribed ? <Check size={15} /> : <ArrowRight size={15} />}
              </button>
            </div>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1rem] font-geo text-xs text-sage-deep">
              {subscribed ? `✓ ${t('contact.successTitle')}` : ''}
            </p>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-14 max-w-6xl">
        <div className="divider-hair" />
        <div className="flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-geo text-xs text-stone">
            <span>© {YEAR} ASCEND</span>
            <span className="hidden text-line sm:inline">·</span>
            <span>{t('footer.made')} 🇨🇿</span>
          </div>
          <div className="flex items-center gap-2 font-geo text-xs text-slate">
            <span className="h-2 w-2 rounded-full bg-sage animate-pulse-dot" />
            {t('footer.status')}
          </div>
        </div>
        <p className="pb-8 text-center font-geo text-[0.68rem] text-stone sm:text-left">{t('footer.demo')}</p>
      </div>
    </footer>
  )
}
