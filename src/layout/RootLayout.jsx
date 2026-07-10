import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import CartDrawer from '../components/CartDrawer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const SKIP = { cs: 'Přejít na obsah', en: 'Skip to content', es: 'Saltar al contenido' }

export default function RootLayout({ children }) {
  const { lang } = useI18n()
  return (
    <div className="relative min-h-screen bg-white text-ink">
      <a
        href="#main"
        className="sr-only rounded-full font-geo text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-2.5 focus:outline-none focus:ring-2 focus:ring-sage"
      >
        {SKIP[lang] || SKIP.en}
      </a>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}
