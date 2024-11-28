import { createViteConfig } from '../../vite.config'

export default createViteConfig({
  name: '@emqx/shared-ui-constants',
  entry: 'packages/constants/index.ts',
  fileName: 'index',
})
