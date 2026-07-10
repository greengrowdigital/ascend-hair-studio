import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import RootLayout from './layout/RootLayout.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Science from './pages/Science.jsx'
import Contact from './pages/Contact.jsx'
import Checkout from './pages/Checkout.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()

  return (
    // reducedMotion="user" makes Framer Motion honour the OS "reduce motion"
    // setting for declarative animations. Scroll-bound transforms in Home are
    // flattened separately via useReducedMotion().
    <MotionConfig reducedMotion="user">
      <RootLayout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/science" element={<Science />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </RootLayout>
    </MotionConfig>
  )
}
