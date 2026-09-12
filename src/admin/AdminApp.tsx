import { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router'
import { defaultContent, type ContentDocument } from '../data/content'
import { fetchAdminContent, saveContent } from './api'
import { LoginPage } from './LoginPage'
import { findMissingFields } from './validate'
import { ProjectsEditor } from './sections/ProjectsEditor'
import { ExperienceEditor } from './sections/ExperienceEditor'
import { SkillsEditor } from './sections/SkillsEditor'
import { EducationEditor } from './sections/EducationEditor'
import { SiteEditor } from './sections/SiteEditor'
import { AboutEditor } from './sections/AboutEditor'
import { AdminTabBar } from './AdminTabBar'

const PROJECT_SECTION = { id: 'projects', label: 'Projeler' } as const

const OTHER_SECTIONS = [
  { id: 'experience', label: 'Deneyim' },
  { id: 'skills', label: 'Yetenekler' },
  { id: 'education', label: 'Eğitim' },
  { id: 'site', label: 'Site Bilgileri' },
  { id: 'about', label: 'Hakkımda' },
] as const

const SECTIONS = [PROJECT_SECTION, ...OTHER_SECTIONS]

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [doc, setDoc] = useState<ContentDocument>(defaultContent)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [missing, setMissing] = useState<string[] | null>(null)
  const savedRef = useRef<ContentDocument | null>(null)
  const navigate = useNavigate()

  const dirty = savedRef.current !== null && savedRef.current !== doc

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false))
  }, [])

  useEffect(() => {
    if (authed) {
      fetchAdminContent()
        .then((loaded) => {
          savedRef.current = loaded
          setDoc(loaded)
        })
        .catch(() => setMessage('İçerik yüklenemedi.'))
    }
  }, [authed])

  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (savedRef.current && savedRef.current !== doc) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [doc])

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
    const missingFields = findMissingFields(doc)
    if (missingFields.length > 0) {
      setMissing(missingFields.map((m) => `${m.section} → ${m.label}`))
      return
    }
    setMissing(null)
    setSaving(true)
    setMessage(null)
    try {
      const saved = await saveContent(doc)
      savedRef.current = saved
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
          <nav className="hidden flex-wrap gap-3 font-mono text-xs md:flex">
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
            {dirty && <span className="font-mono text-xs text-red-400">• kaydedilmemiş</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="min-h-11 border border-term bg-term/10 px-3 font-mono text-xs text-term transition-colors hover:bg-term/20 disabled:opacity-50"
            >
              {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
            <a href="/" className="font-mono text-xs text-paper-dim hover:text-term">
              Siteye dön ↗
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 md:pb-10">
        <h1 className="text-2xl font-bold text-paper">Admin Panel</h1>
        {missing && missing.length > 0 && (
          <div className="mt-4 border border-red-400 bg-red-400/5 p-4">
            <p className="font-mono text-xs text-red-400">
              Zorunlu alanlar eksik, kayıt engellendi:
            </p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-paper-dim">
              {missing.map((m) => (
                <li key={m}>— {m}</li>
              ))}
            </ul>
          </div>
        )}
        <Routes>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsEditor doc={doc} setDoc={setDoc} />} />
          <Route path="experience" element={<ExperienceEditor doc={doc} setDoc={setDoc} />} />
          <Route path="skills" element={<SkillsEditor doc={doc} setDoc={setDoc} />} />
          <Route path="education" element={<EducationEditor doc={doc} setDoc={setDoc} />} />
          <Route path="site" element={<SiteEditor doc={doc} setDoc={setDoc} />} />
          <Route path="about" element={<AboutEditor doc={doc} setDoc={setDoc} />} />
        </Routes>
      </main>
      <AdminTabBar sections={SECTIONS} />
    </div>
  )
}
