import {
  AIProviderType,
  EditedWay,
  FilterLogicalOperator,
  NodeType,
  ProcessingType,
  FallbackActionKind,
  FlowNodeType,
} from '@emqx/shared-ui-constants'
import type { Position, Edge, Node, ElementData, GraphEdge } from '@vue-flow/core'

export type FetchSuggestionsCallback = (result: Array<{ value: string }>) => void

export interface FunctionItem {
  id: string
  field: string
  func: {
    name: string
    args: Array<string | number>
  }
  alias: string
}

export type FunctionFormType = {
  editedWay: EditedWay
  form: Array<FunctionItem>
  sql: string
}

export interface FilterItem {
  field: string
  operator: string
  valueForComparison: string | number
}

export interface FilterFormData {
  groupOperator: FilterLogicalOperator
  // It can be used as the ID attribute for list elements, and can be used to
  // identify the source list and target list after a drag-and-drop operation.
  id: string
  items: Array<FilterItem | FilterFormData>
}

export interface FilterFormType {
  editedWay: EditedWay
  sql: string
  form: FilterFormData
}

export interface NodeItem {
  name: string
  specificType: string
}

export type PositionData =
  | { sourcePosition: Position; targetPosition?: undefined }
  | { targetPosition: Position; sourcePosition?: undefined }
  | { sourcePosition: Position; targetPosition: Position }

export type FlowData = Array<Node | Edge>

export interface RePub {
  payload: string
  topic: string
  qos: string | number
  retain: boolean
  mqtt_properties: Record<string, string>
  user_properties: string
  direct_dispatch?: boolean | string
}

export interface OutputItemObj {
  function: string
  args?: RePub
}

export interface FallbackActionRepublish {
  kind: FallbackActionKind.Republish
  args: RePub
}

export interface FallbackActionReference {
  kind: FallbackActionKind.Reference
  type: string
  name: string
}

export type FallbackAction = FallbackActionRepublish | FallbackActionReference

/**
 * Sort by column
 * ‼️‼️‼️‼️‼️ Note that since the AI part is essentially a function, it is grouped together in the function part
 */
export type GroupedNode = {
  [NodeType.Source]: Array<Node>
  [ProcessingType.Filter]: Array<Node>
  [ProcessingType.Function]: Array<Node>
  [NodeType.Sink]: Array<Node>
  [NodeType.Fallback]?: Array<Node>
}

export interface AITransportOptions {
  checkout_timeout?: string
  connect_timeout?: string
  /** @minimum 1 */
  max_connections?: number
  recv_timeout?: string
}

export interface AIProviderForm {
  api_key: string
  base_url?: string
  name: string
  type: AIProviderType
  transport_options?: AITransportOptions
  anthropic_version?: string
}

export interface AnthropicCompletionProfile {
  /** @minimum 1 */
  max_tokens?: number
  model?: string
  name: string
  provider_name: string
  system_prompt?: string
  type: AIProviderType.Anthropic
}

export interface OpenAICompletionProfile {
  model?: string
  name: string
  provider_name: string
  system_prompt?: string
  type: AIProviderType.OpenAI
}

export type AICompletionProfile = AnthropicCompletionProfile | OpenAICompletionProfile

type OmitCompletionKeys = 'name' | 'provider_name' | 'type'
type AICompletion<T> = Omit<T, OmitCompletionKeys>
type AITotalConfig<T> = AIProviderForm & { input: string; alias: string } & AICompletion<T>

export type AIOpenAIConfig = AITotalConfig<OpenAICompletionProfile>
export type AIAnthropicConfig = AITotalConfig<AnthropicCompletionProfile>
export type AIConfig = AIOpenAIConfig | AIAnthropicConfig
export interface RuleFunc {
  name: string
  args: Array<{
    name: string
    type: string
    required: boolean
    default?: any
    range?: Array<number | null>
    optionalValues?: Array<string>
    isReference?: boolean
  }>
}

export type FlowDataItemForSubmit<T> = {
  isCreated: boolean
  data: T
  needUpdateByAPI?: boolean
}

export type BridgeData = FlowDataItemForSubmit<Record<string, any>>

export type ConnectionEdge =
  | GraphEdge<ElementData>
  | Pick<GraphEdge<ElementData>, 'source' | 'sourceNode' | 'target' | 'targetNode'>

export interface NodeData {
  id: string
  type: FlowNodeType
  data: {
    specificType: string
    isCreated?: boolean
    isChanged?: boolean
    /**
     * This value is true when acting as a fallback for any node
     */
    isFallback?: boolean
    formData: any
  }
}

export type EdgeData = Pick<
  GraphEdge<ElementData>,
  'source' | 'sourceNode' | 'target' | 'targetNode'
>

export type NodesAfterGroup = Record<FlowNodeType, Array<NodeData>>

export interface FlowDataMap {
  nodes: Array<NodeData>
  edges: Array<EdgeData>
}
