import { App } from 'vue'
import FunctionForm from './form/processing/FunctionForm.vue'
import FilterForm from './form/processing/FilterForm.vue'
import useGenerateFlowDataUtils from './composables/useGenerateFlowDataUtils'
import useNodeForm from './composables/useNodeForm'
import FlowGuide from './form/FlowGuide.vue'
import FlowEdge from './form/FlowEdge.vue'
import useFlowGuideNodes from './composables/useFlowGuideNodes'
import useFlowNode from './composables/useFlowNode'
import useActionAndSourceStatus from './composables/useActionAndSourceStatus'
import FlowNode from './form/FlowNode.vue'
import useFlowEdge from './composables/useFlowEdge'
import useFlowEditorDataHandler from './composables/useFlowEditorDataHandler'
import useEditFlow from './composables/useEditFlow'
import AINodeForm from './form/processing/AINodeForm.vue'
import AITransportOptions from './form/processing/AITransportOptions.vue'

interface FlowComponentOptions {
  componentPrefix?: string
  locale?: 'zh' | 'en' | 'ja'
}

export default {
  install(app: App, options: FlowComponentOptions = { locale: 'en' }): void {
    const getComName = (rawName: string) => `${options.componentPrefix ?? ''}${rawName}`

    app.provide('flowLocale', options.locale)

    app.component(getComName('FunctionForm'), FunctionForm)
    app.component(getComName('FilterForm'), FilterForm)
    app.component(getComName('FlowGuide'), FlowGuide)
    app.component(getComName('FlowEdge'), FlowEdge)
    app.component(getComName('FlowNode'), FlowNode)
  },
}

export {
  FunctionForm,
  FilterForm,
  FlowGuide,
  FlowEdge,
  FlowNode,
  AINodeForm,
  AITransportOptions,
  useActionAndSourceStatus,
  useFlowGuideNodes,
  useFlowNode,
  useGenerateFlowDataUtils,
  useNodeForm,
  useFlowEdge,
  useFlowEditorDataHandler,
  useEditFlow,
}

export * from './types'
