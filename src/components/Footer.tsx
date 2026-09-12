import { site } from '../data/content'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Footer() {
  const { t } = useLanguage()
  const links = [
    { href: site.socials.github, label: 'GitHub' },
    { href: site.socials.linkedin, label: 'LinkedIn' },
    { href: site.socials.x, label: 'X' },
    { href: site.socials.medium, label: 'Medium' },
  ]
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="font-mono text-sm text-term">## {t({ tr: 'iletisim', en: 'contact' })}</h2>
          <p className="mt-6 text-xl text-paper-dim">
            {t({ tr: 'Bir proje, bir fikir ya da sadece merhaba —', en: 'A project, an idea, or just a hello —' })}
          </p>
          <a
            href={site.socials.email}
            className="mt-2 inline-block font-mono text-2xl text-term hover:underline sm:text-4xl"
          >
            gokaybaz2000@gmail.com
          </a>
          <div className="mt-10 flex gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-paper-dim transition-colors hover:text-term"
              >
                {l.label}
              </a>
            ))}
          </div>
          <p className="mt-16 font-mono text-xs text-paper-dim">
            {t({
              tr: 'Vite + React ile yapıldı, tarafımdan deploy edildi.',
              en: 'Built with Vite + React, deployed by me.',
            })}
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
