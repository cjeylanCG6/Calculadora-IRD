<script lang="ts">
  import type { PatientData } from '../lib/types/ird'
  import { t } from '../lib/i18n/index.svelte'

  import DemographicsSection from './form/DemographicsSection.svelte'
  import AnthropometrySection from './form/AnthropometrySection.svelte'
  import LipidsSection from './form/LipidsSection.svelte'
  import ClinicalSection from './form/ClinicalSection.svelte'
  import PtgoSection from './form/PtgoSection.svelte'

  let { data = $bindable(), onValidChange, onUnidadChange }: {
    data: PatientData
    onValidChange?: (valido: boolean) => void
    onUnidadChange?: (unidad: 'mgdl' | 'mmoll') => void
  } = $props()

  let unidadMedida = $state<'mgdl' | 'mmoll'>('mgdl')

  const LIMITES = {
    peso: { min: 20, max: 300 },
    talla: { min: 0.8, max: 2.5 },
    glucemia: {
      mgdl: { min: 50, max: 600 },
      mmoll: { min: 2.8, max: 33.3 }
    },
    trigliceridos: {
      mgdl: { min: 20, max: 2000 },
      mmoll: { min: 0.2, max: 22.6 }
    },
  } as const

  type CampoValidacion = { valido: boolean; mensaje: string }

  function validarPeso(valor: number | null): CampoValidacion {
    if (valor === null) return { valido: true, mensaje: '' }
    if (valor < LIMITES.peso.min) return { valido: false, mensaje: t('form.errores.pesoMin') }
    if (valor > LIMITES.peso.max) return { valido: false, mensaje: t('form.errores.pesoMax') }
    return { valido: true, mensaje: '' }
  }

  function validarTalla(valor: number | null): CampoValidacion {
    if (valor === null) return { valido: true, mensaje: '' }
    if (valor < LIMITES.talla.min) return { valido: false, mensaje: t('form.errores.tallaMin') }
    if (valor > LIMITES.talla.max) return { valido: false, mensaje: t('form.errores.tallaMax') }
    return { valido: true, mensaje: '' }
  }

  function validarGlucemia(valor: number | null): CampoValidacion {
    if (valor === null) return { valido: true, mensaje: '' }
    const lim = LIMITES.glucemia[unidadMedida]
    if (valor < lim.min || valor > lim.max) return { valido: false, mensaje: t('form.errores.glucemiaRango') }
    return { valido: true, mensaje: '' }
  }

  function validarTrigliceridos(valor: number | null): CampoValidacion {
    if (valor === null) return { valido: true, mensaje: '' }
    const lim = LIMITES.trigliceridos[unidadMedida]
    if (valor < lim.min || valor > lim.max) return { valido: false, mensaje: t('form.errores.trigliceridosRango') }
    return { valido: true, mensaje: '' }
  }

  const errores = $derived({
    peso: validarPeso(data.peso),
    talla: validarTalla(data.talla),
    glucemia: validarGlucemia(data.glucemia),
    trigliceridos: validarTrigliceridos(data.trigliceridos),
  })

  const formularioValido = $derived(
    errores.peso.valido &&
    errores.talla.valido &&
    errores.glucemia.valido &&
    errores.trigliceridos.valido
  )

  $effect(() => {
    onValidChange?.(formularioValido)
  })

  function handleUnidadChange(unidad: 'mgdl' | 'mmoll') {
    unidadMedida = unidad
    onUnidadChange?.(unidad)
  }
</script>

<section class="space-y-4 sm:space-y-5 w-full">
  <DemographicsSection bind:edad={data.edad} bind:sexo={data.sexo} />
  <AnthropometrySection bind:peso={data.peso} bind:talla={data.talla} errorPeso={errores.peso} errorTalla={errores.talla} />
  <LipidsSection bind:glucemia={data.glucemia} bind:trigliceridos={data.trigliceridos} bind:unidadMedida errorGlucemia={errores.glucemia} errorTrigliceridos={errores.trigliceridos} onUnidadChange={handleUnidadChange} />
  <ClinicalSection bind:hta={data.hta} bind:antecedenteFamiliar={data.antecedenteFamiliar} />
  <PtgoSection bind:ptgo1h={data.ptgo1h} bind:ptgo2h={data.ptgo2h} />
</section>
