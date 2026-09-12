import { Link, Navigate, useParams } from 'react-router'
import { projects } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from '../components/Reveal'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <Link to="/" className="font-mono text-sm text-paper-dim transition-colors hover:text-term">
        ← {t({ tr: 'geri', en: 'back' })}
      </Link>
      <p className="mt-8 font-mono text-xs text-term">
        ~/gokaybaz/projects/{project.slug}
      </p>
      <h1 className="mt-2 text-4xl font-bold text-paper">{project.title}</h1>
      <Reveal>
        <p className="mt-6 text-paper-dim">{t(project.description)}</p>
        {project.detail && <p className="mt-4 leading-relaxed text-paper-dim">{t(project.detail)}</p>}
        {project.highlights && (
          <ul className="mt-8 space-y-2">
            {project.highlights[lang].map((h) => (
              <li key={h.slice(0, 24)} className="font-mono text-sm text-paper-dim">
                <span className="text-term">$ </span>
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="border border-line px-2 py-0.5 font-mono text-xs text-paper-dim">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-8 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-term hover:underline"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-term hover:underline"
            >
              {t({ tr: 'canlı demo ↗', en: 'live demo ↗' })}
            </a>
          )}
        </div>
      </Reveal>
    </div>
  )
}
