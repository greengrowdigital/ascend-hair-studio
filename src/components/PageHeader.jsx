import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel.jsx'

/* Consistent inner-page masthead (light surface). Clears the fixed navbar. */
export default function PageHeader({ eyebrow, title, sub, align = 'left' }) {
  const center = align === 'center'
  return (
    <header className={`mx-auto max-w-6xl px-6 pb-10 pt-36 sm:px-8 sm:pt-44 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel className={`text-sage-deep ${center ? 'justify-center' : ''}`}>
            {eyebrow}
          </SectionLabel>
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="type-hero mt-5 max-w-4xl font-serif font-semibold text-ink text-balance"
      >
        {title}
      </motion.h1>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-5 max-w-2xl font-body text-lg font-light leading-relaxed text-stone text-pretty ${
            center ? 'mx-auto' : ''
          }`}
        >
          {sub}
        </motion.p>
      )}
    </header>
  )
}
