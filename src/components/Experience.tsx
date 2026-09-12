import { experience } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Experience() {
  const { lang, t } = useLanguage()
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'deneyim', en: 'experience' })}</h2>
      </Reveal>
      <div className="mt-10 space-y-10 border-l border-line pl-8">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 100}>
            <div className="relative">
              <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border border-term bg-ink" />
              <p className="font-mono text-xs text-term">{e.period}</p>
              <h3 className="mt-1 text-lg font-medium text-paper">{t(e.role)}</h3>
              <p className="font-mono text-sm text-paper-dim">@ {e.company}</p>
              <ul className="mt-3 space-y-2">
                {e.points[lang].map((pt) => (
                  <li key={pt.slice(0, 24)} className="font-mono text-sm text-paper-dim">
                    <span className="text-term">$ </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
