<script lang="ts">
  import Header from './components/Header.svelte'
  import PatientForm from './components/PatientForm.svelte'
  import ResultCard from './components/ResultCard.svelte'
  import Footer from './components/Footer.svelte'
  import type { PatientData, IRDResult } from './lib/types/ird'
  import { PUNTOS, UMBRALES, calcularIMC, calcularTyG, interpretarPtgo, recomendarClinica } from './lib/types/ird'

  let datos = $state<PatientData>({
    hta: false,
    antecedenteFamiliar: false,
    peso: null,
    talla: null,
    glucemia: null,
    trigliceridos: null,
    ptgo1h: null,
    ptgo2h: null,
  })

  let unidadMedida = $state<'mgdl' | 'mmoll'>('mgdl')
  let resultado = $state<IRDResult | null>(null)
  let formularioValido = $state(true)

  $effect(() => {
    if (!formularioValido || !datos.peso || !datos.talla || !datos.glucemia || !datos.trigliceridos) {
      resultado = null
      return
    }

    const imc = calcularIMC(datos.peso, datos.talla)
    const tyg = calcularTyG(datos.glucemia, datos.trigliceridos, unidadMedida)

    const imcOk = imc >= UMBRALES.IMC
    const tygOk = tyg >= UMBRALES.TYG

    let score = 0
    if (datos.hta) score += PUNTOS.HTA
    if (datos.antecedenteFamiliar) score += PUNTOS.FAMILIAR_DIABETES
    if (imcOk) score += PUNTOS.IMC_ALTO
    if (tygOk) score += PUNTOS.TYG_ALTO

    let nivelRiesgo: 'bajo' | 'moderado' | 'alto' = 'bajo'
    if (score >= UMBRALES.RIESGO_IRD) {
      nivelRiesgo = 'alto'
    } else if (score >= UMBRALES.RIESGO_MODERADO) {
      nivelRiesgo = 'moderado'
    }

    const componentes = [
      { nombre: 'tyg', cumple: tygOk, puntos: tygOk ? PUNTOS.TYG_ALTO : 0, valor: tyg.toFixed(2), umbral: '≥ 8,3' },
      { nombre: 'imc', cumple: imcOk, puntos: imcOk ? PUNTOS.IMC_ALTO : 0, valor: imc.toFixed(1), umbral: '≥ 27' },
      { nombre: 'hta', cumple: datos.hta, puntos: datos.hta ? PUNTOS.HTA : 0, umbral: '' },
      { nombre: 'familiar', cumple: datos.antecedenteFamiliar, puntos: datos.antecedenteFamiliar ? PUNTOS.FAMILIAR_DIABETES : 0, umbral: '' },
    ]

    let ptgoNivel: 'normoglucemia' | 'prediabetes' | 'diabetes' | null = null
    let ptgoInterpretacion = ''
    const tienePtgo = datos.ptgo1h != null && datos.ptgo1h > 0

    if (tienePtgo) {
      const ptgo = interpretarPtgo(datos.ptgo1h!)
      ptgoNivel = ptgo.nivel
      ptgoInterpretacion = ptgo.clave
    }

    const claveRecomendacion = recomendarClinica(nivelRiesgo, ptgoNivel, tienePtgo)

    resultado = {
      score,
      nivelRiesgo,
      componentes,
      ptgoInterpretacion,
      ptgoNivel,
      recomendacion: claveRecomendacion,
    }
  })

  function handleUnidadChange(unidad: 'mgdl' | 'mmoll') {
    unidadMedida = unidad
  }
</script>

<div class="min-h-screen bg-gray-100">
  <Header />

  <main class="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
      <PatientForm
        bind:data={datos}
        onValidChange={(valido) => formularioValido = valido}
        onUnidadChange={handleUnidadChange}
      />
      <ResultCard result={resultado} />
    </div>
  </main>

  <Footer />
</div>
