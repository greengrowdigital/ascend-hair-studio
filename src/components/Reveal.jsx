import { motion } from 'framer-motion'

/* Scroll-triggered fade-up. Wraps any children. Reduced-motion is honoured
   app-wide via <MotionConfig reducedMotion="user"> in App.jsx, which snaps the
   y transform to its end state (opacity still fades) when the OS requests it. */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 26,
  once = true,
  className = '',
  amount = 0.35,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
