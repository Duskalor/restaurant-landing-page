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

export interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: 'entrada' | 'principal' | 'postre' | 'bebida'
  image: SanityImageSource
  imageAlt: string
  featured: boolean
  order: number
  slug: { current: string }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return sanityClient.fetch(`
    *[_type == "menuItem"] | order(order asc, _createdAt asc) {
      _id,
      name,
      description,
      price,
      category,
      image,
      imageAlt,
      featured,
      order,
      slug
    }
  `)
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  return sanityClient.fetch(`
    *[_type == "menuItem" && featured == true] | order(order asc, _createdAt asc) {
      _id,
      name,
      description,
      price,
      category,
      image,
      imageAlt,
      featured,
      order,
      slug
    }
  `)
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
  order?: number
}

export interface Testimonial {
  _id: string
  name: string
  rating?: number
  comment: string
  date?: string
  order?: number
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

export async function getHeroContent(): Promise<HeroContent | null> {
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

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return sanityClient.fetch(`
    *[_type == "galleryImage"] | order(order asc) {
      _id,
      title,
      image,
      alt,
      order
    }
  `)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id,
      name,
      rating,
      comment,
      date,
      order
    }
  `)
}

export interface AboutContent {
  title?: string
  description?: string
  image?: SanityImageSource
  imageAlt?: string
  chefName?: string
  chefTitle?: string
  chefImage?: SanityImageSource
  chefImageAlt?: string
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

export async function getAboutContent(): Promise<AboutContent | null> {
  return sanityClient.fetch(`
    *[_type == "aboutContent"][0] {
      title,
      description,
      image,
      imageAlt,
      chefName,
      chefTitle,
      chefImage,
      chefImageAlt
    }
  `)
}

export async function getContactContent(): Promise<ContactContent | null> {
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
  difficulty: 'facil' | 'moderado' | 'dificil' | 'muy-dificil'
  category: { name: string; slug: { current: string } }
  image: SanityImageSource
  featured: boolean
  order: number
  maxGroupSize?: number
  included?: string[]
  notIncluded?: string[]
  gallery?: Array<SanityImageSource & { url: string }>
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

export async function getTours(): Promise<Tour[]> {
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
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url }
    }
  `)
}

export async function getFeaturedTours(): Promise<Tour[]> {
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
      featured,
      order,
      maxGroupSize,
      included,
      notIncluded,
      gallery[] { ..., "url": asset->url }
    }
  `)
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
