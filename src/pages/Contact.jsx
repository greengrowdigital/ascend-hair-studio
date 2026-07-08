import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Phone, Mail, Send, Check, Instagram, Facebook } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { SERVICES } from '../data/content.js'

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' }

export default function Contact() {
  const { t, lang } = useI18n()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success
  const successRef = useRef(null)

  // Move focus to the confirmation so screen-reader + keyboard users aren't
  // stranded when the form unmounts on success.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // Demo only — no backend. Simulate a network round-trip.
    setTimeout(() => setStatus('success'), 900)
  }

  function reset() {
    setForm(EMPTY)
    setStatus('idle')
  }

  const field =
    'w-full rounded-xl border border-graphite bg-charcoal px-4 py-3 font-body text-sm text-porcelain placeholder:text-stone transition-colors focus:border-sage focus:outline-none'
  const label = 'mb-2 block font-geo text-[0.7rem] uppercase tracking-[0.14em] text-stone'

  const info = [
    { Icon: Clock, label: t('contact.hoursLabel'), value: t('contact.hours') },
    { Icon: MapPin, label: t('contact.addressLabel'), value: t('contact.address') },
    { Icon: Phone, label: t('contact.phoneLabel'), value: '+420 212 340 118' },
    { Icon: Mail, label: t('contact.emailLabel'), value: 'ahoj@ascendstudio.cz' },
  ]

  return (
    <PageTransition>
      <PageHeader
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        sub={t('contact.sub')}
      />

      <section className="bg-ink px-6 pb-28 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_1fr]">
          {/* Form */}
          <Reveal className="rounded-[2rem] border border-graphite bg-obsidian p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-ink">
                    <Check size={28} />
                  </span>
                  <h2
                    ref={successRef}
                    tabIndex={-1}
                    className="mt-6 font-serif text-3xl text-porcelain focus:outline-none"
                  >
                    {t('contact.successTitle')}
                  </h2>
                  <p className="mt-3 max-w-sm font-body font-light text-mist">
                    {t('contact.successBody')}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 rounded-full border border-graphite px-6 py-3 font-geo text-[0.74rem] uppercase tracking-[0.14em] text-mist transition-colors hover:border-sage hover:text-porcelain"
                  >
                    {t('contact.againBtn')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>{t('contact.formName')}</label>
                      <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={update('name')} className={field} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>{t('contact.formPhone')}</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={field} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={label}>{t('contact.formEmail')}</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update('email')} className={field} />
                  </div>

                  <div>
                    <label htmlFor="service" className={label}>{t('contact.formService')}</label>
                    <select id="service" value={form.service} onChange={update('service')} className={`${field} appearance-none`}>
                      <option value="" className="bg-charcoal">{t('contact.formServicePlaceholder')}</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} className="bg-charcoal">
                          {s.name[lang]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={label}>{t('contact.formMessage')}</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      placeholder={t('contact.formMessagePlaceholder')}
                      className={`${field} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-sage py-4 font-geo text-[0.8rem] uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-sage-light disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      t('contact.sending')
                    ) : (
                      <>
                        {t('contact.submit')}
                        <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center font-geo text-[0.68rem] tracking-wide text-slate">
                    {t('contact.demoNote')}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Studio info */}
          <Reveal delay={0.12} className="flex flex-col gap-4">
            <div className="rounded-[2rem] border border-graphite bg-obsidian p-8">
              <h2 className="label-stencil text-sage">{t('contact.infoLabel')}</h2>
              <ul className="mt-7 space-y-6">
                {info.map(({ Icon, label: l, value }) => (
                  <li key={l} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite text-sage">
                      <Icon size={16} />
                    </span>
                    <div>
                      <div className="font-geo text-[0.66rem] uppercase tracking-[0.14em] text-stone">{l}</div>
                      <div className="mt-1 font-body text-sm font-light text-porcelain">{value}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3 border-t border-graphite pt-6">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Mail, label: 'Email' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite text-mist transition-all hover:border-sage hover:text-sage"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative "map" tile */}
            <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-graphite bg-charcoal">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(138,155,110,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(138,155,110,0.18)_1px,transparent_1px)] [background-size:34px_34px]" />
              <div className="relative flex min-h-[12rem] flex-col items-center justify-center p-8 text-center">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-50" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-sage" />
                </span>
                <span className="mt-4 font-mono text-xs text-mist">50.0755° N · 14.4378° E</span>
                <span className="mt-1 font-geo text-sm text-porcelain">{t('contact.mapLocation')}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
