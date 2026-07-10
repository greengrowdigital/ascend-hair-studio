import { useI18n } from '../i18n/LanguageContext.jsx'

/* Segmented CS · EN · ES switcher. `theme` matches the surface it sits on. */
export default function LanguageToggle({ theme = 'light', compact = false }) {
  const { lang, setLang, langs } = useI18n()
  const dark = theme === 'dark'

  return (
    <div
      className={`inline-flex items-center rounded-full border p-[3px] backdrop-blur-sm ${
        dark ? 'border-white/15 bg-white/5' : 'border-line bg-white/70'
      }`}
      role="group"
      aria-label="Language"
    >
      {langs.map(({ code, label, name }) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={name}
            className={`inline-flex min-h-[36px] items-center justify-center rounded-full font-geo tracking-[0.08em] transition-all duration-300 ${
              compact ? 'px-2.5 text-[0.68rem]' : 'px-3 text-[0.72rem]'
            } ${
              active
                ? dark
                  ? 'bg-white font-semibold text-ink'
                  : 'bg-ink font-semibold text-white'
                : dark
                  ? 'text-mist hover:text-white'
                  : 'text-stone hover:text-ink'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
