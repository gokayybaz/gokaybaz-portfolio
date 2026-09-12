import { Link } from 'react-router'
import { Header } from '../components/Header'
import { SeoHead } from '../components/SeoHead'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { localizedPath } from '../routing/locale'

export function ArticlesPage() {
  const { lang, t } = useLanguage()
  const { articles } = useContent()

  return (
    <>
      <SeoHead />
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <p className="font-mono text-xs text-term">~/gokaybaz/articles</p>
        <h1 className="mt-4 text-4xl font-bold text-paper sm:text-5xl">{t({ tr: 'Teknik Yazılar', en: 'Technical Articles' })}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-dim">
          {t({ tr: 'BT altyapısı, IT/OT, üretim dijitalleşmesi ve güvenilir yazılım işletimi üzerine gerçek proje deneyiminden çıkan notlar.', en: 'Notes from real project work across IT infrastructure, IT/OT, manufacturing digitalization and reliable software operations.' })}
        </p>
        <div className="mt-12 space-y-4">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 40}>
              <article className="border border-line bg-ink-soft p-6 transition-colors hover:border-term">
                <p className="font-mono text-xs text-amber">{t(article.category)} · {article.updatedAt}</p>
                <h2 className="mt-3 text-2xl font-bold text-paper">
                  <Link to={localizedPath(lang, `/yazilar/${article.slug}`)} className="hover:text-term">
                    {t(article.title)}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-paper-dim">{t(article.excerpt)}</p>
                <Link to={localizedPath(lang, `/yazilar/${article.slug}`)} className="mt-5 inline-block font-mono text-xs text-term hover:underline">
                  {t({ tr: 'Yazıyı oku →', en: 'Read article →' })}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ArticlesPage
