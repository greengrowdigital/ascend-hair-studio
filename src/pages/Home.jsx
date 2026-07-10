import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Button from '../components/Button.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import NavZone from '../components/NavZone.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { formatPrice } from '../lib/format.js'
import {
  PRODUCT,
  FEATURES,
  INGREDIENTS,
  RITUAL,
  STATS,
  CLAY_DIAGONAL,
  CLAY_TOP,
} from '../data/content.js'

/* Full-screen ASCEND wordmark knocked out of a white overlay so the hero video
   shows through the letters. Recreated from the brand logotype with Michroma
   (wide geometric caps). A dark layer sits behind the video so the mark reads
   before the video loads. */
function HeroKnockout() {
  return (
    <>
      <div className="absolute inset-0 bg-ink" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <svg className="absolute inset-0 h-full w-full" role="img" aria-label="ASCEND">
        <defs>
          <mask id="ascend-knockout">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#000"
              stroke="#000"
              style={{
                fontFamily: 'Michroma, sans-serif',
                fontSize: 'clamp(2.3rem, 14.5vw, 13rem)',
                letterSpacing: '0.06em',
                strokeWidth: 'clamp(3px, 1.1vw, 15px)',
                paintOrder: 'stroke',
                strokeLinejoin: 'round',
              }}
            >
              ASCEND
            </text>
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" mask="url(#ascend-knockout)" />
      </svg>
    </>
  )
}

export default function Home() {
  const { t, lang } = useI18n()
  const reduce = useReducedMotion()
  const scrollRef = useRef(null)
  const [heroTheme, setHeroTheme] = useState('light')

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setHeroTheme(v > 0.5 ? 'dark' : 'light'))

  // Background morphs white → black as you scroll through the pinned hero.
  const bg = useTransform(scrollYProgress, [0, 0.55], ['#ffffff', '#0b0c0e'])
  const groupOpacity = useTransform(scrollYProgress, [0, 0.34], [1, 0])
  const groupScale = useTransform(scrollYProgress, [0, 0.4], [1, reduce ? 1 : 1.08])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const tinOpacity = useTransform(scrollYProgress, [0.4, 0.68], [0, 1])
  const tinScale = useTransform(scrollYProgress, [0.4, 1], reduce ? [1, 1] : [0.82, 1.04])
  const tinY = useTransform(scrollYProgress, [0.4, 1], reduce ? [0, 0] : [70, 0])
  const revealOpacity = useTransform(scrollYProgress, [0.56, 0.82], [0, 1])
  const revealY = useTransform(scrollYProgress, [0.56, 0.86], reduce ? [0, 0] : [28, 0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ============================ HERO ============================ */}
      <NavZone theme={heroTheme} className="relative">
        <div ref={scrollRef} className="relative h-[230vh]">
          <div className="sticky top-0 flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
            <motion.div style={{ backgroundColor: bg }} className="absolute inset-0" />

            {/* Video-knockout wordmark */}
            <motion.div style={{ opacity: groupOpacity, scale: groupScale }} className="absolute inset-0">
              <HeroKnockout />
              <div className="pointer-events-none absolute inset-x-0 bottom-[13%] flex flex-col items-center gap-2 px-6 text-center">
                <span className="label-stencil text-ink/70">{t('hero.sub')}</span>
                <span className="font-geo text-[0.72rem] tracking-[0.16em] text-stone">
                  {t('hero.tag')}
                </span>
              </div>
            </motion.div>

            {/* Product reveal */}
            <motion.div
              style={{ opacity: tinOpacity }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <motion.div style={{ scale: tinScale, y: tinY }} className="w-[min(76vw,440px)]">
                <ProductImage
                  src={CLAY_DIAGONAL}
                  alt={`${PRODUCT.brand} ${PRODUCT.name[lang]}`}
                  eager
                  imgClassName="drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
                />
              </motion.div>
              <motion.div style={{ opacity: revealOpacity, y: revealY }} className="mt-6 max-w-md text-center">
                <p className="label-stencil text-sage-light">{t('home.revealKicker')}</p>
                <h1 className="type-display mt-3 font-serif font-semibold text-white text-balance">
                  {PRODUCT.brand} {PRODUCT.name[lang]}
                </h1>
                <p className="mx-auto mt-3 max-w-sm font-body text-[0.95rem] font-light leading-relaxed text-mist text-pretty">
                  {t('home.revealTagline')}
                </p>
              </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              style={{ opacity: cueOpacity }}
              className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
            >
              <span className="label-stencil text-stone">{t('hero.scroll')}</span>
              <motion.span
                animate={reduce ? {} : { y: [0, 7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-sage"
              >
                <ArrowDown size={16} />
              </motion.span>
            </motion.div>
          </div>
        </div>
      </NavZone>

      {/* ===================== STORY / FEATURES (noir) ===================== */}
      <NavZone theme="dark" className="relative bg-ink">
        <Marquee tone="dark" />

        <div className="mx-auto max-w-6xl px-6 pb-8 pt-24 sm:px-8 sm:pt-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative mx-auto w-[min(80vw,420px)]">
                <div className="absolute inset-0 -z-10 rounded-full bg-radial-spot blur-2xl" />
                <ProductImage src={CLAY_TOP} alt={t('shop.galleryTop')} />
              </div>
            </Reveal>
            <div>
              <SectionLabel className="text-sage-light">{t('home.featuresLabel')}</SectionLabel>
              <Reveal as="h2" delay={0.05} className="type-display mt-5 font-serif font-semibold text-white text-balance">
                {PRODUCT.name[lang]}. {PRODUCT.finish[lang]}.
              </Reveal>
              <Reveal as="p" delay={0.12} className="mt-6 max-w-md font-body text-lg font-light leading-relaxed text-mist text-pretty">
                {PRODUCT.intro[lang]}
              </Reveal>
            </div>
          </div>
        </div>

        {/* Feature statements */}
        <div className="mx-auto max-w-6xl space-y-3 px-6 py-16 sm:px-8 sm:py-24">
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className="grid items-center gap-8 rounded-hero border border-graphite bg-carbon p-8 sm:p-12 lg:grid-cols-2"
            >
              <Reveal className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="overflow-hidden rounded-card">
                  <img
                    src={f.img}
                    alt={f.title[lang]}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="label-stencil text-sage-light">{f.kicker[lang]}</span>
                <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
                  {f.title[lang]}
                </h3>
                <p className="mt-4 max-w-md font-body text-base font-light leading-relaxed text-mist text-pretty">
                  {f.body[lang]}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </NavZone>

      {/* ======================== HOW TO USE (light) ======================== */}
      <NavZone theme="light" className="bg-white px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <SectionLabel className="text-sage-deep">{t('home.ritualLabel')}</SectionLabel>
            <Reveal as="h2" delay={0.05} className="type-display mt-5 font-serif font-semibold text-ink text-balance">
              {t('home.ritualTitle')}
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RITUAL.map((step, i) => (
              <Reveal
                key={step.id}
                delay={0.05 * i}
                className="rounded-card border border-line bg-snow p-7 transition-colors duration-300 hover:border-sage"
              >
                <span className="font-mono text-sm font-medium text-sage-deep tnum">{step.id}</span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{step.name[lang]}</h3>
                <p className="mt-2 font-body text-sm font-light leading-relaxed text-stone text-pretty">
                  {step.desc[lang]}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </NavZone>

      {/* ======================= INGREDIENTS (light) ======================= */}
      <NavZone theme="light" className="border-t border-line bg-snow px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <SectionLabel className="text-sage-deep">{t('home.ingredientsLabel')}</SectionLabel>
            <Reveal as="h2" delay={0.05} className="type-display mt-5 font-serif font-semibold text-ink text-balance">
              {t('home.ingredientsTitle')}
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-5 max-w-xl font-body text-lg font-light leading-relaxed text-stone text-pretty">
              {t('home.ingredientsBody')}
            </Reveal>
          </div>
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
      </NavZone>

      {/* ==================== STATS + STORY (light) ==================== */}
      <NavZone theme="light" className="bg-white px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="type-display font-serif font-semibold text-ink tnum">{s.value}</div>
                <div className="mt-2 font-geo text-[0.7rem] uppercase leading-snug tracking-[0.12em] text-stone">
                  {s.label[lang]}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid items-center gap-10 rounded-hero border border-line bg-snow p-8 sm:p-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <SectionLabel className="text-sage-deep">{t('home.storyLabel')}</SectionLabel>
              <Reveal as="h2" delay={0.05} className="type-display mt-5 font-serif font-semibold text-ink text-balance">
                {t('home.storyTitle')} 🇨🇿
              </Reveal>
              <Reveal as="p" delay={0.1} className="mt-5 max-w-md font-body text-base font-light leading-relaxed text-stone text-pretty">
                {t('home.storyBody')}
              </Reveal>
              <Reveal delay={0.16} className="mt-7">
                <Button to="/science" variant="outline" size="md">
                  {t('home.storyCta')} <ArrowRight size={16} />
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-card border border-line">
                <img
                  src={FEATURES[1].img}
                  alt={t('home.storyTitle')}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </NavZone>

      {/* ======================== BUY CTA (noir) ======================== */}
      <NavZone theme="dark" className="bg-ink px-6 py-24 sm:px-8 sm:py-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-hero border border-graphite bg-carbon px-8 py-16 text-center sm:px-16 sm:py-24">
          <div className="grain-dark" />
          <div className="relative z-10">
            <Reveal className="mx-auto w-[min(60vw,220px)]">
              <ProductImage src={CLAY_DIAGONAL} alt={`${PRODUCT.brand} ${PRODUCT.name[lang]}`} />
            </Reveal>
            <Reveal as="h2" delay={0.06} className="type-display mt-8 font-serif font-semibold text-white text-balance">
              {t('home.ctaTitle')}
            </Reveal>
            <Reveal as="p" delay={0.12} className="mx-auto mt-4 max-w-md font-body text-base font-light leading-relaxed text-mist text-pretty">
              {t('home.ctaBody')}
            </Reveal>
            <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to="/shop" variant="light" size="lg">
                {t('home.ctaBtn')} · {formatPrice(PRODUCT.priceFrom, PRODUCT.currency)}
              </Button>
              <Button to="/shop" variant="outlineLight" size="lg">
                {t('home.ctaSecondary')}
              </Button>
            </Reveal>
          </div>
        </div>
      </NavZone>
    </motion.div>
  )
}
