import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin(),
    laravel({
      input: ['resources/ts/main.tsx'],
      refresh: true,
    }),
  ],
})
