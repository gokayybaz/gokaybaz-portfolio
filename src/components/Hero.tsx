import { useEffect, useState } from 'react'
import { NetworkCanvas } from './NetworkCanvas'
import { useContent } from '../content/ContentContext'
import { useLanguage } from '../i18n/LanguageContext'

const PROMPT = '$ whoami'

export function Avatar() {
  const { site } = useContent()
  const [missing, setMissing] = useState(false)
  const [candidateIndex, setCandidateIndex] = useState(0)
  if (missing) {
    return (
      <div
        className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-line font-mono text-xl text-term sm:mb-6 sm:h-48 sm:w-48 sm:text-2xl"
        aria-hidden="true"
      >
        GB
      </div>
    )
  }
  return (
    <img
      src={site.avatarCandidates[candidateIndex]}
      alt={site.name}
      onError={() => {
        if (candidateIndex < site.avatarCandidates.length - 1) {
          setCandidateIndex((index) => index + 1)
        } else {
          setMissing(true)
        }
      }}
      className="mx-auto mb-6 h-32 w-32 rounded-full border border-line object-cover sm:mb-6 sm:h-48 sm:w-48"
    />
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.77 1.05.77 2.12v3.14c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.66V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.72 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.5 20.45H3.94V9h3.56v11.45Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.89l8.6-9.83L0 1.15h7.59l5.1 6.75 5.45-6.75Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const { site } = useContent()
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (typed.length >= PROMPT.length) return
    const id = setInterval(() => {
      setTyped((s) => PROMPT.slice(0, s.length + 1))
    }, 80)
    return () => clearInterval(id)
  }, [typed])

  const socials = [
    { href: site.socials.github, label: 'GitHub', Icon: GithubIcon },
    { href: site.socials.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: site.socials.x, label: 'X', Icon: XIcon },
    { href: site.socials.email, label: 'Email', Icon: MailIcon },
  ]

  return (
    <section className="relative flex min-h-[calc(100svh)] items-center justify-center overflow-hidden">
      <NetworkCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      <div className="relative z-10 px-6 pt-24 text-center">
        <Avatar />
        <p className="font-mono text-sm text-term">
          {typed}
          <span className="animate-pulse">▋</span>
        </p>
        <h1 className="mt-6 font-mono text-4xl font-bold tracking-tight text-paper [word-spacing:-0.2em] sm:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 text-lg text-paper-dim sm:text-xl">{t(site.title)}</p>
        <p className="mt-2 font-mono text-xs text-amber sm:text-sm">{t(site.subtitle)}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-xs text-paper-dim">
          <span>{t(site.location)}</span>
          <span className="text-line">/</span>
          <span>{t(site.availability)}</span>
        </div>
        <div className="mt-10 flex justify-center gap-5">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="text-paper-dim transition-colors hover:text-term"
            >
              <Icon />
            </a>
          ))}
        </div>
        <a
          href={site.socials.phone}
          className="mt-5 inline-block font-mono text-xs text-paper-dim transition-colors hover:text-term"
        >
          +90 544 508 54 79
        </a>
        <div className="mt-16 font-mono text-xs text-paper-dim">
          <span className="animate-pulse">↓</span> {t({ tr: 'Aşağı kaydır', en: 'Scroll down' })}
        </div>
      </div>
    </section>
  )
}
