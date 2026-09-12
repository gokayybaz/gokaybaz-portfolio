import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function BlogTeaser() {
  const { t } = useLanguage()
  const { site } = useContent()
  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <div className="border border-dashed border-line p-10 text-center">
          <p className="font-mono text-sm text-term">
            {t({ tr: 'Referanslar talep üzerine paylaşılır.', en: 'References are available on request.' })}
          </p>
          <a
            href={site.socials.medium}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-mono text-xs text-term hover:underline"
          >
            {t({ tr: 'Teknik notlar için Medium ↗', en: 'Technical notes on Medium ↗' })}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
