export interface PatientData {
  edad?: number | null
  sexo?: 'M' | 'F' | ''
  peso: number | null
  talla: number | null
  glucemia: number | null
  trigliceridos: number | null
  antecedenteFamiliar: boolean
  hta: boolean
  ptgo1h?: number | null
  ptgo2h?: number | null
}

export type NivelRiesgo = 'bajo' | 'moderado' | 'alto'

export type NivelPtgo = 'normoglucemia' | 'prediabetes' | 'diabetes'

export interface ComponenteIRD {
  nombre: string
  cumple: boolean
  puntos: number
  valor?: string
  umbral: string
}

export interface IRDResult {
  score: number
  nivelRiesgo: NivelRiesgo
  componentes: ComponenteIRD[]
  ptgoInterpretacion: string
  ptgoNivel: NivelPtgo | null
  recomendacion: string
}

export const PUNTOS = {
  HTA: 2,
  FAMILIAR_DIABETES: 2,
  IMC_ALTO: 3,
  TYG_ALTO: 5,
} as const

export const UMBRALES = {
  IMC: 27.0,
  TYG: 8.3,
  RIESGO_IRD: 8,
  RIESGO_MODERADO: 4,
  MAX_PUNTOS: 12,
} as const

export const CONVERSION = {
  GLUCOSA_MMOL_A_MGDL: 18.0182,
  TRIGLICERIDOS_MMOL_A_MGDL: 88.5736,
} as const

export const UMBRALES_PTGO = {
  DIABETES_MMOLL: 11.6,
  PREDIABETES_MMOLL: 8.6,
  DIABETES_MGDL: 209,
  PREDIABETES_MGDL: 155,
} as const

export function calcularIMC(peso: number, talla: number): number {
  return peso / (talla * talla)
}

export function calcularTyG(glucemia: number, trigliceridos: number, unidad: 'mgdl' | 'mmoll'): number {
  let tgMg = trigliceridos
  let gMg = glucemia
  if (unidad === 'mmoll') {
    tgMg = trigliceridos * CONVERSION.TRIGLICERIDOS_MMOL_A_MGDL
    gMg = glucemia * CONVERSION.GLUCOSA_MMOL_A_MGDL
  }
  return Math.log((tgMg * gMg) / 2)
}

export function interpretarPtgo(valor: number): { clave: string; nivel: NivelPtgo } {
  if (valor >= UMBRALES_PTGO.DIABETES_MMOLL) {
    return { clave: 'ptgoInterpretacion.diabetes', nivel: 'diabetes' }
  }
  if (valor >= UMBRALES_PTGO.PREDIABETES_MMOLL) {
    return { clave: 'ptgoInterpretacion.prediabetes', nivel: 'prediabetes' }
  }
  return { clave: 'ptgoInterpretacion.normoglucemia', nivel: 'normoglucemia' }
}

export function recomendarClinica(nivelRiesgo: NivelRiesgo, ptgoNivel: NivelPtgo | null, tienePtgo: boolean): string {
  if (nivelRiesgo === 'alto' && tienePtgo && ptgoNivel === 'diabetes') {
    return 'recomendacion.accionInmediata'
  }
  if (nivelRiesgo === 'alto' && tienePtgo && ptgoNivel === 'prediabetes') {
    return 'recomendacion.intervencion'
  }
  if (nivelRiesgo === 'alto') {
    return 'recomendacion.accion'
  }
  if (nivelRiesgo === 'moderado') {
    return 'recomendacion.vigilancia'
  }
  return 'recomendacion.seguimiento'
}
