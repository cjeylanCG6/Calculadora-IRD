<script lang="ts">
  import { calcularTyG } from '../../lib/types/ird'
  import { t } from '../../lib/i18n/index.svelte'

  let { glucemia = $bindable(), trigliceridos = $bindable(), unidadMedida = $bindable(), errorGlucemia, errorTrigliceridos, onUnidadChange }: {
    glucemia: number | null
    trigliceridos: number | null
    unidadMedida: 'mgdl' | 'mmoll'
    errorGlucemia: { valido: boolean; mensaje: string }
    errorTrigliceridos: { valido: boolean; mensaje: string }
    onUnidadChange?: (unidad: 'mgdl' | 'mmoll') => void
  } = $props()

  function cambiarUnidad(unidad: 'mgdl' | 'mmoll') {
    unidadMedida = unidad
    onUnidadChange?.(unidad)
  }

  const tygCalculado = $derived.by(() => {
    if (!trigliceridos || !glucemia || trigliceridos <= 0 || glucemia <= 0) return null
    const tyg = calcularTyG(glucemia, trigliceridos, unidadMedida)
    return { valor: tyg.toFixed(2), esCumplido: tyg >= 8.3 }
  })

  function claseCampo(error: { valido: boolean }, valor: number | null): string {
    if (valor === null) return 'border-slate-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20'
    if (!error.valido) return 'border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
    return 'border-emerald-400 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20'
  }
</script>

<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
  <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
    {t('form.lipidos.title')}
  </h2>

  <div class="flex items-center justify-between pb-2">
    <span class="text-xs text-slate-500 font-medium">{t('form.lipidos.unidadLabel')}</span>
    <div class="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
      <button
        type="button"
        onclick={() => cambiarUnidad('mgdl')}
        class={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${unidadMedida === 'mgdl' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
      >
        mg/dL
      </button>
      <button
        type="button"
        onclick={() => cambiarUnidad('mmoll')}
        class={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${unidadMedida === 'mmoll' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
      >
        mmol/L
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1" for="tg">{t('form.lipidos.trigliceridos')}</label>
      <div class={`relative rounded-xl border transition-all ${claseCampo(errorTrigliceridos, trigliceridos)}`}>
        <input
          id="tg"
          type="number"
          step="0.1"
          placeholder={unidadMedida === 'mgdl' ? t('form.lipidos.trigliceridosPlaceholderMgdl') : t('form.lipidos.trigliceridosPlaceholderMmoll')}
          bind:value={trigliceridos}
          class="w-full pl-3 pr-16 py-2.5 bg-transparent text-slate-900 font-semibold focus:outline-none text-sm"
        />
        <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">{unidadMedida === 'mmoll' ? 'mmol/L' : 'mg/dL'}</span>
      </div>
      {#if !errorTrigliceridos.valido}
        <p class="mt-1 text-xs text-red-500 font-medium">{errorTrigliceridos.mensaje}</p>
      {/if}
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1" for="g">{t('form.lipidos.glucemia')}</label>
      <div class={`relative rounded-xl border transition-all ${claseCampo(errorGlucemia, glucemia)}`}>
        <input
          id="g"
          type="number"
          step="0.1"
          placeholder={unidadMedida === 'mgdl' ? t('form.lipidos.glucemiaPlaceholderMgdl') : t('form.lipidos.glucemiaPlaceholderMmoll')}
          bind:value={glucemia}
          class="w-full pl-3 pr-16 py-2.5 bg-transparent text-slate-900 font-semibold focus:outline-none text-sm"
        />
        <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">{unidadMedida === 'mmoll' ? 'mmol/L' : 'mg/dL'}</span>
      </div>
      {#if !errorGlucemia.valido}
        <p class="mt-1 text-xs text-red-500 font-medium">{errorGlucemia.mensaje}</p>
      {/if}
    </div>
  </div>

  <div class="pt-3 border-t border-slate-100">
    <div class="text-sm font-bold">
      {t('form.lipidos.tygTitulo')}:
      {#if tygCalculado}
        <span class={tygCalculado.esCumplido ? 'text-teal-700' : 'text-slate-500'}>
          {tygCalculado.valor} {tygCalculado.esCumplido ? t('form.lipidos.tygCumple') : t('form.lipidos.tygNoCumple')}
        </span>
      {:else}
        <span class="text-slate-400">—</span>
      {/if}
    </div>
    <p class="text-xs text-slate-400 mt-1">{t('form.lipidos.tygHint')}</p>
  </div>
</div>
