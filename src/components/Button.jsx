import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const BASE =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full ' +
  'font-geo uppercase tracking-[0.14em] transition-colors duration-500 ease-[cubic-bezier(.25,.46,.45,.94)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ink'

const SIZES = {
  sm: 'px-5 py-2.5 text-[0.7rem]',
  md: 'px-7 py-3.5 text-[0.78rem]',
  lg: 'px-9 py-4 text-[0.82rem]',
}

const VARIANTS = {
  solid: {
    base: 'bg-sage text-ink border border-sage',
    fill: 'bg-ink',
    hoverText: 'group-hover:text-porcelain',
  },
  light: {
    base: 'bg-porcelain text-ink border border-porcelain',
    fill: 'bg-sage',
    hoverText: 'group-hover:text-ink',
  },
  outline: {
    base: 'bg-transparent text-porcelain border border-graphite group-hover:border-sage',
    fill: 'bg-sage',
    hoverText: 'group-hover:text-ink',
  },
  dark: {
    base: 'bg-ink text-porcelain border border-ink',
    fill: 'bg-sage',
    hoverText: 'group-hover:text-ink',
  },
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
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 160, damping: 15, mass: 0.3 })
  const y = useSpring(my, { stiffness: 160, damping: 15, mass: 0.3 })

  const v = VARIANTS[variant] || VARIANTS.solid

  function handleMove(e) {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function reset() {
    mx.set(0)
    my.set(0)
  }

  const cls = `${BASE} ${SIZES[size]} ${v.base} ${className}`

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 translate-y-[102%] rounded-full transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:translate-y-0 ${v.fill}`}
      />
      <span className={`relative z-10 inline-flex items-center gap-2 ${v.hoverText} transition-colors duration-500`}>
        {children}
      </span>
    </>
  )

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
      <El {...elProps}>{inner}</El>
    </motion.span>
  )
}
