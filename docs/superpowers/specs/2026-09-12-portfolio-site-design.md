# gokaybaz.com v2 — Kişisel Portfolyo Sitesi Tasarımı

**Tarih:** 2026-09-12
**Durum:** Onaylandı

## Amaç

Gökay Baz'ın (Sistem Uzmanı & Full-Stack Yazılımcı, Binboğa Bal) kariyer/freelance vitrini olarak hizmet edecek kişisel web sitesi. Projelerini sergilemek, kariyer hikayesini anlatmak ve iletişim kanallarını sunmak.

## Araştırma Özeti (kaynak: GitHub gokayybaz, LinkedIn)

- **Kariyer:** IT Teknisyeni (Kavukluca Bilgi Teknolojileri, ~2022–2024) → React Staj 2024 (reactstaj.com) → IT Specialist & Full-Stack Developer, Binboğa Bal (Tem 2024–)
- **Eğitim:** Çukurova Üniversitesi, Bilgisayar Programcılığı (Ön Lisans)
- **Stack:** TypeScript/JavaScript, React, Next.js, Node.js, PostgreSQL, Prisma, Go (öğreniyor), Proxmox VE, Docker, Dokploy, WireGuard, FortiGate
- **Öne çıkan projeler:**
  - **bazntms** — Ağ trafiği izleme sistemi (Go, eBPF, 5.000 agent, SIEM entegrasyonları) — bayrak gemisi
  - **Binboğa e-ticaret** — solo full-stack: Next.js + Prisma + PostgreSQL + QNBpay + DİA ERP + DHL + Dokploy + WireGuard
  - **baz-eshop** — e-ticaret (React, Redux, Tailwind) — canlı: baz-e-shop.netlify.app
  - **baz_valorant_app** — Valorant rehber uygulaması (React + Vite)
  - **filmgezegeni** — film uygulaması (React + Vite)
- **İletişim:** gokaybaz2000@gmail.com · github.com/gokayybaz · linkedin.com/in/gokayybaz · X: @gokayybaz1 · Medium: @gokaybaz2000

## Teknoloji

| Katman | Seçim | Gerekçe |
|---|---|---|
| Build | Vite + React 19 + TypeScript | Kullanıcı isteği |
| Styling | Tailwind CSS v4 | Hızlı, tutarlı |
| Routing | React Router v7, `HashRouter` | Proje detay sayfaları; lokal/statik ortamda 404 önleme |
| i18n | Basit context + `src/data/` içindeki dictionary'ler | i18n kütüphanesi YAGNI; TR/EN toggle, localStorage'da saklanır |
| Animasyon | IntersectionObserver tabanlı hafif fade/slide | Ağır animasyon kütüphanesi YAGNI |
| Hero efekti | Canvas tabanlı ince network/particle grafiği | Ağ/infra kimliğine gönderme |
| Test | Vitest + @testing-library/react | Smoke/render testleri |

## Görsel Kimlik: "Terminal/Infra"

- **Zemin:** koyu antrasit (#0a0e14 civarı), metin kirli-beyaz (#e6e1d5 sıcak tonu)
- **Vurgu:** terminal yeşili (#4ade80) + ikincil amber
- **Tipografi:** Space Grotesk (başlıklar) + JetBrains Mono (kod, etiketler, aksanlar)
- **Doku:** ince grid çizgileri, terminal prompt aksanları (`$`, `~/gokaybaz`), status noktaları
- Refined, kart-depo klonu değil: bol boşluk, güçlü tipografik hiyerarşi

## Sayfa Yapısı

### `/` — Ana vitrin (tek sayfa, scroll)

1. **Header (sabit):** logo/path aksanı (`~/gokaybaz`), bölüm linkleri, TR/EN toggle, status göstergesi
2. **Hero:** büyük monospace isim, unvan (TR/EN), `$ whoami` terminal prompt animasyonu, canvas network efekti, sosyal ikonlar (GitHub, LinkedIn, X, Email)
3. **Hakkımda:** "derine inme" hikayesi (IT → React → Full-Stack → Go/sistemler); yanda tech-stack etiketleri
4. **Projeler:** kart grid'i; bazntms geniş öne çıkan kart. Her kart: isim, açıklama, stack etiketleri, GitHub/demo linkleri, detay sayfasına link (`/project/:slug`)
5. **Deneyim:** dikey timeline — Kavukluca → React Staj 2024 → Binboğa Bal (alt maddeler: e-ticaret, ITMS, Proxmox migrasyonu)
6. **Blog:** "coming soon" yer tutucu + Medium linki
7. **İletişim/Footer:** email, sosyal linkler, "built with Vite + React" imzası

### `/project/:slug` — Proje detay sayfası

- Geniş açıklama (TR/EN), teknik kararlar/öne çıkanlar, stack etiketleri, GitHub/demo linkleri
- "Diğer projelere dön" navigasyonu
- Bilinmeyen slug → 404 benzeri yönlendirme ana sayfaya

## Veri

`src/data/content.ts` — tüm içerik TR/EN dictionary olarak tek dosyada:

```ts
interface Project {
  slug: string
  title: string
  description: { tr: string; en: string }
  detail?: { tr: string; en: string }      // detay sayfası geniş metni
  highlights?: { tr: string[]; en: string[] }
  stack: string[]
  github?: string
  demo?: string
  featured?: boolean
}
```

İçerik güncellemesi tek yerden yapılır. Proje detayları (bazntms, Binboğa e-ticaret) araştırmadan taslak olarak doldurulur, kullanıcı sonra düzenler.

## Test

- Vitest: LanguageContext, ProjectDetail yönlendirme (bilinmeyen slug), smoke render testleri
- `npm run build` her task sonunda doğrulanır

## Kapsam Dışı (YAGNI)

- Gerçek blog (sadece yer tutucu)
- CMS/backend — içerik statik
- Analytics, SEO/GEO meta (temel meta tag'ler hariç)
- Deploy (kullanıcı "şimdilik lokal" dedi)
