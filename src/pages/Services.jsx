import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Button from '../components/Button.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { SERVICES, RITUAL } from '../data/content.js'

export default function Services() {
  const { t, lang } = useI18n()

  return (
    <PageTransition>
      <PageHeader
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        sub={t('services.sub')}
      />

      <section className="bg-ink px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* The ritual */}
      <section className="border-t border-graphite bg-obsidian px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center">
              <SectionLabel align="center">{t('home.ritualLabel')}</SectionLabel>
            </div>
            <Reveal as="h2" className="type-display mx-auto mt-5 max-w-2xl font-serif font-light text-porcelain">
              {t('home.ritualTitle')}
            </Reveal>
          </div>

          <ol className="mt-16 space-y-px overflow-hidden rounded-[2rem] border border-graphite bg-graphite">
            {RITUAL.map((step, i) => (
              <Reveal
                key={step.id}
                delay={0.05 * i}
                as="li"
                className="group grid grid-cols-[auto_1fr] items-center gap-6 bg-charcoal px-7 py-8 transition-colors duration-500 hover:bg-obsidian sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:px-10"
              >
                <span className="font-mono text-sm text-sage">{step.id}</span>
                <div>
                  <h3 className="font-serif text-2xl text-porcelain">{step.name[lang]}</h3>
                  <p className="mt-1.5 max-w-lg font-body text-sm font-light leading-relaxed text-mist">
                    {step.desc[lang]}
                  </p>
                </div>
                <div className="hidden h-px w-16 bg-sage-deep transition-all duration-500 group-hover:w-24 sm:block" />
              </Reveal>
            ))}
          </ol>

          <div className="mt-14 flex justify-center">
            <Button to="/contact" variant="solid" size="lg">
              {t('services.book')} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
