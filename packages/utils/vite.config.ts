import { createViteConfig } from '../../vite.config'

export default createViteConfig({
  name: '@emqx/shared-ui-utils',
  entry: 'packages/utils/lib/index.ts',
  fileName: 'index',
})
