import type { Project } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'
import { Link } from 'react-router'
import { localizedPath } from '../routing/locale'

export function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLanguage()
  return (
    <Link
      to={localizedPath(lang, `/projeler/${project.slug}`)}
      className="group flex h-full flex-col border border-line bg-ink-soft p-6 transition-colors hover:border-term"
    >
      {project.image && (
        <img
          src={project.image}
          alt={t(project.title)}
          width={800}
          height={450}
          decoding="async"
          loading="lazy"
          className="mb-4 aspect-[16/9] w-full border border-line object-cover"
        />
      )}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-mono text-lg text-paper transition-colors group-hover:text-term">{t(project.title)}</h3>
        <span className="shrink-0 font-mono text-xs text-paper-dim">{t(project.period)}</span>
      </div>
      {project.metric && <p className="mt-2 font-mono text-xs text-amber">{t(project.metric)}</p>}
      <p className="mt-2 text-sm text-paper-dim">{t(project.description)}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim">
            {s}
          </span>
        ))}
      </div>
      <span className="mt-4 inline-block font-mono text-xs text-term">
         {t({ tr: 'Detay →', en: 'Details →' })}
      </span>
    </Link>
  )
}
