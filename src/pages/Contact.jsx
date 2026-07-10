import { useRef, useState, useEffect } from 'react'
import { Clock, MapPin, Mail, Check, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState('idle') // idle | sending | success
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('success'), 900)
  }

  const fieldClass =
    'w-full rounded-field border border-line bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-stone transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-sage/40'
  const labelClass = 'block font-geo text-xs font-medium tracking-wide text-slate'

  return (
    <PageTransition>
      <PageHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} sub={t('contact.sub')} />

      <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Form */}
          <div className="rounded-hero border border-line bg-snow p-6 sm:p-10">
            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex min-h-[22rem] flex-col items-center justify-center text-center outline-none"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage text-ink">
                  <Check size={26} />
                </span>
                <h2 className="mt-6 font-serif text-2xl font-semibold text-ink">{t('contact.successTitle')}</h2>
                <p className="mt-3 max-w-sm font-body font-light text-stone text-pretty">{t('contact.successBody')}</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-7 font-geo text-sm font-medium text-sage-deep underline underline-offset-4 hover:text-ink"
                >
                  {t('contact.againBtn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className={labelClass}>
                      {t('contact.formName')}
                    </label>
                    <input id="c-name" name="name" type="text" required autoComplete="name" className={`mt-2 ${fieldClass}`} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className={labelClass}>
                      {t('contact.formEmail')}
                    </label>
                    <input id="c-email" name="email" type="email" required autoComplete="email" className={`mt-2 ${fieldClass}`} />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-topic" className={labelClass}>
                    {t('contact.formTopic')}
                  </label>
                  <select id="c-topic" name="topic" className={`mt-2 ${fieldClass}`} defaultValue="order">
                    <option value="order">{t('contact.topicOrder')}</option>
                    <option value="wholesale">{t('contact.topicWholesale')}</option>
                    <option value="press">{t('contact.topicPress')}</option>
                    <option value="other">{t('contact.topicOther')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="c-message" className={labelClass}>
                    {t('contact.formMessage')}
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t('contact.formMessagePlaceholder')}
                    className={`mt-2 resize-none ${fieldClass}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 font-geo text-sm font-medium text-white transition-colors hover:bg-carbon disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-snow"
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.submit')}
                  {status !== 'sending' && <ArrowRight size={16} />}
                </button>
                <p className="font-geo text-xs text-stone">{t('contact.demoNote')}</p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            {[
              { Icon: Clock, label: t('contact.hoursLabel'), value: t('contact.hours') },
              { Icon: MapPin, label: t('contact.addressLabel'), value: t('contact.address') },
              { Icon: Mail, label: t('contact.emailLabel'), value: 'ahoj@ascendclay.cz' },
            ].map(({ Icon, label, value }, i) => (
              <div key={i} className="flex items-start gap-4 rounded-card border border-line bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-snow text-sage-deep">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="label-stencil text-stone">{label}</h3>
                  <p className="mt-1.5 font-body text-sm text-ink">{value}</p>
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-card border border-line">
              <div className="flex aspect-[4/3] items-center justify-center bg-snow">
                <span className="flex items-center gap-2 font-geo text-sm text-stone">
                  <MapPin size={16} /> {t('contact.mapLocation')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
