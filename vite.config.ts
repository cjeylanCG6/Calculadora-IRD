import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.jpg', 'MINSAP_logo.jpg'],
      manifest: {
        name: 'Calculadora IRD - Índice de Riesgo de Disglucemia',
        short_name: 'IRD',
        description: 'Herramienta de apoyo a la decisión clínica para el cálculo del Índice de Riesgo de Disglucemia',
        theme_color: '#0d9488',
        background_color: '#f8fafc',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'MINSAP_logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'MINSAP_logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          },
          {
            src: 'MINSAP_logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
