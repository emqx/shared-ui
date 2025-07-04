import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: '@emqx/shared-ui-components',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        'element-plus',
        '@emqx/shared-ui-utils',
        '@vue-flow/core',
        'sortablejs',
        'elkjs/lib/elk.bundled',
      ],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@emqx/shared-ui-utils': 'SharedUIUtils',
          '@vue-flow/core': 'VueFlowCore',
          sortablejs: 'Sortable',
          'elkjs/lib/elk.bundled': 'ELK',
        },
      },
    },
    cssCodeSplit: false,
  },
  plugins: [vue(), visualizer()],
  resolve: {
    extensions: ['.ts', '.vue'],
  },
})
