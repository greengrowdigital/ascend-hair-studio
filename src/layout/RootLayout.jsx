import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import NoiseOverlay from '../components/NoiseOverlay.jsx'
import PageLoader from '../components/PageLoader.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

const SKIP = { cs: 'Přejít na obsah', en: 'Skip to content', es: 'Saltar al contenido' }

export default function RootLayout({ children }) {
  const { lang } = useI18n()
  return (
    <div className="relative min-h-screen bg-ink text-porcelain">
      <a
        href="#main"
        className="sr-only rounded-full font-geo text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-sage focus:px-5 focus:py-2.5 focus:outline-none focus:ring-2 focus:ring-porcelain"
      >
        {SKIP[lang] || SKIP.en}
      </a>
      <PageLoader />
      <NoiseOverlay />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}
