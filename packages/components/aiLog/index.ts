import { App } from 'vue'
import ChatGuidance from './ChatGuidance.vue'
import ChatInput from './ChatInput.vue'
import ConnectionStatus from './ConnectionStatus.vue'
import UserMessage from './UserMessage.vue'

interface AILogComponentOptions {
  componentPrefix?: string
  locale?: 'zh' | 'en'
}

export default {
  install(app: App, options: AILogComponentOptions = { locale: 'en' }): void {
    const getComName = (rawName: string) => `${options.componentPrefix}${rawName}`

    app.provide('aiLogLocale', options.locale)

    app.component(getComName('ChatGuidance'), ChatGuidance)
    app.component(getComName('ChatInput'), ChatInput)
    app.component(getComName('ConnectionStatus'), ConnectionStatus)
    app.component(getComName('UserMessage'), UserMessage)
  },
}

export { ChatGuidance, ChatInput, ConnectionStatus, UserMessage }
