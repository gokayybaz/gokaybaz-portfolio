import type { ContentDocument, Project } from '../../data/content'
import { ArrayControls, Checkbox, CommaInput, DictInput, LinesInput, Panel, TextInput } from '../fields'
import { ImageField } from '../ImageField'
import { MarkdownInput } from '../MarkdownInput'

function blankProject(): Project {
  return {
    slug: `yeni-proje-${Date.now()}`,
    title: { tr: '', en: '' },
    period: { tr: '', en: '' },
    description: { tr: '', en: '' },
    stack: [],
  }
}

export function ProjectsEditor({ doc, setDoc }: { doc: ContentDocument; setDoc: (doc: ContentDocument) => void }) {
  const projects = doc.projects

  function update(index: number, patch: Partial<Project>) {
    setDoc({ ...doc, projects: projects.map((p, i) => (i === index ? { ...p, ...patch } : p)) })
  }

  function move(index: number, delta: -1 | 1) {
    const next = [...projects]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    setDoc({ ...doc, projects: next })
  }

  function remove(index: number) {
    setDoc({ ...doc, projects: projects.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setDoc({ ...doc, projects: [...projects, blankProject()] })}
        className="border border-term bg-term/10 px-3 py-1.5 font-mono text-xs text-term hover:bg-term/20"
      >
        + Yeni proje
      </button>
      {projects.map((project, index) => (
        <Panel key={project.slug} title={`${project.featured ? '★ ' : ''}${project.title.tr || project.slug}`}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Slug" value={project.slug} onChange={(v) => update(index, { slug: v })} />
            <div className="flex items-end justify-between gap-2">
              <Checkbox
                label="Öne çıkan"
                checked={project.featured ?? false}
                onChange={(v) => update(index, { featured: v || undefined })}
              />
              <ArrayControls
                onUp={index > 0 ? () => move(index, -1) : undefined}
                onDown={index < projects.length - 1 ? () => move(index, 1) : undefined}
                onRemove={() => remove(index)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <DictInput label="Başlık" value={project.title} onChange={(v) => update(index, { title: v })} />
            <DictInput label="Dönem" value={project.period} onChange={(v) => update(index, { period: v })} />
          </div>
          <MarkdownInput
            label="Açıklama (markdown)"
            value={project.description.tr}
            rows={4}
            onChange={(tr) => update(index, { description: { ...project.description, tr } })}
          />
          <MarkdownInput
            label="Description (EN markdown)"
            value={project.description.en}
            rows={4}
            onChange={(en) => update(index, { description: { ...project.description, en } })}
          />
          <MarkdownInput
            label="Detay metni TR (markdown, opsiyonel)"
            value={project.detail?.tr ?? ''}
            rows={10}
            onChange={(tr) =>
              update(index, {
                detail: tr || project.detail?.en ? { tr, en: project.detail?.en ?? '' } : undefined,
              })
            }
          />
          <MarkdownInput
            label="Detail text EN (markdown, opsiyonel)"
            value={project.detail?.en ?? ''}
            rows={10}
            onChange={(en) =>
              update(index, {
                detail: en || project.detail?.tr ? { tr: project.detail?.tr ?? '', en } : undefined,
              })
            }
          />
          <DictInput
            label="Metrik (opsiyonel)"
            value={project.metric ?? { tr: '', en: '' }}
            onChange={(v) => update(index, { metric: v.tr || v.en ? v : undefined })}
          />
          <LinesInput
            label="Öne çıkanlar — satır başına bir madde (TR, opsiyonel)"
            value={project.highlights?.tr ?? []}
            placeholder={'Modbus veri toplama\nERP senkronizasyonu'}
            onChange={(tr) => update(index, { highlights: { tr, en: project.highlights?.en ?? [] } })}
          />
          <LinesInput
            label="Highlights — one per line (EN, opsiyonel)"
            value={project.highlights?.en ?? []}
            onChange={(en) => update(index, { highlights: { tr: project.highlights?.tr ?? [], en } })}
          />
          <ImageField
            label="Proje görseli (opsiyonel)"
            value={project.image ?? ''}
            onChange={(image) => update(index, { image: image || undefined })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <CommaInput label="Stack" value={project.stack} onChange={(stack) => update(index, { stack })} />
            <div className="grid gap-4">
              <TextInput
                label="GitHub URL (opsiyonel)"
                value={project.github ?? ''}
                onChange={(v) => update(index, { github: v || undefined })}
              />
              <TextInput
                label="Demo URL (opsiyonel)"
                value={project.demo ?? ''}
                onChange={(v) => update(index, { demo: v || undefined })}
              />
            </div>
          </div>
        </Panel>
      ))}
    </div>
  )
}
