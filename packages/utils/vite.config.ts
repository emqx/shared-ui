import { createViteConfig } from '../../vite.config'

export default createViteConfig({
  name: '@emqx/shared-ui-utils',
  entry: 'packages/utils/lib/index.ts',
  fileName: 'index',
  external: ['@emqx/shared-ui-constants', '@emqx/shared-ui-i18n'],
  globals: {
    '@emqx/shared-ui-constants': 'SharedUIConstants',
    '@emqx/shared-ui-i18n': 'SharedUII18n',
  },
})
