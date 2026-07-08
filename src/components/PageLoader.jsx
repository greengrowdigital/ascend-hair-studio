import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* One-time intro: the ASCEND ring draws itself, then the curtain lifts. */
export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            width="88"
            height="88"
            viewBox="0 0 48 48"
            fill="none"
            className="text-porcelain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="138"
              initial={{ strokeDashoffset: 138 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M14.5 33 L24 15 L33.5 33 M19 27 H29"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="square"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
            />
          </motion.svg>
          <motion.span
            className="text-chrome-gradient mt-6 font-display text-[0.7rem] tracking-[0.5em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            ASCEND
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
