import { motion } from 'framer-motion'
import { Leaf, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Button from '../components/Button.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { IMG, INGREDIENTS } from '../data/content.js'

/* Word-by-word rise. The whileInView lives on the CONTAINER (whose box sits at
   its natural position and reliably intersects the viewport); the words animate
   via variants + staggerChildren. Observing each translated word individually is
   unreliable because its post-transform box is pushed out of its layout line. */
function WordReveal({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
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

export default function Philosophy() {
  const { t, lang } = useI18n()

  return (
    <PageTransition>
      <PageHeader
        eyebrow={t('philosophy.eyebrow')}
        title={t('philosophy.title')}
        sub={t('philosophy.sub')}
      />

      {/* Manifesto */}
      <section className="relative overflow-hidden border-y border-graphite bg-obsidian px-6 py-28 sm:px-8 sm:py-36">
        <img
          src={IMG.leaf}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute -right-20 top-1/2 hidden w-[38rem] -translate-y-1/2 opacity-10 lg:block"
        />
        <div className="relative mx-auto max-w-4xl">
          <Reveal as="p" className="max-w-xl font-body text-lg font-light leading-relaxed text-stone">
            {t('philosophy.manifestoSmall')}
          </Reveal>
          <h2 className="mt-10 font-serif text-4xl font-light leading-tight text-porcelain sm:text-6xl">
            <span className="text-mist">{t('philosophy.manifestoBigPre')} </span>
            <WordReveal text={t('philosophy.manifestoBig')} className="text-sage-light" />
          </h2>
        </div>
      </section>

      {/* Story */}
      <section className="bg-ink px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] border border-graphite">
              <img
                src={IMG.sageTwigs}
                alt={t('philosophy.storyTitle')}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionLabel>{t('philosophy.storyLabel')}</SectionLabel>
            <Reveal as="h2" className="type-display mt-5 font-serif font-light text-porcelain">
              {t('philosophy.storyTitle')}
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-6 font-body text-base font-light leading-relaxed text-mist">
              {t('philosophy.storyBody1')}
            </Reveal>
            <Reveal as="p" delay={0.14} className="mt-4 font-body text-base font-light leading-relaxed text-mist">
              {t('philosophy.storyBody2')}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="border-t border-graphite bg-obsidian px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Reveal as="h2" className="type-display font-serif font-light text-porcelain">
              {t('philosophy.ingredientsTitle')}
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENTS.map((ing, i) => (
              <Reveal
                key={ing.id}
                delay={0.05 * (i % 3)}
                className="group flex flex-col bg-charcoal p-8 transition-colors duration-500 hover:bg-ink"
              >
                <div className="flex items-center justify-between">
                  <Leaf size={18} className="text-sage" />
                  <span className="font-mono text-xs text-stone">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl text-porcelain">{ing.name[lang]}</h3>
                <span className="mt-1 font-mono text-[0.72rem] italic text-sage-light">
                  {ing.latin}
                </span>
                <p className="mt-4 font-body text-sm font-light leading-relaxed text-mist">
                  {ing.note[lang]}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Made in Czechia */}
      <section className="relative overflow-hidden bg-ink px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-graphite">
          <div className="relative grid items-center gap-8 px-8 py-16 sm:px-14 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
            <img
              src={IMG.herbs}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
            <div className="relative z-10">
              <Reveal as="h2" className="type-display font-serif font-light text-porcelain">
                {t('philosophy.madeTitle')} <span className="text-sage-light">🇨🇿</span>
              </Reveal>
              <Reveal as="p" delay={0.1} className="mt-5 max-w-md font-body text-base font-light leading-relaxed text-mist">
                {t('philosophy.madeBody')}
              </Reveal>
            </div>
            <Reveal delay={0.2} className="relative z-10 flex lg:justify-end">
              <Button to="/products" variant="solid" size="lg">
                {t('nav.products')} <ArrowRight size={16} />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
