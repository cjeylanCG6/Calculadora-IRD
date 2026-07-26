<script lang="ts">
  import type { IRDResult } from '../lib/types/ird'
  import { UMBRALES } from '../lib/types/ird'
  import { t } from '../lib/i18n/index.svelte'

  let { result }: { result: IRDResult | null } = $props()

  const estiloBadge = $derived.by(() => {
    if (!result) return ''
    switch (result.nivelRiesgo) {
      case 'alto': return 'bg-red-100 text-red-800 border-red-200'
      case 'moderado': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  })

  const textoBadge = $derived.by(() => {
    if (!result) return ''
    switch (result.nivelRiesgo) {
      case 'alto': return t('result.badgeAlto')
      case 'moderado': return t('result.badgeModerado')
      default: return t('result.badgeBajo')
    }
  })

  const estiloPtgoBadge = $derived.by(() => {
    if (!result || !result.ptgoNivel) return ''
    switch (result.ptgoNivel) {
      case 'diabetes': return 'bg-red-100 text-red-800 border-red-200'
      case 'prediabetes': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  })
</script>

<div class="lg:sticky lg:top-24 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/50 space-y-5 sm:space-y-6">
  <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
    {t('result.title')}
  </h2>

  {#if result}
    <!-- === IRD Score + Badge === -->
    <div class="space-y-3">
      <div class="text-center py-5 sm:py-6 px-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('result.puntaje')}</span>
        <div class="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight">
          {result.score}
        </div>
        <span class="text-[10px] sm:text-xs text-slate-500 font-medium">{t('result.puntosMax')}</span>
      </div>

      <div class="flex items-center justify-between gap-2">
        <span class={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wide border ${estiloBadge}`}>
          {textoBadge}
        </span>
        <span class="text-[9px] sm:text-[10px] text-slate-400 font-semibold text-right">{t('result.corte')}</span>
      </div>
    </div>

    <!-- === Componentes del IRD === -->
    <div class="space-y-3">
      <h3 class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-600">{t('result.componentesTitle')}</h3>
      <ul class="space-y-1.5 sm:space-y-2">
        {#each result.componentes as componente}
          <li class="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span class="text-slate-700 min-w-0 truncate">
              {t(`componentes.${componente.nombre}`)}
              {#if componente.valor}
                <span class="text-[10px] sm:text-xs text-slate-400 ml-1">[{componente.valor}]</span>
              {/if}
            </span>
            <span class={`font-bold text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded shrink-0 ${componente.cumple ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'}`}>
              {#if componente.cumple}
                {t('componentes.si')} (+{componente.puntos} {t('componentes.pts')})
              {:else}
                {t('componentes.no')} (0 {t('componentes.pts')})
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    <hr class="border-slate-100" />

    <!-- === PTGO Interpretación === -->
    <div class="space-y-3">
      <h3 class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-600">{t('result.ptgoTitle')}</h3>
      {#if result.ptgoNivel}
        <span class={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border ${estiloPtgoBadge}`}>
          {t(result.ptgoInterpretacion)}
        </span>
      {:else}
        <p class="text-xs sm:text-sm text-slate-500">{t('result.ptgoSinValor')}</p>
      {/if}
    </div>

    <hr class="border-slate-100" />

    <!-- === Recomendación Clínica === -->
    <div class="space-y-3">
      <h3 class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-600">{t('result.recomendacionTitle')}</h3>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
        {t(result.recomendacion)}
      </p>
    </div>

    <!-- === Disclaimer === -->
    <div class="border-t border-dashed border-slate-200 pt-4 space-y-1">
      <p class="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">
        <strong>{t('footer.disclaimer')}</strong>
        {t('result.disclaimer')}
      </p>
      <p class="text-[9px] sm:text-[10px] text-slate-400 leading-relaxed">
        {t('result.tesisRef')}
      </p>
    </div>

  {:else}
    <!-- Estado vacío -->
    <div class="text-center py-5 sm:py-6 px-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
      <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t('result.puntaje')}</span>
      <div class="text-4xl sm:text-5xl font-black text-slate-300 tracking-tight">--</div>
      <p class="text-[10px] sm:text-xs text-slate-400 mt-2">
        {t('result.placeholder')}
      </p>
    </div>

    <div class="p-3 sm:p-4 rounded-xl border bg-slate-50 border-slate-200 text-slate-500 space-y-1">
      <div class="flex items-center gap-2 font-semibold text-xs sm:text-sm">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {t('result.title')}
      </div>
      <p class="text-[10px] sm:text-xs text-slate-400 leading-relaxed pl-6 sm:pl-7">
        {t('result.esperando')}
      </p>
    </div>
  {/if}
</div>
