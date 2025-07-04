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
}
