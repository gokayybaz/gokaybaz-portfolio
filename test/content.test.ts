import { projects, experience } from '../src/data/content'

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
