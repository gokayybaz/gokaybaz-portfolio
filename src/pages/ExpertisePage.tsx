import Markdown from 'react-markdown'
import { Link, Navigate, useParams } from 'react-router'
import { Header } from '../components/Header'
import { SeoHead } from '../components/SeoHead'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { localizedPath } from '../routing/locale'

export function ExpertisePage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const { expertisePages, projects, articles } = useContent()
  const page = expertisePages.find((item) => item.slug === slug)

  if (!page) return <Navigate to={localizedPath(lang, '/')} replace />

  const relatedProjects = projects.filter((project) => page.relatedProjectSlugs.includes(project.slug))
  const relatedArticles = articles.filter((article) => page.relatedArticleSlugs.includes(article.slug))

  return (
    <>
      <SeoHead />
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <p className="font-mono text-xs text-term">~/gokaybaz/expertise/{page.slug}</p>
        <Reveal>
          <h1 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">{t(page.title)}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-paper-dim">{t(page.summary)}</p>
        </Reveal>
        <Reveal delay={100}>
          <article className="md-content mt-10 text-paper-dim">
            <Markdown>{t(page.body)}</Markdown>
          </article>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-mono text-sm text-term">## {t({ tr: 'İlgili projeler', en: 'Related projects' })}</h2>
            <ul className="mt-4 space-y-3">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={localizedPath(lang, `/projeler/${project.slug}`)}
                    className="font-mono text-sm text-paper-dim hover:text-term hover:underline"
                  >
                    {t(project.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-mono text-sm text-term">## {t({ tr: 'İlgili yazılar', en: 'Related articles' })}</h2>
            <ul className="mt-4 space-y-3">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    to={localizedPath(lang, `/yazilar/${article.slug}`)}
                    className="font-mono text-sm text-paper-dim hover:text-term hover:underline"
                  >
                    {t(article.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-14 border border-line bg-ink-soft p-6">
          <p className="text-paper-dim">{t({ tr: 'Bu alandaki bir pozisyon veya profesyonel iş birliği için:', en: 'For a position or professional collaboration in this area:' })}</p>
          <Link
            to={localizedPath(lang, '/iletisim')}
            className="mt-3 inline-block font-mono text-sm text-term hover:underline"
          >
            {t({ tr: 'Pozisyonlar ve profesyonel iş birlikleri için iletişime geç', en: 'Contact me for positions and professional collaborations' })}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ExpertisePage
