export const enActionsLabel: Record<string, Record<string, string>> = {
  common: {
    health_check_interval: 'Health Check Interval',
    query_mode: 'Query Mode',
    max_retries: 'Max Retries',
    worker_pool_size: 'Buffer Pool Size',
    start_after_created: 'Start After Created',
    start_timeout: 'Start Timeout',
    request_ttl: 'Request TTL',
    inflight_window: 'Inflight Window',
    max_buffer_bytes: 'Max Buffer Queue Size',
    sql: 'SQL Template',
    batch_size: 'Batch Size',
    topic: 'Kafka Topic',
    key: 'Message Key',
    value: 'Message Value',
    compression: 'Compression',
    partition_strategy: 'Partition Strategy',
    kafka_headers: 'Kafka Headers',
    kafka_ext_headers: 'More Kafka Headers',
    kafka_ext_header_key: 'Key',
    kafka_ext_header_value: 'Value',
    kafka_header_value_encode_mode: 'Kafka Header Value Encode Mode',
    max_batch_bytes: 'Max Batch Bytes',
    required_acks: 'Required Acks',
    partition_count_refresh_interval: 'Partition Count Refresh Interval',
    max_inflight: 'Max Inflight',
    mode: 'Buffer Mode',
    per_partition_limit: 'Per-partition Buffer Limit',
    segment_bytes: 'Segment File Bytes',
    memory_overload_protection: 'Memory Overload Protection',
    sync_query_timeout: 'Synchronous Query Timeout',
    template: 'Message Template',
    partitions_limit: 'Partitions Limit',
  },
  kafka_producer: {
    timestamp: 'Message Timestamp',
    kafka_ext_header_key: 'Kafka Header Key',
    kafka_ext_header_value: 'Kafka Header Value',
  },
  http: {
    body: 'Body',
    headers: 'Headers',
    method: 'Method',
    path: 'URL Path',
  },
  azure_event_hub_producer: {
    topic: 'Event Hub Name',
    key: 'Message Key',
    value: 'Message Value',
    partition_strategy: 'Partition Strategy',
    required_acks: 'Required Acks',
    kafka_headers: 'Azure Event Hubs Headers',
    kafka_ext_headers: 'Extra Azure Event Hubs headers',
    kafka_header_value_encode_mode: 'Azure Event Hubs headers value encode mode',
    partition_count_refresh_interval: 'Partition Count Refresh Interval',
    max_inflight: 'Max Inflight',
    mode: 'Buffer Mode',
    per_partition_limit: 'Per-partition Buffer Limit',
    segment_bytes: 'Segment File Bytes',
    memory_overload_protection: 'Memory Overload Protection',
    max_batch_bytes: 'Max Batch Bytes',
    query_mode: 'Query mode',
  },
  gcp_pubsub_producer: {
    attributes_template: 'Attributes Template',
    pubsub_topic: 'GCP PubSub Topic',
    ordering_key_template: 'Ordering Key template',
    payload_template: 'Payload Template',
  },
  gcp_pubsub_consumer: {
    topic: 'GCP PubSub Topic',
  },
  syskeeper_forwarder: {
    target_topic: 'Topic',
    target_qos: 'QoS',
  },
  redis: {
    command_template: 'Redis Command Template',
  },
  mongodb: {
    collection: 'Collection',
    payload_template: 'Payload template',
  },
  iotdb: {
    device_id: 'Device ID',
    is_aligned: 'Align Timeseries',
    data: 'Write Data',
    timestamp: 'Timestamp',
    measurement: 'Measurement',
    data_type: 'Data Type',
    value: 'Value',
  },
  influxdb: {
    precision: 'Time Precision',
    write_syntax: 'Write Syntax',
  },
  mqtt: {
    topic: 'Topic',
    qos: 'QoS',
    retain: 'Retain',
    payload: 'Payload',
  },
  elasticsearch: {
    parameters: 'Action',
    index: 'Index Name',
    id: 'Document ID',
    doc: 'Document Template',
    routing: 'Routing',
    overwrite: 'Overwrite Document',
    doc_as_upsert: 'Enable Upsert',
  },
  cassandra: {
    cql: 'CQL Template',
  },
  opents: {
    timestamp: 'Timestamp',
    metric: 'Metric',
    tags: 'Tags',
    value: 'Value',
    data: 'Write Data',
  },
  hstreamdb: {
    stream: 'Stream',
    partition_key: 'Partition Key',
    grpc_flush_timeout: 'gRPC Flush Interval',
    aggregation_pool_size: 'Aggregation Pool Size',
    max_batches: 'Max Batches',
    writer_pool_size: 'Writer Pool Size',
    batch_interval: 'Max Batch Interval',
    record_template: 'Record Template',
    /**
     * HStreamDB has two fields with 'batch_size' key, so we need to distinguish them.
     * this one uses the path (snake case) of the field as the i18n keypath
     */
    parameters_batch_size: 'HStreamDB Batch Size',
  },
  kafka_consumer: {
    key_encoding_mode: 'Key Encoding Mode',
    value_encoding_mode: 'Value Encoding Mode',
    offset_reset_policy: 'Offset Reset Policy',
    offset_commit_interval_seconds: 'Offset Commit Interval',
    topic: 'Kafka Topic',
  },
  rabbitmq: {
    exchange: 'Exchange',
    routing_key: 'Routing Key',
    delivery_mode: 'Message Delivery Mode',
    wait_for_publish_confirmations: 'Wait for Publish Confirmations',
    publish_confirmation_timeout: 'Publish Confirmation Timeout',
    payload_template: 'Payload Template',
  },
  pulsar: {
    pulsar_topic: 'Pulsar Topic Name',
    strategy: 'Partition Strategy',
    retention_period: 'Retention Period',
    compression: 'Compression',
    sync_timeout: 'Sync Publish Timeout',
    send_buffer: 'Socket Send Buffer Size',
    per_partition_limit: 'Pulsar Per-partition Buffer Limit',
    message_key: 'Message Key',
    message_value: 'Message Value',
  },
  kinesis: {
    payload_template: 'Payload template',
    stream_name: 'Amazon Kinesis Stream',
    partition_key: 'Partition key',
  },
  greptimedb: {
    write_syntax: 'Write Syntax',
    precision: 'Time Precision',
  },
  tdengine: {
    database: 'Database Name',
  },
  rocketmq: {
    topic: 'RocketMQ Topic',
    refresh_interval: 'Topic Route Refresh Interval',
    send_buffer: 'Send Buffer Size',
    sync_timeout: 'Sync Timeout',
    strategy: 'Produce Strategy',
  },
  clickhouse: {
    batch_value_separator: 'Batch Value Separator',
  },
  s3: {
    bucket: 'Bucket',
    acl: 'ACL',
    content: 'Object Content',
    key: 'Object Key',
  },
  dynamo: {
    table: 'Table ',
    hash_key: 'Hash Key',
    range_key: 'Range Key',
  },
}
