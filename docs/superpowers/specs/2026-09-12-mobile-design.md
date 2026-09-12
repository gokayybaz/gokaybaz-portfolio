# Mobil Tasarım Spec'i

**Tarih:** 2026-09-12
**Durum:** Onaylandı

## Amaç

Portfolyo sitesi ve admin panelinin mobil deneyimini kapsamlı şekilde iyileştirmek: tam ekran overlay menü, optimize hero, tek sütun akış, admin alt tab bar.

## Kararlar

- Kapsam: site + admin birlikte
- Mobil menü: tam ekran overlay (terminal estetiği)
- Hero: optimize (küçük avatar/isim, mobilde azaltılmış particle, reduced-motion desteği)
- Admin: alt tab bar + tam genişlik formlar
- Doğrulama: unit testler + manuel checklist (375/390/768px)

## 1. Header + Mobil Menü

- `md:` altında nav linkleri yerine hamburger butonu (`[ ≡ ]` mono estetik)
- Tam ekran overlay: büyük mono linkler, aktif bölüm vurgusu, TR/EN toggle, status göstergesi
- `Escape` ile kapanır, link tıklanınca bölüme scroll + kapanır, body scroll lock
- Erişilebilirlik: `aria-expanded`, `aria-label`, overlay `role="dialog"`

## 2. Hero

- Mobil: isim `text-4xl`, avatar `h-32 w-32`, dikey boşluklar daralır
- `NetworkCanvas`: mobilde particle sayısı ~%40 azalır (resize'da yeniden hesaplanır)
- `prefers-reduced-motion` varsa canvas animasyonu durur (statik ilk kare)
- Sosyal ikonlar wrap edebilir

## 3. Bölümler

- Tüm bölümler `py-24` → mobil `py-16`, `md:` üstünde eski değer
- Experience timeline `pl-8` → mobil `pl-5`, nokta konumu buna göre
- Footer email `text-2xl` mobilde, sosyal linkler wrap
- Proje kartları tek sütun; görsel `aspect-[16/9]` korunur

## 4. Admin Panel

- Yatay nav `md:` altında gizlenir; alt sabit tab bar (6 bölüm, ikon + label, aktif vurgulu), safe-area padding
- Kaydet butonu header'da kalır; toast mesajları alt tab üstünde
- `DictInput` TR/EN grid mobilde tek sütun
- Form alanları tam genişlik; Panel/details katlanır yapısı korunur

## 5. Genel

- Dokunma hedefleri min 44px
- `overflow-x` taşma kontrolü
- Mevcut Tailwind `sm`(640)/`md`(768) breakpoint'leri korunur

## Test

- Unit: hamburger menü (aç/kapa/Escape/link scroll), admin tab bar render
- `pnpm lint && pnpm test && pnpm build`
- Manuel checklist: iPhone SE 375px, iPhone 14 390px, iPad 768px

## Kapsam Dışı

- Playwright/visual regression
- Tablet için özel layout (768px mevcut davranış korunur)
- PWA/offline
