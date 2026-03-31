import { es } from './es'
import { en } from './en'
import { pt } from './pt'

export const SUPPORTED_LOCALES = ['es', 'en', 'pt'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

export function isValidLocale(lang: string): lang is Locale {
  return SUPPORTED_LOCALES.includes(lang as Locale)
}

const translations = { es, en, pt }

export function useTranslations(lang: Locale) {
  return translations[lang]
}
