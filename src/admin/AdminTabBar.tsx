import { NavLink } from 'react-router'

export function AdminTabBar({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Admin bölümleri"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-4">
        {sections.map((s) => (
          <NavLink
            key={s.id}
            to={`/admin/${s.id}`}
            className={({ isActive }) =>
              `flex min-h-14 flex-col items-center justify-center gap-0.5 font-mono text-[10px] ${
                isActive ? 'text-term' : 'text-paper-dim'
              }`
            }
          >
            <span className="text-sm">›</span>
            {s.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
