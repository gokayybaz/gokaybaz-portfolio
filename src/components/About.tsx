import Markdown from 'react-markdown'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function About() {
  const { t } = useLanguage()
  const { profile: about, aboutTags } = useContent()
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'Profil', en: 'Profile' })}</h2>
      </Reveal>
      <div className="mt-10 grid gap-12 md:grid-cols-[3fr_2fr]">
        <Reveal delay={100}>
          <div className="md-content text-paper-dim">
            <Markdown>{t(about)}</Markdown>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-mono text-xs text-paper-dim">$ stack --list</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {aboutTags.map((tag) => (
              <span key={tag} className="border border-line px-2 py-1 font-mono text-xs text-paper-dim">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
