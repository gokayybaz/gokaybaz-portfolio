import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Skills() {
  const { t } = useLanguage()
  const { skillGroups } = useContent()

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'Teknik yetenekler', en: 'Technical skills' })}</h2>
      </Reveal>
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title.tr} delay={index * 50}>
            <h3 className="font-mono text-xs text-amber">{t(group.title)}</h3>
            <p className="mt-2 leading-relaxed text-paper-dim">{group.items.join(' · ')}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
