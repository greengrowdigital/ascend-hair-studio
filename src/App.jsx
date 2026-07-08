import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import RootLayout from './layout/RootLayout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Services from './pages/Services.jsx'
import Philosophy from './pages/Philosophy.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user" makes Framer Motion honour the OS "reduce motion"
    // setting for every declarative animation (transforms snap to their end
    // state, opacity still fades). Scroll-bound parallax is handled separately
    // in Home.jsx via useReducedMotion().
    <MotionConfig reducedMotion="user">
      <RootLayout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </RootLayout>
    </MotionConfig>
  )
}
