# Mobil Tasarım Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portfolyo sitesi ve admin panelini mobil için kapsamlı optimize etmek: tam ekran overlay menü, optimize hero, tek sütun akış, admin alt tab bar.

**Architecture:** Yeni `MobileMenu` bileşeni Header'a eklenir (portal değil, koşullu render). `NetworkCanvas` particle sayısını viewport genişliğine göre hesaplar. Admin'e `AdminTabBar` bileşeni eklenir; mevcut nav `md:` üstünde kalır. Tüm stiller Tailwind breakpoint sınıflarıyla (sm/md) yapılır, yeni bağımlılık yok.

**Tech Stack:** React 19 + Tailwind v4 (mevcut), Vitest + @testing-library/react (mevcut).

**Spec:** `docs/superpowers/specs/2026-09-12-mobile-design.md`

## Global Constraints

- Paket yöneticisi pnpm; komutlar: `pnpm lint`, `pnpm test`, `pnpm build`
- Kodda yorum satırı yok
- Mevcut tema sınıfları: `border-line`, `font-mono`, `text-term`, `text-amber`, `text-paper`, `text-paper-dim`, `bg-ink`, `bg-ink-soft`
- Breakpoint'ler: Tailwind varsayılan `sm` (640px), `md` (768px)
- Dokunma hedefleri min 44px (`min-h-11 min-w-11` Tailwind karşılığı)
- `prefers-reduced-motion` desteklenmeli
- Mevcut testler bozulmadan geçmeli

## Dosya Haritası

```
src/components/MobileMenu.tsx     # YENİ: tam ekran overlay menü
src/components/Header.tsx         # MODİFY: hamburger butonu + MobileMenu
src/components/NetworkCanvas.tsx  # MODİFY: viewport'e göre particle + reduced-motion
src/components/Hero.tsx           # MODİFY: mobil boyutlar
src/components/About.tsx          # MODİFY: py-16
src/components/Projects.tsx       # MODİFY: py-16
src/components/Experience.tsx     # MODİFY: py-16, pl-5
src/components/Skills.tsx         # MODİFY: py-16
src/components/Education.tsx      # MODİFY: py-16
src/components/BlogTeaser.tsx     # MODİFY: py-16
src/components/Footer.tsx         # MODİFY: py-16, mobil email boyutu
src/admin/AdminTabBar.tsx         # YENİ: alt tab bar
src/admin/AdminApp.tsx            # MODİFY: nav gizle + tab bar + toast konumu
src/admin/fields.tsx              # MODİFY: DictInput tek sütun mobilde
test/mobile-menu.test.tsx         # YENİ
test/admin-tabbar.test.tsx        # YENİ
```

---

### Task 1: MobileMenu bileşeni + Header entegrasyonu

**Files:**
- Create: `src/components/MobileMenu.tsx`
- Modify: `src/components/Header.tsx`
- Test: `test/mobile-menu.test.tsx`

**Interfaces:**
- Produces: `MobileMenu({ links: { id: string; label: string }[], onNavigate: (id: string) => void, onClose: () => void })` | overlay açıkken body scroll lock uygular, Escape ile `onClose` çağırır.

- [ ] **Step 1: Failing test yaz**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MobileMenu } from '../src/components/MobileMenu'

const LINKS = [
  { id: 'about', label: 'Hakkımda' },
  { id: 'projects', label: 'Projeler' },
]

test('renders all links in overlay', () => {
  render(<MobileMenu links={LINKS} onNavigate={() => {}} onClose={() => {}} />)
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Hakkımda' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Projeler' })).toBeInTheDocument()
})

test('close button and Escape call onClose', async () => {
  const onClose = vi.fn()
  render(<MobileMenu links={LINKS} onNavigate={() => {}} onClose={onClose} />)
  await userEvent.click(screen.getByLabelText('Menüyü kapat'))
  expect(onClose).toHaveBeenCalledOnce()
  await userEvent.keyboard('{Escape}')
  expect(onClose).toHaveBeenCalledTimes(2)
})

test('link click calls onNavigate and onClose', async () => {
  const onNavigate = vi.fn()
  const onClose = vi.fn()
  render(<MobileMenu links={LINKS} onNavigate={onNavigate} onClose={onClose} />)
  await userEvent.click(screen.getByRole('button', { name: 'Projeler' }))
  expect(onNavigate).toHaveBeenCalledWith('projects')
  expect(onClose).toHaveBeenCalledOnce()
})

test('locks body scroll while open', () => {
  render(<MobileMenu links={LINKS} onNavigate={() => {}} onClose={() => {}} />)
  expect(document.body.style.overflow).toBe('hidden')
})
```

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run test/mobile-menu.test.tsx`
Expected: FAIL | modül yok

- [ ] **Step 3: MobileMenu.tsx yaz**

```tsx
import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export function MobileMenu({
  links,
  onNavigate,
  onClose,
}: {
  links: { id: string; label: string }[]
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex flex-col bg-ink/98 backdrop-blur md:hidden"
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
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => {
              onNavigate(l.id)
              onClose()
            }}
            className="min-h-11 border-b border-line py-3 text-left font-mono text-2xl text-paper-dim transition-colors hover:text-term"
          >
            <span className="mr-3 text-term">$</span>
            {l.label}
          </button>
        ))}
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
    </div>
  )
}
```

- [ ] **Step 4: Header'a hamburger entegre et**

`Header.tsx`'te: `useState` import et, `open` state ekle. Nav'dan sonra (div içine):

```tsx
<button
  aria-label="Menüyü aç"
  aria-expanded={open}
  onClick={() => setOpen(true)}
  className="min-h-11 min-w-11 font-mono text-sm text-term md:hidden"
>
  [ ≡ ]
</button>
```

Status span'ının `sm:flex`'i `md:flex` olsun (hamburger ile çakışmasın). `open && <MobileMenu links={links} onNavigate={scrollTo} onClose={() => setOpen(false)} />` render et | `useLanguage` zaten var.

- [ ] **Step 5: Testleri çalıştır**

Run: `npx vitest run test/mobile-menu.test.tsx`
Expected: PASS (4 test)

- [ ] **Step 6: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components test/mobile-menu.test.tsx
git commit -m "feat: fullscreen mobile menu overlay with escape and scroll lock"
```

---

### Task 2: NetworkCanvas mobil particle + reduced-motion

**Files:**
- Modify: `src/components/NetworkCanvas.tsx`

**Interfaces:**
- Produces: yok (iç davranış değişikliği). Mobilde N = 24, desktop N = 60; reduced-motion'da animasyon döngüsü çalışmaz ama ilk kare çizilir.

- [ ] **Step 1: particle sayısını viewport'a göre hesapla**

`const N = 60` satırını değiştir:

```ts
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const N = window.innerWidth < 640 ? 24 : 60
```

(mevcut `reduced` satırı üstte kalabilir; N satırı `reduced` tanımından sonra gelsin)

- [ ] **Step 2: reduced-motion'da tek kare çiz**

`draw()` fonksiyonunun sonundaki `raf = requestAnimationFrame(draw)` satırını koşula bağla:

```ts
      if (!reduced) raf = requestAnimationFrame(draw)
```

`draw()` ilk çağrısı her durumda çalışır (statik kare).

- [ ] **Step 3: doğrula**

Run: `pnpm test && pnpm build`
Expected: PASS (canvas testi jsdom'da mock'lanmış durumda; davranış değişikliği test kırmez)

- [ ] **Step 4: Commit**

```bash
git add src/components/NetworkCanvas.tsx
git commit -m "feat: fewer particles on mobile and static frame for reduced motion"
```

---

### Task 3: Hero + bölüm mobil spacing ayarları

**Files:**
- Modify: `src/components/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `BlogTeaser.tsx`, `Footer.tsx`

**Interfaces:**
- Produces: yok (saf stil değişiklikleri)

- [ ] **Step 1: Hero mobil boyutları**

`Hero.tsx`:
- Avatar div'leri: `h-44 w-44 ... sm:h-48 sm:w-48` → `h-32 w-32 ... sm:h-48 sm:w-48` (her iki Avatar varyantında)
- Monogram font: `text-2xl` → `text-xl sm:text-2xl`
- H1: `text-5xl ... sm:text-7xl` → `text-4xl ... sm:text-7xl`
- Section: `min-h-screen` → `min-h-[calc(100svh)]` (mobil tarayıcı çubuğu sorunu için dinamik viewport)

- [ ] **Step 2: bölüm py ayarları**

Her bölümde `py-24` → `py-16 md:py-24` (About, Projects, Experience, Skills, Education, BlogTeaser, Footer | 7 dosya)

- [ ] **Step 3: Experience timeline mobil**

`Experience.tsx`: `pl-8` → `pl-5 md:pl-8`; nokta `-left-[41px]` → `-left-[29px] md:-left-[41px]`

- [ ] **Step 4: Footer mobil email**

`Footer.tsx`: email link `text-2xl ... sm:text-4xl` → `text-xl ... sm:text-4xl` (uzun email mobilde taşmasın); `break-all` ekle

- [ ] **Step 5: doğrula**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components
git commit -m "feat: mobile spacing and sizing for hero and sections"
```

---

### Task 4: AdminTabBar + AdminApp mobil düzeni

**Files:**
- Create: `src/admin/AdminTabBar.tsx`
- Modify: `src/admin/AdminApp.tsx`
- Test: `test/admin-tabbar.test.tsx`

**Interfaces:**
- Consumes: `SECTIONS` yapısı (AdminApp'te `{ id, label }[]`)
- Produces: `AdminTabBar({ sections: { id: string; label: string }[] })` | NavLink'leri alt barda render eder, `md:hidden`.

- [ ] **Step 1: Failing test yaz**

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { AdminTabBar } from '../src/admin/AdminTabBar'

const SECTIONS = [
  { id: 'projects', label: 'Projeler' },
  { id: 'about', label: 'Hakkımda' },
]

function renderBar() {
  return render(
    <MemoryRouter initialEntries={['/admin/projects']}>
      <AdminTabBar sections={SECTIONS} />
    </MemoryRouter>,
  )
}

test('renders all section links', () => {
  renderBar()
  expect(screen.getByText('Projeler')).toBeInTheDocument()
  expect(screen.getByText('Hakkımda')).toBeInTheDocument()
})

test('marks active section', () => {
  renderBar()
  expect(screen.getByText('Projeler').className).toContain('text-term')
})
```

- [ ] **Step 2: Fail doğrula**

Run: `npx vitest run test/admin-tabbar.test.tsx`
Expected: FAIL | modül yok

- [ ] **Step 3: AdminTabBar.tsx yaz**

```tsx
import { NavLink } from 'react-router'

export function AdminTabBar({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Admin bölümleri"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-6">
        {sections.map((s) => (
          <NavLink
            key={s.id}
            to={`/admin/${s.id}`}
            className={({ isActive }) =>
              `flex min-h-14 flex-col items-center justify-center gap-0.5 font-mono text-[10px] ${
                isActive ? 'text-term' : 'text-paper-dim'
              }`
            }
          >
            <span className="text-sm">›</span>
            {s.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
```

Not: `grid-cols-6` 6 bölüm için sabit; bölüm sayısı değişirse `grid-flow-col auto-cols-fr` kullanılabilir | şimdilik sabit yeterli.

- [ ] **Step 4: AdminApp'e entegre et**

- Header nav'ına `hidden md:flex` ekle (mevcut `flex flex-wrap` yerine)
- Header'daki Kaydet butonu kalır; header'a `pb-` gerekmez
- `<main>`'e alt padding: `pb-24 md:pb-10` (tab bar ile içerik çakışmasın)
- `AdminTabBar`'ı root div'in sonuna render et: `<AdminTabBar sections={SECTIONS} />`
- Toast mesajı (`message`) header'da kalabilir | mobilde dar olduğundan header altında satır kırılması kabul

- [ ] **Step 5: Testleri çalıştır**

Run: `npx vitest run test/admin-tabbar.test.tsx`
Expected: PASS

- [ ] **Step 6: Tüm testler + lint + build**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/admin test/admin-tabbar.test.tsx
git commit -m "feat: admin bottom tab bar for mobile navigation"
```

---

### Task 5: DictInput mobil tek sütun + dokunma hedefleri

**Files:**
- Modify: `src/admin/fields.tsx`

**Interfaces:**
- Produces: yok (stil)

- [ ] **Step 1: DictInput grid**

`md:grid-cols-2` zaten mobilde tek sütuna düşüyor | mevcut. Kontrol et, değişiklik gerekmiyorsa step'i atla.

- [ ] **Step 2: dokunma hedefleri**

- `ArrayControls` butonları: `px-2 py-0.5` → `min-h-11 min-w-11 flex items-center justify-center px-2` (44px dokunma hedefi)
- Admin header Kaydet butonu: `px-3 py-1.5` → `min-h-11 px-3`
- MarkdownInput toolbar butonları: `px-1.5 py-0.5` → `min-h-9 min-w-9` (toolbar yoğun; 36px kabul, panel içi ikincil kontrol)

- [ ] **Step 3: doğrula**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/admin/fields.tsx src/admin/MarkdownInput.tsx src/admin/AdminApp.tsx
git commit -m "feat: 44px touch targets for admin controls"
```

---

### Task 6: Final doğrulama

**Files:** yok

- [ ] **Step 1: tam suite**

Run: `pnpm lint && pnpm test && pnpm build`
Expected: hepsi PASS

- [ ] **Step 2: manuel mobil checklist**

`pnpm dev` + tarayıcı devtools mobil viewport'lar:
- [ ] 375px (iPhone SE): hamburger açılır, overlay linkler çalışır, Escape kapatır
- [ ] 390px (iPhone 14): hero isim tek satır, avatar küçük, canvas akıcı
- [ ] 768px (iPad): hamburger görünmez (md: üstü nav var)
- [ ] Admin 375px: alt tab bar görünür, bölümler arası geçiş, Kaydet çalışır, DictInput tek sütun
- [ ] Yatay taşma yok (hiçbir sayfada yatay scrollbar çıkmıyor)

- [ ] **Step 3: commit + merge**

```bash
git checkout main && git merge feature/mobile-design && git branch -d feature/mobile-design && git push
```

---

## Self-Review Notları

- **Spec coverage:** overlay menü → Task 1; canvas/reduced-motion → Task 2; hero/bölüm spacing → Task 3; admin tab bar → Task 4; dokunma hedefleri → Task 5; doğrulama → Task 6. Hepsi karşılanıyor.
- **Placeholder scan:** Task 5 Step 1 "kontrol et" ifadesi doğrulama adımı | DictInput'ta `md:grid-cols-2` zaten mevcut, kod değişikliği beklenmiyor.
- **Type consistency:** `AdminTabBar({ sections })` Task 4'te tanımlı, AdminApp aynı imzayla kullanıyor. `MobileMenu` props'ları Header kullanımıyla tutarlı.
