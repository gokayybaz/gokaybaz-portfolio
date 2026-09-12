import { Link, Navigate, useParams } from 'react-router'
import Markdown from 'react-markdown'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from '../components/Reveal'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const { projects } = useContent()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <Link to="/" className="font-mono text-sm text-paper-dim transition-colors hover:text-term">
        ← {t({ tr: 'Geri', en: 'Back' })}
      </Link>
      <p className="mt-8 font-mono text-xs text-term">
        ~/gokaybaz/projects/{project.slug}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-4xl font-bold text-paper">{t(project.title)}</h1>
        <span className="font-mono text-sm text-paper-dim">{t(project.period)}</span>
      </div>
      {project.image && (
        <img
          src={project.image}
          alt={t(project.title)}
          className="mt-6 aspect-[16/9] w-full border border-line object-cover"
        />
      )}
      <Reveal>
        {project.metric && <p className="mt-3 font-mono text-sm text-amber">{t(project.metric)}</p>}
        <div className="mt-6 md-content text-paper-dim">
          <Markdown>{t(project.description)}</Markdown>
        </div>
        {project.detail && (
          <div className="mt-4 md-content text-paper-dim">
            <Markdown>{t(project.detail)}</Markdown>
          </div>
        )}
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
              {t({ tr: 'Canlı demo ↗', en: 'Live demo ↗' })}
            </a>
          )}
        </div>
      </Reveal>
    </div>
  )
}
