import { Position, type Node } from '@vue-flow/core'
import {
  BridgeType,
  FilterFormData,
  FilterFormType,
  FlowNodeType,
  FrontendSinkType,
  FrontendSourceType,
  NodeItem,
  NodeType,
  PositionData,
  ProcessingType,
} from '../types'
import { useFlowLocale } from './useFlowLocale'

export const isNotBridgeSourceTypes = [FrontendSourceType.Event, FrontendSourceType.Message]

/**
 * Cannot be added, only for show webhook
 */
export const SourceTypeAllMsgsAndEvents = 'all-msgs-and-events'

/**
 * Because the exact type of the ai node needs to be known after the details are fetched,
 * in order to treat the data as an ai node when processing it, assign a placeholder to it first.
 */
export const AI_PLACEHOLDER_TYPE = 'ai-placeholder'

export default (): {
  nodeWidth: number
  processingNodeList: Array<NodeItem>
  getNodeClass: (type: NodeType) => string
  getFlowNodeHookPosition: (nodeType: FlowNodeType) => PositionData
  getTypeCommonData: (type: NodeType) => { type: FlowNodeType; class: string } & PositionData
  isBridgerNode: (node: Partial<Node>) => boolean
  isActionBridgeNode: (node: Partial<Node>) => boolean
  isWithFallbackNodes: (node: Node) => boolean
  isBridgeType: (type: string) => boolean
  isAIType: (type: string) => boolean
  isLikeFunctionType: (type: string) => boolean
  getCommonTypeLabel: (specificType: string) => string
  getNodeInfoFunc: (node: Node, getEventLabel: (event: string) => string) => string
} => {
  const { t } = useFlowLocale()

  /**
   * just record, not for setting
   */
  const nodeWidth = 200

  const nodeClassMap: Record<NodeType, string> = {
    [NodeType.Source]: 'node-source',
    [NodeType.Processing]: 'node-processing',
    [NodeType.Sink]: 'node-sink',
    [NodeType.Fallback]: 'node-sink',
  }
  const getNodeClass = (type: NodeType) => nodeClassMap[type]

  const getFlowNodeHookPosition = (nodeType: FlowNodeType) => {
    if (nodeType === FlowNodeType.Input) {
      return { sourcePosition: Position.Right }
    }
    if (nodeType === FlowNodeType.Output) {
      return { targetPosition: Position.Left }
    }
    return { sourcePosition: Position.Right, targetPosition: Position.Left }
  }

  const typeMap = {
    [NodeType.Source]: FlowNodeType.Input,
    [NodeType.Processing]: FlowNodeType.Default,
    [NodeType.Sink]: FlowNodeType.Output,
    [NodeType.Fallback]: FlowNodeType.Output,
  }
  const getTypeCommonData = (type: NodeType) => {
    const flowNodeType = typeMap[type]
    return {
      class: `node-item ${getNodeClass(type)}`,
      type: flowNodeType,
      ...getFlowNodeHookPosition(flowNodeType),
    }
  }

  const commonTypeLabelMap: Record<string, string> = {
    [FrontendSourceType.Message]: t('flow.message'),
    [FrontendSourceType.Event]: t('flow.event'),
    [ProcessingType.Function]: t('flow.dataProcessing'),
    [ProcessingType.Filter]: t('flow.filter'),
    [ProcessingType.AIOpenAI]: 'OpenAI',
    [ProcessingType.AIAnthropic]: 'Anthropic',
    [ProcessingType.AIGemini]: 'Gemini',
    [FrontendSinkType.Console]: t('flow.consoleOutput'),
    [FrontendSinkType.Republish]: t('flow.republish'),
  }
  const getCommonTypeLabel = (specificType: string): string => {
    return commonTypeLabelMap[specificType] || ''
  }

  const countFiltersNum = (filter: FilterFormData) => {
    return filter.items.reduce((count, item) => {
      if ('items' in item) {
        count += countFiltersNum(item)
      } else {
        count += 1
      }
      return count
    }, 0)
  }

  const isNotBridgeSourceNodeSpecificTypes = [
    FrontendSourceType.Message,
    FrontendSourceType.Event,
    SourceTypeAllMsgsAndEvents,
  ]
  const isNotBridgeSinkNodeTypes = [FrontendSinkType.Console, FrontendSinkType.Republish]
  /**
   * ‼️‼️‼️ bridge node contains source and action node
   */
  const isBridgerNode = ({ type, data }: Partial<Node>): boolean => {
    const { specificType } = data || {}
    return (
      (type === FlowNodeType.Input &&
        !isNotBridgeSourceNodeSpecificTypes.includes(specificType as string)) ||
      (type === FlowNodeType.Output && !isNotBridgeSinkNodeTypes.includes(specificType))
    )
  }
  const isActionBridgeNode = (node: Partial<Node>): boolean =>
    node.type === FlowNodeType.Output && isBridgerNode(node)

  const isWithFallbackNodes = (node?: Node) => {
    if (!node || node?.type !== FlowNodeType.Output || !isBridgerNode(node)) {
      return false
    }
    const fallbackActions = node.data.formData?.fallback_actions ?? []
    return fallbackActions.length > 0
  }

  const isNotBridgeTypes: Array<string> = [
    ...isNotBridgeSourceTypes,
    ...Object.values(ProcessingType),
    FrontendSinkType.Republish,
    FrontendSinkType.Console,
  ]
  const isBridgeType = (type: string) => {
    const isBridge = Object.entries(BridgeType).some(([, value]) => value === type)
    return !isNotBridgeTypes.includes(type) && isBridge
  }

  const defaultTypesNotAI = [ProcessingType.Filter, ProcessingType.Function]
  const isAIType = (type: string) => {
    return (
      type === AI_PLACEHOLDER_TYPE ||
      (Object.values(ProcessingType).includes(type as ProcessingType) &&
        !defaultTypesNotAI.includes(type as ProcessingType))
    )
  }

  const isLikeFunctionType = (type: string) => {
    return isAIType(type) || type === ProcessingType.Function
  }

  const getFilterInfo = (filter: FilterFormType) => {
    const num = countFiltersNum(filter.form)
    return `${num} ${t('flow.condition', num)}`
  }

  const getNodeInfoFunc = (node: Node, getEventLabel: (event: string) => string): string => {
    const { specificType, formData } = node.data
    if (!specificType || !formData) {
      return ''
    }
    if (isAIType(specificType)) {
      return `${t('flow.systemPrompt')}${t('common.colon')}${formData.system_prompt}`
    }
    switch (specificType) {
      case FrontendSourceType.Message:
        return `${t('common.topic')}${t('common.colon')}${formData.topic}`
      case FrontendSourceType.Event:
        return `${t('flow.event')}${t('common.colon')}${getEventLabel(formData.event)}`
      case ProcessingType.Function:
        return ''
      case ProcessingType.Filter:
        return getFilterInfo(formData)
      case FrontendSinkType.Console:
        return ''
      case FrontendSinkType.Republish:
        return `${t('common.topic')}${t('common.colon')}${formData.args?.topic}`
      default:
        return `${t('common.name')}${t('common.colon')}${formData.name}`
    }
  }

  const generateProcessingNodeByType = (type: string): NodeItem => ({
    name: getCommonTypeLabel(type),
    specificType: type,
  })
  const processingNodeList: Array<NodeItem> = Object.values(ProcessingType).map(
    generateProcessingNodeByType,
  )

  return {
    nodeWidth,
    processingNodeList,
    getNodeClass,
    getFlowNodeHookPosition,
    getTypeCommonData,
    isBridgerNode,
    isActionBridgeNode,
    isWithFallbackNodes,
    isBridgeType,
    isAIType,
    isLikeFunctionType,
    getCommonTypeLabel,
    getNodeInfoFunc,
  }
}
