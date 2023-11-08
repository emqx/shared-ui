import { createViteConfig } from '../../vite.config'

export default createViteConfig({
  name: '@emqx/shared-ui-i18n',
  entry: 'packages/i18n/lib/index.ts',
  fileName: 'index',
})
