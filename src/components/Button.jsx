import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/* Apple-clean pill button: sentence-case, moderate tracking, subtle magnetic
   pull. Variants pair colours for AA contrast on their intended surface. */

const BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-geo font-medium ' +
  'tracking-[0.01em] transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(.25,.46,.45,.94)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2'

const SIZES = {
  sm: 'px-5 py-2.5 text-[0.82rem]',
  md: 'px-7 py-3 text-[0.9rem]',
  lg: 'px-8 py-3.5 text-[0.95rem]',
}

const VARIANTS = {
  // On light surfaces
  solid: 'bg-ink text-white hover:bg-carbon focus-visible:ring-offset-white',
  sage: 'bg-sage text-ink hover:bg-sage-deep hover:text-white focus-visible:ring-offset-white',
  outline:
    'border border-line text-ink hover:border-ink hover:bg-snow focus-visible:ring-offset-white',
  // On dark surfaces
  light: 'bg-white text-ink hover:bg-cloud focus-visible:ring-offset-ink',
  outlineLight:
    'border border-white/25 text-white hover:border-white hover:bg-white/10 focus-visible:ring-offset-ink',
}

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  size = 'md',
  className = '',
  magnetic = true,
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 170, damping: 15, mass: 0.3 })
  const y = useSpring(my, { stiffness: 170, damping: 15, mass: 0.3 })

  function handleMove(e) {
    if (!magnetic || reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.18)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  function reset() {
    mx.set(0)
    my.set(0)
  }

  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant] || VARIANTS.solid} ${className}`

  let El
  const elProps = { className: cls, ...rest }
  if (to) {
    El = Link
    elProps.to = to
  } else if (href) {
    El = 'a'
    elProps.href = href
  } else {
    El = 'button'
    elProps.type = type
    elProps.onClick = onClick
  }

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <El {...elProps}>{children}</El>
    </motion.span>
  )
}
