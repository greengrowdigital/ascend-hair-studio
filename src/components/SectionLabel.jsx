/* Small technical label with a short leading rule. Colour is inherited from
   the caller (pass a text-* class), so it works on light and dark surfaces.
   Used sparingly — not as a per-section eyebrow. */
export default function SectionLabel({ children, className = '', align = 'left' }) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${className}`}
    >
      <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
      <span className="label-stencil">{children}</span>
    </div>
  )
}
