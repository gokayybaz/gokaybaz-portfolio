import { useState, type FormEvent } from 'react'
import { login } from './api'

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const ok = await login(password)
    if (ok) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line bg-ink-soft p-8">
        <p className="font-mono text-xs text-term">$ ssh admin@gokaybaz.com</p>
        <h1 className="mt-2 text-xl font-bold text-paper">Admin Giriş</h1>
        <label htmlFor="admin-password" className="mt-6 block font-mono text-xs text-paper-dim">
          Şifre
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          className="mt-2 w-full border border-line bg-ink px-3 py-2 font-mono text-sm text-paper outline-none focus:border-term"
        />
        {error && <p className="mt-2 font-mono text-xs text-red-400">Şifre hatalı. Erişim reddedildi.</p>}
        <button
          type="submit"
          className="mt-6 w-full border border-term bg-term/10 px-3 py-2 font-mono text-sm text-term transition-colors hover:bg-term/20"
        >
          Giriş yap
        </button>
      </form>
    </div>
  )
}
