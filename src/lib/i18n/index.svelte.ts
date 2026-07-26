import es from './locales/es.json'
import en from './locales/en.json'

type Locale = 'es' | 'en'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translations = { [key: string]: string | Translations }

const translations: Record<Locale, Translations> = { es, en }

let currentLocale = $state<Locale>('es')

export function setLocale(locale: Locale) {
  currentLocale = locale
}

export function getLocale(): Locale {
  return currentLocale
}

export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.')
  let value: string | Translations | undefined = translations[currentLocale]

  for (const k of keys) {
    if (typeof value === 'object' && value !== null) {
      value = value[k]
    } else {
      return key
    }
  }

  if (typeof value !== 'string') return key

  if (params) {
    return value.replace(/\{(\w+)\}/g, (_, name) => {
      return params[name] !== undefined ? String(params[name]) : `{${name}}`
    })
  }

  return value
}