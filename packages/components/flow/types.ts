import type { Position, Edge, Node } from '@vue-flow/core'

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

export enum EditedWay {
  Form,
  SQL,
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

export enum NodeType {
  Source,
  Processing,
  Sink,
  Fallback,
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
  Tablestore = 'tablestore',
  DiskLog = 'disk_log',
  S3Tables = 's3tables',
  Doris = 'doris',
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

export interface NodeItem {
  name: string
  specificType: string
}

export type PositionData =
  | { sourcePosition: Position; targetPosition?: undefined }
  | { targetPosition: Position; sourcePosition?: undefined }
  | { sourcePosition: Position; targetPosition: Position }

export type FlowData = Array<Node | Edge>
