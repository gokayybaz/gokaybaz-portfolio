import { Header } from '../components/Header'
import { SeoHead } from '../components/SeoHead'
import { Footer } from '../components/Footer'
import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { useLanguage } from '../i18n/LanguageContext'

export function StaticProfilePage({ section }: { section: 'about' | 'experience' | 'contact' }) {
  const { t } = useLanguage()

  return (
    <>
      <SeoHead />
      <Header />
      <main className="pt-14">
        <section className="mx-auto max-w-5xl px-6 pb-2 pt-14 md:pt-20">
          <h1 className="text-4xl font-bold text-paper sm:text-5xl">
            {t({
              tr: section === 'about' ? 'Hakkımda' : section === 'experience' ? 'Deneyim' : 'İletişim',
              en: section === 'about' ? 'About' : section === 'experience' ? 'Experience' : 'Contact',
            })}
          </h1>
        </section>
        {section === 'about' && <About />}
        {section === 'experience' && <Experience />}
        {section === 'contact' && (
          <section className="mx-auto max-w-5xl px-6 pb-16 pt-8">
            <p className="max-w-2xl text-lg leading-relaxed text-paper-dim">
              {t({ tr: 'Pozisyonlar ve profesyonel iş birlikleri için doğrudan iletişime geçebilirsiniz.', en: 'You can contact me directly about positions and professional collaborations.' })}
            </p>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

export default StaticProfilePage
