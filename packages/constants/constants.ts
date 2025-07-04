import { BridgeType, FrontendSourceType } from './enums'

export const STREAMING_MATCH_ALL = '*'
export const STREAMING_CLUSTER_NAME = 'kafka-cluster'
export const DEFAULT_SELECT = '*'
export const RULE_LOGICAL_OPERATORS = ['>', '<', '<=', '>=', '<>', '!=', '=', '=~']
export const GEMINI_DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/'
export const ANTHROPIC_VERSION_MAP = {
  '2023-06-01': '2023-06-01',
}
export const RULE_INPUT_BRIDGE_TYPE_PREFIX = '$bridges/'
export const AI_FUNCTION_NAME = 'ai_completion'
export const ENCRYPTED_PASSWORD = '******'
export const RULE_INPUT_EVENT_PREFIX = '$events/'
export const CONNECTOR_TYPES_WITH_TWO_DIRECTIONS = [BridgeType.MQTT, BridgeType.RabbitMQ]
/**
 * Because the exact type of the ai node needs to be known after the details are fetched,
 * in order to treat the data as an ai node when processing it, assign a placeholder to it first.
 */
export const AI_PLACEHOLDER_TYPE = 'ai-placeholder'
export const FALLBACK_EDGE_STYLE = { stroke: '#bbb', strokeDasharray: '5 5' }
/**
 * Cannot be added, only for show webhook
 */
export const SourceTypeAllMsgsAndEvents = 'all-msgs-and-events'
export const isNotBridgeSourceTypes = [FrontendSourceType.Event, FrontendSourceType.Message]
