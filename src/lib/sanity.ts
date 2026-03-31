import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface SiteSettings {
  businessName: string
  tagline?: string
  logo?: SanityImageSource
  phone?: string
  email?: string
  address?: string
  instagram?: string
  facebook?: string
  openingHours?: string
  favicon?: SanityImageSource
}

export interface HeroContent {
  title: string
  subtitle?: string
  backgroundImage?: SanityImageSource
  ctaText?: string
  ctaLink?: string
}

export interface GalleryImage {
  _id: string
  title?: string
  image: SanityImageSource
  alt: string
  description?: string
  order?: number
}

export interface Testimonial {
  _id: string
  name: string
  rating?: number
  comment: string
  date?: string
  order?: number
  origin?: string
  tourVisited?: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      businessName,
      tagline,
      logo,
      phone,
      email,
      address,
      instagram,
      facebook,
      openingHours,
      favicon
    }
  `)
}

export async function getHeroContent(lang: string = 'es'): Promise<HeroContent | null> {
  // Try language-specific first, fall back to any
  const result = await sanityClient.fetch(`
    *[_type == "heroContent" && language == $lang][0] {
      title,
      subtitle,
      backgroundImage,
      ctaText,
      ctaLink
    }
  `, { lang })
  if (result) return result
  // Fallback: no language filter (legacy documents without language field)
  return sanityClient.fetch(`
    *[_type == "heroContent"][0] {
      title,
      subtitle,
      backgroundImage,
      ctaText,
      ctaLink
    }
  `)
}

export async function getGalleryImages(lang: string = 'es'): Promise<GalleryImage[]> {
  const results = await sanityClient.fetch(`
    *[_type == "galleryImage" && language == $lang] | order(order asc) {
      _id,
      title,
      image,
      alt,
      description,
      order
    }
  `, { lang })
  if (results && results.length > 0) return results
  // Fallback: no language filter
  return sanityClient.fetch(`
    *[_type == "galleryImage"] | order(order asc) {
      _id,
      title,
      image,
      alt,
      description,
      order
    }
  `)
}

export async function getTestimonials(lang: string = 'es'): Promise<Testimonial[]> {
  const results = await sanityClient.fetch(`
    *[_type == "testimonial" && language == $lang] | order(order asc) {
      _id,
      name,
      rating,
      comment,
      date,
      order,
      origin,
      tourVisited
    }
  `, { lang })
  if (results && results.length > 0) return results
  // Fallback: no language filter
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id,
      name,
      rating,
      comment,
      date,
      order,
      origin,
      tourVisited
    }
  `)
}

export interface AboutContent {
  title?: string
  description?: string
  mission?: string
  image?: SanityImageSource
  imageAlt?: string
  badgeLabel?: string
  yearsOfExperience?: number
}

export interface ContactContent {
  title?: string
  subtitle?: string
  phone?: string
  email?: string
  address?: string
  mapEmbedUrl?: string
  openingHours?: string
  reservationCtaText?: string
}

export async function getAboutContent(lang: string = 'es'): Promise<AboutContent | null> {
  const result = await sanityClient.fetch(`
    *[_type == "aboutContent" && language == $lang][0] {
      title,
      description,
      mission,
      image,
      imageAlt,
      badgeLabel,
      yearsOfExperience
    }
  `, { lang })
  if (result) return result
  return sanityClient.fetch(`
    *[_type == "aboutContent"][0] {
      title,
      description,
      mission,
      image,
      imageAlt,
      badgeLabel,
      yearsOfExperience
    }
  `)
}

export async function getContactContent(lang: string = 'es'): Promise<ContactContent | null> {
  const result = await sanityClient.fetch(`
    *[_type == "contactContent" && language == $lang][0] {
      title,
      subtitle,
      phone,
      email,
      address,
      mapEmbedUrl,
      openingHours,
      reservationCtaText
    }
  `, { lang })
  if (result) return result
  return sanityClient.fetch(`
    *[_type == "contactContent"][0] {
      title,
      subtitle,
      phone,
      email,
      address,
      mapEmbedUrl,
      openingHours,
      reservationCtaText
    }
  `)
}

export interface Tour {
  _id: string
  name: string
  slug: { current: string }
  description: string
  shortDescription?: string
  price: number
  duration: string
  difficulty?: 'facil' | 'moderado' | 'dificil' | 'muy-dificil'
  category: { name: string; slug: { current: string } }
  image: SanityImageSource
  altText?: string
  featured: boolean
  order: number
  maxGroupSize?: number
  included?: string[]
  notIncluded?: string[]
  gallery?: Array<SanityImageSource & { url: string }>
  meetingPoint?: string
}

export interface TourCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: SanityImageSource
  order?: number
}

export interface Certification {
  _id: string
  name: string
  logo: SanityImageSource
  url?: string
  order?: number
}

export async function getTours(lang: string = 'es'): Promise<Tour[]> {
  const results = await sanityClient.fetch(`
    *[_type == "tour" && language == $lang] | order(order asc, _createdAt asc) {
      _id,
      name,
      slug,
      description,
      shortDescription,
      price,
      duration,
      difficulty,
      category-> { name, slug },
      image,
      altText,
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url }
    }
  `, { lang })
  if (results && results.length > 0) return results
  // Fallback: no language filter (legacy documents)
  return sanityClient.fetch(`
    *[_type == "tour"] | order(order asc, _createdAt asc) {
      _id,
      name,
      slug,
      description,
      shortDescription,
      price,
      duration,
      difficulty,
      category-> { name, slug },
      image,
      altText,
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url }
    }
  `)
}

export async function getFeaturedTours(lang: string = 'es'): Promise<Tour[]> {
  const results = await sanityClient.fetch(`
    *[_type == "tour" && featured == true && language == $lang] | order(order asc, _createdAt asc) {
      _id,
      name,
      slug,
      description,
      shortDescription,
      price,
      duration,
      difficulty,
      category-> { name, slug },
      image,
      altText,
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url }
    }
  `, { lang })
  if (results && results.length > 0) return results
  // Fallback: no language filter
  return sanityClient.fetch(`
    *[_type == "tour" && featured == true] | order(order asc, _createdAt asc) {
      _id,
      name,
      slug,
      description,
      shortDescription,
      price,
      duration,
      difficulty,
      category-> { name, slug },
      image,
      altText,
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url }
    }
  `)
}

export async function getTourBySlug(slug: string, lang: string = 'es'): Promise<Tour | null> {
  // Step 1: find the base document by slug (root doc — no __i18n_base reference)
  const baseDoc = await sanityClient.fetch(
    `
    *[_type == "tour" && slug.current == $slug && !defined(__i18n_base)][0] {
      _id,
      language,
      name,
      slug,
      description,
      shortDescription,
      price,
      duration,
      difficulty,
      category-> { name, slug },
      image,
      altText,
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url },
      meetingPoint
    }
  `,
    { slug }
  )

  if (!baseDoc) return null

  // Step 2: if the requested lang matches the base doc language (typically 'es'), return as-is
  if (!lang || lang === baseDoc.language) return baseDoc

  // Step 3: fetch the translation document for the requested language
  const translation = await sanityClient.fetch(
    `
    *[_type == "tour" && __i18n_base._ref == $baseId && language == $lang][0] {
      name,
      description,
      shortDescription,
      duration,
      difficulty,
      included,
      notIncluded,
      meetingPoint
    }
  `,
    { baseId: baseDoc._id, lang }
  )

  // Step 4: merge — non-translatable fields from base, translatable from translation (with base fallback)
  return {
    // Non-translatable fields — always from base
    _id: baseDoc._id,
    slug: baseDoc.slug,
    price: baseDoc.price,
    image: baseDoc.image,
    altText: baseDoc.altText,
    category: baseDoc.category,
    featured: baseDoc.featured,
    order: baseDoc.order,
    maxGroupSize: baseDoc.maxGroupSize,
    gallery: baseDoc.gallery,
    // Translatable fields — from translation if available, fallback to base
    name: translation?.name ?? baseDoc.name,
    description: translation?.description ?? baseDoc.description,
    shortDescription: translation?.shortDescription ?? baseDoc.shortDescription,
    duration: translation?.duration ?? baseDoc.duration,
    difficulty: translation?.difficulty ?? baseDoc.difficulty,
    included: translation?.included ?? baseDoc.included,
    notIncluded: translation?.notIncluded ?? baseDoc.notIncluded,
    meetingPoint: translation?.meetingPoint ?? baseDoc.meetingPoint,
  }
}

export async function getTourCategories(): Promise<TourCategory[]> {
  return sanityClient.fetch(`
    *[_type == "tourCategory"] | order(order asc, _createdAt asc) {
      _id,
      name,
      slug,
      description,
      image,
      order
    }
  `)
}

export async function getCertifications(): Promise<Certification[]> {
  return sanityClient.fetch(`
    *[_type == "certification"] | order(order asc, _createdAt asc) {
      _id,
      name,
      logo,
      url,
      order
    }
  `)
}

export interface WhyChooseUsItem {
  icon: string
  title: string
  description: string
}

export interface WhyChooseUs {
  title?: string
  items: WhyChooseUsItem[]
}

export async function getWhyChooseUs(lang: string = 'es'): Promise<WhyChooseUs | null> {
  const result = await sanityClient.fetch(`
    *[_type == "whyChooseUs" && language == $lang][0] {
      title,
      items[] {
        icon,
        title,
        description
      }
    }
  `, { lang })
  if (result) return result
  return sanityClient.fetch(`
    *[_type == "whyChooseUs"][0] {
      title,
      items[] {
        icon,
        title,
        description
      }
    }
  `)
}
