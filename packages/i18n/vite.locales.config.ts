import { defineConfig } from 'vite'
import { resolve } from 'path'

// Build separately to preserve the existing root ESM and UMD bundles.
// The main build emits declarations for all lib sources, including this entry.
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        'zh-TW/integration': resolve(__dirname, 'lib/zh-TW/integration.ts'),
        'zh-TW/ruleSQL': resolve(__dirname, 'lib/zh-TW/ruleSQL.ts'),
        'zh-TW/ruleFunction': resolve(__dirname, 'lib/zh-TW/ruleFunction.ts'),
        'zh-TW/flow': resolve(__dirname, 'lib/zh-TW/flow.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
  },
})
