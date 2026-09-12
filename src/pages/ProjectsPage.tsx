import { Header } from '../components/Header'
import { SeoHead } from '../components/SeoHead'
import { Footer } from '../components/Footer'
import { Projects } from '../components/Projects'
import { useLanguage } from '../i18n/LanguageContext'

export function ProjectsPage() {
  const { t } = useLanguage()

  return (
    <>
      <SeoHead />
      <Header />
      <main className="pt-14">
        <section className="mx-auto max-w-5xl px-6 pb-2 pt-14 md:pt-20">
          <h1 className="text-4xl font-bold text-paper sm:text-5xl">{t({ tr: 'Projeler', en: 'Projects' })}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-dim">
            {t({ tr: 'Üretim, ERP, BT operasyonu ve platform geliştirme alanlarında gerçek proje vaka çalışmaları.', en: 'Real case studies across manufacturing, ERP, IT operations and platform development.' })}
          </p>
        </section>
        <Projects />
      </main>
      <Footer />
    </>
  )
}

export default ProjectsPage
