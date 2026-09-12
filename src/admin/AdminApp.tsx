import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router'
import { defaultContent, type ContentDocument } from '../data/content'
import { fetchAdminContent, saveContent } from './api'
import { LoginPage } from './LoginPage'
import { ProjectsEditor } from './sections/ProjectsEditor'
import { ExperienceEditor } from './sections/ExperienceEditor'
import { SkillsEditor } from './sections/SkillsEditor'
import { EducationEditor } from './sections/EducationEditor'

const PROJECT_SECTION = { id: 'projects', label: 'Projeler' } as const

const OTHER_SECTIONS = [
  { id: 'experience', label: 'Deneyim' },
  { id: 'skills', label: 'Yetenekler' },
  { id: 'education', label: 'Eğitim' },
  { id: 'site', label: 'Site Bilgileri' },
  { id: 'about', label: 'Hakkımda' },
] as const

const SECTIONS = [PROJECT_SECTION, ...OTHER_SECTIONS]

function Placeholder({ section }: { section: string }) {
  return <p className="font-mono text-sm text-paper-dim">{section} editörü hazırlanıyor.</p>
}

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [doc, setDoc] = useState<ContentDocument>(defaultContent)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false))
  }, [])

  useEffect(() => {
    if (authed) {
      fetchAdminContent()
        .then(setDoc)
        .catch(() => setMessage('İçerik yüklenemedi.'))
    }
  }, [authed])

  if (authed === null) {
    return <div className="min-h-screen bg-ink" />
  }
  if (!authed) {
    return (
      <LoginPage
        onSuccess={() => {
          setAuthed(true)
          navigate('/admin/projects')
        }}
      />
    )
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      const saved = await saveContent(doc)
      setDoc(saved)
      setMessage('Kaydedildi.')
    } catch {
      setMessage('Kaydedilemedi.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-10 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4">
          <span className="font-mono text-sm text-term">~/gokaybaz/admin</span>
          <nav className="flex flex-wrap gap-3 font-mono text-xs">
            {SECTIONS.map((s) => (
              <NavLink
                key={s.id}
                to={`/admin/${s.id}`}
                className={({ isActive }) =>
                  isActive ? 'text-term underline underline-offset-4' : 'text-paper-dim hover:text-term'
                }
              >
                {s.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {message && <span className="font-mono text-xs text-amber">{message}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term transition-colors hover:bg-term/20 disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
            <a href="/" className="font-mono text-xs text-paper-dim hover:text-term">
              Siteye dön ↗
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold text-paper">Admin Panel</h1>
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsEditor doc={doc} setDoc={setDoc} />} />
          <Route path="experience" element={<ExperienceEditor doc={doc} setDoc={setDoc} />} />
          <Route path="skills" element={<SkillsEditor doc={doc} setDoc={setDoc} />} />
          <Route path="education" element={<EducationEditor doc={doc} setDoc={setDoc} />} />
          {OTHER_SECTIONS.map((s) => (
            <Route key={s.id} path={s.id} element={<Placeholder section={s.label} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
