import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import Button from '../components/Button.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { IMG, PRODUCTS, SERVICES, RITUAL, STATS } from '../data/content.js'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Home() {
  const { t, lang } = useI18n()
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Parallax is scroll-bound (not a declarative animation), so MotionConfig does
  // not neutralise it — flatten every scroll transform when reduced motion is on.
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '16%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.16])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], reduce ? [1, 1] : [1, 0])

  return (
    <PageTransition>
      {/* ============================ HERO ============================ */}
      <section
        ref={heroRef}
        className="relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden"
      >
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <img
            src={IMG.salonSilver}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

        {/* Editorial corner marks */}
        <div className="absolute left-6 top-28 hidden font-mono text-[0.66rem] tracking-wide text-mist sm:block sm:left-8">
          50.0755° N · 14.4378° E
        </div>
        <div className="absolute right-6 top-28 hidden font-mono text-[0.66rem] tracking-wide text-mist sm:block sm:right-8">
          EST · PRAHA
        </div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:px-8 sm:pb-24"
        >
          <motion.div {...fade(0.1)}>
            <SectionLabel>{t('hero.eyebrow')} 🇨🇿</SectionLabel>
          </motion.div>

          <h1 className="type-hero mt-6 max-w-4xl">
            <motion.span
              {...fade(0.2)}
              className="block font-geo font-semibold tracking-tight text-porcelain"
            >
              {t('hero.line1')}
            </motion.span>
            <motion.span
              {...fade(0.34)}
              className="block font-serif font-light text-sage-light"
            >
              {t('hero.line2')}
            </motion.span>
          </h1>

          <motion.p
            {...fade(0.5)}
            className="mt-7 max-w-lg font-body text-base font-light leading-relaxed text-mist sm:text-lg"
          >
            {t('hero.sub')}
          </motion.p>

          <motion.div {...fade(0.64)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/contact" variant="solid" size="lg">
              {t('hero.ctaBook')} <ArrowRight size={16} />
            </Button>
            <Button to="/products" variant="outline" size="lg">
              {t('hero.ctaProducts')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="label-stencil text-stone">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-sage"
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      <Marquee tone="dark" />

      {/* ========================= PROMISE ========================= */}
      <section className="relative bg-ink px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal as="h2" className="type-display font-serif font-light text-porcelain">
              {t('home.promiseTitle')}
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-mist"
            >
              {t('home.promiseBody')}
            </Reveal>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <div className="font-serif text-4xl text-porcelain">{s.value}</div>
                  <div className="mt-1 font-geo text-[0.66rem] uppercase leading-snug tracking-[0.1em] text-stone">
                    {s.label[lang]}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-graphite">
              <img
                src={IMG.modelEditorial}
                alt={t('home.promiseTitle')}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-graphite bg-charcoal/90 px-5 py-4 backdrop-blur-md sm:block">
              <div className="flex items-center gap-2 font-geo text-sm text-porcelain">
                <Sparkles size={15} className="text-sage" />
                {t('footer.made')} 🇨🇿
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="relative border-t border-graphite bg-obsidian px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal as="h2" className="type-display font-serif font-light text-porcelain">
                {t('home.featuredTitle')}
              </Reveal>
            </div>
            <Button to="/products" variant="outline" size="md">
              {t('home.featuredCta')} <ArrowRight size={15} />
            </Button>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================= THE RITUAL ======================= */}
      <section className="relative bg-ink px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center">
              <SectionLabel align="center">{t('home.ritualLabel')}</SectionLabel>
            </div>
            <Reveal as="h2" className="type-display mx-auto mt-5 max-w-2xl font-serif font-light text-porcelain">
              {t('home.ritualTitle')}
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {RITUAL.map((step, i) => (
              <Reveal
                key={step.id}
                delay={0.08 * i}
                className="group flex flex-col bg-charcoal p-8 transition-colors duration-500 hover:bg-obsidian"
              >
                <span className="font-mono text-sm text-sage">{step.id}</span>
                <span className="mt-6 font-geo text-[0.72rem] font-medium tracking-[0.24em] text-porcelain">
                  {step.name[lang].toUpperCase()}
                </span>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-mist">
                  {step.desc[lang]}
                </p>
                <div className="mt-6 h-px w-8 bg-sage-deep transition-all duration-500 group-hover:w-16" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES TEASER ==================== */}
      <section className="relative border-t border-graphite bg-obsidian px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Reveal as="h2" className="type-display max-w-xl font-serif font-light text-porcelain">
                {t('home.servicesTitle')}
              </Reveal>
            </div>
            <Button to="/services" variant="outline" size="md">
              {t('home.servicesCta')} <ArrowRight size={15} />
            </Button>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ======================== CTA BAND ======================== */}
      <section className="relative overflow-hidden bg-ink px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-graphite">
          <div className="relative px-8 py-20 text-center sm:px-16 sm:py-24">
            <img
              src={IMG.leaves}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/90" />
            <div className="relative z-10">
              <Reveal as="h2" className="type-display mx-auto max-w-2xl font-serif font-light text-porcelain">
                {t('home.ctaBandTitle')}
              </Reveal>
              <Reveal as="p" delay={0.1} className="mx-auto mt-5 max-w-md font-body text-base font-light text-mist">
                {t('home.ctaBandBody')}
              </Reveal>
              <Reveal delay={0.2} className="mt-9 flex justify-center">
                <Button to="/contact" variant="solid" size="lg">
                  {t('home.ctaBandBtn')} <ArrowRight size={16} />
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
