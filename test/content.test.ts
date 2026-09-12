import { defaultContent, education, experience, projects, site, skillGroups } from '../src/data/content'

test('every project has unique slug and bilingual text', () => {
  const slugs = projects.map((p) => p.slug)
  expect(new Set(slugs).size).toBe(slugs.length)
  for (const p of projects) {
    expect(p.description.tr).toBeTruthy()
    expect(p.description.en).toBeTruthy()
    expect(p.stack.length).toBeGreaterThan(0)
  }
})

test('featured projects include detail content', () => {
  for (const p of projects.filter((p) => p.featured)) {
    expect(p.detail).toBeTruthy()
    expect(p.highlights?.tr.length).toBeGreaterThan(0)
  }
})

test('experience entries have points in both languages', () => {
  for (const e of experience) {
    expect(e.points.tr.length).toBeGreaterThan(0)
    expect(e.points.en.length).toBeGreaterThan(0)
  }
})

test('profile content reflects the current infrastructure and software focus', () => {
  expect(site.title.tr).toBe('BT Altyapı & Yazılım Uzmanı')
  expect(site.phone).toBe('tel:+905445085479')
  expect(projects.map((project) => project.slug)).toEqual([
    'factory-portal',
    'binoga-ecommerce',
    'erp-proxy-api',
    'it-management-system',
    'bazntms',
  ])
  expect(projects.find((project) => project.slug === 'bazntms')?.demo).toBe(
    'https://gokayybaz.github.io/bazntms/',
  )
  expect(projects[0].title.en).toBe('Factory Internal Portal')
  expect(projects[0].period.en).toBe('2026 – ongoing')
  expect(experience[0].period.en).toBe('2024 – present')
  expect(experience.some((entry) => entry.company.includes('Kavukluca'))).toBe(true)
  expect(skillGroups.length).toBeGreaterThanOrEqual(8)
  expect(education[0].institution).toBe('Çukurova Üniversitesi')
})

test('defaultContent mirrors the exported content', () => {
  expect(defaultContent.projects).toBe(projects)
  expect(defaultContent.experience).toBe(experience)
  expect(defaultContent.skillGroups).toBe(skillGroups)
  expect(defaultContent.education).toBe(education)
  expect(defaultContent.aboutTags.length).toBeGreaterThan(0)
  expect(defaultContent.profile.tr).toBeTruthy()
  expect(defaultContent.site.name).toBe('Gökay Baz')
})

test('long-form content follows a human-first layered structure', () => {
  expect(defaultContent.profile.tr).toContain('## Nasıl çalışıyorum?')
  expect(defaultContent.profile.en).toContain('## How I work')

  for (const project of projects) {
    expect(project.description.tr).not.toContain('Modbus TCP/IP')
    expect(project.description.tr).not.toContain('eBPF')
    expect(project.detail?.tr).toContain('## Problem')
    expect(project.detail?.tr).toContain('## Teknik yaklaşım')
    expect(project.detail?.en).toContain('## The problem')
    expect(project.detail?.en).toContain('## Technical approach')
  }
})
