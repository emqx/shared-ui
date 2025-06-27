import { App } from 'vue'
import RuleFieldList from './json/ruleField.json'
import RuleFuncList from './json/ruleFunc.json'
import FunctionForm from './form/processing/FunctionForm.vue'
import { useGenerateFlowDataUtils } from './composables/useGenerateFlowDataUtils'
import { useHandleFlowDataUtils } from './composables/useHandleFlowDataUtils'
import { createFunctionForm } from './composables/useNodeForm'

interface FlowComponentOptions {
  componentPrefix?: string
  locale?: 'zh' | 'en' | 'ja'
}

export default {
  install(app: App, options: FlowComponentOptions = { locale: 'en' }): void {
    const getComName = (rawName: string) => `${options.componentPrefix ?? ''}${rawName}`

    app.provide('flowLocale', options.locale)

    app.component(getComName('FunctionForm'), FunctionForm)
  },
}

export {
  RuleFieldList,
  RuleFuncList,
  FunctionForm,
  useGenerateFlowDataUtils,
  useHandleFlowDataUtils,
  createFunctionForm,
}

export * from './types'
