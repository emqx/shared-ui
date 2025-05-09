export const enStreaming = {
  title: 'Streaming (beta)',
  streams: 'Streams',
  streamName: 'Stream Name',
  partitionNum: 'Number of Partitions',
  mqttTopic: 'MQTT Topic Filter',
  mqttTopicTip:
    'MQTT messages matching this topic filter are saved to the corresponding default type Stream. The free type Stream is not associated with an MQTT topic filter.',
  streamNameTip: 'The Kafka topic for a Kafka client is the same as the Stream name.',
  retention: 'Retention Period',
  consumerGroups: 'Consumer Groups',
  groupID: 'Group ID',
  streamNum: 'Number of Streams',
  consumerNum: 'Number of Consumers',
  protocol: 'Protocol',
  consumers: 'Consumers',
  consumerID: 'Consumer ID',
  partition: 'Partition',
  startOffset: 'Start Offset',
  endOffset: 'End Offset',
  partitions: 'Partitions',
  newStream: 'New Stream',
  streamNameFormatTip:
    'Start with a letter or number and can include letters, numbers, _, . and -, up to 64 characters',
  maxStreamsTip: 'Up to {num} streams can be created',
  summary:
    'EMQX Streaming is an innovative feature of EMQX Platform that allows users to persistently store MQTT messages as data streams and consume them directly using Kafka clients.',
  enableStreaming: 'Enable Streaming (beta)',
  usingStreaming: 'With EMQX Streaming, you can:',
  streamingBenefits: [
    'Reliably store large amounts of MQTT message data',
    'Directly use Kafka clients for historical data replay and real-time subscription',
    'Seamlessly integrate with existing backend applications and big data systems',
    'Directly interface with stream processors like Flink for data processing',
  ],
  betaTip: 'This feature is in beta.',
  needVPCTip: 'Streaming requires intranet access, please create a {vpc} first.',
  mqttTopicFormatTip: `Can contain letters, numbers, special characters (_, -, /, +, #, $, %, {'@'}, &, :, {'{'}{'}'} and .) and mid-string spaces (no leading/trailing spaces), up to 128 characters`,
  streamType: 'Stream Type',
  streamTypeLabel: {
    default: 'Default',
    free: 'Free',
  },
  streamTypeTip:
    'The default type Stream is associated with an MQTT topic filter, and MQTT messages matching the topic filter are saved to the Stream. The free type Stream is not associated with an MQTT topic filter.',
  authType: 'Authentication Mechanism',
  host: 'Host',
  hostTip:
    'Fill in a Host IP address or use <code>*</code> to match all Hosts.<br/>If <code>Literal</code> pattern is selected, an IP address of a host should be provided.',
  aclResourceType: 'Resource Type',
  aclResourceName: 'Resource Selector',
  aclOperation: 'Operation',
  prefixed: 'Prefix',
  consumerGroupType: 'Consumer Group',
  clusterType: 'Cluster',
  literal: 'Literal',
  matchAll: 'All',
  allow: 'Allow',
  deny: 'Deny',
  aclOperationLabelDic: {
    ALL: 'All',
    READ: 'Read',
    WRITE: 'Write',
    DESCRIBE: 'Describe',
    CREATE: 'Create',
    DELETE: 'Delete',
    ALTER: 'Alter',
  },
  usernameRule: `Can contain letters, numbers and some special characters (_, -, /, +, #, $, %, {'@'}, & and .), up to 128 characters`,
  aclDescription: `It refers to the permission control of the resources that Kafka clients can manipulate, including topics, consumer groups and clusters.
  The default mode is whitelist, meaning that entries added to the list are allowed through, while those not added are denied by default.`,
  networkType: 'Network Type',
  securityProtocol: 'Security Protocol',
  metricTitleDic: {
    stream_count: 'Streams',
    partition_count: 'Partitions',
    group_count: 'Consumer Groups',
    total_messages_in_rate: 'Messages In',
    total_messages_out_rate: 'Messages Out',
  },
}
