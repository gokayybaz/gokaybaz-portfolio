import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const { t } = useLanguage()
  const { projects } = useContent()
  const ordered = [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <h2 className="font-mono text-sm text-term">## {t({ tr: 'Projeler', en: 'Projects' })}</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {ordered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
