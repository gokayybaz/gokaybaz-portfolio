# gokaybaz.com — Personal Portfolio

Gökay Baz's personal portfolio site — terminal/infra aesthetic, bilingual (TR/EN), built with Vite + React.

## Development

```bash
pnpm install
pnpm dev          # dev server (Vite :5173, /api proxy -> :8787)
pnpm dev:server   # API server (:8787)
pnpm test         # vitest
pnpm build        # typecheck + production build
```

## Admin Panel & Dinamik İçerik

Site içeriği `/admin` panelinden yönetilir. Panelde projeler, deneyim, yetenekler,
eğitim, site bilgileri, hakkımda metni ve sosyal linkler düzenlenebilir.

### Lokal geliştirme

```bash
pnpm dev:server   # API :8787 (varsayılan şifre: admin)
pnpm dev          # Vite :5173
```

Panel: `http://localhost:5173/#/admin` — şifre env'den gelir
(`ADMIN_PASSWORD` veya `ADMIN_PASSWORD_HASH` yoksa `admin`).

### Üretim (Docker)

```bash
node -e "console.log(require('bcryptjs').hashSync('SIFRENIZ',10))"  # hash üret
echo "ADMIN_PASSWORD_HASH=<hash>" >> .env
echo "JWT_SECRET=<rastgele-uzun-dizgi>" >> .env
docker compose up -d --build
```

**Önemli:** bcrypt hash'i `$2b$10$...` gibi `$` karakterleri içerir. Docker Compose,
`.env` değerlerinde `$`'ı değişken interpolasyonu olarak yorumlar ve hash'i bozar
("The ... variable is not set" uyarısı görürsünüz, login çalışmaz). `$`'ları `$$`
olarak escape'leyin:

```bash
sed -i 's/\$/\$\$/g' .env   # .env'deki tüm $ işaretlerini $$ yapar
docker compose up -d --build
```

Site `:3000`'de servis edilir; içerik `server/data/content.json`'da kalıcıdır
(volume mount). API erişilemezse site bundle'a gömülü varsayılan içerikle çalışır.

## Structure

- `src/i18n/` — TR/EN language context (persisted to localStorage)
- `src/data/` — typed bilingual content + `ContentDocument` tipi ve fallback veri
- `src/content/` — ContentContext: API'den içerik çeker, fallback defaultContent
- `src/components/` — page sections (Header, Hero, About, Projects, Experience, BlogTeaser, Footer)
- `src/pages/` — HomePage + ProjectDetailPage
- `src/admin/` — admin panel (login, editörler, api client)
- `server/` — Express API: content store (JSON), auth (bcrypt + JWT cookie), zod validasyon, tüm görsel upload'larını WebP'e dönüştürme
