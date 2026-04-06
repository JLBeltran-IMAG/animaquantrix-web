import { getSectionMarkdown, type SectionKey } from '../content/registry'
import type { Language } from '../app/i18n'

export type ContentButton = {
  label: string
  href: string
}

export type SectionItem = {
  slug?: string
  title: string
  subtitle?: string
  description: string
  image?: string
  alt?: string
  href?: string
  label?: string
  meta?: string
}

export type SectionPage = {
  slug: string
  title: string
  subtitle?: string
  description: string
  body: string
  image?: string
  alt?: string
  label?: string
  meta?: string
}

export type SectionMetadata = {
  title: string
  subtitle: string
  buttons: ContentButton[]
  slides: SectionItem[]
  items: SectionItem[]
  pages: SectionPage[]
}

export type SectionContent = {
  metadata: SectionMetadata
  content: string
}

type ContentRule = {
  requirePageBodies?: boolean
}

const CONTENT_RULES: Partial<Record<SectionKey, ContentRule>> = {
  research: { requirePageBodies: true },
  software: { requirePageBodies: true },
}

type FrontmatterObject = Record<string, unknown>

function cleanValue(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/^["']|["']$/g, '')
}

function parseFrontmatter(frontmatter: string): FrontmatterObject {
  const result: FrontmatterObject = {}
  const lines = frontmatter.split('\n')
  let currentArrayKey = ''
  let currentItem: FrontmatterObject | null = null

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r/g, '')

    if (!line.trim()) {
      continue
    }

    const topLevelMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (topLevelMatch && !line.startsWith(' ')) {
      const [, key, rawValue] = topLevelMatch
      const value = cleanValue(rawValue)

      if (value) {
        result[key] = value
        currentArrayKey = ''
        currentItem = null
      } else {
        result[key] = []
        currentArrayKey = key
        currentItem = null
      }

      continue
    }

    const itemStartMatch = line.match(/^  -\s*([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (itemStartMatch && currentArrayKey) {
      const [, itemKey, rawValue] = itemStartMatch
      currentItem = {
        [itemKey]: cleanValue(rawValue),
      }
      ;(result[currentArrayKey] as FrontmatterObject[]).push(currentItem)
      continue
    }

    const itemFieldMatch = line.match(/^    ([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (itemFieldMatch && currentItem) {
      const [, itemKey, rawValue] = itemFieldMatch
      currentItem[itemKey] = cleanValue(rawValue)
    }
  }

  return result
}

function getLocalizedValue(
  data: FrontmatterObject,
  key: string,
  language: Language,
) {
  return data[`${key}_${language}`] ?? data[key]
}

function normalizeButtons(value: unknown): ContentButton[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((button) => {
      const item = button as FrontmatterObject

      return {
        label: cleanValue(item.label ?? ''),
        href: cleanValue(item.href ?? ''),
      }
    })
    .filter((button) => button.label && button.href)
}

function normalizeItems(value: unknown): SectionItem[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      const item = entry as FrontmatterObject

      return {
        slug: cleanValue(item.slug ?? '') || undefined,
        title: cleanValue(item.title ?? ''),
        subtitle: cleanValue(item.subtitle ?? '') || undefined,
        description: cleanValue(item.description ?? ''),
        image: cleanValue(item.image ?? '') || undefined,
        alt: cleanValue(item.alt ?? '') || undefined,
        href: cleanValue(item.href ?? '') || undefined,
        label: cleanValue(item.label ?? '') || undefined,
        meta: cleanValue(item.meta ?? '') || undefined,
      }
    })
    .filter((item) => item.title || item.description || item.image)
}

function extractLocalizedBody(rawContent: string, language: Language): string {
  const localizedBlock = rawContent.match(
    new RegExp(
      `<!--\\s*lang:${language}\\s*-->([\\s\\S]*?)(?=<!--\\s*(?:lang:(?:en|es)|page:[^\\s]+\\s+lang:(?:en|es))\\s*-->|$)`,
    ),
  )

  if (localizedBlock) {
    return localizedBlock[1].trim()
  }

  return rawContent.trim()
}

function extractLocalizedPageBodies(rawContent: string, language: Language) {
  const pageBodies: Record<string, string> = {}
  const regex =
    /<!--\s*page:([a-zA-Z0-9-]+)\s+lang:(en|es)\s*-->([\s\S]*?)(?=<!--\s*(?:page:[a-zA-Z0-9-]+\s+lang:(?:en|es)|lang:(?:en|es))\s*-->|$)/g

  let match: RegExpExecArray | null
  while ((match = regex.exec(rawContent)) !== null) {
    const [, slug, matchLanguage, body] = match
    if (matchLanguage === language) {
      pageBodies[slug] = body.trim()
    }
  }

  return pageBodies
}

function normalizePages(
  value: unknown,
  pageBodies: Record<string, string>,
): SectionPage[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      const item = entry as FrontmatterObject
      const slug = cleanValue(item.slug ?? '')

      return {
        slug,
        title: cleanValue(item.title ?? ''),
        subtitle: cleanValue(item.subtitle ?? '') || undefined,
        description: cleanValue(item.description ?? ''),
        image: cleanValue(item.image ?? '') || undefined,
        alt: cleanValue(item.alt ?? '') || undefined,
        label: cleanValue(item.label ?? '') || undefined,
        meta: cleanValue(item.meta ?? '') || undefined,
        body: pageBodies[slug] ?? '',
      }
    })
    .filter((item) => item.slug && item.title)
}

function validateSectionContent(sectionKey: SectionKey, content: SectionContent) {
  const rule = CONTENT_RULES[sectionKey]
  const itemSlugs = new Set<string>()
  const pageSlugs = new Set<string>()

  for (const item of content.metadata.items) {
    if (item.slug) {
      if (itemSlugs.has(item.slug)) {
        throw new Error(`Duplicate item slug "${item.slug}" in section "${sectionKey}"`)
      }

      itemSlugs.add(item.slug)
    }
  }

  for (const page of content.metadata.pages) {
    if (pageSlugs.has(page.slug)) {
      throw new Error(`Duplicate page slug "${page.slug}" in section "${sectionKey}"`)
    }

    pageSlugs.add(page.slug)

    if (rule?.requirePageBodies && !page.body) {
      throw new Error(`Missing body for page "${page.slug}" in section "${sectionKey}"`)
    }
  }

  if (rule?.requirePageBodies) {
    for (const slug of itemSlugs) {
      if (!pageSlugs.has(slug)) {
        throw new Error(
          `Missing page metadata for item slug "${slug}" in section "${sectionKey}"`,
        )
      }
    }
  }
}

export function parseSectionMarkdown(
  rawMarkdown: string,
  language: Language,
): SectionContent {
  const frontmatterMatch = rawMarkdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!frontmatterMatch) {
    return {
      metadata: {
        title: '',
        subtitle: '',
        buttons: [],
        slides: [],
        items: [],
        pages: [],
      },
      content: rawMarkdown.trim(),
    }
  }

  const [, rawFrontmatter, rawContent] = frontmatterMatch
  const data = parseFrontmatter(rawFrontmatter)
  const pageBodies = extractLocalizedPageBodies(rawContent, language)

  return {
    metadata: {
      title: cleanValue(String(getLocalizedValue(data, 'title', language) ?? '')),
      subtitle: cleanValue(
        String(getLocalizedValue(data, 'subtitle', language) ?? ''),
      ),
      buttons: normalizeButtons(getLocalizedValue(data, 'buttons', language)),
      slides: normalizeItems(getLocalizedValue(data, 'slides', language)),
      items: normalizeItems(getLocalizedValue(data, 'items', language)),
      pages: normalizePages(getLocalizedValue(data, 'pages', language), pageBodies),
    },
    content: extractLocalizedBody(rawContent, language),
  }
}

const sectionContentCache = new Map<string, SectionContent>()

export function getSectionContent(sectionKey: SectionKey, language: Language) {
  const cacheKey = `${sectionKey}:${language}`
  const cachedValue = sectionContentCache.get(cacheKey)

  if (cachedValue) {
    return cachedValue
  }

  const parsedContent = parseSectionMarkdown(getSectionMarkdown(sectionKey), language)
  validateSectionContent(sectionKey, parsedContent)
  sectionContentCache.set(cacheKey, parsedContent)

  return parsedContent
}
