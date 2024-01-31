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
  gcp_pubsub_consumer: {
    payload_template: 'Payload Template',
  },
  hstreamdb: {
    record_template: 'HStream Record Template',
  },
  kafka_consumer: {
    payload_template: 'MQTT Payload Template',
  },
  rabbitmq: {
    payload_template: 'Payload Template',
  },
  pulsar: {
    message_key: 'Message Key',
    message_value: 'Message Value',
  },
  kinesis: {
    payload_template: 'Payload template',
  },
  greptimedb: {
    write_syntax: 'Write Syntax',
  },
}
