import '@testing-library/jest-dom/vitest'

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: readonly number[] = []
  readonly isIntersecting = false
  readonly scrollMargin: DOMRectReadOnly = new DOMRectReadOnly()
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver as typeof IntersectionObserver

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = MockResizeObserver as typeof ResizeObserver
