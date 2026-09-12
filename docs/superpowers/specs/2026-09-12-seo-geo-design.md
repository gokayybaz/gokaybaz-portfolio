# Gökay Baz Kişisel SEO ve GEO Tasarımı

**Tarih:** 2026-09-12  
**Durum:** Tasarım onaylandı, uygulama planına hazır  
**Ana pazar:** Türkiye  
**Birincil hedef:** İşe alım yöneticilerinin Gökay Baz'ı bulması ve uzmanlığını hızlıca doğrulaması

## 1. Hedef ve Konumlandırma

Site, genel bir yazılım portföyü olarak değil, üretim ortamlarında altyapı, IT/OT ve operasyon yazılımlarını birlikte yöneten kişisel uzmanlık merkezi olarak konumlandırılacaktır.

Ana konumlandırma:

> Gökay Baz, üretim şirketlerinde BT altyapısını, IT/OT bağlantılarını ve operasyon yazılımlarını uçtan uca yöneten uzman.

Rol hiyerarşisi:

1. BT Altyapı / Sistem Uzmanı
2. IT/OT ve Üretim Dijitalleşmesi Uzmanı
3. DevOps / Platform Engineer

Kıdem ifadesi, beş yıllık uygulamalı deneyim ve tek kişilik BT birimi sorumluluğunu öne çıkaran **Uzman / tek kişilik BT sorumlusu** çerçevesinde kullanılacaktır. Genel veya kanıtlanamayan seniority iddialarından kaçınılacaktır.

Başarı ölçütü, yalnızca organik trafik artışı değildir. İşe alım yöneticisinin siteye geldikten sonra rolü, sorumluluk kapsamını, gerçek proje sonuçlarını ve iletişim yolunu kısa sürede anlayabilmesi temel başarı ölçütüdür.

## 2. Bilgi Mimarisi

Türkçe sürüm ana pazar nedeniyle kök URL'de yer alacaktır. İngilizce sürüm ayrı URL alanında tutulacaktır; dil yalnızca `localStorage` üzerinden değişmeyecektir.

Önerilen URL yapısı:

- `/` — Türkçe ana profil
- `/hakkimda` — çalışma yaklaşımı ve uzmanlık özeti
- `/deneyim` — görevler, sorumluluklar ve ölçülebilir sonuçlar
- `/projeler` — proje listesi
- `/projeler/fabrika-ic-portali` gibi — tekil proje vaka çalışmaları
- `/uzmanlik/bt-altyapi`
- `/uzmanlik/it-ot-uretim-dijitallesmesi`
- `/uzmanlik/devops-platform`
- `/yazilar` — içerik listesi
- `/yazilar/<slug>` — tekil rehber veya karar yazısı
- `/iletisim` — işe alım ve profesyonel iletişim
- `/en/...` — İngilizce karşılıklar

Her uzmanlık sayfası ilgili proje ve deneyim bölümlerine, her proje sayfası ise ilgili uzmanlık sayfasına ve iletişim yoluna bağlanacaktır. Böylece sayfalar yalnızca arama giriş noktaları değil, kişisel uzmanlık grafiğinin parçaları olacaktır.

Ana sayfanın önerilen arama sunumu:

- **Title:** `Gökay Baz | BT Altyapı ve Sistem Uzmanı`
- **H1:** `Üretim ortamları için BT altyapısı ve yazılım geliştiren uzman`
- İlk ekranda rol, Adana/Türkiye konumu, çalışma uygunluğu, CV ve LinkedIn bağlantısı
- İlk bölüm içinde mevcut görev, sorumluluk kapsamı, proje metrikleri ve üç ana uzmanlık alanı

## 3. Kişisel Entity Modeli

Site, Gökay Baz'ı tek ve doğrulanabilir bir profesyonel varlık olarak işleyecektir.

Entity ilişkileri:

- `Person`: isim, unvan, konum, meslek ve iletişim bilgileri
- `ProfilePage`: kişisel profil sayfası ile kişi ilişkisi
- `sameAs`: LinkedIn, GitHub, Medium ve X profilleri
- İş deneyimi, eğitim ve uzmanlık alanları
- Projeler ile kişi arasında `creator` veya `author` ilişkisi
- Site ile kişi arasında `WebSite` / `ProfilePage` ilişkisi

İsim, fotoğraf, unvan, kısa biyografi ve uzmanlık ifadeleri kişisel site, LinkedIn, GitHub ve Medium'da mümkün olduğunca tutarlı tutulacaktır. Amaç, Google ve üretken yapay zekâ sistemlerinin aynı kişiyi farklı profiller arasında doğru eşleştirmesidir.

## 4. Teknik SEO Tasarımı

### 4.1 İndekslenebilirlik ve URL'ler

- Her önemli sayfa için benzersiz `title`, meta description ve canonical üretilecektir.
- Türkçe ve İngilizce sayfalar `hreflang` ile ilişkilendirilecektir.
- `sitemap.xml` yalnızca canonical ve indekslenmesi istenen URL'leri içerecektir.
- `robots.txt`, admin ve API yollarını taramaya kapatacaktır.
- Bilinmeyen proje slug'ları tutarlı 404 davranışı veya kontrollü yönlendirme ile ele alınacaktır.
- Eski URL'ler yayınlandıktan sonra değiştirilmeyecek; değişmesi gerekirse 301 yönlendirme uygulanacaktır.

### 4.2 Sayfa anlamı ve yapılandırılmış veri

- Tek ve görünür H1, mantıklı H2/H3 hiyerarşisi
- Semantic `header`, `nav`, `main`, `section`, `article`, `footer` ve `address` kullanımı
- Ana profil için `Person` ve `ProfilePage`
- Site için `WebSite`
- İç navigasyon için `BreadcrumbList`
- Teknik yazılar için `Article`
- Uygun projeler için `CreativeWork` veya `SoftwareApplication`
- Schema içeriği, görünür sayfa içeriğiyle birebir tutarlı tutulacaktır

### 4.3 Görsel ve performans

- Görsellere anlamlı dosya isimleri ve açıklayıcı `alt` değerleri
- `width` ve `height` ile layout shift azaltma
- WebP/AVIF ve uygun boyutlandırma
- Katlama altındaki görsellerde lazy loading
- Google font yükleme maliyetinin ölçülmesi ve gerekirse self-hosting değerlendirmesi
- `NetworkCanvas` gibi dekoratif efektlerin düşük güçlü cihazlarda azaltılması
- Gereksiz JavaScript'in ve ilk yükleme maliyetinin ölçülmesi

### 4.4 Ölçüm ve doğrulama

- Google Search Console
- Bing Webmaster Tools
- Temel gizlilik uyumlu analitik
- Core Web Vitals ve mobil kullanılabilirlik takibi
- JSON-LD, sitemap, robots ve hreflang doğrulaması

## 5. GEO Tasarımı

GEO, arama veya AI sistemlerini manipüle etme çalışması olarak değil, güvenilir ve alıntılanabilir kaynak olma çalışması olarak uygulanacaktır.

İçerik kuralları:

- Uzmanlık sayfasının başında 40–60 kelimelik doğrudan tanım
- Her teknik içeriğin başında kısa cevap veya özet
- `sorun -> yaklaşım -> uygulama -> sonuç` akışı
- Metrik, tarih aralığı ve sorumluluk kapsamı
- Teknik terimin ilk kullanımında açık karşılığı; örneğin `Operational Technology (OT)`
- Kişisel deneyim, proje veya GitHub kanıtı ile desteklenemeyen iddialardan kaçınma
- Yazar biyografisi ve güncelleme tarihi
- Sayfa içinde açık kişi, şirket, proje, teknoloji ve sonuç ilişkileri
- Aynı uzmanlık anlatısının LinkedIn, GitHub ve Medium ile tutarlı olması

`llms.txt` ve benzeri makine-okunabilir özetler yardımcı katman olarak eklenebilir; indekslenebilir HTML, yapılandırılmış veri, özgün içerik ve dış doğrulama yerine geçmeyecektir.

Üretim sistemi, ağ topolojisi, güvenlik yapılandırması ve işverene ait hassas bilgiler yayınlanmadan önce anonimleştirilecektir.

## 6. İçerik Sistemi

### 6.1 Konu kümeleri

**BT altyapısı ve sistem yönetimi**

- Üretim tesisinde BT altyapısı yönetimi
- Proxmox, Windows/Linux sunucu ve yedekleme
- FortiGate, VPN, VLAN ve MultiWAN
- Felaket kurtarma planlama ve tatbikat
- Tek kişilik BT biriminde önceliklendirme

**IT/OT ve üretim dijitalleşmesi**

- IT/OT farkı ve üretim tesislerinde entegrasyon
- Modbus, PLC/HMI ve sensör verisi toplama
- TimescaleDB ile üretim verisi izleme
- ERP, PDKS, kalite ve stok süreçlerinin birleştirilmesi
- Üretim dijitalleşmesinde ağ segmentasyonu ve güvenlik

**DevOps / platform mühendisliği**

- Self-hosted platform tasarımı
- Docker, LXC, WireGuard ve deployment
- Loglama, gözlemlenebilirlik ve alarm yönetimi
- ERP entegrasyonlarında retry ve idempotency
- Küçük ekiplerde güvenilir yazılım işletimi

### 6.2 İlk içerik portföyü

- 5 proje vaka çalışması
- 3 uzmanlık landing page'i
- 8–12 teknik rehber
- 3 teknik karar yazısı
- 3 kariyer ve çalışma yaklaşımı yazısı

İlk dalga mevcut gerçek projelerden üretilecektir. Öncelikli vaka çalışmaları: Fabrika İç Portalı, ERP Proxy API, Bilgi İşlem Yönetim Sistemi ve bazNTMS.

### 6.3 Dönüşüm yolları

- İşe alım yöneticisi: ana sayfa -> deneyim -> CV / LinkedIn / iletişim
- Teknik değerlendirici: proje -> GitHub / teknik yazı
- Müşteri adayı: uzmanlık sayfası -> iletişim

Ana çağrı, işe alım önceliği nedeniyle `Pozisyonlar ve profesyonel iş birlikleri için iletişime geç` çerçevesinde olacaktır.

## 7. Ölçüm Modeli

Aylık izlenecek metrikler:

- `Gökay Baz` marka aramalarındaki gösterim ve tıklama
- `BT altyapı uzmanı`, `sistem uzmanı`, `IT/OT`, `üretim dijitalleşmesi`, `DevOps` sorguları
- Organik gösterim, tıklama, CTR ve ortalama pozisyon
- Ana sayfa, deneyim ve uzmanlık sayfalarına giriş
- CV indirme, LinkedIn tıklaması ve iletişim başlatma
- Proje vaka çalışması görüntülenmesi ve dış bağlantı tıklamaları
- LinkedIn, GitHub ve Medium ile isim/unvan tutarlılığı
- Aynı sorgularla aylık manuel AI görünürlük kontrolü

AI görünürlüğü için tek başına güvenilir bir genel sıralama metriği olmadığı için manuel sorgular; tarih, kullanılan sistem, verilen cevap ve kaynak gösterimi ile kayıt altına alınacaktır.

İçerik ritmi başlangıçta haftada çok sayıda içerik yerine ayda iki özgün, kanıtlı ve güncellenebilir içerik olacaktır.

## 8. Uygulama Sınırları

Bu tasarımın kapsamındadır:

- Kişisel marka ve bilgi mimarisi
- Teknik SEO altyapısı
- Yapılandırılmış veri ve entity bağlantıları
- Proje ve uzmanlık içerik sistemi
- GEO için makine-okunabilir ve alıntılanabilir içerik
- Search Console ve ölçüm altyapısı

Bu tasarımın kapsamı dışındadır:

- Garantili Google veya AI sıralaması
- Yapay zekâ tarafından yazılmış yüksek hacimli içerik üretimi
- Sahte backlink, keyword stuffing veya schema spam
- İşverene ait gizli operasyon verilerinin yayınlanması
- Kişisel sitenin genel bir iş ilanı veya ajans sitesine dönüştürülmesi

## 9. Aşamalı Başarı Kriterleri

**Aşama 1: Temel teknik erişilebilirlik**

- Canonical URL'ler, sitemap, robots ve metadata çalışır
- Türkçe/İngilizce URL ilişkisi doğrulanır
- Ana profil ve proje sayfaları taranabilir olur

**Aşama 2: Entity ve kanıt**

- Kişi ve profil schema'ları doğrulanır
- Deneyim ve proje sayfaları işe alım odaklı yeniden yapılandırılır
- LinkedIn/GitHub/Medium kimlik bağlantıları tutarlı hale gelir

**Aşama 3: Uzmanlık görünürlüğü**

- Üç uzmanlık sayfası yayınlanır
- İlk proje vaka çalışmaları ve teknik yazılar yayınlanır
- İç linkleme ve breadcrumb yapısı tamamlanır

**Aşama 4: Ölçüm ve iterasyon**

- Search Console ve analitik verisi düzenli incelenir
- İçerik sorgu/CTR/başvuru sinyaline göre güncellenir
- AI görünürlüğü için aylık manuel değerlendirme yapılır
