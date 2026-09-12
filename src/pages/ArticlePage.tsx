import Markdown from 'react-markdown'
import { Link, Navigate, useParams } from 'react-router'
import { Header } from '../components/Header'
import { SeoHead } from '../components/SeoHead'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { localizedPath } from '../routing/locale'

export function ArticlePage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const { articles, projects } = useContent()
  const article = articles.find((item) => item.slug === slug)

  if (!article) return <Navigate to={localizedPath(lang, '/yazilar')} replace />

  const relatedProjects = projects.filter((project) => article.relatedProjectSlugs.includes(project.slug))

  return (
    <>
      <SeoHead />
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <Link to={localizedPath(lang, '/yazilar')} className="font-mono text-sm text-paper-dim hover:text-term">
          ← {t({ tr: 'Tüm yazılar', en: 'All articles' })}
        </Link>
        <p className="mt-8 font-mono text-xs text-term">~/gokaybaz/articles/{article.slug}</p>
        <Reveal>
          <p className="mt-4 font-mono text-xs text-amber">{t(article.category)}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-paper sm:text-5xl">{t(article.title)}</h1>
          <p className="mt-6 text-xl leading-relaxed text-paper-dim">{t(article.excerpt)}</p>
          <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs text-paper-dim">
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            <span>·</span>
            <span>{t({ tr: 'Gökay Baz tarafından', en: 'By Gökay Baz' })}</span>
            {article.updatedAt !== article.publishedAt && <span>{t({ tr: `Güncellendi: ${article.updatedAt}`, en: `Updated: ${article.updatedAt}` })}</span>}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <article className="md-content mt-10 text-paper-dim">
            <Markdown>{t(article.body)}</Markdown>
          </article>
        </Reveal>

        {relatedProjects.length > 0 && (
          <section className="mt-14 border-t border-line pt-8">
            <h2 className="font-mono text-sm text-term">## {t({ tr: 'Bu yazıdaki proje kanıtı', en: 'Project evidence in this article' })}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={localizedPath(lang, `/projeler/${project.slug}`)}
                  className="border border-line px-3 py-2 font-mono text-sm text-paper-dim hover:border-term hover:text-term"
                >
                  {t(project.title)}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

export default ArticlePage
