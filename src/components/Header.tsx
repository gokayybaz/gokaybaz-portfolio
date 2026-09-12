import { useLanguage } from '../i18n/LanguageContext'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Header() {
  const { lang, setLang, t } = useLanguage()
  const links = [
    { id: 'about', label: t({ tr: 'Hakkımda', en: 'About' }) },
    { id: 'projects', label: t({ tr: 'Projeler', en: 'Projects' }) },
    { id: 'experience', label: t({ tr: 'Deneyim', en: 'Experience' }) },
    { id: 'skills', label: t({ tr: 'Yetenekler', en: 'Skills' }) },
    { id: 'contact', label: t({ tr: 'İletişim', en: 'Contact' }) },
  ]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
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
          <span className="hidden items-center gap-2 font-mono text-xs text-paper-dim sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-term" />
            {t({ tr: 'İş fırsatlarına açık', en: 'open to work' })}
          </span>
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="border border-line px-2 py-1 font-mono text-xs text-term transition-colors hover:border-term"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
    </header>
  )
}
