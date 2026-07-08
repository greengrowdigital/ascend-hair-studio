import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel.jsx'

/* Consistent inner-page masthead. Clears the fixed navbar and sets the tone. */
export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <header className="relative overflow-hidden bg-radial-spot px-6 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>{eyebrow}</SectionLabel>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="type-display mt-6 max-w-4xl font-serif font-light text-porcelain"
        >
          {title}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl font-body text-base font-light leading-relaxed text-mist"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </header>
  )
}
