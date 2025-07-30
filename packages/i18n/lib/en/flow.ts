export const enFlow = {
  guideSourceNodeLabel: 'Source',
  guideSourceNodeDesc: 'Drag in multiple nodes to select message and event inputs',
  guideProcessingNodeLabel: 'Processing (optional)',
  guideProcessingNodeDesc: 'Drag nodes to transform and filter data',
  guideSinkNodeLabel: 'Sink',
  guideSinkNodeDesc: 'Drag in multiple nodes to output data to external integrations',
  guideFallbackNodeLabel: 'Fallback (optional)',
  guideFallbackNodeDesc: 'Drag nodes as fallback actions',
  actionAvailable: 'Available',
  actionUnavailable: 'Unavailable',
  connecting: 'Connecting',
  inconsistent: 'Inconsistent for nodes in the cluster',
  disconnected: 'Disconnected',
  message: 'Message',
  event: 'Event',
  dataProcessing: 'Data Processing',
  filter: 'Filter',
  consoleOutput: 'Console Output',
  republish: 'Republish',
  condition: 'condition | conditions',
  systemPrompt: 'System Message',
  consoleFallbackWrong: 'Console cannot be used as a fallback action',
  incorrectConnection: 'Incorrect connection',
  filterFunctionsWrongOrder:
    'Function nodes must be placed before filter nodes. Please adjust node positions.',
  flowEmptyError:
    'Unable to save, there must be at least one Sink node and one Source node in the Flow',
  flowIntegrityError: 'Unable to save, at least one {missing} node is required in the Flow',
  isolatedNodeError:
    'There are unconnected node in the flow. Please connect or delete them.|There are unconnected nodes in the flow. Please connect or delete them.',
  multipleFlowError: 'Only one flow can be created at a time',
  multipleFallbackWrong: 'Flow does not support editing multi-level fallback actions',
  incorrectInputOutputConnection:
    'Please confirm that all source nodes are correctly connected to the same data processing node',
  incorrectOutputNodeConnection:
    'Please confirm that all sink nodes are output from the same data processing node',
  incorrectDefaultNodeConnection:
    'Please confirm that all data processing nodes are connected in sequence from start to end',
  input: 'Input',
  systemPromptDesc:
    'System message, used to guide AI models to generate outputs that meet expectations. Example: Add up the values of numeric keys in the input JSON data and output the result, only return the output result.',
  model: 'Model',
  maxTokens: 'Max Tokens',
  anthropicVersion: 'Anthropic Version',
  apiKey: 'API Key',
  baseURL: 'Base URL',
  geminiBaseUrlTips:
    'This Gemini connection uses an OpenAI-compatible API. Please enter a compatible Base URL.',
  aiOutputAlias: 'Output Result Alias',
  aiOutputAliasDesc:
    'Output result alias, used to reference output results in actions or subsequent processing.',
  aliasDesc:
    'If the alias contains characters other than letters, numbers, and underscores, or starts with a number, or is a SQL keyword, please add double quotes to the alias.',
  connectTimeout: 'Connect Timeout',
  recvTimeout: 'Receive Timeout',
  checkoutTimeout: 'Checkout Timeout',
  maxConn: 'Max Connections',
  maxConnectionsDesc: 'Maximum number of simultaneous connections to the AI provider.',
  checkoutTimeoutDesc:
    'Timeout for the checkout from connection pool for a request to the AI provider.',
  confirm: 'Confirm',
  baseURLDesc:
    'The default value is {url}, or you can use any base URL that works with the {name} API format.',
}
