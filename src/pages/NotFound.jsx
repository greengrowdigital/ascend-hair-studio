import { ArrowLeft } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import Button from '../components/Button.jsx'
import Logo from '../components/Logo.jsx'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <PageTransition>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <span className="text-sage">
          <Logo size={44} showWord={false} />
        </span>
        <h1 className="type-hero mt-8 font-serif font-light italic text-porcelain">404</h1>
        <p className="mt-5 font-display text-[0.72rem] tracking-[0.3em] text-sage">
          {t('notFound.title').toUpperCase()}
        </p>
        <p className="mt-4 max-w-sm font-body font-light text-mist">{t('notFound.body')}</p>
        <div className="mt-8">
          <Button to="/" variant="solid" size="md">
            <ArrowLeft size={16} /> {t('notFound.back')}
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}
