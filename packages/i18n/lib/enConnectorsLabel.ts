export const enConnectorsLabel: Record<string, Record<string, string>> = {
  common: {
    connect_timeout: 'Connect Timeout',
    bootstrap_hosts: 'Bootstrap Hosts',
    min_metadata_refresh_interval: 'Min Metadata Refresh Interval',
    metadata_request_timeout: 'Metadata Request Timeout',
    tcp_keepalive: 'TCP Keepalive',
    sndbuf: 'Socket Send Buffer Size',
    recbuf: 'Socket Receive Buffer Size',
    nodelay: 'No Delay',
    username: 'Username',
    password: 'Password',
    pool_size: 'Connection Pool Size',
    pool_type: 'Pool Type',
    server: 'Server Host',
    database: 'Database Name',
    health_check_interval: 'Health Check Interval',
    start_timeout: 'Start Timeout',
    max_retries: 'Max Retries',
    worker_pool_size: 'Buffer Pool Size',
    request_ttl: 'Request TTL',
    max_buffer_bytes: 'Max Buffer Queue Size',
    inflight_window: 'Inflight Window',
    servers: 'Servers',
    enable_pipelining: 'HTTP Pipelining',
  },
  kafka_producer: {
    kerberos_principal: 'Kerberos Principal',
    kerberos_keytab_file: 'Kerberos keytab file',
    mechanism: 'Mechanism',
    authentication: 'Authentication',
  },
  http: {
    url: 'URL',
    headers: 'Headers',
    enable_pipelining: 'HTTP Pipelining',
  },
  gcp_pubsub_producer: {
    pipelining: 'HTTP Pipelining',
    service_account_json: 'GCP Service Account Credentials',
    query_mode: 'Query Mode',
    batch_size: 'Batch Size',
  },
  azure_event_hub_producer: {
    bootstrap_hosts: 'Bootstrap Hosts',
  },
  syskeeper_forwarder: {
    ack_mode: 'ACK Mode',
    ack_timeout: 'ACK Timeout',
  },
  redis: {
    parameters: 'Redis Mode',
    sentinel: 'Sentinel Mode',
  },
  mongodb: {
    parameters: 'MongoDB Mode',
    w_mode: 'Write Mode',
    r_mode: 'Read Mode',
    srv_record: 'Srv Record',
    use_legacy_protocol: 'Use Legacy Protocol',
    auth_source: 'Auth Source',
    replica_set_name: 'Replica Set Name',
    max_overflow: 'Max Overflow Workers',
    overflow_ttl: 'Overflow TTL',
    overflow_check_period: 'Overflow Check Period',
    local_threshold_ms: 'Local Threshold',
    connect_timeout_ms: 'Connect Timeout',
    socket_timeout_ms: 'Socket Timeout',
    server_selection_timeout_ms: 'Server Selection Timeout',
    wait_queue_timeout_ms: 'Wait Queue Timeout',
    heartbeat_frequency_ms: 'Heartbeat period',
    min_heartbeat_frequency_ms: 'Minimum Heartbeat Period',
  },
  influxdb: {
    parameters: 'Version of InfluxDB',
    bucket: 'Bucket',
    org: 'Organization',
    token: 'Token',
  },
  iotdb: {
    base_url: 'IoTDB REST Service Base URL',
    iotdb_version: 'IoTDB Version',
  },
  elasticsearch: {
    server: 'Server',
  },
  mqtt: {
    server: 'MQTT Broker',
    clientid_prefix: 'ClientID Prefix',
    proto_ver: 'MQTT Version',
    bridge_mode: 'Bridge Mode',
    clean_start: 'Clean start',
    keepalive: 'Keepalive',
    retry_interval: 'Message Retry Interval',
    max_inflight: 'Max Inflight',
  },
  cassandra: {
    keyspace: 'Keyspace',
  },
  opents: {
    summary: 'Summary',
    details: 'Details',
  },
  clickhouse: {
    batch_value_separator: 'Batch Value Separator',
    connect_timeout: 'Clickhouse Timeout',
    url: 'Server URL',
  },
  dynamo: {
    url: 'DynamoDB Endpoint',
    table: 'Table ',
    aws_access_key_id: 'AWS Access Key ID',
    aws_secret_access_key: 'AWS Secret Access Key',
  },
  gcp_pubsub_consumer: {
    consumer_pubsub_topic: 'GCP PubSub Topic',
    consumer_mqtt_topic: 'MQTT Topic',
    consumer_qos: 'QoS',
    pipelining: 'HTTP Pipelining',
    service_account_json: 'GCP Service Account Credentials',
    topic_mapping: 'Topic Mapping',
    pull_max_messages: 'Maximum Messages to Pull',
    connect_timeout: 'Connect Timeout',
  },
  hstreamdb: {
    url: 'HStreamDB Server URL',
    stream: 'HStreamDB Stream Name',
    partition_key: 'HStreamDB Partition Key',
    grpc_timeout: 'HStreamDB gRPC Timeout',
  },
  kafka_consumer: {
    bootstrap_hosts: 'Bootstrap Hosts',
    consumer_key_encoding_mode: 'Key Encoding Mode',
    consumer_value_encoding_mode: 'Value Encoding Mode',
    consumer_topic_mapping: 'Topic Mapping',
    consumer_offset_reset_policy: 'Offset Reset Policy',
    consumer_mqtt_topic: 'MQTT Topic',
    min_metadata_refresh_interval: 'Min Metadata Refresh Interval',
    metadata_request_timeout: 'Metadata Request Timeout',
    connect_timeout: 'Connect Timeout',
    consumer_max_batch_bytes: 'Fetch Bytes',
    consumer_offset_commit_interval_seconds: 'Offset Commit Interval',
    topic: 'Kafka Topic',
    mqtt_topic: 'MQTT Topic',
    qos: 'QoS',
  },
  rocketmq: {
    access_key: 'AccessKey',
    secret_key: 'SecretKey',
    security_token: 'Security Token',
    topic: 'RocketMQ Topic',
    refresh_interval: 'Topic Route Refresh Interval',
    send_buffer: 'Send Buffer Size',
    sync_timeout: 'Sync Timeout',
  },
  sqlserver: {
    driver: 'SQL Server Driver Name',
  },
  oracle: {
    sid: 'Oracle Database SID',
    service_name: 'Oracle Database Service Name',
  },
  rabbitmq: {
    port: 'Port',
    exchange: 'Exchange',
    routing_key: 'Routing Key',
    virtual_host: 'Virtual Host',
    heartbeat: 'Heartbeat',
    delivery_mode: 'Message Delivery Mode',
    wait_for_publish_confirmations: 'Wait for Publish Confirmations',
    publish_confirmation_timeout: 'Publish Confirmation Timeout',
    timeout: 'Connection Timeout',
  },
  pulsar: {
    pulsar_topic: 'Pulsar Topic Name',
    strategy: 'Partition Strategy',
    compression: 'Compression',
    sync_timeout: 'Sync Publish Timeout',
    retention_period: 'Retention Period',
    send_buffer: 'Socket Send Buffer Size',
    max_batch_bytes: 'Max Batch Bytes',
    connect_timeout: 'Connect Timeout',
    buffer_mode: 'Buffer Mode',
    buffer_per_partition_limit: 'Per-partition Buffer Limit',
    buffer_segment_bytes: 'Segment File Bytes',
    buffer_memory_overload_protection: 'Memory Overload Protection',
    authentication_jwt: 'JWT',
  },
  kinesis: {
    aws_access_key_id: 'AWS Access Key ID',
    aws_secret_access_key: 'AWS Secret Access Key',
    endpoint: 'Amazon Kinesis Endpoint',
    stream_name: 'Amazon Kinesis Stream',
    partition_key: 'Partition key',
  },
  greptimedb: {
    dbname: 'Database',
    precision: 'Time Precision',
  },
}
