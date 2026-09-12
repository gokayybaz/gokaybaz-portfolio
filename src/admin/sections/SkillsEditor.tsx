import type { ContentDocument, SkillGroup } from '../../data/content'
import { ArrayControls, CommaInput, DictInput, Panel } from '../fields'

function blankGroup(): SkillGroup {
  return { title: { tr: '', en: '' }, items: [] }
}

export function SkillsEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const groups = doc.skillGroups

  function update(index: number, patch: Partial<SkillGroup>) {
    setDoc({ ...doc, skillGroups: groups.map((g, i) => (i === index ? { ...g, ...patch } : g)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...groups]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, skillGroups: next })
  }

  function remove(index: number) {
    setDoc({ ...doc, skillGroups: groups.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, skillGroups: [...groups, blankGroup()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni grup
      </button>
      {groups.map((group, index) => (
        <Panel key={`${group.title.tr}-${index}`} title={group.title.tr || `Grup ${index + 1}`}>
          <DictInput label="Grup başlığı" value={group.title} onChange={(title) => update(index, { title })} />
          <CommaInput label="Öğeler" value={group.items} onChange={(items) => update(index, { items })} />
          <div className="flex justify-end">
            <ArrayControls
              onUp={index > 0 ? () => move(index, -1) : undefined}
              onDown={index < groups.length - 1 ? () => move(index, 1) : undefined}
              onRemove={() => remove(index)}
            />
          </div>
        </Panel>
      ))}
    </div>
  )
}
