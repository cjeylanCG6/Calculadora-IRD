<script lang="ts">
  import { t } from '../../lib/i18n/index.svelte'

  let { ptgo1h = $bindable(), ptgo2h = $bindable() }: {
    ptgo1h: number | null | undefined
    ptgo2h: number | null | undefined
  } = $props()

  const LIMITES = { min: 3, max: 30 } as const
</script>

<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
  <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
    {t('form.ptgo.title')}
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
    <div>
      <label for="ptgo1h" class="block text-xs font-semibold text-slate-600 mb-1">
        {t('form.ptgo.ptgo1h')}
      </label>
      <div class="relative rounded-xl border border-slate-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
        <input
          id="ptgo1h"
          type="number"
          step="0.1"
          min={LIMITES.min}
          max={LIMITES.max}
          placeholder={t('form.ptgo.ptgo1hPlaceholder')}
          bind:value={ptgo1h}
          class="w-full pl-3 pr-16 py-2.5 bg-transparent text-slate-900 font-semibold focus:outline-none text-sm"
        />
        <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">mmol/L</span>
      </div>
    </div>

    <div>
      <label for="ptgo2h" class="block text-xs font-semibold text-slate-600 mb-1">
        {t('form.ptgo.ptgo2h')}
      </label>
      <div class="relative rounded-xl border border-slate-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
        <input
          id="ptgo2h"
          type="number"
          step="0.1"
          min={LIMITES.min}
          max={LIMITES.max}
          placeholder={t('form.ptgo.ptgo2hPlaceholder')}
          bind:value={ptgo2h}
          class="w-full pl-3 pr-16 py-2.5 bg-transparent text-slate-900 font-semibold focus:outline-none text-sm"
        />
        <span class="absolute right-3 top-2.5 text-xs font-bold text-slate-400 pointer-events-none">mmol/L</span>
      </div>
    </div>
  </div>

  <p class="text-xs text-slate-400">{t('form.ptgo.referencia')}</p>
</div>
