import { useI18n } from '../i18n/LanguageContext.jsx'

/* Segmented CS · EN · ES switcher. Persisted via LanguageContext. */
export default function LanguageToggle({ compact = false }) {
  const { lang, setLang, langs } = useI18n()

  return (
    <div
      className="inline-flex items-center rounded-full border border-graphite bg-ink/40 p-[3px] backdrop-blur-sm"
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
            className={`rounded-full font-geo tracking-[0.12em] transition-all duration-300 ${
              compact ? 'px-2.5 py-2 text-[0.64rem]' : 'px-3 py-2 text-[0.68rem]'
            } ${
              active
                ? 'bg-sage text-ink font-medium'
                : 'text-mist hover:text-porcelain'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
