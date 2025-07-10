import {
  AI_FUNCTION_NAME,
  DEFAULT_SELECT,
  FlowNodeType,
  FrontendSinkType,
  FrontendSourceType,
  ProcessingType,
  RULE_INPUT_BRIDGE_TYPE_PREFIX,
  FallbackActionKind,
} from '@emqx/shared-ui-constants'
import { checkNeedRequestAPI, getBridgeKey } from '@emqx/shared-ui-utils'
import { Node } from '@vue-flow/core'
import { groupBy, omit } from 'lodash'
import { useFlowLocale } from './useFlowLocale'
import useHandleFlowDataUtils from './useHandleFlowDataUtils'
import useFlowNode from './useFlowNode'
import type {
  AICompletionProfile,
  AIProviderForm,
  BridgeData,
  EdgeData,
  FallbackAction,
  FlowDataItemForSubmit,
  FlowDataMap,
  NodeData,
  NodesAfterGroup,
} from '../types'
import useFlowEdge from './useFlowEdge'

export default (): {
  getFromDataFromNodes: (nodes: Array<NodeData>) => Array<string>
  getFieldsExpressionsFromNode: (nodes: Array<NodeData>, edges: Array<EdgeData>) => string
  getFallbackItemDataFromNode: (node: NodeData | Node) => FallbackAction | undefined
  getFilterStrFromNodes: (nodes: Array<NodeData>) => string
  getBridgesFromNodes: (nodes: Array<NodeData>) => Array<BridgeData>
  getAIProvidersAndCompletionsFromNodes: (nodes: Array<NodeData>) => {
    aiProviders: Array<FlowDataItemForSubmit<AIProviderForm>>
    aiCompletions: Array<FlowDataItemForSubmit<AICompletionProfile>>
  }
  getFallbackActionsFromNodes: (nodes: Array<NodeData>) => (FallbackAction | undefined)[]
  validateFlow: (
    flowData: FlowDataMap,
    customCheckConnection?: (edge: EdgeData) => string,
    customCheckFallback?: (edges: Array<EdgeData>, notFallbackEdges: Array<EdgeData>) => string,
  ) => Promise<undefined>
  groupNodes: (nodes: Array<NodeData>) => NodesAfterGroup
} => {
  const { t } = useFlowLocale()

  const { getFuncExpressionFromForm, getFilterExpressionFromForm } = useHandleFlowDataUtils()
  const { isActionBridgeNode, isBridgerNode, isAIType } = useFlowNode()

  /**
   * At least one input node and one output node are required
   */
  const verifyIntegrityOfFlow = async (flowData: FlowDataMap) => {
    const { nodes } = flowData
    const inputNode = nodes.find(({ type }) => type === FlowNodeType.Input)
    // is output node
    const outputNode = nodes.find(({ type }) => type === FlowNodeType.Output)
    if (!inputNode && !outputNode) {
      return Promise.reject(t('flow.flowEmptyError'))
    }
    if (!inputNode || !outputNode) {
      return Promise.reject(
        t('flow.flowIntegrityError', { missing: !inputNode ? 'Source' : 'Sink' }),
      )
    }
    return Promise.resolve()
  }

  const verifyIsolatedNode = async ({ nodes, edges }: FlowDataMap) => {
    const nodesWithEdge = edges.reduce(
      (arr, { source, target }) => arr.add(source).add(target),
      new Set(),
    )
    const isolatedNodes = nodes.filter(({ id }) => !nodesWithEdge.has(id))
    return isolatedNodes.length > 0
      ? Promise.reject(t('flow.isolatedNodeError', isolatedNodes.length))
      : Promise.resolve()
  }

  const { checkConnection } = useFlowEdge()
  const verifyConnection = async (
    flowData: FlowDataMap,
    customCheckConnection?: (edge: EdgeData) => string,
    customCheckFallback?: (edges: Array<EdgeData>, notFallbackEdges: Array<EdgeData>) => string,
  ) => {
    const { nodes, edges } = flowData
    try {
      await Promise.all(edges.map((item) => checkConnection(item, customCheckConnection)))
      const notFallbackEdges: Array<EdgeData> = []
      const fallbackEdges: Array<EdgeData> = []
      edges.forEach((edge) => {
        const sourceNode = edge.sourceNode
        if (isActionBridgeNode(sourceNode)) {
          fallbackEdges.push(edge)
        } else {
          notFallbackEdges.push(edge)
        }
      })
      const checkNodeFlow = async (nodeId: string, checkDirection: 'in' | 'out') => {
        const outputTypeSet = notFallbackEdges.reduce(
          (set: Set<FlowNodeType>, edge): Set<FlowNodeType> => {
            const target = checkDirection === 'in' ? edge.target : edge.source
            if (target === nodeId) {
              const node = checkDirection === 'in' ? edge.sourceNode : edge.targetNode
              set.add(node.type as FlowNodeType)
            }
            return set
          },
          new Set() as Set<FlowNodeType>,
        )
        return [...outputTypeSet].length > 1
          ? Promise.reject(t('flow.incorrectConnection'))
          : Promise.resolve()
      }
      const checkFallbackEdges = (edges: Array<EdgeData>) => {
        if (customCheckFallback) {
          const errorMessage = customCheckFallback(edges, notFallbackEdges)
          if (errorMessage) {
            return Promise.reject(errorMessage)
          }
        }

        const isAllFallbackEdgesRight = edges.every((edge) => {
          const sourceNode = edge.sourceNode
          const targetNode = edge.targetNode
          return (
            isActionBridgeNode(sourceNode) &&
            (isActionBridgeNode(targetNode) ||
              targetNode.data.specificType === FrontendSinkType.Republish)
          )
        })
        return isAllFallbackEdgesRight
          ? Promise.resolve()
          : Promise.reject(t('flow.incorrectConnection'))
      }
      const allDirections: ['in', 'out'] = ['in', 'out']
      return Promise.all([
        ...nodes.map(({ id, type, data }) => {
          if (!type || !data.specificType) {
            return Promise.resolve()
          }
          return Promise.all(allDirections.map((direction) => checkNodeFlow(id, direction)))
        }),
        checkFallbackEdges(fallbackEdges),
      ])
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  /**
   * For nodes of default type, except for the first and last nodes,
   * all other nodes should have a single entry and a single exit,
   * the first node should have a single exit, and the last node should have a single entry.
   */
  const verifyDefaultNodeConnection = async (flowData: FlowDataMap) => {
    const { nodes, edges } = flowData
    const defaultNodes = nodes.filter(({ type }) => type === FlowNodeType.Default)
    if ([0, 1, 2].includes(defaultNodes.length)) {
      return Promise.resolve()
    }
    const firstDefaultNode = edges.find(({ sourceNode, targetNode }) => {
      return sourceNode.type === FlowNodeType.Input && targetNode.type === FlowNodeType.Default
    })?.targetNode

    const lastDefaultNode = edges.find(({ sourceNode, targetNode }) => {
      return sourceNode.type === FlowNodeType.Default && targetNode.type === FlowNodeType.Output
    })?.sourceNode
    if (!firstDefaultNode || !lastDefaultNode) {
      console.error('Can not handle this case')
      return Promise.reject(t('flow.incorrectConnection'))
    }
    const otherDefaultNodes = defaultNodes.filter(
      (node) => node.id !== firstDefaultNode.id && node.id !== lastDefaultNode.id,
    )
    const findNodeEdges = (node: NodeData | Node, isToNode: boolean): Array<EdgeData> =>
      edges.filter(({ sourceNode, targetNode }) =>
        isToNode ? targetNode.id === node.id : sourceNode.id === node.id,
      )

    const nodeEdges: Array<Array<EdgeData>> = [
      findNodeEdges(firstDefaultNode, false),
      findNodeEdges(lastDefaultNode, true),
      ...otherDefaultNodes.map((node) => findNodeEdges(node, false)),
      ...otherDefaultNodes.map((node) => findNodeEdges(node, true)),
    ]
    const isAllSingleEdge = nodeEdges.every((edges) => edges.length === 1)
    return !isAllSingleEdge ? Promise.reject(t('flow.incorrectConnection')) : Promise.resolve()
  }

  const isSimpleChain = (nodes: Array<NodeData>, edges: Array<EdgeData>) => {
    const graph = new Map()
    nodes.forEach((node) => graph.set(node.id, []))
    edges.forEach((edge) => {
      if (!graph.get(edge.source)) {
        graph.set(edge.source, [])
      }
      if (!graph.get(edge.target)) {
        graph.set(edge.target, [])
      }
      graph.get(edge.source).push(edge.target)
      graph.get(edge.target).push(edge.source)
    })

    const visited = new Set()
    const dfs = (id: string) => {
      visited.add(id)
      for (const neighbor of graph.get(id)) {
        if (!visited.has(neighbor)) {
          dfs(neighbor)
        }
      }
    }
    dfs(nodes[0].id)
    if (visited.size !== nodes.length) {
      return false
    }

    let degree1 = 0,
      degree2 = 0
    for (const neighbors of graph.values()) {
      if (neighbors.length === 1) {
        degree1++
      } else if (neighbors.length === 2) {
        degree2++
      } else {
        return false
      }
    }
    return degree1 === 2 && degree2 === nodes.length - 2
  }

  /**
   * - All non-output nodes must have an out edge.
   * - Output nodes can have output edges (action with fallback actions).
   * - All non-input nodes must have an input edge.
   * - All input nodes, if not directly connected to output nodes, must connect to the same node.
   * - All non-fallback nodes' output nodes, if not directly connected to input nodes, must connect to the same node.
   * - All data processing nodes must be connected end to end.
   */
  const verifyFlowIsRight = async ({ nodes, edges }: FlowDataMap) => {
    const groupedNodes = groupBy(nodes, 'type')
    if (!groupedNodes[FlowNodeType.Default]?.length) {
      // TODO: next version - check connection
      return Promise.resolve()
    }
    const allInputToNodes = edges.reduce((set, { sourceNode, targetNode }) => {
      if (sourceNode.type === FlowNodeType.Input) {
        set.add(targetNode.id)
      }
      return set
    }, new Set())
    if (allInputToNodes.size > 1) {
      return Promise.reject(t('flow.incorrectInputOutputConnection'))
    }
    const allOutputFromNodes = edges.reduce((set, { targetNode, sourceNode }) => {
      // Filter fallback edges
      if (targetNode.type === FlowNodeType.Output && !isActionBridgeNode(sourceNode)) {
        set.add(sourceNode.id)
      }
      return set
    }, new Set())
    if (allOutputFromNodes.size > 1) {
      return Promise.reject(t('flow.incorrectOutputNodeConnection'))
    }
    const defaultNodes = groupedNodes[FlowNodeType.Default] ?? []
    let isAllRight = true
    const defaultEdges = edges.filter(({ sourceNode, targetNode }) => {
      return sourceNode.type === FlowNodeType.Default && targetNode.type === FlowNodeType.Default
    })
    if (defaultEdges.length) {
      isAllRight = isSimpleChain(defaultNodes, defaultEdges)
    }
    return !isAllRight
      ? Promise.reject(t('flow.incorrectDefaultNodeConnection'))
      : Promise.resolve()
  }

  const verifyMultipleFlow = async ({ edges }: FlowDataMap) => {
    const graph: Map<string, Array<string>> = new Map()

    for (const edge of edges) {
      if (!graph.get(edge.source)) {
        graph.set(edge.source, [])
      }
      if (!graph.has(edge.target)) {
        graph.set(edge.target, [])
      }
      ;(graph.get(edge.source) as Array<string>).push(edge.target)
      ;(graph.get(edge.target) as Array<string>).push(edge.source)
    }

    const visited: Set<string> = new Set()
    function dfs(nodeId: string) {
      visited.add(nodeId)
      const neighbors = graph.get(nodeId)
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            dfs(neighbor)
          }
        }
      }
    }

    let numberOfConnectedComponents = 0

    for (const nodeId of graph.keys()) {
      if (!visited.has(nodeId)) {
        dfs(nodeId)
        numberOfConnectedComponents++
      }
    }

    return numberOfConnectedComponents > 1
      ? Promise.reject(t('flow.multipleFlowError'))
      : Promise.resolve()
  }

  const validateFlow = async (
    flowData: FlowDataMap,
    customCheckConnection?: (edge: EdgeData) => string,
    customCheckFallback?: (edges: Array<EdgeData>, notFallbackEdges: Array<EdgeData>) => string,
  ) => {
    try {
      await verifyIntegrityOfFlow(flowData)
      await verifyIsolatedNode(flowData)
      await verifyConnection(flowData, customCheckConnection, customCheckFallback)
      await verifyDefaultNodeConnection(flowData)
      await verifyMultipleFlow(flowData)
      await verifyFlowIsRight(flowData)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const groupNodes = (nodes: Array<NodeData>): NodesAfterGroup =>
    groupBy(nodes, 'type') as NodesAfterGroup

  const getFromDataFromNodes = (nodes: Array<NodeData>): Array<string> => {
    return nodes.reduce((ret: Array<string>, node) => {
      if (node.type !== FlowNodeType.Input) {
        return ret
      }
      const { specificType, formData } = node.data
      const isBridge = isBridgerNode(node)
      let data = ''
      if (isBridge) {
        data = `${RULE_INPUT_BRIDGE_TYPE_PREFIX}${getBridgeKey({
          type: node.data.formData.type,
          name: node.data.formData.name,
        })}`
      } else {
        switch (specificType) {
          case FrontendSourceType.Message:
            data = formData.topic
            break
          case FrontendSourceType.Event:
            data = formData.event
            break
          default:
            return ret
        }
      }
      ret.push(data)
      return ret
    }, [])
  }

  const getFilterStrFromNodes = (nodes: Array<NodeData>): string => {
    const filterNode = nodes.find(({ data }) => data.specificType === ProcessingType.Filter)
    const filterData = filterNode?.data.formData
    if (!filterData) {
      return ''
    }
    return getFilterExpressionFromForm(filterData)
  }

  /**
   * Processing Node and AI Node are processing nodes
   */
  const isProcessingNode = (node: NodeData) => {
    const { specificType } = node.data
    return specificType === ProcessingType.Function || isAIType(specificType)
  }

  const getNextNodes = (node: NodeData, edges: Array<EdgeData>): Array<NodeData> | undefined => {
    const nextNodes = edges.filter(({ sourceNode }) => sourceNode.id === node.id)
    if (!nextNodes.length) {
      return undefined
    }
    return nextNodes.map(({ targetNode }) => targetNode as NodeData)
  }
  const sortProcessingNodesByEdges = (_nodes: Array<NodeData>, edges: Array<EdgeData>) => {
    const firstNode = edges.find(({ sourceNode, targetNode }) => {
      const isNotFromProcessingNode = !isProcessingNode(sourceNode as NodeData)
      const isToProcessingNode = isProcessingNode(targetNode as NodeData)
      return isNotFromProcessingNode && isToProcessingNode
    })
    if (!firstNode) {
      return []
    }
    const sortedNodes: Array<NodeData> = [firstNode.targetNode as NodeData]
    let nextNodes = getNextNodes(firstNode.targetNode as NodeData, edges)
    // Theoretically, there should only be one next node, to handle special cases.
    while (nextNodes && isProcessingNode(nextNodes[0])) {
      sortedNodes.push(...nextNodes)
      nextNodes = getNextNodes(nextNodes[nextNodes.length - 1], edges)
    }

    return sortedNodes
  }

  const getFieldsExpressionsFromNode = (nodes: Array<NodeData>, edges: Array<EdgeData>): string => {
    const sortedProcessingNodes = sortProcessingNodesByEdges(nodes, edges)
    if (!sortedProcessingNodes.length) {
      return DEFAULT_SELECT
    }
    return sortedProcessingNodes.reduce((ret, node: NodeData) => {
      let expression = ''
      if (node.data.specificType === ProcessingType.Function) {
        expression = getFuncExpressionFromForm(node.data.formData)
      } else if (isAIType(node.data.specificType)) {
        const { input, name, alias } = node.data.formData
        expression = `${AI_FUNCTION_NAME}('${name}', ${input}) as ${alias}`
      }
      ret += ret ? `, ${expression}` : expression
      return ret
    }, '')
  }

  // check is an action with republish fallback
  const checkWithRepublishFallback = (node: NodeData): boolean => {
    const { fallback_actions = [] } = node.data.formData || {}
    return (
      node.data.specificType !== FrontendSinkType.Republish &&
      fallback_actions.some((item: FallbackAction) => item.kind === FallbackActionKind.Republish)
    )
  }

  const getBridgeDataFromNode = (node: NodeData): BridgeData => {
    return {
      isCreated: !!node.data.isCreated,
      data: node.data.formData,
      needUpdateByAPI: checkNeedRequestAPI(node.data.isChanged) || checkWithRepublishFallback(node),
    }
  }
  const getBridgesFromNodes = (nodes: Array<NodeData>): Array<BridgeData> => {
    const bridgeDataArr = nodes.reduce((arr: Array<BridgeData>, node) => {
      const isBridge = isBridgerNode(node)
      if (isBridge) {
        arr.push(getBridgeDataFromNode(node))
      }
      return arr
    }, [])
    return bridgeDataArr
  }
  const getFallbackItemDataFromNode = (node: NodeData | Node): FallbackAction | undefined => {
    const { specificType, formData } = node?.data || {}
    if (isBridgerNode(node)) {
      return {
        kind: FallbackActionKind.Reference,
        type: formData.type || specificType,
        name: formData.name,
      }
    } else if (specificType === FrontendSinkType.Republish) {
      return {
        kind: FallbackActionKind.Republish,
        args: formData.args,
      }
    }
  }
  const getFallbackActionsFromNodes = (nodes: Array<NodeData>) =>
    nodes.map((node) => getFallbackItemDataFromNode(node)).filter(Boolean)

  const getAIProvidersAndCompletionsFromNodes = (nodes: Array<NodeData>) => {
    const ret: {
      aiProviders: Array<FlowDataItemForSubmit<AIProviderForm>>
      aiCompletions: Array<FlowDataItemForSubmit<AICompletionProfile>>
    } = {
      aiProviders: [],
      aiCompletions: [],
    }
    const aiNodes = nodes.filter((node) => isAIType(node.data.specificType))
    aiNodes.forEach((node) => {
      const { formData, isCreated, isChanged } = node.data
      const { type, api_key, name, base_url, transport_options, ...rest } = formData
      const aiProvider: AIProviderForm = { name, type, api_key }
      if (transport_options) {
        aiProvider.transport_options = transport_options
      }
      if (base_url) {
        aiProvider.base_url = base_url
      }

      const aiCompletion = { name, type, provider_name: name, ...omit(rest, ['input', 'alias']) }

      ret.aiProviders.push({
        isCreated: isCreated || false,
        data: aiProvider,
        needUpdateByAPI: checkNeedRequestAPI(isChanged),
      })
      ret.aiCompletions.push({
        isCreated: isCreated || false,
        data: aiCompletion,
        needUpdateByAPI: checkNeedRequestAPI(isChanged),
      })
    })
    return ret
  }

  return {
    getFromDataFromNodes,
    getFilterStrFromNodes,
    getFieldsExpressionsFromNode,
    getFallbackItemDataFromNode,
    getBridgesFromNodes,
    getAIProvidersAndCompletionsFromNodes,
    getFallbackActionsFromNodes,
    validateFlow,
    groupNodes,
  }
}
