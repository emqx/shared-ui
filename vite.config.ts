/// <reference types="vitest" />
// Shared base config in the root
import { resolve } from 'path'
import { UserConfigExport, PluginOption } from 'vite'
import dts from 'vite-plugin-dts'

interface SharedConfigOptions {
  name: string
  entry: string
  fileName: string
  external?: Array<string>
  globals?: Record<string, string>
}

export function createViteConfig({
  name,
  entry,
  fileName,
  external = [],
  globals = {},
}: SharedConfigOptions): UserConfigExport {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, entry),
        name: name,
        fileName: fileName,
      },
      rollupOptions: {
        external,
        output: {
          globals,
        },
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
