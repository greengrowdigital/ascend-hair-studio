import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import Logo from './Logo.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import Button from './Button.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { useUI } from '../state/UIContext.jsx'
import { useCart } from '../state/CartContext.jsx'

const LINKS = [
  { to: '/shop', key: 'shop' },
  { to: '/science', key: 'science' },
  { to: '/contact', key: 'contact' },
]

export default function Navbar() {
  const { t } = useI18n()
  const { navTheme } = useUI()
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const onDark = navTheme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const framed = scrolled || onDark
  const pillClass = framed
    ? onDark
      ? 'border-white/10 bg-black/40 backdrop-blur-xl'
      : 'border-line bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)]'
    : 'border-transparent bg-transparent'
  const linkIdle = onDark ? 'text-mist hover:text-white' : 'text-stone hover:text-ink'
  const linkActive = onDark ? 'text-white' : 'text-ink'
  const chrome = onDark ? 'text-white' : 'text-ink'

  const iconBtn = `relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
    onDark
      ? 'border-white/15 text-white hover:border-white/40'
      : 'border-line text-ink hover:border-ink'
  }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-5 ${pillClass}`}
      >
        <Link
          to="/"
          aria-label="ASCEND — home"
          className={`transition-colors duration-500 hover-lift ${chrome}`}
        >
          <Logo size={28} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `font-geo text-[0.86rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                    isActive ? linkActive : linkIdle
                  }`
                }
              >
                {t(`nav.${l.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <LanguageToggle theme={onDark ? 'dark' : 'light'} compact />
          </div>

          <button type="button" onClick={openCart} aria-label={t('nav.cart')} className={iconBtn}>
            <ShoppingBag size={17} strokeWidth={1.75} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-sage px-1 font-geo text-[0.62rem] font-semibold text-ink tnum"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            aria-expanded={open}
            className={`${iconBtn} lg:hidden`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 py-28">
              <NavLink
                to="/"
                className="border-b border-line py-4 font-serif text-4xl font-semibold tracking-tight text-ink"
              >
                {t('nav.home')}
              </NavLink>
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block border-b border-line py-4 font-serif text-4xl font-semibold tracking-tight transition-colors ${
                        isActive ? 'text-sage-deep' : 'text-ink'
                      }`
                    }
                  >
                    {t(`nav.${l.key}`)}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 px-8 pb-12">
              <LanguageToggle />
              <Button to="/shop" variant="solid" size="md">
                {t('nav.buy')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
