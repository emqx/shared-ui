import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: '@emqx/shared-ui-constants',
      fileName: 'index',
    },
  },
  plugins: [dts()],
})
