import { useEffect, useRef, useState } from 'react'
import { useUI } from '../state/UIContext.jsx'

/* Wraps a page section and tells the floating navbar which surface it is
   sitting over. When this section crosses the navbar's band near the top of
   the viewport, it sets navTheme to its `theme` ('light' | 'dark'). `theme`
   may change over time (the hero passes a scroll-driven value); the effect
   re-applies while the section is the active one under the navbar. */
export default function NavZone({ theme = 'light', as: Tag = 'section', className = '', children, ...rest }) {
  const ref = useRef(null)
  const { setNavTheme } = useUI()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // A thin band just below the top edge, where the navbar pill sits.
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: '-52px 0px -94% 0px',
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (active) setNavTheme(theme)
  }, [active, theme, setNavTheme])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
