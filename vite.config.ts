/// <reference types="vitest" />
// Shared base config in the root
import { resolve } from 'path'
import { UserConfigExport, PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

interface SharedConfigOptions {
  name: string
  entry: string
  fileName: string
}

export function createViteConfig({ name, entry, fileName }: SharedConfigOptions): UserConfigExport {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, entry),
        name: name,
        fileName: fileName,
      },
    },
    plugins: [dts() as PluginOption], // Cast as PluginOption if needed
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'istanbul',
      },
    },
  }
}
