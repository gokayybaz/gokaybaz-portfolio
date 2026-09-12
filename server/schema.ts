import { z } from 'zod'

export const dictSchema = z.object({ tr: z.string(), en: z.string() })
export const biSchema = z.object({ tr: z.array(z.string()), en: z.array(z.string()) })

export const siteSchema = z.object({
  name: z.string(),
  avatarCandidates: z.array(z.string()),
  location: dictSchema,
  availability: dictSchema,
  phone: z.string(),
  title: dictSchema,
  subtitle: dictSchema,
  socials: z.object({
    github: z.string(),
    linkedin: z.string(),
    x: z.string(),
    email: z.string(),
    phone: z.string(),
    medium: z.string(),
  }),
})

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: dictSchema,
  period: dictSchema,
  description: dictSchema,
  detail: dictSchema.optional(),
  highlights: biSchema.optional(),
  stack: z.array(z.string()),
  github: z.string().optional(),
  demo: z.string().optional(),
  featured: z.boolean().optional(),
  metric: dictSchema.optional(),
  image: z.string().optional(),
})

export const experienceSchema = z.object({
  period: dictSchema,
  company: z.string(),
  role: dictSchema,
  summary: dictSchema.optional(),
  highlights: biSchema.optional(),
  details: biSchema.optional(),
  points: biSchema,
})

export const skillGroupSchema = z.object({
  title: dictSchema,
  items: z.array(z.string()),
})

export const educationSchema = z.object({
  institution: z.string(),
  program: dictSchema,
  period: z.string(),
  status: dictSchema.optional(),
})

export const contentSchema = z.object({
  site: siteSchema,
  profile: dictSchema,
  aboutTags: z.array(z.string()),
  skillGroups: z.array(skillGroupSchema),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
})
