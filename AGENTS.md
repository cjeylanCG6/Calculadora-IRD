# AGENTS.md

## Project

Svelte 5 + TypeScript + Vite 8 + Tailwind CSS 4 (no SvelteKit).

## Commands

- `pnpm dev` — Vite dev server
- `pnpm build` — production build
- `pnpm check` — typecheck (svelte-check + tsc, runs both tsconfigs)

No lint, format, or test scripts exist yet.

## Key conventions

- **Svelte 5**: uses `mount()`, not `new App()`. See `src/main.ts`.
- **Tailwind 4**: Vite plugin in `vite.config.ts`, imported as `@import "tailwindcss"` in `src/app.css`. No `tailwind.config.*` file — Tailwind 4 configures via CSS.
- **Two tsconfigs**: `tsconfig.app.json` covers `src/`, `tsconfig.node.json` covers `vite.config.ts`. The root `tsconfig.json` only has references.
- **Package manager**: pnpm. Always use `pnpm`, not npm or yarn.

## IRD App Structure

- **Tipos**: `src/lib/types/ird.ts` — interfaces y constantes del dominio
- **Componentes**: `src/lib/components/IRDCalculator.svelte` — formulario principal
- **Lógica**: `docs/logica-ird.md` — documentación de referencia (no integrada)

## UI Design Notes

- Componentes con Tailwind CSS 4 (clases utility)
- Svelte 5 runes: `$state`, `$derived`
- Layout responsive: max-w-2xl centrado
- Estados visuales: formulario limpio + resultado con colores (verde/rojo)
