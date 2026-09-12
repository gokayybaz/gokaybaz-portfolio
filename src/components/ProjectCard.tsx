import type { Project } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage()
  return (
    <a
      href={`#/project/${project.slug}`}
      className={`group flex flex-col border border-line bg-ink-soft p-6 transition-colors hover:border-term ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <h3 className="font-mono text-lg text-paper transition-colors group-hover:text-term">{project.title}</h3>
      <p className="mt-2 text-sm text-paper-dim">{t(project.description)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim">
            {s}
          </span>
        ))}
      </div>
      <span className="mt-4 inline-block font-mono text-xs text-term">
        {t({ tr: 'detay →', en: 'detail →' })}
      </span>
    </a>
  )
}
