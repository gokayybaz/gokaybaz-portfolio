import type { ContentDocument, Experience } from '../../data/content'
import { ArrayControls, DictInput, LinesInput, Panel, TextInput } from '../fields'

function blankExperience(): Experience {
  return {
    period: { tr: '', en: '' },
    company: '',
    role: { tr: '', en: '' },
    summary: { tr: '', en: '' },
    highlights: { tr: [], en: [] },
    details: { tr: [], en: [] },
    points: { tr: [], en: [] },
  }
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
          <DictInput
            label="Kısa özet"
            value={item.summary ?? { tr: '', en: '' }}
            textarea
            rows={3}
            onChange={(summary) => update(index, { summary })}
          />
          <LinesInput
            label="Öne çıkan sonuçlar (TR) — satır başına bir tane"
            value={item.highlights?.tr ?? item.points.tr.slice(0, 3)}
            onChange={(tr) => update(index, { highlights: { tr, en: item.highlights?.en ?? item.points.en.slice(0, 3) } })}
          />
          <LinesInput
            label="Highlights (EN) — one per line"
            value={item.highlights?.en ?? item.points.en.slice(0, 3)}
            onChange={(en) => update(index, { highlights: { tr: item.highlights?.tr ?? item.points.tr.slice(0, 3), en } })}
          />
          <LinesInput
            label="Teknik detaylar (TR) — satır başına bir tane"
            value={item.details?.tr ?? item.points.tr}
            onChange={(tr) => update(index, { details: { tr, en: item.details?.en ?? item.points.en }, points: { tr, en: item.points.en } })}
          />
          <LinesInput
            label="Technical details (EN) — one per line"
            value={item.details?.en ?? item.points.en}
            onChange={(en) => update(index, { details: { tr: item.details?.tr ?? item.points.tr, en }, points: { tr: item.points.tr, en } })}
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
