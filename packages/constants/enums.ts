export enum StreamType {
  Default = 'default',
  Free = 'free',
}

/**
 * Authentication Type
 */
export enum StreamAuthType {
  Plain = 'PLAIN',
  SHA256 = 'SCRAM-SHA-256',
}

export enum StreamPatternType {
  Literal = 'LITERAL',
  Prefixed = 'PREFIXED',
  /**
   * just for UX, API doesn't have this value
   */
  All = 'ALL',
}

export enum StreamOperation {
  All = 'ALL',
  Read = 'READ',
  Write = 'WRITE',
  Describe = 'DESCRIBE',
  Create = 'CREATE',
  Delete = 'DELETE',
  Alter = 'ALTER',
}

export enum StreamPermission {
  Allow = 'ALLOW',
  Deny = 'DENY',
}

export enum StreamResourceType {
  Topic = 'TOPIC',
  Group = 'GROUP',
  Cluster = 'CLUSTER',
}

export enum QoSLevel {
  QoS0,
  QoS1,
  QoS2,
}

export enum FilterLogicalOperator {
  And = 'and',
  Or = 'or',
}

export enum ArgumentType {
  Number = 'number',
  Any = 'any',
  Float = 'float',
  Integer = 'integer',
  String = 'string',
  Enum = 'enum',
  Object = 'object',
  Array = 'array',
  Binary = 'binary',
}

export enum EditedWay {
  Form,
  SQL,
}

export enum FlowNodeType {
  Input = 'custom_input',
  Default = 'custom_default',
  Output = 'custom_output',
}

export enum BridgeType {
  Webhook = 'http',
  MQTT = 'mqtt',
  InfluxDB = 'influxdb',
  MySQL = 'mysql',
  KafkaProducer = 'kafka_producer',
  KafkaConsumer = 'kafka_consumer',
  Redis = 'redis',
  GCPProducer = 'gcp_pubsub_producer',
  GCPConsumer = 'gcp_pubsub_consumer',
  MongoDB = 'mongodb',
  PgSQL = 'pgsql',
  TimescaleDB = 'timescale',
  MatrixDB = 'matrix',
  TDengine = 'tdengine',
  ClickHouse = 'clickhouse',
  DynamoDB = 'dynamo',
  Cassandra = 'cassandra',
  MicrosoftSQLServer = 'sqlserver',
  RocketMQ = 'rocketmq',
  IoTDB = 'iotdb',
  OpenTSDB = 'opents',
  OracleDatabase = 'oracle',
  RabbitMQ = 'rabbitmq',
  Pulsar = 'pulsar',
  HStream = 'hstreamdb',
  AzureEventHubs = 'azure_event_hub_producer',
  AmazonKinesis = 'kinesis',
  GreptimeDB = 'greptimedb',
  Confluent = 'confluent_producer',
  SysKeeperProxy = 'syskeeper_proxy',
  SysKeeperForwarder = 'syskeeper_forwarder',
  Elasticsearch = 'elasticsearch',
  S3 = 's3',
  AzureBlobStorage = 'azure_blob_storage',
  Couchbase = 'couchbase',
  Datalayers = 'datalayers',
  Snowflake = 'snowflake',
  SnowflakeStreaming = 'snowflake_streaming',
  Tablestore = 'tablestore',
  DiskLog = 'disk_log',
  S3Tables = 's3tables',
  Doris = 'doris',
  BigQuery = 'bigquery',
  AlloyDB = 'alloydb',
  CockroachDB = 'cockroachdb',
  Redshift = 'redshift',
  AWSTimestream = 'aws_timestream',
  EMQXTables = 'emqx_tables',
}

export enum ProcessingType {
  Function = 'function',
  AIOpenAI = 'ai-openai',
  AIAnthropic = 'ai-anthropic',
  AIGemini = 'ai-gemini',
  Filter = 'filter',
}

export enum FrontendSinkType {
  Republish = 'republish',
  Console = 'console',
}

export enum FrontendSourceType {
  Message = 'message',
  Event = 'event',
}

export enum FlowConnectionStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  // for cluster-aggregated, if nodes are at different statuses
  Inconsistent = 'inconsistent',
  // For Bridge, when the bridge resource is requested to be stopped
  Stopped = 'stopped',
}

export enum AIProviderType {
  OpenAI = 'openai',
  Anthropic = 'anthropic',
}

export enum NodeType {
  Source,
  Processing,
  Sink,
  Fallback,
}

export enum FallbackActionKind {
  Republish = 'republish',
  Reference = 'reference',
}
