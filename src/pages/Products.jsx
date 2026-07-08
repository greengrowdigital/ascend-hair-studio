import { Droplet, Leaf, ShieldCheck, FlaskConical, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import Button from '../components/Button.jsx'
import Marquee from '../components/Marquee.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { PRODUCTS } from '../data/content.js'

const ICONS = [Droplet, Leaf, ShieldCheck, FlaskConical]

export default function Products() {
  const { t } = useI18n()
  const pillars = t('philosophy.pillars')

  return (
    <PageTransition>
      <PageHeader
        eyebrow={t('products.eyebrow')}
        title={t('products.title')}
        sub={t('products.sub')}
      />

      <Marquee tone="dark" />

      <section className="bg-ink px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <p className="mt-10 text-center font-geo text-xs tracking-wide text-slate">
            {t('products.note')}
          </p>
        </div>
      </section>

      {/* Botanical difference */}
      <section className="border-t border-graphite bg-obsidian px-6 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center">
              <SectionLabel align="center">{t('philosophy.eyebrow')}</SectionLabel>
            </div>
            <Reveal as="h2" className="type-display mx-auto mt-5 max-w-2xl font-serif font-light text-porcelain">
              {t('philosophy.title')}
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(pillars) &&
              pillars.map((p, i) => {
                const Icon = ICONS[i % ICONS.length]
                return (
                  <Reveal
                    key={i}
                    delay={0.07 * i}
                    className="rounded-[1.75rem] border border-graphite bg-charcoal p-7"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sage-deep text-sage">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-5 font-serif text-xl text-porcelain">{p.t}</h3>
                    <p className="mt-2 font-body text-sm font-light leading-relaxed text-mist">
                      {p.d}
                    </p>
                  </Reveal>
                )
              })}
          </div>

          <div className="mt-14 flex justify-center">
            <Button to="/philosophy" variant="outline" size="md">
              {t('nav.philosophy')} <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
