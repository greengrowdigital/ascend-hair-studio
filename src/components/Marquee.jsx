import { useI18n } from '../i18n/LanguageContext.jsx'

/* Infinite ticker of brand claims. Decorative → aria-hidden. Theme-aware. */
export default function Marquee({ tone = 'light' }) {
  const { t } = useI18n()
  const items = t('marquee')
  const list = Array.isArray(items) ? items : []
  if (!list.length) return null
  const dark = tone === 'dark'

  const Track = () => (
    <div className="flex shrink-0 items-center pr-6">
      {list.map((label, i) => (
        <div key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-geo text-[0.72rem] uppercase tracking-[0.22em] ${
              dark ? 'text-ash' : 'text-stone'
            }`}
          >
            {label}
          </span>
          <span
            className={`inline-block h-1 w-1 rounded-full ${dark ? 'bg-sage-light' : 'bg-sage'}`}
          />
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={`relative overflow-hidden border-y py-4 ${
        dark ? 'border-graphite bg-ink' : 'border-line bg-snow'
      }`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  )
}
