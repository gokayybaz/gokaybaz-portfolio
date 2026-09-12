import { useState } from 'react'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Experience() {
  const { lang, t } = useLanguage()
  const { experience } = useContent()
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({})
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'Deneyim', en: 'Experience' })}</h2>
      </Reveal>
      <div className="mt-10 space-y-14 border-l border-line pl-5 md:space-y-16 md:pl-8">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 100}>
            <article className="relative min-w-0">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border border-term bg-ink md:-left-[41px]" />
              <p className="font-mono text-xs text-term">{t(e.period)}</p>
              <h3 className="mt-1 text-lg font-medium text-paper">{t(e.role)}</h3>
              <p className="break-words font-mono text-sm text-paper-dim">@ {e.company}</p>
              <p className="mt-3 max-w-3xl leading-relaxed text-paper-dim">
                {t(e.summary ?? { tr: e.points.tr[0] ?? '', en: e.points.en[0] ?? '' })}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-paper-dim">
                {(e.highlights?.[lang] ?? e.points[lang].slice(0, 3)).map((point) => (
                  <li key={point.slice(0, 32)}>{point}</li>
                ))}
              </ul>
              <details
                className="mt-4 max-w-3xl border-t border-line pt-3"
                open={openDetails[e.company] ?? false}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open
                  setOpenDetails((current) => ({ ...current, [e.company]: isOpen }))
                }}
              >
                <summary className="cursor-pointer list-none font-mono text-xs text-term hover:text-amber">
                  $ {t({
                    tr: openDetails[e.company] ? 'teknik detayları gizle' : 'teknik detayları göster',
                    en: openDetails[e.company] ? 'hide technical details' : 'show technical details',
                  })}
                </summary>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-paper-dim">
                  {(e.details?.[lang] ?? e.points[lang]).map((point) => (
                    <li key={point.slice(0, 32)}>{point}</li>
                  ))}
                </ul>
              </details>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
