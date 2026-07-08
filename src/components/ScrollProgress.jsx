import { motion, useScroll, useSpring } from 'framer-motion'

/* Thin sage progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-sage-deep via-sage to-sage-light"
      aria-hidden="true"
    />
  )
}
