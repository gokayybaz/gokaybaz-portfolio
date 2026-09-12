export type Lang = 'tr' | 'en'
export type Dict = { tr: string; en: string }
export type Bi = { tr: string[]; en: string[] }

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
  avatarCandidates: ['/profile.png', '/profile.jpg', '/profile.jpeg', '/profile.webp'],
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
    points: {
      tr: ['Farklı ihtiyaçlara göre web arayüzleri ve uygulamalar geliştirerek yazılım deneyimimi gerçek teslimlerle oluşturdum.', 'React ve JavaScript ekosisteminde kullanıcı deneyimi, veri akışı ve uygulama geliştirme sorumluluğu aldım.'],
      en: ['Built web interfaces and applications for different needs, developing my software experience through real deliveries.', 'Worked across user experience, data flow and application development in the React and JavaScript ecosystem.'],
    },
  },
  {
    period: { tr: '2018 – 2022', en: '2018 – 2022' },
    company: 'Kavukluca Bilgi Teknolojileri · Kozan / Adana',
    role: { tr: 'IT Teknisyeni', en: 'IT Technician' },
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

export interface ContentDocument {
  site: SiteContent
  profile: Dict
  aboutTags: string[]
  skillGroups: SkillGroup[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}

export const defaultContent: ContentDocument = {
  site,
  profile,
  aboutTags,
  skillGroups,
  projects,
  experience,
  education,
}
