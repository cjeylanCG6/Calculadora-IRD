<script lang="ts">
  import { t } from '../lib/i18n/index.svelte';
</script>

<footer class="mt-12 sm:mt-16 border-t border-slate-200/80 bg-white/60 backdrop-blur-xs py-6 sm:py-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

    <p class="text-[11px] sm:text-xs text-slate-500 leading-relaxed text-center max-w-3xl mx-auto">
      {t('footer.nota')}
    </p>

    <div class="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
      <div class="space-y-1">
        <p class="text-xs font-semibold text-slate-700 flex items-center justify-center md:justify-start gap-1.5">
          <span>🔬</span>
          <span>{t('footer.disclaimer')}</span>
        </p>
        <p class="text-[11px] text-slate-500">
          {t('footer.especialista')}
        </p>
      </div>

      <div class="space-y-1 md:text-right">
        <p class="text-xs font-medium text-slate-600">
          {t('footer.desarrollado')} <span class="font-bold text-blue-600 hover:underline cursor-pointer">Cristian Jeylan Candelaria García</span>
        </p>
        <p class="text-[10px] text-slate-400">
          &copy; {new Date().getFullYear()} {t('footer.derechos')}
        </p>
      </div>
    </div>

  </div>
</footer>