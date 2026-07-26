<script lang="ts">
  import { t } from '../../lib/i18n/index.svelte'

  let { hta = $bindable(), antecedenteFamiliar = $bindable() }: {
    hta: boolean
    antecedenteFamiliar: boolean
  } = $props()
</script>

<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-0">
  <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 mb-0">
    {t('form.antecedentes.title')}
  </h2>

  <div class="flex items-center justify-between gap-4 py-3 border-b border-slate-100">
    <span id="label-hta" class="text-sm font-medium text-slate-700">{t('form.antecedentes.hta')}</span>
    <label class="relative inline-flex items-center cursor-pointer shrink-0">
      <input type="checkbox" role="switch" aria-labelledby="label-hta" bind:checked={hta} class="sr-only peer" />
      <div class="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-teal-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
    </label>
  </div>

  <div class="flex items-center justify-between gap-4 py-3">
    <div class="min-w-0">
      <span id="label-familiar" class="text-sm font-medium text-slate-700 block">{t('form.antecedentes.familiar')}</span>
      <span class="text-xs text-slate-400 font-normal block">{t('form.antecedentes.familiarDesc')}</span>
    </div>
    <label class="relative inline-flex items-center cursor-pointer shrink-0">
      <input type="checkbox" role="switch" aria-labelledby="label-familiar" bind:checked={antecedenteFamiliar} class="sr-only peer" />
      <div class="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-teal-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
    </label>
  </div>
</div>
