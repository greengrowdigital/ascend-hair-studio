import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import Button from './Button.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const LINKS = [
  { to: '/', key: 'home', end: true },
  { to: '/products', key: 'products', end: false },
  { to: '/services', key: 'services', end: false },
  { to: '/philosophy', key: 'philosophy', end: false },
  { to: '/contact', key: 'contact', end: false },
]

export default function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `relative font-geo text-[0.82rem] tracking-wide transition-colors duration-300 ${
      isActive ? 'text-porcelain' : 'text-mist hover:text-porcelain'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(11,12,14,0.72)' : 'rgba(11,12,14,0)',
          borderColor: scrolled ? 'rgba(34,38,44,1)' : 'rgba(34,38,44,0)',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 sm:px-5 sm:py-3 ${
          scrolled ? 'backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]' : ''
        }`}
      >
        <Link to="/" aria-label="Ascend Hair Studio — home" className="text-porcelain hover-lift">
          <Logo size={30} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={linkClass}>
                {({ isActive }) => (
                  <span className="relative inline-block py-1">
                    {t(`nav.${l.key}`)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-sage"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button to="/contact" variant="solid" size="sm">
            {t('nav.book')}
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite text-porcelain transition-colors hover:border-sage lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 py-24">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `block border-b border-graphite py-4 font-serif text-4xl tracking-tight transition-colors ${
                        isActive ? 'text-sage' : 'text-porcelain'
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
              <Button to="/contact" variant="solid" size="md">
                {t('nav.book')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
