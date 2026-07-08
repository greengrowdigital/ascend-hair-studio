/* Editorial eyebrow: stencil label preceded by a short chrome (metallic) rule —
   the silver hairline that echoes the ASCEND emblem across every section. */
export default function SectionLabel({ children, tone = 'sage', align = 'left' }) {
  const text = tone === 'sage' ? 'text-sage' : 'text-mist'
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
    >
      <span className="h-px w-7 bg-gradient-to-r from-chrome via-chrome/70 to-transparent" />
      <span className={`label-stencil ${text}`}>{children}</span>
    </div>
  )
}
