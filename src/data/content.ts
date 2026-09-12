export type Lang = 'tr' | 'en'
export type Dict = { tr: string; en: string }
export type Bi = { tr: string[]; en: string[] }

export interface Socials {
  github: string
  linkedin: string
  x: string
  email: string
  medium: string
}

export interface Project {
  slug: string
  title: string
  description: Dict
  detail?: Dict
  highlights?: Bi
  stack: string[]
  github?: string
  demo?: string
  featured?: boolean
}

export interface Experience {
  period: string
  company: string
  role: Dict
  points: Bi
}

export const site = {
  name: 'Gökay Baz',
  title: {
    tr: 'Sistem Uzmanı & Full-Stack Yazılımcı',
    en: 'IT Specialist & Full-Stack Developer',
  } as Dict,
  socials: {
    github: 'https://github.com/gokayybaz',
    linkedin: 'https://www.linkedin.com/in/gokayybaz/',
    x: 'https://x.com/gokayybaz1',
    email: 'mailto:gokaybaz2000@gmail.com',
    medium: 'https://medium.com/@gokaybaz2000',
  } as Socials,
}

export const about: Dict = {
  tr: `İşe donanım ve ağ masasında başladım; Windows kurulumlarından fiber patch panele kadar her şeye dokundum. Web, beni en çok şaşırtan katman oldu: React ile tanıştığımda ağ yönetiminde öğrendiğim disiplinin kod tarafına da taşınabileceğini gördüm. React Staj programında modern frontend'i, ardından Binboğa Bal'da solo olarak bir e-ticaret platformunu baştan sona kurarak full-stack'i öğrendim.

Bugün iki tarafta da çalışıyorum: bir yanda FortiGate, Proxmox VE, WireGuard ve Dokploy ile kurumsal altyapıyı yönetiyorum; diğer yanda Next.js, PostgreSQL ve Prisma ile bu altyapının üzerinde çalışan ürünleri yazıyorum. Şu an Go ile derine iniyorum — eBPF paket yakalama ve Firecracker microVM'leri gibi düşük seviye sistemler ilgimi çekiyor.

Felsefem basit: çalıştırdığın her sistemin sahibi ol. Kendi sunucunda deploy et, kendi ağını kur, kendi hikayenin operatörü ol.`,
  en: `I started in hardware and networking; I touched everything from Windows installs to fiber patch panels. The web became the layer that surprised me most: when I met React, I realized the discipline I'd learned in network administration could carry over into code. I learned modern frontend in the React Staj program, then full-stack by building an e-commerce platform from scratch, solo, at Binboğa Bal.

Today I work on both sides: I manage corporate infrastructure with FortiGate, Proxmox VE, WireGuard and Dokploy; and I write the products that run on top of it with Next.js, PostgreSQL and Prisma. Right now I'm going deeper with Go — low-level systems like eBPF packet capture and Firecracker microVMs fascinate me.

My philosophy is simple: own every system you run. Deploy on your own servers, build your own network, be the operator of your own story.`,
}

export const aboutTags: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Go',
  'PostgreSQL',
  'Prisma',
  'Proxmox VE',
  'Docker',
  'Dokploy',
  'WireGuard',
  'FortiGate',
]

export const projects: Project[] = [
  {
    slug: 'bazntms',
    title: 'bazntms',
    featured: true,
    github: 'https://github.com/gokayybaz/bazntms',
    description: {
      tr: 'Ağ trafiği izleme sistemi: tek bir Go binary, 5.000\'e kadar agent, eBPF paket yakalama ve SIEM entegrasyonları. Bayrak gemi projem.',
      en: 'Network traffic monitoring system: a single Go binary, up to 5,000 agents, eBPF packet capture and SIEM integrations. My flagship project.',
    },
    detail: {
      tr: 'Kurumsal ağlarda görünürlük sorunu için kendi çözümümü yazdım. Hub + agent mimarisiyle 5.000\'e kadar makinede canlı paket yakalama (Linux\'ta eBPF, Windows\'ta ETW, dosya bazında pcap), NetFlow/IPFIX/sFlow akış analizi ve SNMPv3 cihaz keşfi yapıyor. Tüm agent-hub iletişimi mTLS ile şifreli; RBAC ve SSO ile yetkilendirme var. Splunk ve QRadar SIEM konektörleri, 5651 uyumluluk için imzalı log saklama ve ISO 27001 kontrolleriyle haritalama dahil. Anomali tespiti ve AI destekli analiz modülleri de var.',
      en: 'I wrote my own answer to the visibility problem in corporate networks. A hub + agent architecture captures live packets on up to 5,000 machines (eBPF on Linux, ETW on Windows, file-based pcap), analyzes NetFlow/IPFIX/sFlow flows and discovers devices via SNMPv3. All agent-hub communication is mTLS-encrypted, with RBAC and SSO for authorization. Includes Splunk and QRadar SIEM connectors, signed logs for 5651 compliance and ISO 27001 control mapping — plus anomaly detection and AI-assisted analysis.',
    },
    highlights: {
      tr: [
        'Tek Go binary olarak dağıtılır — harici bağımlılık yok',
        '5.000 agent\'a kadar yatay ölçeklenme, mTLS ile şifreli iletişim',
        'eBPF/ETW/pcap paket yakalama + NetFlow/IPFIX/sFlow + SNMPv3',
        'Splunk ve QRadar SIEM konektörleri, 5651 imzalı log uyumu',
        'ISO 27001 kontrol haritalaması ve AI destekli trafik analizi',
      ],
      en: [
        'Ships as a single Go binary — no external dependencies',
        'Scales to 5,000 agents with mTLS-encrypted communication',
        'eBPF/ETW/pcap packet capture + NetFlow/IPFIX/sFlow + SNMPv3',
        'Splunk and QRadar SIEM connectors, 5651 signed-log compliance',
        'ISO 27001 control mapping and AI-assisted traffic analysis',
      ],
    },
    stack: ['Go', 'React', 'SQLite', 'PostgreSQL', 'NATS', 'Docker'],
  },
  {
    slug: 'binoga-ecommerce',
    title: 'Binboğa e-Commerce',
    featured: true,
    description: {
      tr: 'Binboğa Bal için baştan sona solo geliştirdiğim kurumsal e-ticaret platformu: ödeme, ERP, kargo ve kendi sunucumdaki deploy dahil.',
      en: 'A corporate e-commerce platform I built end-to-end, solo, for Binboğa Bal: payments, ERP, shipping and deployment on my own server included.',
    },
    detail: {
      tr: 'Next.js + Node.js + PostgreSQL + Prisma üzerinde tek başına kurduğum üretim sistemi. QNBpay ödeme entegrasyonu, DHL kargo otomasyonu ve fabrikadaki DİA ERP\'ye WireGuard tüneli üzerinden özel bir Proxy API ile canlı stok/fiyat senkronizasyonu var. Admin panelinde RBAC, 2FA ve audit log bulunuyor; kritik olaylar Telegram\'a log uyarısı olarak düşüyor. Tüm altyapı kendi Proxmox sunucumda Dokploy ile çalışıyor; Amazon SES ile e-posta gönderimi yapıyor ve SEO/GEO + AI-SEO tarafı ele alınmış durumda. Geliştirme boyunca TDD uygulandı.',
      en: 'A production system I stood up single-handedly on Next.js + Node.js + PostgreSQL + Prisma. It integrates QNBpay payments, DHL shipping automation, and live stock/price sync with the DİA ERP on the factory floor via a custom Proxy API over a WireGuard tunnel. The admin panel has RBAC, 2FA and audit logs; critical events fire Telegram log alerts. Everything runs on my own Proxmox server with Dokploy, sends email through Amazon SES, and the SEO/GEO + AI-SEO side is handled. Development followed TDD throughout.',
    },
    highlights: {
      tr: [
        'QNBpay ödeme + DHL kargo entegrasyonu',
        'DİA ERP senkronizasyonu: WireGuard tüneli üzerinden özel Proxy API',
        'RBAC + 2FA + audit log ile korumalı admin panel',
        'Kendi Proxmox sunucusunda Dokploy ile deploy',
        'Amazon SES e-posta + SEO/GEO + AI-SEO',
      ],
      en: [
        'QNBpay payments + DHL shipping integration',
        'DİA ERP sync: custom Proxy API over a WireGuard tunnel',
        'RBAC + 2FA + audit log protected admin panel',
        'Deployed with Dokploy on my own Proxmox server',
        'Amazon SES email + SEO/GEO + AI-SEO',
      ],
    },
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Amazon SES', 'Dokploy', 'WireGuard'],
  },
  {
    slug: 'baz-eshop',
    title: 'baz-eshop',
    github: 'https://github.com/gokayybaz/baz-eshop',
    demo: 'https://baz-e-shop.netlify.app',
    description: {
      tr: 'Redux ile state yönetimi yapılan, sepet ve ödeme akışı olan giyim e-ticaret vitrini.',
      en: 'A clothing e-commerce storefront with Redux state management, cart and checkout flow.',
    },
    stack: ['React', 'Redux', 'React Router', 'Tailwind', 'Vite'],
  },
  {
    slug: 'valorant-app',
    title: 'baz_valorant_app',
    github: 'https://github.com/gokayybaz/baz_valorant_app',
    description: {
      tr: 'Valorant ajanları ve haritalar için rehber uygulaması; API verisiyle çalışan spor/asabiyet projesi.',
      en: 'A guide app for Valorant agents and maps; a fun project working with live API data.',
    },
    stack: ['React', 'Vite', 'Axios'],
  },
  {
    slug: 'filmgezegeni',
    title: 'filmgezegeni',
    github: 'https://github.com/gokayybaz/filmgezegeni',
    description: {
      tr: 'Film keşif uygulaması — puanlama ve kategori filtreleriyle sinema kataloğu.',
      en: 'A movie discovery app — a cinema catalog with ratings and category filters.',
    },
    stack: ['React', 'Vite', 'pnpm'],
  },
]

export const experience: Experience[] = [
  {
    period: '2022 – 2024',
    company: 'Kavukluca Bilgi Teknolojileri',
    role: { tr: 'IT Teknisyeni', en: 'IT Technician' },
    points: {
      tr: [
        'Saha ve uzaktan destek: donanım kurulumu ve arıza giderme',
        'Windows/Office kurulumları, ağ yapılandırması, yazıcı ve yedekleme işlemleri',
      ],
      en: [
        'Field and remote support: hardware setup and troubleshooting',
        'Windows/Office installs, network configuration, printers and backups',
      ],
    },
  },
  {
    period: 'Şub 2024 / Feb 2024',
    company: 'React Staj (reactstaj.com)',
    role: { tr: 'Stajyer', en: 'Intern' },
    points: {
      tr: [
        'Modern React ekosistemi eğitimi: hooks, state yönetimi, best practices',
        'Değerlendirme projesi: hava durumu uygulaması',
      ],
      en: [
        'Modern React ecosystem training: hooks, state management, best practices',
        'Assessment project: weather application',
      ],
    },
  },
  {
    period: 'Tem 2024 – / Jul 2024 –',
    company: 'Binboğa Bal',
    role: {
      tr: 'Sistem Uzmanı & Full-Stack Yazılımcı',
      en: 'IT Specialist & Full-Stack Developer',
    },
    points: {
      tr: [
        'E-ticaret platformunu baştan sona solo geliştirdim: Next.js + Prisma + PostgreSQL, QNBpay, DİA ERP, DHL',
        'Binboğa IT Management System: tüm BT sistemlerini birleştiren iç dashboard, FortiGate modülü dahil',
        'Tüm altyapıyı sıfırdan Proxmox VE\'ye taşıdım; Passbolt ile zero-knowledge şifre yönetimi kuruldu',
        'WireGuard VPN ağı, Dokploy PaaS ve FortiGate güvenlik yönetimi',
      ],
      en: [
        'Built the e-commerce platform end-to-end, solo: Next.js + Prisma + PostgreSQL, QNBpay, DİA ERP, DHL',
        'Binboğa IT Management System: internal dashboard unifying all IT systems, including a FortiGate module',
        'Rebuilt the entire infrastructure on Proxmox VE from scratch; deployed Passbolt for zero-knowledge password management',
        'WireGuard VPN network, Dokploy PaaS and FortiGate security management',
      ],
    },
  },
]
