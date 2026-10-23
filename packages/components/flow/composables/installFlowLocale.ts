import type { App } from 'vue'
import type { SharedLocaleMessages } from '@emqx/shared-ui-utils'

export interface FlowLocaleOptions {
  locale?: 'zh' | 'zh-TW' | 'en' | 'ja'
  messages?: SharedLocaleMessages
}

export const installFlowLocale = (app: App, options: FlowLocaleOptions = {}): void => {
  app.provide('flowLocale', options.locale ?? 'en')
  app.provide('flowLocaleMessages', options.messages)
}
