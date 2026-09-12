export type Lang = 'tr' | 'en'
export type Dict = { tr: string; en: string }
export type Bi = { tr: string[]; en: string[] }

export interface SeoFields {
  title: Dict
  description: Dict
  excerpt: Dict
  updatedAt: string
  noindex?: boolean
}

export interface ExpertisePage {
  slug: string
  title: Dict
  summary: Dict
  body: Dict
  seo: SeoFields
  relatedProjectSlugs: string[]
  relatedArticleSlugs: string[]
  updatedAt: string
}

export interface Article {
  slug: string
  title: Dict
  excerpt: Dict
  body: Dict
  category: Dict
  keywords: Bi
  seo: SeoFields
  publishedAt: string
  updatedAt: string
  relatedProjectSlugs: string[]
}

export interface SiteContent {
  name: string
  avatarCandidates: string[]
  location: Dict
  availability: Dict
  phone: string
  title: Dict
  subtitle: Dict
  socials: Socials
}

export interface Socials {
  github: string
  linkedin: string
  x: string
  email: string
  phone: string
  medium: string
}

export interface Project {
  slug: string
  title: Dict
  period: Dict
  description: Dict
  detail?: Dict
  highlights?: Bi
  stack: string[]
  github?: string
  demo?: string
  featured?: boolean
  metric?: Dict
  image?: string
}

export interface Experience {
  period: Dict
  company: string
  role: Dict
  summary?: Dict
  highlights?: Bi
  details?: Bi
  points: Bi
}

export interface SkillGroup {
  title: Dict
  items: string[]
}

export interface Education {
  institution: string
  program: Dict
  period: string
  status?: Dict
}

export const site: SiteContent = {
  name: 'Gökay Baz',
  avatarCandidates: ['/profile.webp', '/profile.png', '/profile.jpg', '/profile.jpeg'],
  location: { tr: 'Adana, Türkiye', en: 'Adana, Türkiye' } as Dict,
  availability: {
    tr: "Relocation'a açık · hibrit ve uzaktan çalışmaya uygun",
    en: 'Open to relocation · available for hybrid and remote work',
  } as Dict,
  phone: 'tel:+905445085479',
  title: {
    tr: 'BT Altyapı & Yazılım Uzmanı',
    en: 'IT Infrastructure & Software Specialist',
  } as Dict,
  subtitle: {
    tr: 'IT/OT Sistemleri · Full-Stack · ERP Entegrasyonu',
    en: 'IT/OT Systems · Full-Stack · ERP Integration',
  } as Dict,
  socials: {
    github: 'https://github.com/gokayybaz',
    linkedin: 'https://www.linkedin.com/in/gokayybaz/',
    x: 'https://x.com/gokayybaz1',
    email: 'mailto:gokaybaz2000@gmail.com',
    phone: 'tel:+905445085479',
    medium: 'https://medium.com/@gokaybaz2000',
  } as Socials,
}

export const profile: Dict = {
  tr: `Üretim yapan bir şirketin günlük işlerinin aksamadan devam etmesi için gereken altyapıyı kuruyor, işletiyor ve bu altyapının üzerinde çalışan yazılımları geliştiriyorum. Amacım yalnızca sistemi çalışır durumda tutmak değil; ekiplerin daha hızlı bilgiye ulaşmasını, operasyonu daha kolay takip etmesini ve tekrar eden işleri azaltmasını sağlamak.

## Nasıl çalışıyorum?

Altyapı, yazılım ve operasyonu ayrı başlıklar olarak değil, aynı problemin parçaları olarak ele alıyorum. Bir ihtiyacı önce sahadaki gerçek akışı anlayarak tanımlıyor, ardından güvenilir bir altyapı ve kullanılabilir bir uygulama ile çözüyorum. Üretim takibi, e-ticaret, ERP bağlantıları ve kurum içi araçlarda uçtan uca sorumluluk aldım.

Adana'da yaşıyorum; Türkiye genelinde yer değişikliğine ve hibrit/uzaktan çalışma modellerine açığım.`,
  en: `I build and operate the infrastructure that keeps a manufacturing business running, while also developing the software that works on top of it. My goal is not only to keep systems online; it is to help teams find information faster, follow operations more easily and reduce repetitive work.

## How I work

I see infrastructure, software and operations as parts of the same problem rather than separate disciplines. I start by understanding the real workflow on the ground, then solve it with reliable infrastructure and usable software. I have taken end-to-end responsibility for production monitoring, e-commerce, ERP connections and internal business tools.

I am based in Adana, Türkiye and open to relocation, hybrid and remote work.`,
}

export const about = profile

export const aboutTags: string[] = [
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'TimescaleDB',
  'Modbus TCP/RTU',
  'ERP API',
  'Proxmox VE',
  'FortiGate',
  'WireGuard',
  'Docker',
  'React',
  'Expo',
]

export const skillGroups: SkillGroup[] = [
  {
    title: { tr: 'Sunucu & sanallaştırma', en: 'Servers & virtualization' },
    items: ['Proxmox VE (KVM)', 'HP ProLiant / iLO', 'Windows Server', 'Active Directory', 'DHCP', 'DNS', 'Linux', 'LXC'],
  },
  {
    title: { tr: 'Ağ & güvenlik', en: 'Networking & security' },
    items: ['FortiGate', 'MultiWAN', 'SSL VPN', 'Ruijie Cloud Pro', 'Ubiquiti PtP', 'WireGuard', 'VLAN', 'UFW', 'SNMP'],
  },
  {
    title: { tr: 'Yedekleme & DR', en: 'Backup & disaster recovery' },
    items: ['Synology ABB', 'ZyXEL NAS', 'Acronis Cyber Protect Cloud', 'DR planning', 'DR drills'],
  },
  {
    title: { tr: 'OT & endüstriyel', en: 'OT & industrial' },
    items: ['Modbus TCP/RTU', 'IP gateways', 'HMI/PLC data collection', 'Industrial sensors', 'PDKS integration'],
  },
  {
    title: { tr: 'Backend', en: 'Backend' },
    items: ['Node.js', 'Express', 'Next.js API Routes', 'REST API design', 'Microservices', 'Cron / job queues'],
  },
  {
    title: { tr: 'Frontend & mobil', en: 'Frontend & mobile' },
    items: ['React', 'Next.js', 'TailwindCSS', 'shadcn/ui', 'Expo (Android)', 'Responsive UI'],
  },
  {
    title: { tr: 'Veri', en: 'Data' },
    items: ['PostgreSQL', 'TimescaleDB', 'Prisma', 'MongoDB / Mongoose', 'MSSQL', 'Reporting'],
  },
  {
    title: { tr: 'Operasyon', en: 'Operations' },
    items: ['Docker', 'Dokploy', 'Cloud VDS', 'Log / monitoring', 'Telegram alerts', 'Amazon SES'],
  },
  {
    title: { tr: 'Kurumsal uygulama & yönetişim', en: 'Enterprise & governance' },
    items: ['Dia ERP', 'Office 365 / Exchange / Purview', 'NetGSM', 'ISO 27001', 'ITSM', 'RBAC', 'Audit logs'],
  },
]

export const projects: Project[] = [
  {
    slug: 'factory-portal',
    title: { tr: 'Fabrika İç Portalı', en: 'Factory Internal Portal' },
    period: { tr: '2026 – devam', en: '2026 – ongoing' },
    featured: true,
    metric: { tr: '10 aktif kullanıcı · 4 departman', en: '10 active users · 4 departments' },
    description: {
      tr: 'Üretim, kalite, stok ve saha ekiplerinin aynı bilgiye ulaşmasını sağlayan; fabrikanın günlük operasyonunu tek yerde toplayan iç platform.',
      en: 'An internal platform that brings production, quality, stock and field operations together so teams can work from the same information.',
    },
    detail: {
      tr: `## Problem

Üretim, kalite ve saha süreçleri farklı araçlarda ilerlediğinde ekiplerin aynı resmi görmesi zorlaşıyordu. Veriye ulaşmak, formları takip etmek ve üretim sonuçlarını karşılaştırmak zaman alıyordu.

## Ne yaptım?

Üretim verilerini, hammadde girişini, kalite kontrollerini, personel takibini ve saha tablet kullanımını tek portalda birleştirdim. Böylece ekipler günlük operasyonu farklı sistemler arasında kaybolmadan takip edebiliyor.

## Sonuç

- Üretim ve kalite bilgileri tek panelde görünür hale geldi
- Hammadde ve üretim kayıtları daha düzenli takip edilebildi
- Kalite formları dijitalleşti ve gerektiğinde PDF olarak alınabilir oldu
- Saha ekipleri fotoğraf ve video destekli tablet uygulaması kullanabiliyor

## Teknik yaklaşım

Sensör ve makine verileri Modbus TCP/IP ve PLC/HMI bağlantılarıyla toplandı. Veriler TimescaleDB üzerinde zaman serisi olarak saklandı; ERP senkronizasyonu, PDKS, QR kodlu hammadde girişi ve Expo tablet uygulaması aynı platformda birleştirildi.`,
      en: `## The problem

When production, quality and field workflows live in separate tools, teams struggle to see the same picture. Finding data, following forms and comparing production results took too much time.

## What I built

I brought production data, raw-material intake, quality checks, attendance tracking and field tablet workflows into one portal. Teams can now follow daily operations without moving between disconnected systems.

## The result

- Production and quality information became visible in one place
- Raw-material and production records became easier to follow
- Quality forms became digital and can be exported as PDFs when needed
- Field teams can use a photo- and video-enabled tablet application

## Technical approach

Sensor and machine data is collected through Modbus TCP/IP and PLC/HMI connections. Data is stored as time series in TimescaleDB, while ERP synchronization, PDKS, QR-based raw-material intake and the Expo tablet app share the same platform.`,
    },
    highlights: {
      tr: [
        'Modbus TCP/IP ve PLC/HMI ingest servisleri',
        'TimescaleDB üzerinde zaman serisi üretim verisi',
        'QR hammadde girişi, ERP üretim emri ve fire raporlaması',
        'AcroForm + JSONB kalite formları ve anlık PDF render',
        'PDKS, lot/seri izlenebilirliği ve Expo saha uygulaması',
      ],
      en: [
        'Modbus TCP/IP and PLC/HMI ingest services',
        'Time-series production data on TimescaleDB',
        'QR raw-material intake, ERP production orders and waste reporting',
        'AcroForm + JSONB quality forms with on-demand PDF rendering',
        'PDKS, lot/serial traceability and Expo field application',
      ],
    },
    stack: ['Next.js', 'Node.js', 'Monorepo', 'PostgreSQL', 'TimescaleDB', 'Modbus TCP', 'Expo', 'RBAC'],
  },
  {
    slug: 'binoga-ecommerce',
    title: { tr: 'Kurumsal E-Ticaret Platformu', en: 'Corporate E-commerce Platform' },
    period: { tr: '2026 – devam', en: '2026 – ongoing' },
    featured: true,
    demo: 'https://shop.binbogabal.com.tr',
    metric: { tr: 'Aylık ~100 sipariş · 30 ürün / 20 varyant', en: '~100 monthly orders · 30 products / 20 variants' },
    description: {
      tr: 'Binboğa Bal için müşterilerin kolayca alışveriş yapabildiği, siparişten operasyona kadar şirketin günlük satış sürecini destekleyen e-ticaret platformu.',
      en: 'An e-commerce platform for Binboğa Bal that makes shopping simple for customers and supports the company from order to fulfillment.',
    },
    detail: {
      tr: `## Problem

Şirketin online satış kanalının müşteriye güven veren, kullanımı kolay ve operasyon ekibinin yönetebileceği bir yapıya ihtiyacı vardı.

## Ne yaptım?

Ürünleri keşfetme, sepet, üyelik, ödeme, kargo ve sipariş takibini baştan sona tasarlayıp geliştirdim. Ekip için ürün, stok, sipariş, kampanya ve içerik yönetimini tek panelde topladım.

## Sonuç

- Müşteriler ürünleri inceleyip güvenli şekilde sipariş verebiliyor
- Ekip ürün ve sipariş operasyonunu tek panelden yönetebiliyor
- Stok ve sipariş bilgileri şirket içindeki sistemlerle eşleşiyor
- SEO ve içerik güncellemeleri kod değişikliği gerektirmeden yapılabiliyor

## Teknik yaklaşım

Platform Next.js, PostgreSQL ve Prisma ile geliştirildi. QNB Pay ödeme, ERP ile çift yönlü ürün/stok/sipariş senkronizasyonu, RBAC, 2FA, audit log ve Telegram bildirimleri uygulamanın operasyonel temelini oluşturuyor.`,
      en: `## The problem

The company needed an online sales channel that felt trustworthy to customers, was easy to use and could be managed by the operations team.

## What I built

I designed and built the full journey from product discovery and cart to membership, payment, shipping and order tracking. I brought product, stock, order, campaign and content management into one panel for the team.

## The result

- Customers can browse products and place orders securely
- The team can manage product and order operations from one panel
- Stock and order information stays aligned with internal systems
- SEO and content updates no longer require code changes

## Technical approach

The platform was built with Next.js, PostgreSQL and Prisma. QNB Pay payments, bidirectional ERP synchronization for products/stock/orders, RBAC, 2FA, audit logs and Telegram alerts form its operational foundation.`,
    },
    highlights: {
      tr: [
        'QNB Pay Client-to-Bank ödeme entegrasyonu',
        'Ürün, stok ve siparişlerde çift yönlü ERP senkronizasyonu',
        'Koşul-aksiyon kampanya motorlu yönetim paneli',
        'SEO/GEO, sitemap, llms.txt ve AI optimizasyon kuyruğu',
        'RBAC, 2FA, audit log, risk ve Telegram uyarıları',
      ],
      en: [
        'QNB Pay Client-to-Bank payment integration',
        'Bidirectional ERP synchronization for products, stock and orders',
        'Admin panel with a condition-action campaign engine',
        'SEO/GEO, sitemap, llms.txt and AI optimization queue',
        'RBAC, 2FA, audit logs, risk and Telegram alerts',
      ],
    },
    stack: ['Next.js', 'Server Actions', 'PostgreSQL', 'Prisma', 'Amazon SES', 'Dokploy', 'WireGuard'],
  },
  {
    slug: 'erp-proxy-api',
    title: { tr: 'ERP Proxy API', en: 'ERP Proxy API' },
    period: { tr: '2026', en: '2026' },
    metric: { tr: 'Yıllık ~5.000 USD ek lisans maliyeti kaldırıldı', en: 'Removed ~5,000 USD in annual extra license cost' },
    description: {
      tr: 'Farklı iç uygulamaların şirket verilerine güvenli ve tutarlı şekilde ulaşmasını sağlayan ortak ERP bağlantı katmanı.',
      en: 'A shared ERP connection layer that lets internal applications access company data securely and consistently.',
    },
    detail: {
      tr: `## Problem

ERP sistemi tek bir servis kullanıcısıyla sınırlı erişim sunuyordu. Birden fazla iç uygulamanın aynı veriye güvenli ve tutarlı biçimde ulaşması gerekiyordu.

## Ne yaptım?

İç uygulamalar ile ERP arasında ortak bir bağlantı katmanı oluşturdum. Bu katman oturum yönetimini, veri dönüşümlerini ve geçici bağlantı sorunlarında tekrar denemeleri merkezi olarak yönetiyor.

## Sonuç

- Birden fazla uygulama ERP'ye ortak bir yapı üzerinden bağlanabiliyor
- Projeler arasında veri formatı ve erişim davranışı tutarlı hale geldi
- ERP erişimi tek tek uygulamalara dağılmadı

## Teknik yaklaşım

Node.js tabanlı servis; merkezi oturum, endpoint dönüşümü, retry mekanizmaları ve WireGuard üzerinden izole erişim sağlıyor. Lot, iş emri, personel ve stok verileri iç portal ile periyodik olarak eşleştiriliyor.`,
      en: `## The problem

The ERP system exposed limited access through a single service user. Multiple internal applications needed to reach the same data securely and consistently.

## What I built

I created a shared connection layer between internal applications and the ERP. It centrally manages sessions, data transformations and retries when temporary connection problems occur.

## The result

- Multiple applications can connect through one consistent interface
- Data formats and access behavior became consistent across projects
- ERP access no longer had to be duplicated inside every application

## Technical approach

The Node.js service provides centralized sessions, endpoint transformation, retry mechanisms and isolated access over WireGuard. Lot, work-order, employee and stock data is synchronized with the internal portal periodically.`,
    },
    highlights: {
      tr: ['Tek servis kullanıcısıyla çoklu proje erişimi', 'ERP endpoint dönüşüm katmanı', 'Retry ve process koruma mekanizmaları', 'WireGuard üzerinden izole ERP erişimi'],
      en: ['Multi-project access through one service user', 'ERP endpoint transformation layer', 'Retry and process protection mechanisms', 'Isolated ERP access over WireGuard'],
    },
    stack: ['Node.js', 'Proxmox LXC', 'Dia ERP API', 'WireGuard'],
  },
  {
    slug: 'it-management-system',
    title: { tr: 'Bilgi İşlem Yönetim Sistemi', en: 'IT Management System' },
    period: { tr: '2026 – devam', en: '2026 – ongoing' },
    metric: { tr: '6 cihaz · 10 servis tek panelden izleniyor', en: '6 devices · 10 services monitored from one panel' },
    description: {
      tr: 'BT ekibinin altyapı durumunu, cihazlarını ve personel süreçlerini tek ekrandan takip etmesini sağlayan operasyon paneli.',
      en: 'An operations panel that gives the IT team one place to follow infrastructure health, devices and employee processes.',
    },
    detail: {
      tr: `## Problem

Yedekleme, ağ cihazları, güvenlik duvarı, kameralar ve envanter farklı ekranlardan takip ediliyordu. Sorunları erken görmek ve cihaz/personel kayıtlarına ulaşmak gereğinden fazla zaman alıyordu.

## Ne yaptım?

Altyapı sağlığını, cihaz durumunu, kamera erişimini, envanteri ve personel zimmetlerini tek operasyon panelinde topladım.

## Sonuç

- BT ekibi kritik servisleri tek panelden izleyebiliyor
- Cihaz ve personel zimmetleri daha düzenli takip ediliyor
- Yedekleme, ağ ve kamera sorunları daha hızlı fark ediliyor
- Resmî zimmet belgeleri otomatik üretilebiliyor

## Teknik yaklaşım

Panel farklı üreticilerin API'lerinden veri topluyor; API sunmayan cihazlar için SNMP, erişilebilirlik kontrolü için ICMP/TCP ve kamera izleme için RTSP kullanıyor. Envanter ve personel modülleri Next.js, Node.js ve MongoDB tabanlı servislerle çalışıyor.`,
      en: `## The problem

Backups, network devices, firewalls, cameras and inventory were followed from separate screens. Detecting problems early and finding device or employee records took more time than it should.

## What I built

I brought infrastructure health, device status, camera access, inventory and employee assignments into one operations panel.

## The result

- The IT team can monitor critical services from one place
- Device and employee assignments are easier to track
- Backup, network and camera issues are noticed sooner
- Official assignment documents can be generated automatically

## Technical approach

The panel collects data from vendor APIs, uses SNMP for devices without APIs, ICMP/TCP for availability checks and RTSP for camera viewing. Inventory and employee modules run on Next.js, Node.js and MongoDB-based services.`,
    },
    highlights: {
      tr: ['Acronis, Synology, Ruijie, FortiGate ve CCTV API entegrasyonları', 'SNMP, ICMP/TCP ve RTSP servisleri', 'Envanter, personel ve dijital zimmet süreçleri', 'NextAuth ile korunan mikroservis tabanlı panel'],
      en: ['Acronis, Synology, Ruijie, FortiGate and CCTV API integrations', 'SNMP, ICMP/TCP and RTSP services', 'Inventory, employee and digital asset-assignment flows', 'Microservice-based panel protected with NextAuth'],
    },
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Next.js', 'NextAuth', 'SNMP', 'ICMP', 'RTSP'],
  },
  {
    slug: 'bazntms',
    title: { tr: 'bazNTMS', en: 'bazNTMS' },
    period: { tr: '2026', en: '2026' },
    featured: true,
    github: 'https://github.com/gokayybaz/bazntms',
    demo: 'https://gokayybaz.github.io/bazntms/',
    metric: { tr: 'v1.3.0 · 5.000 agent kapasitesi · MIT', en: 'v1.3.0 · capacity for 5,000 agents · MIT' },
    description: {
      tr: 'Ekiplerin ağda neler olduğunu görmesini, sorunları daha hızlı bulmasını ve güvenlik kayıtlarını düzenli tutmasını sağlayan ağ görünürlük platformu.',
      en: 'A network visibility platform that helps teams understand traffic, find problems faster and keep security records organized.',
    },
    detail: {
      tr: `## Problem

Ağdaki trafiği, servisleri ve güvenlik kayıtlarını farklı araçlarla takip etmek; sorunların kaynağını bulmayı ve geçmişi incelemeyi zorlaştırıyordu.

## Ne yaptım?

Tek bir kurulumla ağ trafiğini görünür hale getiren, ekiplerin olayları incelemesine ve düzenli rapor üretmesine yardımcı olan self-hosted bir platform geliştirdim.

## Sonuç

- Ağ trafiği ve servis davranışı daha anlaşılır hale geldi
- Sorun araştırmaları için daha fazla bağlam sağlandı
- Güvenlik ve denetim kayıtları düzenli tutulabiliyor
- Platform tek makineden binlerce cihaza kadar büyüyebiliyor

## Teknik yaklaşım

Go ve React tabanlı platform; eBPF, ETW, pcap/Npcap, NetFlow, IPFIX, sFlow, SNMPv3 ve syslog gibi kaynakları bir araya getiriyor. mTLS, RBAC, OIDC SSO, hash-zincirli audit log, SIEM bağlantıları, 5651 uyumlu zaman damgalı delil paketleri ve TimescaleDB ölçeklemesi teknik kapsamın parçaları.`,
      en: `## The problem

Following network traffic, services and security records through separate tools made it harder to find the source of problems and review history.

## What I built

I built a self-hosted platform that makes network traffic visible through one installation and helps teams investigate events and produce regular reports.

## The result

- Network traffic and service behavior became easier to understand
- Investigations gained more useful context
- Security and audit records can be kept consistently
- The platform can grow from one machine to thousands of devices

## Technical approach

The Go and React platform brings together eBPF, ETW, pcap/Npcap, NetFlow, IPFIX, sFlow, SNMPv3 and syslog sources. mTLS, RBAC, OIDC SSO, hash-chained audit logs, SIEM connectors, 5651-compliant timestamped evidence packages and TimescaleDB scaling form its technical scope.`,
    },
    highlights: {
      tr: [
        'Tek binary ile tek node veya 5.000 agent ölçeği',
        'eBPF, ETW, pcap/Npcap süreç atıflı paket yakalama',
        'NetFlow, IPFIX, sFlow, SNMPv3, syslog ve FortiGate REST',
        'mTLS, RBAC, OIDC SSO ve hash-zincirli audit log',
        '5651, RFC 3161, ISO 27001 ve SIEM entegrasyonları',
        'Anomali tespiti, PDF/SLA raporları ve opt-in AI analiz',
      ],
      en: [
        'One binary from a single node to 5,000-agent scale',
        'Process-attributed packet capture with eBPF, ETW and pcap/Npcap',
        'NetFlow, IPFIX, sFlow, SNMPv3, syslog and FortiGate REST',
        'mTLS, RBAC, OIDC SSO and hash-chained audit logs',
        '5651, RFC 3161, ISO 27001 and SIEM integrations',
        'Anomaly detection, PDF/SLA reports and opt-in AI analysis',
      ],
    },
    stack: ['Go', 'React', 'SQLite', 'PostgreSQL', 'TimescaleDB', 'NATS', 'eBPF', 'Docker', 'Helm'],
  },
]

export const experience: Experience[] = [
  {
    period: { tr: '2024 – devam', en: '2024 – present' },
    company: 'S.S. 745 Sayılı Kozan Bal Tarım Satış Kooperatifi (Binboğa Bal) · Kozan / Adana',
    role: { tr: 'BT Uzmanı · Tek Kişilik BT Birimi', en: 'IT Specialist · One-person IT team' },
    summary: {
      tr: 'Üretim tesisinin ağ ve sistem altyapısını uçtan uca yönetiyor; ekiplerin günlük operasyonunu kolaylaştıran sistemler geliştiriyorum.',
      en: 'I manage the manufacturing site\'s network, servers, security and business systems end to end, while building tools that make daily operations easier for teams.',
    },
    highlights: {
      tr: [
        'Üretim tesisinin BT altyapısını tek kişilik BT birimi olarak yönettim',
        'Yedekleme, güvenlik ve felaket kurtarma süreçlerini kurup test ettim',
        'Üretim ve ERP süreçlerinin dijitalleşmesine öncülük ettim',
      ],
      en: [
        'Ran the manufacturing site\'s IT infrastructure as a one-person IT team',
        'Built and tested backup, security and disaster-recovery processes',
        'Led the digitalization of production and ERP workflows',
      ],
    },
    details: {
      tr: [
        'Üretim tesisinin ağ ve internet erişimini kesintisiz çalışacak şekilde yönettim; güvenlik duvarı, MultiWAN, VPN ve kablosuz omurgayı birlikte işlettim.',
        'Sunucu altyapısını sanallaştırarak yeni servislerin daha hızlı ve kontrollü devreye alınmasını sağladım; Proxmox VE, HP ProLiant ve iLO kullandım.',
        'Yedekleme ve felaket kurtarma süreçlerini kurdum; düzenli tatbikatlarla kritik verilerin geri döndürülebilirliğini test ettim.',
        'Üretim makineleri, sensörler ve personel takip sistemlerinin altyapıya güvenli şekilde bağlanmasını sağladım; OT ağ segmentasyonu ve PDKS kurulumlarını yönettim.',
        '64 kameralı ve yaklaşık 150 TB kayıt kapasiteli CCTV altyapısının kurulum ve işletim sorumluluğunu taşıdım.',
        'ERP, Office 365, iletişim ve kullanıcı servislerinin günlük teknik operasyonunu tek kişilik BT birimi olarak yürüttüm.',
        'ISO 27001 uyumu, veri standardizasyonu ve ekip içinde devredilebilir teknik dokümantasyon için süreçler oluşturdum.',
      ],
      en: [
        'Kept the manufacturing site\'s network and internet access reliable by operating its firewall, MultiWAN, VPN and wireless backbone together.',
        'Virtualized the server infrastructure so new services could be deployed faster and more safely, using Proxmox VE, HP ProLiant and iLO.',
        'Built backup and disaster-recovery processes, then tested recoverability of critical data through recurring drills.',
        'Connected production machines, sensors and attendance systems to the infrastructure securely, including OT segmentation and PDKS deployment.',
        'Owned the operation of a CCTV environment with 64 cameras and approximately 150 TB of recording capacity.',
        'Ran the day-to-day technical operations of ERP, Office 365, communications and user services as a one-person IT team.',
        'Established processes for ISO 27001 alignment, data standardization and technical documentation that can be handed over to others.',
      ],
    },
    points: {
      tr: [
        'Üretim tesisinin ağ ve internet erişimini kesintisiz çalışacak şekilde yönettim; güvenlik duvarı, MultiWAN, VPN ve kablosuz omurgayı birlikte işlettim.',
        'Sunucu altyapısını sanallaştırarak yeni servislerin daha hızlı ve kontrollü devreye alınmasını sağladım; Proxmox VE, HP ProLiant ve iLO kullandım.',
        'Yedekleme ve felaket kurtarma süreçlerini kurdum; düzenli tatbikatlarla kritik verilerin geri döndürülebilirliğini test ettim.',
        'Üretim makineleri, sensörler ve personel takip sistemlerinin altyapıya güvenli şekilde bağlanmasını sağladım; OT ağ segmentasyonu ve PDKS kurulumlarını yönettim.',
        '64 kameralı ve yaklaşık 150 TB kayıt kapasiteli CCTV altyapısının kurulum ve işletim sorumluluğunu taşıdım.',
        'ERP, Office 365, iletişim ve kullanıcı servislerinin günlük teknik operasyonunu tek kişilik BT birimi olarak yürüttüm.',
        'ISO 27001 uyumu, veri standardizasyonu ve ekip içinde devredilebilir teknik dokümantasyon için süreçler oluşturdum.',
      ],
      en: [
        'Kept the manufacturing site\'s network and internet access reliable by operating its firewall, MultiWAN, VPN and wireless backbone together.',
        'Virtualized the server infrastructure so new services could be deployed faster and more safely, using Proxmox VE, HP ProLiant and iLO.',
        'Built backup and disaster-recovery processes, then tested recoverability of critical data through recurring drills.',
        'Connected production machines, sensors and attendance systems to the infrastructure securely, including OT segmentation and PDKS deployment.',
        'Owned the operation of a CCTV environment with 64 cameras and approximately 150 TB of recording capacity.',
        'Ran the day-to-day technical operations of ERP, Office 365, communications and user services as a one-person IT team.',
        'Established processes for ISO 27001 alignment, data standardization and technical documentation that can be handed over to others.',
      ],
    },
  },
  {
    period: { tr: '2020 – 2023', en: '2020 – 2023' },
    company: 'Bağımsız / proje bazlı',
    role: { tr: 'Freelance Web Geliştirici', en: 'Freelance Web Developer' },
    summary: {
      tr: 'Farklı ihtiyaçlara göre web uygulamaları geliştirerek yazılım deneyimimi gerçek proje teslimleriyle oluşturdum.',
      en: 'Built web applications for different needs and developed my software experience through real project deliveries.',
    },
    highlights: {
      tr: ['Gerçek müşteriler ve proje teslimleriyle yazılım pratiği kazandım', 'React ve JavaScript ile kullanılabilir web uygulamaları geliştirdim'],
      en: ['Built software practice through real clients and project deliveries', 'Created usable web applications with React and JavaScript'],
    },
    details: {
      tr: ['Farklı ihtiyaçlara göre web arayüzleri ve uygulamalar geliştirerek yazılım deneyimimi gerçek teslimlerle oluşturdum.', 'React ve JavaScript ekosisteminde kullanıcı deneyimi, veri akışı ve uygulama geliştirme sorumluluğu aldım.'],
      en: ['Built web interfaces and applications for different needs, developing my software experience through real deliveries.', 'Worked across user experience, data flow and application development in the React and JavaScript ecosystem.'],
    },
    points: {
      tr: ['Farklı ihtiyaçlara göre web arayüzleri ve uygulamalar geliştirerek yazılım deneyimimi gerçek teslimlerle oluşturdum.', 'React ve JavaScript ekosisteminde kullanıcı deneyimi, veri akışı ve uygulama geliştirme sorumluluğu aldım.'],
      en: ['Built web interfaces and applications for different needs, developing my software experience through real deliveries.', 'Worked across user experience, data flow and application development in the React and JavaScript ecosystem.'],
    },
  },
  {
    period: { tr: '2018 – 2022', en: '2018 – 2022' },
    company: 'Kavukluca Bilgi Teknolojileri · Kozan / Adana',
    role: { tr: 'IT Teknisyeni', en: 'IT Technician' },
    summary: {
      tr: 'Sahada farklı sektörlerin ağ, güvenlik ve cihaz ihtiyaçlarını çözerek altyapı pratiğimi geliştirdim.',
      en: 'Built my infrastructure practice by solving network, security and device needs for different industries on site.',
    },
    highlights: {
      tr: ['Kurumsal ağ ve CCTV kurulumlarını sahada yönettim', 'Farklı sektörlerin altyapı ihtiyaçlarına hızlı çözümler ürettim'],
      en: ['Managed enterprise network and CCTV installations on site', 'Delivered practical infrastructure solutions across different industries'],
    },
    details: {
      tr: ['Kurumsal müşterilerde ağ altyapılarını kurarak cihazların güvenilir şekilde iletişim kurmasını sağladım.', 'CCTV sistemlerinin montaj, kablolama ve devreye alma süreçlerini yönettim.', 'PC-POS, market/kafe otomasyonu, barkod okuyucu, yazıcı ve yedekleme sistemlerini sahada kurdum.', 'Farklı sektörlerin ihtiyaçlarına hızlı adapte olarak sorunları yerinde analiz edip çözüme ulaştırdım.'],
      en: ['Built network infrastructure for enterprise customers so their devices could communicate reliably.', 'Managed installation, cabling and commissioning of CCTV systems.', 'Installed PC-POS, retail/cafe automation, barcode readers, printers and backup systems on site.', 'Adapted quickly to different industries by analyzing issues on site and turning them into practical solutions.'],
    },
    points: {
      tr: [
        'Kurumsal müşterilerde ağ altyapılarını kurarak cihazların güvenilir şekilde iletişim kurmasını sağladım.',
        'CCTV sistemlerinin montaj, kablolama ve devreye alma süreçlerini yönettim.',
        'PC-POS, market/kafe otomasyonu, barkod okuyucu, yazıcı ve yedekleme sistemlerini sahada kurdum.',
        'Farklı sektörlerin ihtiyaçlarına hızlı adapte olarak sorunları yerinde analiz edip çözüme ulaştırdım.',
      ],
      en: [
        'Built network infrastructure for enterprise customers so their devices could communicate reliably.',
        'Managed installation, cabling and commissioning of CCTV systems.',
        'Installed PC-POS, retail/cafe automation, barcode readers, printers and backup systems on site.',
        'Adapted quickly to different industries by analyzing issues on site and turning them into practical solutions.',
      ],
    },
  },
]

export const education: Education[] = [
  {
    institution: 'Çukurova Üniversitesi',
    program: { tr: 'Adana MYO · Bilgisayar Programcılığı (Uzaktan Öğretim)', en: 'Adana Vocational School · Computer Programming (Distance Education)' },
    period: '2023 – 2025',
    status: { tr: 'Mezun', en: 'Graduated' },
  },
  {
    institution: 'Kozan Şehit Arda Can Mesleki ve Teknik Anadolu Lisesi',
    program: { tr: 'Güvenlik Sistemleri', en: 'Security Systems' },
    period: '2018 – 2022',
  },
]

export const expertisePages: ExpertisePage[] = [
  {
    slug: 'bt-altyapi',
    title: { tr: 'BT Altyapı ve Sistem Yönetimi', en: 'IT Infrastructure and Systems Management' },
    summary: {
      tr: 'Üretim ortamlarında ağ, sunucu, sanallaştırma, güvenlik, yedekleme ve kullanıcı servislerini birlikte yöneten uzmanlık alanım.',
      en: 'My practice combines network, server, virtualization, security, backup and user-service operations in manufacturing environments.',
    },
    body: {
      tr: `Bir üretim tesisinde BT altyapısı yalnızca sunucuların ve ağ cihazlarının çalışmasından ibaret değildir. Üretim, kalite, depo, muhasebe ve saha ekiplerinin ihtiyaç duyduğu bilgiye zamanında ulaşabilmesi; ağın, sunucuların, güvenliğin, yedeklemenin ve iş uygulamalarının birlikte işletilmesini gerektirir. Ben bu alanları ayrı operasyonlar olarak değil, üretimin devamlılığını destekleyen tek bir sistem olarak ele alıyorum.

## Kapsam

Sunucu sanallaştırma, Active Directory, DNS, DHCP, güvenlik duvarı, MultiWAN, VPN, kablosuz ağ, yedekleme, felaket kurtarma ve CCTV gibi alanlarda uçtan uca sorumluluk aldım. Proxmox VE ve HP ProLiant altyapısı üzerinde servisleri izole ederek yeni uygulamaların daha kontrollü devreye alınmasını sağladım. FortiGate, WireGuard, VLAN ve SNMP gibi teknolojileri de operasyonel ihtiyaçla birlikte değerlendiriyorum.

## Nasıl çalışıyorum?

Önce kritik servisleri ve bağımlılıklarını görünür hale getiriyorum. Daha sonra erişim yetkilerini, yedekleme kapsamını, izleme sinyallerini ve arıza halinde izlenecek yolu belirliyorum. Yedek almayı yeterli kabul etmiyor; geri dönüş süresini ve kritik verinin gerçekten kurtarılabildiğini tatbikatlarla test etmeye çalışıyorum. Küçük ekiplerde dokümantasyon ve devredilebilir süreçler de teknik altyapı kadar önemli.

## Gerçek proje kanıtı

Binboğa Bal üretim tesisinde ağ ve internet erişimi, sanallaştırılmış sunucular, yedekleme, VPN, CCTV ve kurum içi servislerin günlük işletiminden sorumluyum. Ayrıca Bilgi İşlem Yönetim Sistemi ile Acronis, Synology, Ruijie, FortiGate ve CCTV kaynaklarını tek operasyon panelinde görünür hale getirdim. Bu yaklaşım, sorunları kullanıcı şikâyeti gelmeden fark etmeyi ve cihaz/personel kayıtlarına daha hızlı ulaşmayı kolaylaştırıyor.

## Ne zaman tercih edilir?

Bir kurumda altyapı ile iş uygulamaları farklı kişiler veya tedarikçiler arasında parçalanmışsa, yalnızca yeni cihaz almak çoğu zaman yeterli olmaz. Önceliklerin, risklerin ve işletim sorumluluğunun tek bir resimde birleştirilmesi gerekir. Benim katkım, altyapıyı yazılım ve günlük operasyonla birlikte düşünerek ölçülebilir, sürdürülebilir ve gerektiğinde devredilebilir bir yapı kurmaktır.`,
      en: `IT infrastructure in a manufacturing site is more than keeping servers and network devices online. Production, quality, warehouse, finance and field teams need reliable access to information, which requires network, server, security, backup and business applications to be operated as one system. I treat these areas as parts of operational continuity rather than isolated tasks.

## Scope

I have taken end-to-end responsibility for server virtualization, Active Directory, DNS, DHCP, firewalls, MultiWAN, VPN, wireless networks, backup, disaster recovery and CCTV. I used Proxmox VE and HP ProLiant infrastructure to isolate services and deploy new applications in a controlled way. FortiGate, WireGuard, VLAN and SNMP are evaluated against operational needs instead of being treated as isolated technologies.

## How I work

I start by making critical services and dependencies visible. Then I define access boundaries, backup coverage, monitoring signals and the path to follow during an incident. A backup is not enough on its own; recoverability and recovery time need to be tested through drills. In small teams, documentation and handover-ready processes are as important as the infrastructure itself.

## Evidence from real work

At the Binboğa Bal manufacturing site, I own day-to-day operations for network and internet access, virtualized servers, backup, VPN, CCTV and internal services. I also brought Acronis, Synology, Ruijie, FortiGate and CCTV signals into one IT management panel. This makes it easier to detect issues before user complaints and find device or employee records quickly.

## When this approach helps

When infrastructure and business applications are split between people or vendors, buying another device rarely solves the core problem. Risks, priorities and operational ownership need to be seen together. My contribution is to connect infrastructure, software and daily operations into a measurable, sustainable and handover-ready system.`,
    },
    seo: {
      title: { tr: 'BT Altyapı ve Sistem Uzmanı | Gökay Baz', en: 'IT Infrastructure Specialist | Gökay Baz' },
      description: {
        tr: 'Üretim ortamlarında ağ, sunucu, sanallaştırma, güvenlik, yedekleme ve sistem işletimi deneyimi.',
        en: 'Experience operating networks, servers, virtualization, security, backup and business systems in manufacturing environments.',
      },
      excerpt: {
        tr: 'Üretim tesislerinde güvenilir ve sürdürülebilir BT altyapıları kuruyor ve işletiyorum.',
        en: 'I build and operate reliable, sustainable IT infrastructure for manufacturing sites.',
      },
      updatedAt: '2026-09-12',
    },
    relatedProjectSlugs: ['it-management-system', 'erp-proxy-api'],
    relatedArticleSlugs: [
      'uretim-tesisinde-bt-altyapisi-yonetmek',
      'proxmox-ile-kucuk-ekiplerde-sunucu-yonetimi',
      'felaket-kurtarma-tatbikati-neden-gereklidir',
      'tek-kisilik-bt-biriminde-onceliklendirme',
    ],
    updatedAt: '2026-09-12',
  },
  {
    slug: 'it-ot-uretim-dijitallesmesi',
    title: { tr: 'IT/OT ve Üretim Dijitalleşmesi', en: 'IT/OT and Manufacturing Digitalization' },
    summary: {
      tr: 'Makine, sensör ve saha süreçlerinden gelen veriyi güvenli biçimde iş uygulamalarına taşıyan pratik üretim dijitalleşmesi yaklaşımı.',
      en: 'A practical approach to moving machine, sensor and field data safely into business applications.',
    },
    body: {
      tr: `Üretim dijitalleşmesi, sahadaki veriyi yalnızca bir dashboard üzerinde göstermekten daha geniş bir problemdir. Makine ve sensörlerden gelen verinin güvenilir toplanması, üretim akışıyla ilişkilendirilmesi, ERP ve kalite süreçlerine bağlanması ve farklı ekiplerin kullanabileceği bir arayüze dönüşmesi gerekir. IT ve OT arasındaki sınırı bu nedenle hem teknik hem de operasyonel bir konu olarak ele alıyorum.

## Kapsam

Modbus TCP/RTU, PLC/HMI bağlantıları, endüstriyel sensörler, IP gateway'ler, PDKS, QR kodlu hammadde girişi, lot/seri izlenebilirliği, kalite formları ve ERP üretim emirleri üzerinde çalıştım. Zaman serisi verileri için TimescaleDB, uygulama verileri için PostgreSQL ve saha kullanımı için Expo tabanlı tablet uygulamaları kullandım.

## Nasıl çalışıyorum?

İlk adımım teknik protokolü seçmek değil, sahadaki gerçek akışı anlamaktır. Hangi veri nerede üretiliyor, kim tarafından kontrol ediliyor, hangi durumda tekrar giriliyor ve karar sürecini nasıl etkiliyor sorularını netleştiriyorum. Ardından veri toplama, normalleştirme, saklama, yetkilendirme ve raporlama katmanlarını ayırıyorum. Bu ayrım, üretim sistemine yeni bir bağlantı eklerken mevcut operasyonu riske atmadan ilerlemeyi sağlıyor.

## Gerçek proje kanıtı

Fabrika İç Portalı projesinde üretim, kalite, stok, personel ve saha süreçlerini aynı platformda birleştirdim. Modbus TCP/IP ve PLC/HMI bağlantılarından gelen veriler zaman serisi olarak saklanıyor; ERP senkronizasyonu, PDKS, QR hammadde girişi, kalite formları ve PDF çıktıları aynı operasyon akışında buluşuyor. Bu yapının değerini yalnızca kullanılan teknoloji değil, ekiplerin aynı bilgi üzerinden çalışabilmesi oluşturuyor.

## Ne zaman tercih edilir?

Üretim verisi farklı dosyalarda, panolarda veya birbirinden kopuk uygulamalarda tutuluyorsa önce yeni bir uygulama yazmak yerine veri akışını haritalamak gerekir. Güvenlik, segmentasyon ve insan onayı gerektiren adımlar korunarak kademeli entegrasyon yapılmalıdır. Benim yaklaşımım, sahadaki ihtiyacı teknik gösterişin önüne koyan ve ölçülebilir bir operasyon çıktısına bağlanan dijitalleşmedir.`,
      en: `Manufacturing digitalization is more than displaying shop-floor data on a dashboard. Machine and sensor data must be collected reliably, connected to the production flow, integrated with ERP and quality processes, and turned into an interface that different teams can use. I treat the boundary between IT and OT as both a technical and an operational concern.

## Scope

I have worked with Modbus TCP/RTU, PLC/HMI connections, industrial sensors, IP gateways, PDKS, QR-based raw-material intake, lot and serial traceability, quality forms and ERP production orders. I used TimescaleDB for time-series data, PostgreSQL for application data and Expo-based tablet applications for field workflows.

## How I work

My first step is not choosing a protocol. It is understanding the real workflow: where data is produced, who validates it, where it is re-entered and how it affects decisions. I then separate collection, normalization, storage, authorization and reporting. This makes it possible to add new integrations without putting the existing operation at unnecessary risk.

## Evidence from real work

In the Factory Internal Portal, I brought production, quality, stock, attendance and field workflows into one platform. Data from Modbus TCP/IP and PLC/HMI connections is stored as time series, while ERP synchronization, PDKS, QR raw-material intake, quality forms and PDF output share one operational flow. The value comes from teams working from the same information, not only from the technology stack.

## When this approach helps

When production data lives in files, boards or disconnected applications, mapping the data flow should come before writing another application. Security, segmentation and human approval steps should remain intact while integration proceeds incrementally. My approach puts the real shop-floor need before technical novelty and connects digitalization to an operational result.`,
    },
    seo: {
      title: { tr: 'IT/OT ve Üretim Dijitalleşmesi | Gökay Baz', en: 'IT/OT and Manufacturing Digitalization | Gökay Baz' },
      description: {
        tr: 'Modbus, PLC/HMI, ERP, PDKS, kalite ve üretim verilerini birleştiren IT/OT deneyimi.',
        en: 'IT/OT experience connecting Modbus, PLC/HMI, ERP, attendance, quality and production data.',
      },
      excerpt: {
        tr: 'Saha verisini güvenli ve kullanılabilir iş akışlarına dönüştürüyorum.',
        en: 'I turn shop-floor data into secure, usable business workflows.',
      },
      updatedAt: '2026-09-12',
    },
    relatedProjectSlugs: ['factory-portal'],
    relatedArticleSlugs: ['it-ot-ayrimi-ve-uretimde-veri-akisi', 'modbus-ile-uretim-verisi-toplamak'],
    updatedAt: '2026-09-12',
  },
  {
    slug: 'devops-platform',
    title: { tr: 'DevOps ve Platform Mühendisliği', en: 'DevOps and Platform Engineering' },
    summary: {
      tr: 'Küçük ekiplerin güvenilir biçimde çalıştırabileceği self-hosted servis, entegrasyon ve gözlemlenebilirlik altyapıları.',
      en: 'Self-hosted services, integrations and observability foundations that small teams can operate reliably.',
    },
    body: {
      tr: `DevOps benim için yalnızca bir deployment aracı veya CI/CD hattı kurmak değildir. Bir servisin nasıl dağıtıldığı kadar nasıl izleneceği, hata verdiğinde nasıl toparlanacağı, erişimlerinin nasıl sınırlandırılacağı ve ekip içinde nasıl devredileceği de önemlidir. Özellikle küçük ekiplerde geliştirme ve işletim sorumluluğu birbirinden ayrılamadığı için platform kararlarını günlük operasyonla birlikte veriyorum.

## Kapsam

Docker, Proxmox LXC, WireGuard, cloud VDS, Dokploy, loglama, Telegram uyarıları, Amazon SES, RBAC, 2FA, audit log ve API entegrasyonlarıyla çalıştım. Node.js, Next.js, Express, Go, PostgreSQL, MongoDB ve TimescaleDB kullanan servislerin geliştirme ve işletim tarafında sorumluluk aldım.

## Nasıl çalışıyorum?

Önce servisin kritik iş akışını ve hata durumlarını tanımlarım. Ardından deployment, konfigürasyon, veri yedekleme, loglama, alarm ve erişim sınırlarını aynı tasarımın parçası olarak ele alırım. ERP gibi dış bağımlılığı olan sistemlerde timeout, retry, idempotency ve süreç koruması olmadan yalnızca mutlu senaryoyu çalıştırmak yeterli değildir.

## Gerçek proje kanıtı

ERP Proxy API, farklı iç uygulamaların tek bir ortak katman üzerinden ERP verilerine ulaşmasını sağlıyor. Merkezi oturum yönetimi, endpoint dönüşümü, retry mekanizmaları ve WireGuard üzerinden izole erişim ile aynı entegrasyon mantığının projeler arasında tekrar edilmesini önledim. bazNTMS projesinde ise mTLS, RBAC, audit log, SIEM bağlantıları ve tek makineden binlerce cihaza ölçeklenebilen bir platform yaklaşımı üzerinde çalıştım.

## Ne zaman tercih edilir?

Ekibin bir servisi yalnızca geliştiren değil, çalışır halde tutan kişi veya kişilerden oluşuyorsa platform standardizasyonu erken değer üretir. Bunun için her şeyi Kubernetes'e taşımak gerekmez; önce tekrarlanan operasyonları, erişim risklerini ve gözlemlenemeyen noktaları azaltmak gerekir. Benim yaklaşımım, mevcut ekibin gerçekten işletebileceği kadar basit ama büyümeye engel olmayacak kadar düzenli platformlar kurmaktır.`,
      en: `For me, DevOps is not only a deployment tool or a CI/CD pipeline. How a service is monitored, recovered, access-controlled and handed over matters as much as how it is deployed. In small teams, development and operations cannot be separated completely, so I make platform decisions together with daily operations.

## Scope

I have worked with Docker, Proxmox LXC, WireGuard, cloud VDS, Dokploy, logging, Telegram alerts, Amazon SES, RBAC, 2FA, audit logs and API integrations. I have owned both development and operation of services using Node.js, Next.js, Express, Go, PostgreSQL, MongoDB and TimescaleDB.

## How I work

I start by defining the critical workflow and failure modes. Deployment, configuration, backup, logging, alerting and access boundaries then become parts of the same design. For systems with external dependencies such as ERP, timeout, retry, idempotency and process protection are necessary; implementing only the happy path is not enough.

## Evidence from real work

The ERP Proxy API lets multiple internal applications reach ERP data through one shared layer. Central sessions, endpoint transformation, retry mechanisms and isolated WireGuard access prevent the same integration logic from being duplicated across projects. In bazNTMS, I worked on a platform approach with mTLS, RBAC, audit logs, SIEM connectors and scaling from one machine to thousands of agents.

## When this approach helps

Platform standardization creates value early when the same small team develops and operates services. Everything does not need to move to Kubernetes; the first goal is reducing repeated operations, access risk and blind spots. My approach is to build platforms simple enough for the current team to operate and structured enough to grow.`,
    },
    seo: {
      title: { tr: 'DevOps ve Platform Mühendisliği | Gökay Baz', en: 'DevOps and Platform Engineering | Gökay Baz' },
      description: {
        tr: 'Docker, LXC, WireGuard, gözlemlenebilirlik ve güvenilir API entegrasyonlarıyla platform deneyimi.',
        en: 'Platform experience with Docker, LXC, WireGuard, observability and resilient API integrations.',
      },
      excerpt: {
        tr: 'Küçük ekiplerin güvenle işletebileceği platformlar tasarlıyor ve geliştiriyorum.',
        en: 'I design and build platforms that small teams can operate with confidence.',
      },
      updatedAt: '2026-09-12',
    },
    relatedProjectSlugs: ['bazntms', 'erp-proxy-api', 'it-management-system'],
    relatedArticleSlugs: ['erp-entegrasyonunda-guvenilirlik', 'self-hosted-platform-tasariminda-guvenlik'],
    updatedAt: '2026-09-12',
  },
]

export const articles: Article[] = [
  {
    slug: 'uretim-tesisinde-bt-altyapisi-yonetmek',
    title: { tr: 'Üretim Tesisinde BT Altyapısı Yönetmek', en: 'Managing IT Infrastructure in a Manufacturing Site' },
    excerpt: {
      tr: 'Üretim tesisinde BT altyapısını yönetirken önceliği cihaz sayısına değil, operasyonun devamlılığına vermek gerekir.',
      en: 'Managing IT infrastructure in manufacturing starts with operational continuity rather than a device count.',
    },
    body: {
      tr: `Üretim tesisinde BT altyapısını yönetmenin kısa cevabı şudur: kritik iş akışlarını görünür hale getir, bağımlılıklarını belgele, erişimleri sınırla ve geri dönüşü test et. Ağ, sunucu, güvenlik, yedekleme ve kullanıcı desteği ayrı görevler gibi görünse de üretim durduğunda aynı operasyonun parçaları olarak etkilenir.

## Önceliklendirme

İlk olarak üretim emri, kalite kaydı, stok hareketi, iletişim ve kullanıcı erişimi gibi süreçlerin hangilerinin kritik olduğunu belirlemek gerekir. Ardından her sürecin hangi sunucuya, ağa, veritabanına veya dış servise bağlı olduğu çıkarılır. Bu çalışma, bir arıza sırasında kimin neyi kontrol edeceğini önceden görünür kılar.

Binboğa Bal tesisinde ağ ve internet erişimi, sanallaştırılmış servisler, yedekleme, VPN ve kurum içi uygulamaları birlikte işletiyorum. Buradaki sınırlama, tek kişilik BT biriminde kapasitenin sınırsız olmamasıdır; bu nedenle otomasyon, alarm ve devredilebilir dokümantasyon teknik tercihler kadar değerlidir.`,
      en: `The short answer is to make critical workflows visible, document dependencies, limit access and test recovery. Network, server, security, backup and user support may look like separate duties, but they affect the same operation when production stops.

## Prioritization

Start by identifying which workflows are critical: production orders, quality records, stock movements, communication and user access. Then map their dependencies on servers, networks, databases and external services. This makes it clear who checks what during an incident.

At Binboğa Bal, I operate network and internet access, virtualized services, backup, VPN and internal applications together. The limitation is that a one-person IT team has finite capacity, so automation, alerting and handover-ready documentation are as important as technical choices.`,
    },
    category: { tr: 'BT Altyapısı', en: 'IT Infrastructure' },
    keywords: { tr: ['BT altyapısı', 'sistem uzmanı', 'üretim tesisi'], en: ['IT infrastructure', 'systems specialist', 'manufacturing site'] },
    seo: {
      title: { tr: 'Üretim Tesisinde BT Altyapısı Yönetmek | Gökay Baz', en: 'Managing IT Infrastructure in Manufacturing | Gökay Baz' },
      description: { tr: 'Üretim ortamında ağ, sunucu, yedekleme ve güvenlik önceliklerini nasıl ele aldığımı anlatıyorum.', en: 'How I approach network, server, backup and security priorities in manufacturing environments.' },
      excerpt: { tr: 'Kritik iş akışlarını görünür kılarak altyapı sürekliliğini yönetmek.', en: 'Managing infrastructure continuity by making critical workflows visible.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['it-management-system'],
  },
  {
    slug: 'it-ot-ayrimi-ve-uretimde-veri-akisi',
    title: { tr: 'IT/OT Ayrımı ve Üretimde Veri Akışı', en: 'The IT/OT Boundary and Data Flow in Manufacturing' },
    excerpt: {
      tr: 'IT ve OT ayrımını anlamak, üretim verisini güvenli biçimde iş uygulamalarına bağlamanın ilk adımıdır.',
      en: 'Understanding the IT/OT boundary is the first step toward connecting production data to business applications safely.',
    },
    body: {
      tr: `IT/OT ayrımını yalnızca ofis ağı ve makine ağı olarak görmek eksik kalır. OT tarafında süreklilik, güvenli duruş, fiziksel süreç ve ekipman davranışı öne çıkar; IT tarafında ise kimlik, veri, uygulama ve raporlama yönetilir. İki taraf arasındaki veri akışı bu nedenle performans kadar güvenlik ve sorumluluk sınırları da düşünülerek tasarlanmalıdır.

## Pratik yaklaşım

Fabrika İç Portalı'nda üretim makineleri, sensörler, PDKS ve ERP süreçlerinden gelen bilgileri ortak bir operasyon akışına bağladım. Buradaki amaç makineyi doğrudan iş uygulamasına açmak değil; veri toplama, normalleştirme, yetkilendirme ve raporlama katmanlarını ayırmaktı. Hassas ağ ayrıntılarını paylaşmadan söylenebilecek kanıt, üretim ve kalite ekiplerinin aynı panelde aynı veriyi takip edebilmesidir.

Trade-off şudur: daha fazla gerçek zamanlı veri her zaman daha iyi karar anlamına gelmez. Önce hangi bilginin hangi kararı etkilediğini belirlemek, sonra gerekli sıklıkta ve güvenilirlikte veri taşımak gerekir.`,
      en: `The IT/OT boundary is more than an office network versus a machine network. OT emphasizes continuity, safe stopping, physical processes and equipment behavior; IT manages identity, data, applications and reporting. The connection between them must therefore consider security and ownership boundaries as well as performance.

## Practical approach

In the Factory Internal Portal, I connected production machines, sensors, attendance and ERP workflows into a shared operational flow. The goal was not to expose machines directly to business applications, but to separate collection, normalization, authorization and reporting. Without sharing sensitive topology, the practical result is that production and quality teams can follow the same information in one panel.

The trade-off is that more real-time data does not always create better decisions. First identify which information changes which decision, then move data at the required frequency and reliability.`,
    },
    category: { tr: 'IT/OT', en: 'IT/OT' },
    keywords: { tr: ['IT/OT', 'üretim dijitalleşmesi', 'endüstriyel IT'], en: ['IT/OT', 'manufacturing digitalization', 'industrial IT'] },
    seo: {
      title: { tr: 'IT/OT Ayrımı ve Üretimde Veri Akışı | Gökay Baz', en: 'The IT/OT Boundary in Manufacturing | Gökay Baz' },
      description: { tr: 'IT ve OT sistemleri arasında güvenli ve kullanılabilir veri akışı kurma yaklaşımım.', en: 'My approach to building safe and useful data flows between IT and OT systems.' },
      excerpt: { tr: 'Üretim verisini iş uygulamalarına bağlarken güvenlik ve sahiplik sınırları.', en: 'Security and ownership boundaries when connecting production data to business applications.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['factory-portal'],
  },
  {
    slug: 'modbus-ile-uretim-verisi-toplamak',
    title: { tr: 'Modbus ile Üretim Verisi Toplamak', en: 'Collecting Production Data with Modbus' },
    excerpt: {
      tr: 'Modbus verisini anlamlı üretim bilgisine dönüştürmek için protokol bağlantısından önce veri sözlüğü ve operasyon bağlamı gerekir.',
      en: 'Turning Modbus data into useful production information requires a data dictionary and operational context before protocol work.',
    },
    body: {
      tr: `Modbus TCP/RTU ile veri toplamak teknik olarak erişilebilir bir bağlantı kurmaktan ibaret değildir. Register değerinin neyi ifade ettiği, hangi birimde ölçüldüğü, ne sıklıkta güncellendiği ve üretim kaydıyla nasıl ilişkilendirileceği bilinmiyorsa elde edilen veri yalnızca sayılardan oluşur.

## Veri hattı

Fabrika İç Portalı'nda makine ve sensör verilerini toplarken bağlantı katmanını, normalleştirme katmanını ve zaman serisi saklamayı ayrı düşündüm. TimescaleDB kullanımı, zaman içinde değişen ölçümlerin sorgulanmasını kolaylaştırdı; ancak verinin iş anlamını üretim emri, lot, kalite veya vardiya bilgisiyle ilişkilendirmek yine uygulama katmanının sorumluluğunda kaldı.

Pratik sınırlama, sahadaki cihazların aynı isimlendirme ve kalite seviyesine sahip olmamasıdır. Bu nedenle bağlantı kesintisi, eksik değer, beklenmeyen sıçrama ve saat farkı gibi durumlar veri hattının normal parçaları olarak ele alınmalıdır.`,
      en: `Collecting data with Modbus TCP/RTU is not only about establishing a working connection. If the meaning, unit, update frequency and relation to production records are unknown, the result is just a set of numbers.

## The data path

In the Factory Internal Portal, I treated machine and sensor collection, normalization and time-series storage as separate layers. TimescaleDB made it easier to query changing measurements over time, but relating those measurements to production orders, lots, quality checks or shifts remained an application responsibility.

The practical limitation is that field devices rarely share the same naming and quality conventions. Connection loss, missing values, unexpected spikes and clock differences must therefore be treated as normal data-pipeline conditions rather than rare exceptions.`,
    },
    category: { tr: 'Üretim Verisi', en: 'Production Data' },
    keywords: { tr: ['Modbus', 'TimescaleDB', 'PLC verisi'], en: ['Modbus', 'TimescaleDB', 'PLC data'] },
    seo: {
      title: { tr: 'Modbus ile Üretim Verisi Toplamak | Gökay Baz', en: 'Collecting Production Data with Modbus | Gökay Baz' },
      description: { tr: 'Modbus verisini zaman serisi ve üretim bağlamıyla kullanılabilir hale getirme deneyimi.', en: 'Experience making Modbus data useful through time-series storage and production context.' },
      excerpt: { tr: 'Protokol bağlantısından iş anlamına uzanan üretim verisi hattı.', en: 'A production data path from protocol connection to business meaning.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['factory-portal'],
  },
  {
    slug: 'erp-entegrasyonunda-guvenilirlik',
    title: { tr: 'ERP Entegrasyonunda Güvenilirlik', en: 'Reliability in ERP Integrations' },
    excerpt: {
      tr: 'ERP entegrasyonlarında güvenilirlik, yalnızca endpoint çağırmak değil; oturum, tekrar deneme, veri dönüşümü ve süreç korumasını birlikte yönetmektir.',
      en: 'Reliable ERP integration combines sessions, retries, data transformation and process protection rather than merely calling endpoints.',
    },
    body: {
      tr: `Bir ERP entegrasyonu ilk başarılı API çağrısıyla tamamlanmış sayılmaz. Ağ kesintisi, oturum süresi, farklı veri formatları, aynı isteğin tekrar gönderilmesi ve dış sistemin geçici olarak yanıt vermemesi günlük işletimin parçasıdır. Bu durumlar tasarımın içine alınmazsa hata tek bir projede kalmaz, ona bağlı operasyonu da etkiler.

## Ortak bağlantı katmanı

ERP Proxy API projesinde iç uygulamalar ile ERP arasında ortak bir Node.js katmanı oluşturdum. Merkezi oturum yönetimi, endpoint dönüşümleri, retry mekanizmaları ve WireGuard üzerinden izole erişim bu katmanda toplandı. Böylece her uygulamanın ERP erişimini kendi içinde farklı biçimde çözmesi ve davranışların zamanla ayrışması engellendi.

Retry her işlem için otomatik uygulanmamalıdır. Veri yazan işlemlerde idempotency, timeout ve hangi hatanın tekrar denenebilir olduğu açıkça belirlenmelidir. Bu yaklaşımın sınırı, ERP'nin kendi davranışı ve dokümantasyon kalitesiyle sınırlı olmasıdır; proxy katmanı belirsiz bir dış sistemi tamamen güvenilir hale getiremez.`,
      en: `An ERP integration is not complete after the first successful API call. Network failures, session expiry, different data formats, duplicate requests and temporary unavailability are part of daily operations. If these cases are not designed for, a failure affects the business flow around the integration.

## A shared connection layer

In the ERP Proxy API, I built a shared Node.js layer between internal applications and the ERP. Central sessions, endpoint transformations, retry mechanisms and isolated WireGuard access live in this layer. Each application no longer needs to solve ERP access differently, and integration behavior stays consistent across projects.

Retries should not be automatic for every operation. Write operations need explicit idempotency, timeouts and retryable-error rules. The limitation is that a proxy cannot make an unclear external system completely reliable; its quality still depends on the ERP behavior and documentation.`,
    },
    category: { tr: 'Entegrasyon', en: 'Integration' },
    keywords: { tr: ['ERP entegrasyonu', 'Node.js', 'retry'], en: ['ERP integration', 'Node.js', 'retry'] },
    seo: {
      title: { tr: 'ERP Entegrasyonunda Güvenilirlik | Gökay Baz', en: 'Reliability in ERP Integrations | Gökay Baz' },
      description: { tr: 'ERP bağlantılarında merkezi oturum, veri dönüşümü, retry ve izole erişim yaklaşımı.', en: 'An approach to centralized sessions, transformation, retries and isolated access in ERP integrations.' },
      excerpt: { tr: 'ERP bağlantısını tekil uygulama kodundan ortak ve kontrollü bir katmana taşımak.', en: 'Moving ERP access from duplicated application code into one controlled layer.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['erp-proxy-api'],
  },
  {
    slug: 'proxmox-ile-kucuk-ekiplerde-sunucu-yonetimi',
    title: { tr: 'Proxmox ile Küçük Ekiplerde Sunucu Yönetimi', en: 'Server Management with Proxmox in Small Teams' },
    excerpt: {
      tr: 'Proxmox, küçük BT ekiplerinde sanallaştırma avantajı sağlar; ancak asıl değer servis sınırları, yedekleme ve geri dönüş planıyla ortaya çıkar.',
      en: 'Proxmox helps small IT teams through virtualization, but its real value comes from service boundaries, backup and recovery plans.',
    },
    body: {
      tr: `Küçük bir BT ekibinde fiziksel sunucu sayısını artırmak her zaman ölçeklenebilirlik anlamına gelmez. Proxmox VE ile servisleri sanal makine ve LXC sınırları içinde ayırmak, kaynakları daha kontrollü kullanmayı ve yeni bir servisi daha hızlı devreye almayı sağlar. Bunun karşılığında sanallaştırma katmanının kendisi kritik bir bağımlılığa dönüşür.

## Uygulama prensipleri

Servisleri önem, kaynak ihtiyacı ve kurtarma yöntemi bakımından grupluyorum. Yönetim arayüzü, veritabanı, API ve yardımcı servislerin aynı arıza alanına yığılmaması; ağ erişimlerinin sınırlandırılması; snapshot ile gerçek yedek arasındaki farkın bilinmesi gerekir. HP ProLiant, iLO ve Proxmox birlikte işletildiğinde donanım sağlığı ile servis sağlığını ayrı izlemek mümkün olur.

Bu yaklaşımın sınırlaması, tek fiziksel host arızasının birden fazla sanal servisi aynı anda etkileyebilmesidir. Bu yüzden yedekleme, başka bir hedefe kopyalama ve düzenli geri dönüş denemesi sanallaştırmanın ayrılmaz parçasıdır.`,
      en: `Adding more physical servers does not always mean scalability for a small IT team. Proxmox VE can isolate services in virtual machines and LXC containers, use resources more deliberately and speed up new deployments. The trade-off is that the virtualization layer itself becomes a critical dependency.

## Practical principles

I group services by importance, resource needs and recovery method. Management, databases, APIs and supporting services should not share the same failure domain unnecessarily. Network access must be limited, and the difference between a snapshot and a real backup must remain clear. HP ProLiant, iLO and Proxmox make it possible to observe hardware health and service health separately.

The limitation is that one physical host failure can affect multiple virtual services. Backups to another target and recurring recovery tests are therefore part of virtualization, not optional extras.`,
    },
    category: { tr: 'Sunucu ve Sanallaştırma', en: 'Servers and Virtualization' },
    keywords: { tr: ['Proxmox', 'LXC', 'sunucu yönetimi'], en: ['Proxmox', 'LXC', 'server management'] },
    seo: {
      title: { tr: 'Proxmox ile Sunucu Yönetimi | Gökay Baz', en: 'Server Management with Proxmox | Gökay Baz' },
      description: { tr: 'Küçük ekiplerde Proxmox, servis izolasyonu, yedekleme ve kurtarma yaklaşımı.', en: 'Proxmox, service isolation, backup and recovery for small IT teams.' },
      excerpt: { tr: 'Sanallaştırma kararını operasyon ve geri dönüş planıyla birlikte ele almak.', en: 'Making virtualization decisions together with operations and recovery planning.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['it-management-system'],
  },
  {
    slug: 'felaket-kurtarma-tatbikati-neden-gereklidir',
    title: { tr: 'Felaket Kurtarma Tatbikatı Neden Gereklidir?', en: 'Why Disaster Recovery Drills Matter' },
    excerpt: {
      tr: 'Yedekleme başarılı görünebilir; kritik olan, ihtiyaç anında verinin ve servislerin ne kadar sürede geri döndürülebildiğini bilmektir.',
      en: 'A backup may look successful; what matters is knowing how quickly data and services can actually be restored.',
    },
    body: {
      tr: `Felaket kurtarma planı bir dokümanda yazılı olduğu için hazır sayılmaz. Dosyanın nerede olduğu, hangi sırayla geri dönüleceği, kimlerin erişimi olduğu ve son yedeğin gerçekten okunabildiği test edilmedikçe plan varsayımdan ibarettir. Bu nedenle tatbikatı altyapı yönetiminin düzenli bir parçası olarak görüyorum.

## Tatbikatın kapsamı

Önce kritik servisleri ve kabul edilebilir kesinti süresini belirlemek gerekir. Sonra yedekten bir dosyanın, bir veritabanının ve mümkünse bağımlı bir uygulamanın geri dönmesi denenir. Sonuç yalnızca başarılı/başarısız şeklinde değil; geçen süre, eksik adımlar, erişim sorunları ve veri kaybı riskiyle kaydedilmelidir.

Üretim ortamında yedekleme ve felaket kurtarma süreçlerini kurup düzenli tatbikatlarla geri döndürülebilirliği test ettim. Sınırlama, gerçek bir tatbikatın üretimi etkileme riski taşımasıdır; bu yüzden kapsam, zaman ve izolasyon dikkatle seçilmelidir.`,
      en: `A disaster recovery plan is not ready just because it exists in a document. Unless the location of the backup, recovery order, access rights and readability of the latest copy are tested, the plan is only an assumption. I treat drills as a regular part of infrastructure operations.

## Drill scope

Start by identifying critical services and acceptable downtime. Then restore a file, a database and, where possible, an application with its dependencies. Record elapsed time, missing steps, access issues and data-loss risk instead of only marking the drill as pass or fail.

I built backup and disaster-recovery processes and tested recoverability through recurring drills in a manufacturing environment. The limitation is that a real drill can affect production, so scope, timing and isolation must be chosen carefully.`,
    },
    category: { tr: 'Felaket Kurtarma', en: 'Disaster Recovery' },
    keywords: { tr: ['yedekleme', 'felaket kurtarma', 'DR tatbikatı'], en: ['backup', 'disaster recovery', 'DR drill'] },
    seo: {
      title: { tr: 'Felaket Kurtarma Tatbikatı | Gökay Baz', en: 'Disaster Recovery Drills | Gökay Baz' },
      description: { tr: 'Yedekleme ve felaket kurtarma süreçlerinde geri dönüşü test etme yaklaşımı.', en: 'How I test recoverability in backup and disaster-recovery processes.' },
      excerpt: { tr: 'Yedek almak ile geri dönebilmek arasındaki farkı tatbikatla ölçmek.', en: 'Measuring the difference between taking a backup and being able to recover.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['it-management-system'],
  },
  {
    slug: 'self-hosted-platform-tasariminda-guvenlik',
    title: { tr: 'Self-Hosted Platform Tasarımında Güvenlik', en: 'Security in Self-Hosted Platform Design' },
    excerpt: {
      tr: 'Self-hosted bir platformda güvenlik tek bir ürün değil; kimlik, erişim, kayıt, ağ ve işletim kararlarının toplamıdır.',
      en: 'Security in a self-hosted platform is the sum of identity, access, audit, network and operational decisions.',
    },
    body: {
      tr: `Self-hosted platformlar kontrol ve esneklik sağlar, ancak işletim sorumluluğunu da doğrudan ekibe bırakır. Bu nedenle güvenlik tasarımını yalnızca dışarıdan erişimi kapatmak olarak görmüyorum. Kimlik doğrulama, rol sınırları, servisler arası güven, değişiklik kaydı, yedekleme ve olay inceleme imkânı birlikte düşünülmelidir.

## bazNTMS örneği

bazNTMS üzerinde mTLS, RBAC, OIDC SSO, hash-zincirli audit log, SIEM bağlantıları ve 5651 uyumlu delil paketleri gibi güvenlik katmanlarını platformun temel parçaları olarak ele aldım. Bu özellikler tek başına güvenlik garantisi değildir; doğru varsayılanlar, anahtar yönetimi, güncelleme süreci ve operasyon ekibinin bunları kullanabilmesi gerekir.

Trade-off, her kontrolün işletim maliyeti yaratmasıdır. Küçük bir ekip için anlaşılmayan veya düzenli işletilmeyen bir güvenlik kontrolü, kâğıt üzerinde güçlü görünse de gerçek olayda beklenen korumayı sağlamayabilir.`,
      en: `Self-hosted platforms provide control and flexibility, but they also put operational responsibility directly on the team. I do not treat security as simply blocking external access. Identity, role boundaries, service trust, change history, backups and incident investigation must be considered together.

## The bazNTMS example

In bazNTMS, I treated mTLS, RBAC, OIDC SSO, hash-chained audit logs, SIEM connectors and 5651-compliant evidence packages as core platform concerns. None of these features guarantees security by itself; safe defaults, key management, update procedures and operator adoption are also required.

The trade-off is that every control creates operating cost. A control that a small team cannot understand or operate may look strong on paper but fail to provide the expected protection during an incident.`,
    },
    category: { tr: 'Platform Güvenliği', en: 'Platform Security' },
    keywords: { tr: ['self-hosted', 'RBAC', 'mTLS', 'audit log'], en: ['self-hosted', 'RBAC', 'mTLS', 'audit log'] },
    seo: {
      title: { tr: 'Self-Hosted Platform Güvenliği | Gökay Baz', en: 'Self-Hosted Platform Security | Gökay Baz' },
      description: { tr: 'Self-hosted platformlarda kimlik, RBAC, mTLS, audit log ve işletim güvenliği.', en: 'Identity, RBAC, mTLS, audit logs and operational security in self-hosted platforms.' },
      excerpt: { tr: 'Platform güvenliğini ürün değil, işletilebilir katmanlar bütünü olarak ele almak.', en: 'Treating platform security as a set of operable layers rather than a product.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['bazntms'],
  },
  {
    slug: 'tek-kisilik-bt-biriminde-onceliklendirme',
    title: { tr: 'Tek Kişilik BT Biriminde Önceliklendirme', en: 'Prioritization in a One-Person IT Team' },
    excerpt: {
      tr: 'Tek kişilik BT biriminde her talebi aynı anda yapmak mümkün değildir; önceliklendirme risk, etki ve geri dönüş süresine dayanmalıdır.',
      en: 'A one-person IT team cannot do everything at once; prioritization should follow risk, impact and recovery time.',
    },
    body: {
      tr: `Tek kişilik BT biriminde günlük iş; kullanıcı desteği, ağ ve sunucu işletimi, güvenlik, yedekleme, tedarikçi koordinasyonu ve yeni yazılım geliştirme arasında bölünür. Önceliklendirme yapılmadığında acil görünen işler kritik ama sessiz risklerin önüne geçer. Ben talepleri yalnızca geliş sırasına göre değil, üretim etkisi ve geri dönüş süresine göre sıralıyorum.

## Çalışma çerçevesi

Bir talebi değerlendirirken üretimi durdurma ihtimali, veri kaybı riski, güvenlik etkisi, kaç kişiyi etkilediği ve geçici çözümün ne kadar sürdürülebileceği sorularını soruyorum. Sonra tekrar eden işleri otomasyon, alarm veya dokümantasyonla azaltmaya çalışıyorum. Böylece aynı problem için her seferinde manuel karar vermek gerekmiyor.

Bu yaklaşımın sınırı, tek kişiye bağımlılığın tamamen ortadan kalkmamasıdır. Bu nedenle teknik dokümantasyon, erişim kayıtları, yedek sorumluluklar ve devredilebilir süreçler yalnızca kurumsal olgunluk değil, günlük işin sürdürülebilirliği için de gereklidir.`,
      en: `Daily work in a one-person IT team is split between user support, network and server operations, security, backup, vendors and new software. Without prioritization, urgent-looking requests push quiet but critical risks aside. I prioritize by production impact and recovery time, not only by arrival order.

## A working framework

For each request, I ask whether it can stop production, cause data loss, create a security impact, affect multiple people or keep a workaround alive for how long. I then reduce repeated work through automation, alerting or documentation so the same decision does not need to be made manually every time.

The limitation is that single-person dependency cannot disappear completely. Technical documentation, access records, backup responsibilities and handover-ready processes are therefore necessary for daily sustainability, not only for organizational maturity.`,
    },
    category: { tr: 'Çalışma Yaklaşımı', en: 'Working Approach' },
    keywords: { tr: ['tek kişilik BT', 'BT operasyonu', 'önceliklendirme'], en: ['one-person IT', 'IT operations', 'prioritization'] },
    seo: {
      title: { tr: 'Tek Kişilik BT Biriminde Önceliklendirme | Gökay Baz', en: 'Prioritization in a One-Person IT Team | Gökay Baz' },
      description: { tr: 'Tek kişilik BT biriminde üretim etkisi, risk ve geri dönüş süresine göre çalışma yaklaşımı.', en: 'How I prioritize work by production impact, risk and recovery time in a one-person IT team.' },
      excerpt: { tr: 'BT taleplerini aciliyet yerine operasyonel etkiyle sıralamak.', en: 'Prioritizing IT work by operational impact instead of urgency alone.' },
      updatedAt: '2026-09-12',
    },
    publishedAt: '2026-09-12',
    updatedAt: '2026-09-12',
    relatedProjectSlugs: ['it-management-system', 'factory-portal'],
  },
]

export interface ContentDocument {
  site: SiteContent
  profile: Dict
  aboutTags: string[]
  skillGroups: SkillGroup[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  expertisePages: ExpertisePage[]
  articles: Article[]
}

export const defaultContent: ContentDocument = {
  site,
  profile,
  aboutTags,
  skillGroups,
  projects,
  experience,
  education,
  expertisePages,
  articles,
}
