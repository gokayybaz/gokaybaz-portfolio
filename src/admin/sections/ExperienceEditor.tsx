import type { ContentDocument, Experience } from '../../data/content'
import { ArrayControls, DictInput, LinesInput, Panel, TextInput } from '../fields'

function blankExperience(): Experience {
  return { period: { tr: '', en: '' }, company: '', role: { tr: '', en: '' }, points: { tr: [], en: [] } }
}

export function ExperienceEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const items = doc.experience

  function update(index: number, patch: Partial<Experience>) {
    setDoc({ ...doc, experience: items.map((e, i) => (i === index ? { ...e, ...patch } : e)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...items]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, experience: next })
  }

  function remove(index: number) {
    setDoc({ ...doc, experience: items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, experience: [...items, blankExperience()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni deneyim
      </button>
      {items.map((item, index) => (
        <Panel key={`${item.company}-${index}`} title={item.company || `Deneyim ${index + 1}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <DictInput label="Dönem" value={item.period} onChange={(v) => update(index, { period: v })} />
            <TextInput label="Şirket" value={item.company} onChange={(v) => update(index, { company: v })} />
          </div>
          <DictInput label="Pozisyon" value={item.role} onChange={(v) => update(index, { role: v })} />
          <LinesInput
            label="Maddeler (TR) — satır başına bir tane"
            value={item.points.tr}
            onChange={(tr) => update(index, { points: { ...item.points, tr } })}
          />
          <LinesInput
            label="Points (EN) — one per line"
            value={item.points.en}
            onChange={(en) => update(index, { points: { ...item.points, en } })}
          />
          <div className="flex justify-end">
            <ArrayControls
              onUp={index > 0 ? () => move(index, -1) : undefined}
              onDown={index < items.length - 1 ? () => move(index, 1) : undefined}
              onRemove={() => remove(index)}
            />
          </div>
        </Panel>
      ))}
    </div>
  )
}
