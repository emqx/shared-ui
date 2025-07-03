import { App } from 'vue'
import RuleFieldList from './json/ruleField.json'
import RuleFuncList from './json/ruleFunc.json'
import FunctionForm from './form/processing/FunctionForm.vue'
import FilterForm from './form/processing/FilterForm.vue'
import { useGenerateFlowDataUtils } from './composables/useGenerateFlowDataUtils'
import { useHandleFlowDataUtils } from './composables/useHandleFlowDataUtils'
import { createFunctionForm, createFilterForm } from './composables/useNodeForm'
import useParseWhere from './composables/useParseWhere'
import FlowGuide from './form/FlowGuide.vue'
import FlowEdge from './form/FlowEdge.vue'
import useFlowGuideNodes, { fallbackEdgeStyle } from './composables/useFlowGuideNodes'
import useFlowNode, {
  isNotBridgeSourceTypes,
  SourceTypeAllMsgsAndEvents,
  AI_PLACEHOLDER_TYPE,
} from './composables/useFlowNode'
import useActionAndSourceStatus from './composables/useActionAndSourceStatus'
import FlowNode from './form/FlowNode.vue'

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
  RuleFieldList,
  RuleFuncList,
  FunctionForm,
  useGenerateFlowDataUtils,
  useHandleFlowDataUtils,
  createFunctionForm,
  useParseWhere,
  FilterForm,
  createFilterForm,
  FlowGuide,
  FlowEdge,
  fallbackEdgeStyle,
  useFlowGuideNodes,
  useFlowNode,
  isNotBridgeSourceTypes,
  SourceTypeAllMsgsAndEvents,
  AI_PLACEHOLDER_TYPE,
  useActionAndSourceStatus,
  FlowNode,
}

export * from './types'
