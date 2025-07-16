import { NodeType } from '@emqx/shared-ui-constants'
import { unionBy } from 'lodash'
import { Ref, ref } from 'vue'
import useFlowNode from './useFlowNode'
import useGenerateFlowDataUtils from './useGenerateFlowDataUtils'
import type { Edge, Node } from '@vue-flow/core'
import type { AICompletionProfile, AIProviderForm, GroupedNode } from '../types'

export default (): {
  initialAIData: Ref<{
    provider: Array<string>
    completion: Array<string>
  }>
  addAIRecordDataToNodes: (
    nodes: Node[],
    getAICompletionProfileDetail: (name: string) => Promise<AICompletionProfile>,
    getAIProviderDetail: (name: string) => Promise<AIProviderForm>,
  ) => Promise<Node[]>
  updateInitialAIDataAfterRemoveAINode: (
    uselessProvider: Array<string>,
    uselessCompletion: Array<string>,
  ) => void
  addFallbackDataToFlow: (
    nodes: GroupedNode,
    edges: Array<Edge>,
    generateFlowDataFromActionItem: (action: any) => {
      nodes: GroupedNode
      edges: Array<Edge>
    },
  ) => { nodes: GroupedNode; edges: Edge[] }
} => {
  const { isBridgerNode, isAIType } = useFlowNode()
  const { addAIRecordToAINode } = useGenerateFlowDataUtils()

  /**
   * for remove useless AI data when submit
   */
  const initialAIData = ref<{
    provider: Array<string>
    completion: Array<string>
  }>({ provider: [], completion: [] })

  const assignInitialAIData = (name: string, type: 'provider' | 'completion') => {
    if (!initialAIData.value[type].includes(name)) {
      initialAIData.value[type].push(name)
    }
  }

  const addAIRecordDataToNodes = async (
    nodes: Array<Node>,
    getAICompletionProfileDetail: (name: string) => Promise<AICompletionProfile>,
    getAIProviderDetail: (name: string) => Promise<AIProviderForm>,
  ) => {
    await Promise.allSettled(
      nodes.map(async (item) => {
        try {
          if (isAIType(item.data.specificType)) {
            const completion = await getAICompletionProfileDetail(item.data.formData?.name)
            assignInitialAIData(completion.name, 'completion')
            const provider = await getAIProviderDetail(completion.provider_name)
            assignInitialAIData(provider.name, 'provider')
            addAIRecordToAINode(item, provider, completion)
          }
          return Promise.resolve()
        } catch (error) {
          return Promise.reject()
        }
      }),
    )

    return nodes
  }
  const updateInitialAIDataAfterRemoveAINode = (
    uselessProvider: Array<string>,
    uselessCompletion: Array<string>,
  ) => {
    // Update initAIData to reflect current state after cleanup
    initialAIData.value.provider = initialAIData.value.provider.filter(
      (provider) => !uselessProvider.includes(provider),
    )
    initialAIData.value.completion = initialAIData.value.completion.filter(
      (completion) => !uselessCompletion.includes(completion),
    )
  }
  const addFallbackNodeToNodes = (fallbackNode: Node, nodes: GroupedNode) => {
    const sinkNodeIndex = nodes[NodeType.Sink].findIndex((item) => item.id === fallbackNode.id)
    if (sinkNodeIndex > -1) {
      nodes[NodeType.Sink].splice(sinkNodeIndex, 1)
    }
    if (!nodes[NodeType.Fallback]) {
      nodes[NodeType.Fallback] = []
    }
    nodes[NodeType.Fallback].push(fallbackNode)
  }
  const addFallbackDataToFlow = (
    nodes: GroupedNode,
    edges: Array<Edge>,
    generateFlowDataFromActionItem: (action: any) => {
      nodes: GroupedNode
      edges: Array<Edge>
    },
  ) => {
    const retEdges = [...edges]
    const outputNodes = nodes[NodeType.Sink]
    for (let index = 0; index < outputNodes.length; index++) {
      const node = outputNodes[index]
      if (isBridgerNode(node) && node.data.isCreated) {
        const { nodes: fallbackNodes, edges: fallbackEdges } = generateFlowDataFromActionItem(
          node.data.formData,
        )
        if (fallbackEdges.length) {
          ;(fallbackNodes[NodeType.Fallback] ?? []).forEach((item) => {
            addFallbackNodeToNodes(item, nodes)
          })
          retEdges.push(...fallbackEdges)
        }
      }
    }
    nodes[NodeType.Fallback] = unionBy(nodes[NodeType.Fallback], 'id')
    return { nodes, edges: retEdges }
  }

  return {
    initialAIData,
    addAIRecordDataToNodes,
    updateInitialAIDataAfterRemoveAINode,
    addFallbackDataToFlow,
  }
}
