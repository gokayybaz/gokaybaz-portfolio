import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [location.key])

  return null
}
