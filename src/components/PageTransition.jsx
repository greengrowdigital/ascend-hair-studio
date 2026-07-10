import { motion } from 'framer-motion'

/* Route enter/exit crossfade inside AnimatePresence. Opacity-only (no
   transform) so pages can use `position: sticky` without a transformed
   ancestor breaking it. */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
