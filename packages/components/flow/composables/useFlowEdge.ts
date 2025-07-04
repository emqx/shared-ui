import { FlowNodeType, FrontendSinkType, ProcessingType } from '@emqx/shared-ui-constants'
import useFlowNode from './useFlowNode'
import { useFlowLocale } from './useFlowLocale'
import type { Node } from '@vue-flow/core'
import type { ConnectionEdge } from '../types'

export default (): {
  checkConnection: (
    edge: ConnectionEdge,
    customValidator?: (edge: ConnectionEdge) => string,
  ) => Promise<void>
  isInputNode: (node: Node) => boolean
  isOutputNode: (node: Node) => boolean
  isDefaultNode: (node: Node) => boolean
} => {
  const { t } = useFlowLocale()

  const isInputNode = (node: Node) => node.type === FlowNodeType.Input
  const isOutputNode = (node: Node) => node.type === FlowNodeType.Output
  const isDefaultNode = (node: Node) => node.type === FlowNodeType.Default
  const { isBridgerNode, isActionBridgeNode, isWithFallbackNodes, isLikeFunctionType } =
    useFlowNode()
  const checkConnection = async (
    edge: ConnectionEdge,
    customValidator?: (edge: ConnectionEdge) => string,
  ) => {
    const { sourceNode, targetNode } = edge
    if (
      sourceNode.id === targetNode.id ||
      (isInputNode(sourceNode) && isInputNode(targetNode)) ||
      (isOutputNode(sourceNode) && isOutputNode(targetNode) && !isBridgerNode(sourceNode))
    ) {
      return Promise.reject(t('flow.incorrectConnection'))
    }
    if (isDefaultNode(sourceNode) && isDefaultNode(targetNode)) {
      const sourceType = sourceNode.data?.specificType
      const targetType = targetNode.data?.specificType
      if (!sourceType || !targetType) {
        return Promise.resolve()
      }
      if (sourceType === ProcessingType.Filter && isLikeFunctionType(targetType)) {
        return Promise.reject(t('flow.filterFunctionsWrongOrder'))
      }
    }
    if (isActionBridgeNode(sourceNode)) {
      if (targetNode.data.specificType === FrontendSinkType.Console) {
        return Promise.reject(t('flow.consoleFallbackWrong'))
      }
      if (isWithFallbackNodes(targetNode)) {
        return Promise.reject(t('flow.multipleFallbackWrong'))
      }
    }

    if (customValidator) {
      const errorMessage = customValidator(edge)
      if (errorMessage) {
        return Promise.reject(errorMessage)
      }
    }
    return Promise.resolve()
  }

  return {
    checkConnection,
    isInputNode,
    isOutputNode,
    isDefaultNode,
  }
}
