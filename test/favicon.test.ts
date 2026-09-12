import html from '../index.html?raw'

test('favicon links use a cache-busting version', () => {
  expect(html).toContain('href="/favicon.svg?v=2"')
  expect(html).toContain('href="/favicon.ico?v=2"')
  expect(html).toContain('href="/favicon-180.png?v=2"')
})
