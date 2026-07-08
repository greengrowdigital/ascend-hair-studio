import { useI18n } from '../i18n/LanguageContext.jsx'

/* Infinite botanical-claims marquee. Duplicated track for a seamless loop. */
export default function Marquee({ tone = 'dark' }) {
  const { t } = useI18n()
  const items = t('marquee') // array of strings
  const list = Array.isArray(items) ? items : []

  const wrap =
    tone === 'dark'
      ? 'border-y border-graphite bg-obsidian text-porcelain'
      : 'border-y border-linen bg-cream text-ink'
  const star = tone === 'dark' ? 'text-sage' : 'text-sage-deep'

  const Track = () => (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {list.map((label, i) => (
        <div key={i} className="flex items-center gap-10">
          <span className="font-geo text-sm font-light tracking-[0.02em] whitespace-nowrap">
            {label}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" className={star} aria-hidden="true">
            <path
              d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  )

  return (
    <div className={`relative overflow-hidden py-4 ${wrap}`} aria-hidden="true">
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  )
}
