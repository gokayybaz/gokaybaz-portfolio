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
  tr: `Bir üretim tesisinin BT ve OT altyapısını tek başıma kurup işletiyor, aynı altyapının üzerinde çalışan yazılımları da uçtan uca geliştiriyorum. Sunucu sanallaştırma, kurumsal ağ ve güvenlik, yedekleme ve felaket kurtarma tarafında operasyonel sorumluluk taşırken; aynı sistemlerden Modbus ve API üzerinden veri toplayan, ERP ile senkron çalışan üretim izleme, e-ticaret ve iç portal uygulamalarını Next.js ve Node.js ile üretime aldım.

En güçlü olduğum alan, altyapı ile yazılım arasındaki sınırın kaybolduğu problemler: endüstriyel veri toplama, ERP entegrasyonu ve uçtan uca sistem izleme. Adana'da yaşıyorum; Türkiye genelinde yer değişikliğine ve hibrit/uzaktan çalışma modellerine açığım.`,
  en: `I independently build and operate the complete IT and OT infrastructure of a manufacturing facility, while also developing the software that runs on top of it end to end. I own operations across server virtualization, enterprise networking and security, backup and disaster recovery; and I have taken production monitoring, e-commerce and internal portal applications from the same systems to production using data collected over Modbus and APIs, with Next.js and Node.js.

My strongest area is where infrastructure and software meet: industrial data collection, ERP integration and end-to-end systems monitoring. I am based in Adana, Türkiye and open to relocation, hybrid and remote work.`,
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
      tr: 'Üretim dijitalleşme platformu: Modbus ve PLC verilerinden ERP senkronizasyonuna, kalite formlarından saha tablet uygulamasına kadar tek portal.',
      en: 'A production digitalization platform covering Modbus and PLC data, ERP synchronization, quality forms and a field tablet app in one portal.',
    },
    detail: {
      tr: 'Kazan ve ortam sensörlerinden Modbus TCP/IP gateway\'ler üzerinden, üretim hatlarındaki HMI\'lardan ise PLC verisi olarak periyodik veri toplayan ingest servisleri geliştirdim. Verileri TimescaleDB üzerinde saklayıp portalda zaman serisi olarak görselleştiriyorum. Hammadde girişini QR kod ile fişleştirerek ERP\'de doğrudan üretim emrine dönüşebilir hale getirdim; dolum hattı verisiyle oluşan üretim kayıtlarını ERP verisiyle karşılaştırarak son ürün fire raporlaması sağladım. Kalite kontrol formlarını AcroForm ile dijitalleştirdim; JSONB olarak saklanan formlar talep anında PDF olarak render ediliyor. PDKS entegrasyonu, lot/seri izlenebilirliği, fotoğraf/video destekli Expo tablet uygulaması ve ham Excel verisini yönetici raporuna dönüştüren otomasyonlar aynı platformda birleşiyor.',
      en: 'I built ingest services that periodically collect data from boiler and environmental sensors through Modbus TCP/IP gateways and from production-line HMIs as PLC data. The data is stored in TimescaleDB and visualized as time series in the portal. I turned raw-material intake into QR-based records that can become production orders in the ERP, and compare filling-line production records with ERP data for finished-product waste reporting. Quality forms are digitized with AcroForm, stored as JSONB and rendered to PDF on demand. PDKS integration, lot/serial traceability, a photo/video-enabled Expo tablet app and automation that turns raw Excel data into executive reports all live in the same platform.',
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
      tr: 'shop.binbogabal.com.tr: tasarımdan üretime, ödeme ve ERP entegrasyonuna kadar tek geliştirici tarafından kurulan e-ticaret platformu.',
      en: 'shop.binbogabal.com.tr: an e-commerce platform built by one developer from design to production, including payments and ERP integration.',
    },
    detail: {
      tr: 'Vitrin, sepet, misafir/üyelik akışı ve Client-to-Bank mimarili QNB Pay ödeme entegrasyonunu içeren sistemi sıfırdan geliştirdim. Ürün, kategori, sipariş, müşteri, kargo, kampanya/kupon, içerik ve sayfa yönetimini kapsayan; koşul-aksiyon mantığına sahip yönetim paneli oluşturdum. Ürün, stok ve siparişleri ERP ile çift yönlü senkronize ettim; e-posta bazlı cari kart eşleştirme ve otomatik cari kart oluşturma kurdum. Dinamik sitemap ve llms.txt, LLM bot erişim logları, meta yönetimi ve AI destekli optimizasyon kuyruğundan oluşan kod müdahalesiz SEO/GEO modülü ekledim. RBAC, 2FA, audit log, risk uyarıları ve Telegram bildirimleriyle sistemi operasyonel olarak izlenebilir hale getirdim.',
      en: 'I built the system from scratch with a storefront, cart, guest/member flows and a Client-to-Bank QNB Pay integration. The admin panel covers products, categories, orders, customers, shipping, campaigns/coupons, content and pages, with a condition-action campaign engine. Products, inventory and orders sync bidirectionally with the ERP, including email-based current-account matching and automatic account creation. I added a no-code SEO/GEO module with dynamic sitemaps and llms.txt, LLM bot access logs, meta management and an AI-assisted optimization queue. RBAC, 2FA, audit logs, risk alerts and Telegram notifications make operations traceable.',
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
      tr: 'Dia ERP API için merkezî oturum, endpoint dönüşümü ve birden fazla iç projeye güvenli erişim sağlayan entegrasyon katmanı.',
      en: 'An integration layer for Dia ERP API with centralized sessions, endpoint transformation and secure access for multiple internal projects.',
    },
    detail: {
      tr: 'Tek servis kullanıcısıyla sınırlı ERP API\'sini birden fazla iç projeye açmak için oturumu merkezî olarak yöneten ve istek başında otomatik login yapan bir proxy servisi tasarladım. ERP\'nin endpoint yapısını e-ticaret ve iç portalın ihtiyaçlarına göre endpoint sözleşmesine dönüştürdüm. Retry pattern ve süreç koruma mekanizmalarıyla Node process\'inin kesintisiz çalışmasını sağlıyor; lot listesi, iş emri, personel ve stok kartlarını periyodik olarak iç portal veritabanına aktarıyorum.',
      en: 'I designed a proxy service that centralizes the session for an ERP API limited to one service user, automatically logging in when a request starts so multiple internal projects can use it. I transform the ERP endpoint structure into contracts designed for the e-commerce platform and internal portal. Retry patterns and process safeguards keep the Node process running continuously while lot lists, work orders, employees and stock cards are periodically synchronized into the portal database.',
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
      tr: 'Yedekleme, ağ omurgası, güvenlik duvarı, CCTV, envanter ve personel süreçlerini tek panelde birleştiren iç platform.',
      en: 'An internal platform unifying backup, network, firewall, CCTV, inventory and employee operations in one panel.',
    },
    detail: {
      tr: 'Acronis Cyber Protect, Synology CGI, Ruijie Cloud Pro, FortiGate REST, Hikvision ve Dahua API\'lerinden veri toplayarak altyapı durumunu tek panelde birleştirdim. API\'si olmayan cihazlar için SNMP, erişilebilirlik için ICMP/TCP ping ve kamera canlı izleme için RTSP servisleri geliştirdim. Dış IP sorgusuyla FortiGate\'in aktif WAN çıkışını anlık izlenebilir hale getirdim. Envanter ve personel modülleriyle zimmet süreçlerini dijitalleştiriyor, AcroForm ile resmî zimmet evraklarını otomatik üretiyorum.',
      en: 'I unified infrastructure status in one panel by collecting data from Acronis Cyber Protect, Synology CGI, Ruijie Cloud Pro, FortiGate REST, Hikvision and Dahua APIs. I built SNMP for devices without APIs, ICMP/TCP ping for availability and RTSP for live camera viewing. An external IP lookup makes the active FortiGate WAN exit visible in real time. Inventory and employee modules digitize asset assignment, with official assignment documents generated automatically through AcroForm.',
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
      tr: 'Paket seviyesinde izleme, akış toplama ve 5651 uyumlu imzalı logları tek binary ile sunan ağ trafiği izleme platformu.',
      en: 'A network traffic monitoring platform for packet-level visibility, flow collection and 5651-compliant signed logs in one binary.',
    },
    detail: {
      tr: 'bazNTMS, tek makineden 5.000 agent\'a kadar büyüyen self-hosted bir ağ görünürlük platformu. Linux\'ta eBPF, Windows\'ta ETW ve pcap/Npcap ile süreç atıflı paket yakalama; NetFlow v5/v9, IPFIX ve sFlow toplama; SNMPv3, syslog ve FortiGate REST entegrasyonu sunuyor. Agent-hub iletişimi mTLS ile korunuyor; RBAC, OIDC SSO, hash-zincirli append-only audit log, Splunk/QRadar/ServiceNow/ArcSight konektörleri ve 5651 uyumlu RFC 3161 zaman damgalı delil paketleri bulunuyor. SQLite\'tan PostgreSQL + TimescaleDB\'ye geçiş, NATS JetStream ingest hattı, Helm ölçekleme, anomali tespiti, PDF raporlar ve opt-in çoklu sağlayıcı AI analiz katmanı aynı platformda.',
      en: 'bazNTMS is a self-hosted network visibility platform that grows from one machine to 5,000 agents. It provides process-attributed packet capture with eBPF on Linux, ETW on Windows and pcap/Npcap; NetFlow v5/v9, IPFIX and sFlow collection; plus SNMPv3, syslog and FortiGate REST integrations. Agent-hub communication is protected with mTLS, alongside RBAC, OIDC SSO, hash-chained append-only audit logs, Splunk/QRadar/ServiceNow/ArcSight connectors and 5651-compliant RFC 3161 timestamped evidence packages. SQLite-to-PostgreSQL/TimescaleDB migration, NATS JetStream ingest, Helm scaling, anomaly detection, PDF reports and opt-in multi-provider AI analysis are part of the same platform.',
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
        'FortiGate güvenlik duvarı, MultiWAN, SSL VPN; Ruijie LAN/WLAN omurgası ve Ubiquiti PtP bağlantıları',
        'HP ProLiant üzerinde Proxmox VE KVM sanallaştırma; HP iLO ile uzaktan donanım yönetimi',
        'Synology/ZyXEL NAS, Active Backup for Business, Acronis Cloud ve periyodik DR tatbikatları',
        'Modbus sensörleri, gateway/HMI bağlantıları, OT ağ segmentasyonu ve PDKS kurulumu',
        'Hikvision/Dahua CCTV: 64 kamera ve yaklaşık 150 TB kayıt kapasitesi',
        'Dia ERP teknik operasyonu, Office 365/Exchange/Teams/SharePoint/Purview ve NetGSM santral yönetimi',
        'ISO 27001 uyumu, veri standardizasyonu ve devredilebilir teknik dokümantasyon',
      ],
      en: [
        'FortiGate firewall, MultiWAN and SSL VPN; Ruijie LAN/WLAN backbone and Ubiquiti PtP links',
        'KVM virtualization with Proxmox VE on HP ProLiant; remote hardware operations through HP iLO',
        'Synology/ZyXEL NAS, Active Backup for Business, Acronis Cloud and recurring DR drills',
        'Modbus sensors, gateway/HMI links, OT network segmentation and PDKS deployment',
        'Hikvision/Dahua CCTV: 64 cameras and approximately 150 TB of recording capacity',
        'Dia ERP technical operations, Office 365/Exchange/Teams/SharePoint/Purview and NetGSM telephony',
        'ISO 27001 alignment, data standardization and transferable technical documentation',
      ],
    },
  },
  {
    period: { tr: '2020 – 2023', en: '2020 – 2023' },
    company: 'Bağımsız / proje bazlı',
    role: { tr: 'Freelance Web Geliştirici', en: 'Freelance Web Developer' },
    points: {
      tr: ['React ve JavaScript ekosisteminde arayüzler ve web uygulamaları geliştirdim.', 'Yazılım tarafındaki temel deneyimimi gerçek proje teslimleriyle oluşturdum.'],
      en: ['Built interfaces and web applications in the React and JavaScript ecosystem.', 'Developed my software foundation through real project deliveries.'],
    },
  },
  {
    period: { tr: '2018 – 2022', en: '2018 – 2022' },
    company: 'Kavukluca Bilgi Teknolojileri · Kozan / Adana',
    role: { tr: 'IT Teknisyeni', en: 'IT Technician' },
    points: {
      tr: [
        'Kurumsal müşterilerde ağ kablolaması, switch/AP kurulumu ve cihaz yapılandırmaları',
        'Kurumsal CCTV montajı, kablolaması ve yapılandırması',
        'PC-POS, market/kafe otomasyonu, barkod okuyucu, yazıcı ve yedekleme sistemleri kurulumu',
        'Farklı sektörlerdeki altyapı senaryolarına hızlı adaptasyon',
      ],
      en: [
        'Network cabling, switch/AP installation and device configuration for enterprise customers',
        'Enterprise CCTV installation, cabling and configuration',
        'PC-POS, retail/cafe automation, barcode readers, printers and backup systems',
        'Fast adaptation across infrastructure scenarios in different industries',
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
