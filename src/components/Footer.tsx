import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './Reveal'

export function Footer() {
  const { t } = useLanguage()
  const { site } = useContent()
  const links = [
    { href: site.socials.github, label: 'GitHub' },
    { href: site.socials.linkedin, label: 'LinkedIn' },
    { href: site.socials.x, label: 'X' },
    { href: site.socials.medium, label: 'Medium' },
  ]
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Reveal>
          <h2 className="font-mono text-sm text-term">## {t({ tr: 'İletişim', en: 'Contact' })}</h2>
          <p className="mt-6 text-xl text-paper-dim">
            {t({ tr: 'Bir proje, bir fikir ya da sadece merhaba |', en: 'A project, an idea, or just a hello |' })}
          </p>
          <a
            href={site.socials.email}
            className="mt-2 inline-block break-all font-mono text-xl text-term hover:underline sm:text-4xl"
          >
            gokaybaz2000@gmail.com
          </a>
          <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs text-paper-dim">
            <a href={site.socials.phone} className="transition-colors hover:text-term">+90 544 508 54 79</a>
            <span>{t(site.location)}</span>
          </div>
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
        </Reveal>
      </div>
    </footer>
  )
}
