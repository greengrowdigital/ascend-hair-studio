import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { INGREDIENTS, IMG, CLAY_TOP } from '../data/content.js'

/* Word-by-word rise driven from the container (reliable intersection). */
function WordReveal({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function Science() {
  const { t, lang } = useI18n()
  const pillars = t('science.pillars')

  return (
    <PageTransition>
      <PageHeader eyebrow={t('science.eyebrow')} title={t('science.title')} sub={t('science.sub')} />

      {/* Manifesto */}
      <section className="border-y border-line bg-snow px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal as="p" className="max-w-xl font-body text-lg font-light leading-relaxed text-stone">
            {t('science.manifestoSmall')}
          </Reveal>
          <h2 className="mt-8 font-serif text-4xl font-semibold leading-tight text-ink text-balance sm:text-6xl">
            <span className="text-stone">{t('science.manifestoBigPre')} </span>
            <WordReveal text={t('science.manifestoBig')} className="text-sage-deep" />
          </h2>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-hero border border-line">
              <img
                src={IMG.hands}
                alt={t('science.storyTitle')}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionLabel className="text-sage-deep">{t('science.storyLabel')}</SectionLabel>
            <Reveal as="h2" delay={0.05} className="type-display mt-5 font-serif font-semibold text-ink text-balance">
              {t('science.storyTitle')}
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 font-body text-base font-light leading-relaxed text-slate text-pretty">
              {t('science.storyBody1')}
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-4 font-body text-base font-light leading-relaxed text-slate text-pretty">
              {t('science.storyBody2')}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="border-t border-line bg-snow px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel className="text-sage-deep">{t('science.ingredientsLabel')}</SectionLabel>
          <Reveal as="h2" delay={0.05} className="type-display mt-5 max-w-2xl font-serif font-semibold text-ink text-balance">
            {t('science.ingredientsTitle')}
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENTS.map((ing) => (
              <Reveal key={ing.id} className="bg-white p-7 transition-colors duration-300 hover:bg-snow">
                <h3 className="font-serif text-lg font-semibold text-ink">{ing.name[lang]}</h3>
                <span className="mt-1 block font-mono text-[0.72rem] italic text-sage-deep">{ing.latin}</span>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-stone text-pretty">
                  {ing.note[lang]}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars + Made in Czechia */}
      <section className="bg-white px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(pillars) &&
              pillars.map((p, i) => (
                <Reveal key={i} delay={0.05 * i} className="rounded-card border border-line bg-snow p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink">{p.t}</h3>
                  <p className="mt-2 font-body text-sm font-light leading-relaxed text-stone">{p.d}</p>
                </Reveal>
              ))}
          </div>

          <div className="mt-16 grid items-center gap-10 rounded-hero border border-line bg-ink p-8 text-white sm:p-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionLabel className="text-sage-light">{t('science.madeLabel')}</SectionLabel>
              <Reveal as="h2" delay={0.05} className="type-display mt-5 font-serif font-semibold text-white text-balance">
                {t('science.madeTitle')} 🇨🇿
              </Reveal>
              <Reveal as="p" delay={0.1} className="mt-5 max-w-md font-body text-base font-light leading-relaxed text-mist text-pretty">
                {t('science.madeBody')}
              </Reveal>
              <Reveal delay={0.16} className="mt-7">
                <Button to="/shop" variant="light" size="md">
                  {t('science.cta')} <ArrowRight size={16} />
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="mx-auto w-[min(70vw,300px)]">
              <img src={CLAY_TOP} alt="" aria-hidden="true" loading="lazy" className="w-full" />
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
