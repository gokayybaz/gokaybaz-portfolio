# Admin Panel + Dinamik İçerik Tasarımı

**Tarih:** 2026-09-12
**Durum:** Onaylandı (A yaklaşımı: API'den canlı içerik + statik fallback)

## Amaç

Mevcut statik portfolyo sitesine admin paneli ekleyerek tüm içeriği (projeler, deneyim, skill grupları, education, hero/site bilgileri, about metni, about tag'leri, socials | yani `content.ts`'teki her şey) dinamik hale getirmek.

## Mimari: A Yaklaşımı

```
┌─────────────────────────────────────────────┐
│              Docker container                │
│                                              │
│  Express (TypeScript)                        │
│  ├── GET  /api/content      (public)        │
│  ├── POST /api/admin/login  (public)        │
│  ├── PUT  /api/admin/content (auth: cookie) │
│  ├── static: dist/ (Vite build)              │
│  └── data/content.json (kalıcı depo)         │
└─────────────────────────────────────────────┘
         ▲                        ▲
         │ SPA (portfolyo)        │ SPA (/admin)
         └──────── React Router ──┘
```

- **Backend:** `server/` altında Express + TypeScript. Veri deposu SQLite değil, tek JSON dosyası (`server/data/content.json`) | içerik zaten tek doküman; dosya daha basit, yedeklemesi ve versiyonlaması kolay. Yazma işlemleri atomik (temp file + rename).
- **Frontend (portfolyo):** Açılışta `GET /api/content` çeker, context'e koyar. API erişilemezse bundle'a gömülü mevcut `content.ts` verisi fallback olarak kullanılır. Böylece API çökse bile site çalışır.
- **Admin:** Aynı SPA içinde `/admin` route'u (ayrı layout). Login ekranı → httpOnly cookie + JWT oturumu. CRUD formları TR/EN çift input'lu.
- **Deploy:** Tek Docker container; Express hem API'yi hem build edilmiş SPA'yı servis eder. Kullanıcının kendi VPS'inde (Docker zaten alışkanlık).

## Veri Modeli

Backend'in sakladığı JSON, `content.ts`'teki mevcut tiplerin birebir aynısı:

```ts
interface ContentDocument {
  site: typeof site          // isim, unvan, subtitle, socials, location, availability
  profile: Dict              // about metni
  aboutTags: string[]
  skillGroups: SkillGroup[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}
```

- `src/data/content.ts` **kalır** ve tip tanımları + seed/fallback veri kaynağı olarak yaşamaya devam eder.
- `ContentDocument` tipi ortak olarak `src/data/content.ts`'ten import edilir (server da kullanır).
- Seed: server ilk açılışta `content.json` yoksa `content.ts`'in varsayılan değerlerinden oluşturur.

## API

| Endpoint | Metod | Auth | İşlev |
|---|---|---|---|
| `/api/content` | GET | public | İçerik dokümanını döner |
| `/api/admin/login` | POST | public | Şifre doğrular, httpOnly cookie set eder |
| `/api/admin/logout` | POST | cookie | Oturumu kapatır |
| `/api/admin/session` | GET | cookie | Aktif oturum var mı kontrolü |
| `/api/admin/content` | GET | cookie | (Editör için) içerik döner |
| `/api/admin/content` | PUT | cookie | İçerik dokümanını tamamen günceller, dosyaya yazar |

- Auth: tek admin kullanıcısı, şifre env'de (`ADMIN_PASSWORD`), bcrypt ile hash'lenmiş hali karşılaştırılır. JWT httpOnly cookie (`admin_token`), ~12 saat TTL.
- PUT tüm dokümanı alır (panel zaten tüm dokümanı editliyor) | partial patch karmaşıklığına gerek yok.

## Frontend Değişiklikleri

- **ContentContext** (yeni): `useContent()` hook'u | API'den (veya fallback'ten) gelen `ContentDocument`'ı sağlar. Mevcut bileşenler `content.ts`'ten direkt import yerine bu hook'u kullanır.
- **Admin layout** (`/admin`): ayrı sidebar layout; portfolyo temasıyla uyumlu terminal-estetiği.
  - Login sayfası (`/admin/login`)
  - Dashboard: bölüm listesi
  - Editörler: Projects (liste + sıralama + silme + yeni), Experience, Skills, Education, Site bilgileri, About, About Tags, Socials
  - TR/EN çift input olan alanlar: iki dil sekmesi veya iki input yan yana (Dict alanlar için)
  - Kaydet: tüm dokümanı PUT ile gönderir, optimistic UI + toast feedback
- **Routing:** `/admin/*` route'ları `App.tsx`'e eklenir; admin layout kendi route ağacına sahip.

## Güvenlik

- Şifre asla frontend'e gönderilmez; sadece bcrypt hash karşılaştırması server'da.
- httpOnly + SameSite=Strict cookie; XSS ile cookie çalınamaz.
- Content-Type: application/json zorunlu; PUT body'si `ContentDocument` şemasıyla validate edilir (zod | server'da yeni dependency).
- Rate limit login endpoint'ine (basit in-memory, 5 deneme/dk).

## Deploy

- `Dockerfile` (multi-stage: pnpm build → node:22-alpine runtime)
- `docker-compose.yml`: port mapping, `ADMIN_PASSWORD` env, `server/data/` volume mount (kalıcılık için)

## Test

- Backend: vitest | auth (login başarılı/başarısız, cookie, session), content GET/PUT (valid/invalid body), seed davranışı
- Frontend: ContentContext fallback testi (API yok → content.ts verisi), admin login formu render testi
- Mevcut testler bozulmadan geçmeli (`pnpm test`)
- `pnpm build` + `tsc -b` her task sonunda doğrulanır

## Kapsam Dışı (YAGNI)

- Çok kullanıcılı sistem, rol yönetimi
- Görsel/medya upload (avatar şu an `public/`'ten geliyor)
- Blog içerik yönetimi (blog hâlâ "coming soon")
- Redis/cache katmanı | tek instance, dosya okuması yeterince hızlı
- Versiyonlama/undo geçmişi (ileride istenirse content.json'a timestamp'li kopyalar yazılabilir)
