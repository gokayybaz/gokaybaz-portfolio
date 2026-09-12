import type { ContentDocument } from '../data/content'

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
    ...init,
  })
  return res
}

export async function login(password: string): Promise<boolean> {
  const res = await adminFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
  return res.ok
}

export async function fetchAdminContent(): Promise<ContentDocument> {
  const res = await adminFetch('/api/admin/content')
  if (!res.ok) throw new Error('content fetch failed')
  return (await res.json()) as ContentDocument
}

export async function saveContent(doc: ContentDocument): Promise<ContentDocument> {
  const res = await adminFetch('/api/admin/content', { method: 'PUT', body: JSON.stringify(doc) })
  if (!res.ok) throw new Error('save failed')
  return (await res.json()) as ContentDocument
}
