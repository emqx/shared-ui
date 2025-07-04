import { createRandomString } from '@emqx/shared-ui-utils'
import { FALLBACK_EDGE_STYLE, NodeType } from '@emqx/shared-ui-constants'
import type { Edge, Node } from '@vue-flow/core'
import { useFlowLocale } from './useFlowLocale'

export default (): {
  allGuideFlowData: Array<Node | Edge>
  idFallback: string
  idFallbackEdge: string
} => {
  const { t } = useFlowLocale()
  const idSource = createRandomString()
  const idProcessing = createRandomString()
  const idSink = createRandomString()
  const idFallback = createRandomString()
  const idFallbackEdge = createRandomString()
  const allGuideFlowData: Array<Node | Edge> = [
    {
      id: idSource,
      label: t('flow.guideSourceNodeLabel'),
      data: { type: NodeType.Source, desc: t('flow.guideSourceNodeDesc') },
      type: 'guide',
      position: { x: 90, y: 90 },
    },
    {
      id: idProcessing,
      label: t('flow.guideProcessingNodeLabel'),
      data: { type: NodeType.Processing, desc: t('flow.guideProcessingNodeDesc') },
      type: 'guide',
      position: { x: 290, y: 90 },
    },
    {
      id: idSink,
      label: t('flow.guideSinkNodeLabel'),
      data: { type: NodeType.Sink, desc: t('flow.guideSinkNodeDesc') },
      type: 'guide',
      position: { x: 490, y: 90 },
    },
    {
      id: idFallback,
      label: t('flow.guideFallbackNodeLabel'),
      data: { type: NodeType.Fallback, desc: t('flow.guideFallbackNodeDesc') },
      type: 'guide',
      position: { x: 690, y: 90 },
    },
    {
      id: createRandomString(),
      source: idSource,
      target: idProcessing,
    },
    {
      id: createRandomString(),
      source: idProcessing,
      target: idSink,
    },
    {
      id: idFallbackEdge,
      source: idSink,
      target: idFallback,
      style: FALLBACK_EDGE_STYLE,
    },
  ]

  return {
    allGuideFlowData,
    idFallback,
    idFallbackEdge,
  }
}
