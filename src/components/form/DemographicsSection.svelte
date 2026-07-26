<script lang="ts">
  import { t } from '../../lib/i18n/index.svelte'

  let { edad = $bindable(), sexo = $bindable() }: {
    edad: number | null | undefined
    sexo: string | undefined
  } = $props()
</script>

<div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
  <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
    {t('form.demografia.title')}
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
    <div>
      <label for="edad" class="block text-xs font-semibold text-slate-600 mb-1">
        {t('form.demografia.edad')}
      </label>
      <input
        id="edad"
        type="number"
        min={18}
        max={120}
        placeholder="Ej: 45"
        bind:value={edad}
        class="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-transparent text-slate-900 font-semibold focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm"
      />
    </div>
    <div>
      <label for="sexo" class="block text-xs font-semibold text-slate-600 mb-1">
        {t('form.demografia.sexo')}
      </label>
      <select
        id="sexo"
        bind:value={sexo}
        class="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm"
      >
        <option value="">{t('form.demografia.sexoPlaceholder')}</option>
        <option value="M">{t('form.demografia.sexoM')}</option>
        <option value="F">{t('form.demografia.sexoF')}</option>
      </select>
    </div>
  </div>
</div>
