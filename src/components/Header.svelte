<script lang="ts">
  import minsapLogo from '../assets/MINSAP_logo.jpg'
  import { t, getLocale, setLocale } from '../lib/i18n/index.svelte'

  let idioma = $derived(getLocale())
</script>

<header class="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-xs">
  <div class="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
    <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
      <img src={minsapLogo} alt="Logo MINSAP" class="w-9 h-9 sm:w-11 sm:h-11 rounded-3xl shrink-0" />
      <div class="min-w-0">
        <h1 class="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">{t('header.title')}</h1>
        <p class="text-[10px] sm:text-xs text-slate-500 font-medium truncate">{t('header.subtitle')}</p>
      </div>
    </div>

    <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <button
        type="button"
        onclick={() => setLocale(idioma === 'es' ? 'en' : 'es')}
        class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-xs font-bold"
        title={t('header.changeLang')}
      >
        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        {idioma === 'es' ? 'ES' : 'EN'}
      </button>

      <span class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
        <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> {t('header.version')}
      </span>
    </div>
  </div>
</header>
