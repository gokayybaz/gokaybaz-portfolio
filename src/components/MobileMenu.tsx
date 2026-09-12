import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function MobileMenu({
  links,
  activeId,
  onNavigate,
  onClose,
}: {
  links: { id: string; label: string }[]
  activeId?: string
  onNavigate: (id: string) => void
  onClose: () => void
}) {
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex flex-col bg-ink md:hidden"
    >
      <div className="flex h-14 items-center justify-between border-b border-line px-6">
        <span className="font-mono text-sm text-term">~/gokaybaz<span className="animate-pulse">_</span></span>
        <button
          aria-label="Menüyü kapat"
          onClick={onClose}
          className="min-h-11 min-w-11 font-mono text-lg text-paper-dim hover:text-term"
        >
          [ ✕ ]
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
        {links.map((l) => {
          const active = (activeId ?? links[0]?.id) === l.id
          return (
            <button
              key={l.id}
              onClick={() => {
                onNavigate(l.id)
                onClose()
              }}
              className={`min-h-11 border-b border-line py-3 text-left font-mono text-2xl transition-colors hover:text-term ${
                active ? 'text-term' : 'text-paper-dim'
              }`}
            >
              <span aria-hidden="true" className="mr-3 text-term">$</span>
              {l.label}
            </button>
          )
        })}
      </nav>
      <div className="flex items-center justify-between border-t border-line px-8 py-6">
        <button
          onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
          className="min-h-11 border border-line px-3 font-mono text-xs text-term"
        >
          {lang === 'tr' ? 'EN' : 'TR'}
        </button>
        <span className="flex items-center gap-2 font-mono text-xs text-paper-dim">
          <span className="h-2 w-2 animate-pulse rounded-full bg-term" />
          {lang === 'tr' ? 'İş fırsatlarına açık' : 'open to work'}
        </span>
      </div>
    </div>,
    document.body,
  )
}
