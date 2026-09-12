import { Link } from 'react-router'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { localizedPath } from '../routing/locale'
import { Reveal } from './Reveal'

export function BlogTeaser() {
  const { lang, t } = useLanguage()
  const { articles, site } = useContent()

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'Teknik yazılar', en: 'Technical writing' })}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <article key={article.slug} className="border border-line bg-ink-soft p-5">
              <p className="font-mono text-[10px] text-amber">{t(article.category)}</p>
              <h3 className="mt-3 font-mono text-base text-paper">
                <Link to={localizedPath(lang, `/yazilar/${article.slug}`)} className="hover:text-term">
                  {t(article.title)}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">{t(article.excerpt)}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link to={localizedPath(lang, '/yazilar')} className="font-mono text-xs text-term hover:underline">
            {t({ tr: 'Tüm teknik yazılar →', en: 'All technical articles →' })}
          </Link>
          <a
            href={site.socials.medium}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-term hover:underline"
          >
            {t({ tr: 'Teknik notlar için Medium ↗', en: 'Technical notes on Medium ↗' })}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
