import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Education() {
  const { t } = useLanguage()
  const { education } = useContent()

  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'Eğitim', en: 'Education' })}</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <Reveal key={item.institution}>
            <article className="border border-line bg-ink-soft p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-medium text-paper">{item.institution}</h3>
                <span className="shrink-0 font-mono text-xs text-paper-dim">{item.period}</span>
              </div>
              <p className="mt-2 text-paper-dim">{t(item.program)}</p>
              {item.status && <p className="mt-3 font-mono text-xs text-amber">{t(item.status)}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
