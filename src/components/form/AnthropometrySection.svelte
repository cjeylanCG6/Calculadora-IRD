<script lang="ts">
  import { calcularIMC } from '../../lib/types/ird'
  import { t } from '../../lib/i18n/index.svelte'

  let { peso = $bindable(), talla = $bindable(), errorPeso, errorTalla }: {
    peso: number | null
    talla: number | null
    errorPeso: { valido: boolean; mensaje: string }
    errorTalla: { valido: boolean; mensaje: string }
  } = $props()

  const LIMITES = { peso: { min: 20, max: 300 }, talla: { min: 0.8, max: 2.5 } } as const

  const imcCalculado = $derived.by(() => {
    if (!peso || !talla || talla <= 0) return null
    const imc = calcularIMC(peso, talla)
    return { valor: imc.toFixed(1), esCumplido: imc >= 27 }
  })

  function claseCampo(error: { valido: boolean }, valor: number | null): string {
    if (valor === null) return 'border-slate-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20'
    if (!error.valido) return 'border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
    return 'border-emerald-400 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20'
  }
</script>

<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
  <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
    {t('form.antropometria.title')}
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1" for="peso">{t('form.antropometria.peso')}</label>
      <div class={`relative rounded-xl border transition-all ${claseCampo(errorPeso, peso)}`}>
        <input
          id="peso"
          type="number"
          step="0.1"
          min={LIMITES.peso.min}
          max={LIMITES.peso.max}
          placeholder={t('form.antropometria.pesoPlaceholder')}
          bind:value={peso}
          class="w-full pl-3 pr-10 py-2.5 bg-transparent text-slate-900 font-semibold focus:outline-none text-sm"
        />
        <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">kg</span>
      </div>
      {#if !errorPeso.valido}
        <p class="mt-1 text-xs text-red-500 font-medium">{errorPeso.mensaje}</p>
      {/if}
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-600 mb-1" for="talla">{t('form.antropometria.talla')}</label>
      <div class={`relative rounded-xl border transition-all ${claseCampo(errorTalla, talla)}`}>
        <input
          id="talla"
          type="number"
          step="0.01"
          min={LIMITES.talla.min}
          max={LIMITES.talla.max}
          placeholder={t('form.antropometria.tallaPlaceholder')}
          bind:value={talla}
          class="w-full pl-3 pr-10 py-2.5 bg-transparent text-slate-900 font-semibold focus:outline-none text-sm"
        />
        <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">m</span>
      </div>
      {#if !errorTalla.valido}
        <p class="mt-1 text-xs text-red-500 font-medium">{errorTalla.mensaje}</p>
      {/if}
    </div>
  </div>

  <div class="pt-3 border-t border-slate-100">
    <div class="text-sm font-bold">
      {t('form.antropometria.imcTitulo')}:
      {#if imcCalculado}
        <span class={imcCalculado.esCumplido ? 'text-teal-700' : 'text-slate-500'}>
          {imcCalculado.valor} kg/m² {imcCalculado.esCumplido ? t('form.antropometria.imcCumple') : t('form.antropometria.imcNoCumple')}
        </span>
      {:else}
        <span class="text-slate-400">—</span>
      {/if}
    </div>
    <p class="text-xs text-slate-400 mt-1">{t('form.antropometria.imcHint')}</p>
  </div>
</div>
