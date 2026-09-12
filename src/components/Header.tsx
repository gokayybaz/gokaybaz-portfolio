import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { MobileMenu } from './MobileMenu'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Header() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('about')
  const links = [
    { id: 'about', label: t({ tr: 'Hakkımda', en: 'About' }) },
    { id: 'projects', label: t({ tr: 'Projeler', en: 'Projects' }) },
    { id: 'experience', label: t({ tr: 'Deneyim', en: 'Experience' }) },
    { id: 'skills', label: t({ tr: 'Yetenekler', en: 'Skills' }) },
    { id: 'contact', label: t({ tr: 'İletişim', en: 'Contact' }) },
  ]
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of ['about', 'projects', 'experience', 'skills', 'contact']) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-6">
        <button
          aria-label="Menüyü aç"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="min-h-11 min-w-11 shrink-0 font-mono text-sm text-term md:hidden"
        >
          [ ≡ ]
        </button>        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-mono text-sm text-term"
        >
          ~/gokaybaz<span className="animate-pulse">_</span>
        </a>
        <nav className="hidden gap-6 font-mono text-sm text-paper-dim md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-mono transition-colors hover:text-term"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-xs text-paper-dim md:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-term" />
            {t({ tr: 'İş fırsatlarına açık', en: 'open to work' })}
          </span>
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="min-h-11 border border-line px-3 font-mono text-xs text-term transition-colors hover:border-term"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
      {open && (
        <MobileMenu
          links={links}
          activeId={activeId}
          onNavigate={scrollTo}
          onClose={() => setOpen(false)}
        />
      )}
    </header>
  )
}