import { site } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function BlogTeaser() {
  const { t } = useLanguage()
  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <div className="border border-dashed border-line p-10 text-center">
          <p className="font-mono text-sm text-paper-dim">
            {t({ tr: 'blog yakında...', en: 'blog coming soon...' })}
          </p>
          <a
            href={site.socials.medium}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-mono text-xs text-term hover:underline"
          >
            {t({ tr: 'bu arada Medium\'dayım ↗', en: 'meanwhile, I write on Medium ↗' })}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
