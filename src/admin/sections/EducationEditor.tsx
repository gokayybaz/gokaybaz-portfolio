import type { ContentDocument, Education } from '../../data/content'
import { ArrayControls, DictInput, Panel, TextInput } from '../fields'

function blankEducation(): Education {
  return { institution: '', program: { tr: '', en: '' }, period: '' }
}

export function EducationEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const items = doc.education

  function update(index: number, patch: Partial<Education>) {
    setDoc({ ...doc, education: items.map((e, i) => (i === index ? { ...e, ...patch } : e)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...items]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, education: next })
  }

  function remove(index: number) {
    setDoc({ ...doc, education: items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, education: [...items, blankEducation()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni eğitim kaydı
      </button>
      {items.map((item, index) => (
        <Panel key={`${item.institution}-${index}`} title={item.institution || `Eğitim ${index + 1}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Kurum" value={item.institution} onChange={(v) => update(index, { institution: v })} />
            <TextInput label="Dönem" value={item.period} onChange={(v) => update(index, { period: v })} />
          </div>
          <DictInput label="Program" value={item.program} onChange={(v) => update(index, { program: v })} />
          <DictInput
            label="Durum (opsiyonel)"
            value={item.status ?? { tr: '', en: '' }}
            onChange={(v) => update(index, { status: v.tr || v.en ? v : undefined })}
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
