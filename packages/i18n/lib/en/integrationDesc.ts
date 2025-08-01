export const enIntegrationDesc: Record<string, Record<string, string>> = {
  common: {
    auto_restart_interval: 'The auto restart interval after the resource is disconnected.',
    batch_size: "Maximum batch count. If equal to 1, there's effectively no batching.",
    batch_time:
      'Maximum waiting interval when accumulating a batch at a low message rates for more efficient resource usage.',
    enable_queue:
      'Enable disk buffer queue (only applicable for egress bridges).\nWhen Enabled, messages will be buffered on disk when the bridge connection is down.\nWhen disabled the messages are buffered in RAM only.',
    health_check_interval: 'Health check interval.',
    health_check_interval_jitter:
      'A uniform random delay to be added to health check interval, so that Actions and Sources from the same Connector start their health checks at different instants.',
    inflight_window:
      'Query inflight window. When query_mode is set to async, this config has to be set to 1 if messages from the same MQTT client have to be strictly ordered.',
    query_mode: "Query mode. Optional 'sync/async', default 'async'.",
    request_ttl:
      'Starting from the moment when the request enters the buffer, if the request remains in the buffer for the specified time or is sent but does not receive a response or acknowledgement in time, the request is considered expired.',
    start_timeout:
      'Time interval to wait for an auto-started resource to become healthy before responding resource creation requests.',
    worker_pool_size:
      'The number of buffer workers. Only applicable for egress type bridges.\nFor bridges only have ingress direction data flow, it can be set to 0 otherwise must be greater than 0.',
    max_buffer_bytes: 'Maximum number of bytes to buffer for each buffer worker.',
    password: 'Password used for authentication with the external database.',
    pool_size: 'Size of the connection pool towards the bridge target service.',
    prepare_statement: 'Key-value list of SQL prepared statements.',
    ssl: 'SSL connection settings.',
    username:
      'The username in the external database used for authentication or identification purposes.',
    database: 'Database name.',
    tcp_keepalive:
      'Enable TCP keepalive for connector.<br/>The value is a comma-separated list of three numbers in the format of `Idle,Interval,Probes`<br/>- Idle: The number of seconds of idle time needed by a connection before the server begins to send out keep-alive probes (default on Linux is 7200).<br/>- Interval: The number of seconds between TCP keep-alive probes (default on Linux is 75).<br/>- Probes: The maximum number of TCP keep-alive probes to send before considering the connection as closed if no response is received from the other end (default on Linux is 9).<br/>For example "240,30,5" means: send TCP keepalive probes after 240 seconds of idle time, and send probes every 30 second. If there are no responses for 5 consecutive attempts, the connection should be closed.<br/>Default: \'none\'',
    sndbuf: 'Fine tune the socket send buffer. The default value is tuned for high throughput.',
    recbuf: 'Fine tune the socket receive buffer. The default value is tuned for high throughput.',
    nodelay:
      'When set to `true`, TCP buffer is sent as soon as possible. Otherwise, the OS kernel may buffer small TCP packets for a while (40 ms by default).',
    pool_type: 'The type of the pool. Can be one of `random`, `hash`.',
    max_retries: 'Max retry times if an error occurs when sending a request.',
    memory_overload_protection:
      'This setting applies when the buffer mode is configured as <code>memory</code>. EMQX will automatically discard older buffered messages when it encounters high memory pressure. Note: This configuration is effective only on Linux systems.',
    disable_prepared_statements:
      'Disables the usage of prepared statements in the connections. Some endpoints, like PGBouncer or Supabase in Transaction mode, do not support session features such as prepared statements. For such connections, this option should be enabled.',
    health_check_topic: 'Topic name used exclusively for more accurate health checks.',
    max_records: `Number of records (events) allowed per each aggregated object. Each aggregated upload will contain no more than that number of events, but may contain less.<br/>If event rate is high enough, there obviously may be more than one aggregated upload during the same time interval. These uploads will have different, but consecutive sequence numbers, which will be a part of S3 object key.`,
    max_linger_time:
      "Maximum duration for a per-partition producer to wait for messages in order to collect a batch to buffer.<br/>The default value <code>0</code> means no wait. For non-memory buffer mode, it's advised to configure at least <code>5ms</code> for less IOPS.",
    max_linger_bytes:
      'Maximum number of bytes for a per-partition producer to wait for messages in order to collect a batch to buffer.',
    undefined_vars_as_null:
      "When writing to databases, treat undefined variables as NULL.<br/>When this option is enabled, if undefined variables (like `${'{'}var{'}'}`) are used in templates, they will be replaced with `NULL` instead of the string `undefined`. If this option is not enabled (default), the string `undefined` might be inserted.<br/>This option should always be `true` if possible; the default value `false` is only to ensure backward compatibility.",
    max_inactive:
      'Maximum amount of time without any activity that the HTTP driver will wait before attempting to reconnect.',
    ipv6_probe: 'Whether to probe for IPv6 support.',
    min_part_size: `The minimum part size for multipart uploads.<br/>Uploaded data will be accumulated in memory until this size is reached.`,
    max_part_size: `The maximum part size for multipart uploads.<br/>S3 uploader won't try to upload parts larger than this size.`,
  },
  mqtt: {
    bridge_mode:
      'This setting is only for MQTT protocol version older than 5.0, and the remote MQTT broker MUST support this feature. After being enabled, the remote broker will recognize the current connection as a bridge, that loop detection will be more effective and that retained messages will be propagated correctly.',
    clean_start:
      'Whether to start a clean session when reconnecting a remote broker for ingress bridge.',
    retry_interval: 'Retry interval for QoS1/QoS2 messages if no ACK is received.',
    clientid_prefix: 'The prefix used when the connector randomly generates a Client ID.',
    max_inflight:
      'The number of Unacked messages that can be simultaneously waited for during message publishing, in order to improve message delivery efficiency and throughput.',
    topic:
      "Message publishing topic, supports using ${'{'}field{'}'} syntax to extract variables and dynamically concatenate the topic.",
    source_topic:
      'Message subscription topics support the use of + and # wildcards. When EMQX is running in cluster mode or the connector is configured with a connection pool, shared subscriptions must be used to avoid message duplication.',
    payload:
      "For example: ${'{'}payload{'}'}, ${'{'}clientid{'}'}, ${'{'}topic{'}'} , ${'{'}username{'}'}, etc. Use fields according to the action requirements of your business and forwards the message as it is if it is empty.Supports reading data using ${'{'}field{'}'} syntax.",
    static_clientids:
      'Entries mapping EMQX node names to static client IDs. If any entries are defined, then only EMQX nodes matching those entries will start MQTT clients with the corresponding clientids.',
    node: "EMQX node name, e.g.: <code>emqx{'@'}10.0.0.1</code>.",
    ids: 'Array of static client IDs assigned to this node.',
  },
  http: {
    url: "The URL of the HTTP Connector.<br/>Template with variables is allowed in the path, but variables cannot be used in the host or port part.<br/>For example, `http://localhost:9901/${'{'}topic{'}'}` is allowed, but`http://${'{'}host{'}'}:9901/message` or `http://localhost:${'{'}port{'}'}/message`is not allowed.",
    body: "For example: ${'{'}payload{'}'}, ${'{'}clientid{'}'}, ${'{'}topic{'}'} , ${'{'}username{'}'}, etc. Use fields according to the action requirements of your business and forwards the message as it is if it is empty.",
    path: "The URL path for this Action.<br/>This path will be appended to the Connector's <code>url</code> configuration to form the full URL address.Template with variables is allowed in this option. For example, <code>/room/{'{'}$room_no{'}'}</code>",
  },
  cassandra: {
    keyspace: 'Keyspace name to connect to.',
    servers:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port][,Host2:Port]`.<br/>The Cassandra default port 9042 is used if `[:Port]` is not specified.',
    cql: 'CQL Template',
  },
  clickhouse: {
    batch_value_separator:
      "The default value ',' works for the VALUES format. You can also use other separator if other format is specified. See [INSERT INTO Statement](https://clickhouse.com/docs/en/sql-reference/statements/insert-into).",
    connect_timeout: 'The timeout when connecting to the Clickhouse server.',
    url: 'The HTTP URL to the Clickhouse server that you want to connect to (for example http://myhostname:8123)',
    sql: "The template string can contain ${'{'}field{'}'} placeholders for message metadata and payload field. Make sure that the inserted values are formatted and escaped correctly. [Prepared Statement](https://docs.emqx.com/en/enterprise/v5.0/data-integration/data-bridges.html#Prepared-Statement) is not supported.",
  },
  dynamo: {
    template:
      "Template, the default value is empty. When this value is empty the whole message will be stored in the database.<br/>The template can be any valid JSON with placeholders and make sure all keys for table are here, example:<br/>  `{'{'}\"id\" : \"${'{'}id{'}'}\", \"clientid\" : \"${'{'}clientid{'}'}\", \"data\" : \"${'{'}payload.data{'}'}\"{'}'}`",
    url: 'The url of DynamoDB endpoint.',
    table: 'DynamoDB Table.',
    aws_access_key_id: 'Access Key ID for connecting to DynamoDB.',
    aws_secret_access_key: 'AWS Secret Access Key for connecting to DynamoDB.',
    region: 'Region of the AWS dynamo',
  },
  gcp_pubsub_producer: {
    pipelining:
      'A positive integer. Whether to send HTTP requests continuously, when set to 1, it means that after each HTTP request is sent, you need to wait for the server to return and then continue to send the next request.',
    connect_timeout: 'The timeout when connecting to the GCP server.',
    service_account_json:
      "JSON containing the GCP Service Account credentials to be used with PubSub.<br/>When a GCP Service Account is created (as described in https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount), you have the option of downloading the credentials in JSON form.  That's the file needed.",
    pubsub_topic: 'The GCP PubSub topic to publish messages to.',
    payload_template:
      'The template for formatting the outgoing messages.  If undefined, will send all the available context in JSON format.',
    attributes_template:
      'The template for formatting the outgoing message attributes.  Undefined values will be rendered as empty string values.  Empty keys are removed from the attribute map.',
    ordering_key_template:
      "The template for formatting the outgoing message ordering key.  Undefined values will be rendered as empty string values.  This value will not be added to the message if it's empty.",
  },
  gcp_pubsub_consumer: {
    topic: 'GCP PubSub topic to consume from.',
    pipelining:
      'A positive integer. Whether to send HTTP requests continuously, when set to 1, it means that after each HTTP request is sent, you need to wait for the server to return and then continue to send the next request.',
    service_account_json:
      "JSON containing the GCP Service Account credentials to be used with PubSub.<br/>When a GCP Service Account is created (as described in https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount), you have the option of downloading the credentials in JSON form.  That's the file needed.",
    pull_max_messages:
      'The maximum number of messages to retrieve from GCP PubSub in a single pull request.\n The actual number may be less than the specified value.',
    connect_timeout: 'The timeout when connecting to the GCP server.',
  },
  hstreamdb: {
    url: 'HStreamDB Server URL. Using gRPC http server address.',
    partition_key: 'HStreamDB Partition Key. Placeholders supported.',
    grpc_flush_timeout: 'Time interval for flushing gRPC calls to the HStreamDB server.',
    aggregation_pool_size:
      'The size of the record aggregation pool. A larger aggregation pool size can lead to enhanced parallelization but may also result in reduced efficiency due to smaller batch sizes.',
    max_batches: 'Maximum number of unconfirmed batches in the flush queue.',
    writer_pool_size:
      'The size of the writer pool. A larger pool may increase parallelization and concurrent write operations, potentially boosting throughput. Trade-offs include greater memory consumption and possible resource contention.',
    batch_interval: 'Maximum interval that is allowed between two successive (batch) request.',
    record_template:
      'The HStream record template to be forwarded to the HStreamDB. Placeholders supported.<br/>NOTE: When you use `raw record` template (which means the data is not a valid JSON), you should use `read` or `subscription` in HStream to get the data.',
    parameters_batch_size:
      'Maximum number of insert data clauses that can be sent in a single request.',
  },
  influxdb: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/><br/>A host entry has the following form: `Host[:Port]`.<br/><br/>The InfluxDB default port 8086 is used if `[:Port]` is not specified.',
    token: 'InfluxDB token.',
    org: 'Organization name of InfluxDB.',
    bucket: 'InfluxDB bucket name.',
    write_syntax:
      "Conf of InfluxDB line protocol to write data points. It is a text-based format that provides the measurement, tag set, field set, and timestamp of a data point, and placeholder supported. See also [InfluxDB 2.3 Line Protocol](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/) and [InfluxDB 1.8 Line Protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) <br/>TLDR:<br/>```<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]```<br/>Please note that a placeholder for an integer value must be annotated with a suffix `i`. For example `${'{'}payload.int_value{'}'}i`.",
    precision: 'InfluxDB time precision.',
  },
  datalayers: {
    write_syntax:
      'Datalayers adopts a line protocol fully compatible with InfluxDB v1, providing users with a familiar and efficient method for data ingestion. While compatible with InfluxDB v1 syntax, Datalayers has its unique characteristics in its underlying implementation to optimize performance and adapt to its specific storage structure. For more information, refer to [InfluxDB Line Protocol](https://docs.datalayers.cn/datalayers/latest/development-guide/writing-with-influxdb-line-protocol.html).',
    precision: 'Datalayers time precision.',
  },
  confluent_producer: {
    connect_timeout:
      'Maximum wait time for TCP connection establishment (including authentication time if enabled).',
    bootstrap_hosts:
      'A comma separated list of Kafka <code>host[:port]</code> endpoints to bootstrap the client. Default port number is 9092.',
    min_metadata_refresh_interval:
      'Minimum time interval the client has to wait before refreshing Kafka broker and topic metadata. Setting too small value may add extra load on Kafka.',
    metadata_request_timeout: 'Maximum wait time when fetching metadata from Kafka.',
    topic: 'Kafka topic',
    kafka_headers:
      "Please provide a placeholder to be used as Kafka Headers<br/>e.g. <code>${'{'}pub_props{'}'}</code><br/>Notice that the value of the placeholder must either be an object:<br/>`{'{'}\"foo\": \"bar\"{'}'}`<br/>",
    kafka_header_value_encode_mode:
      'Kafka headers value encode mode:<br/>- `NONE`: only add binary values to Kafka headers;<br/>- `JSON`: only add JSON values to Kafka headers, and encode it to JSON strings before sending.',
    kafka_ext_headers:
      'Please provide more key-value pairs for Kafka headers.<br/>The key-value pairs here will be combined with the value of `kafka_headers` field before sending to Kafka.',
    key: "Template to render Kafka message key. If the template is rendered into a NULL value (i.e. there is no such data field in Rule Engine context) then Kafka's <code>NULL</code> (but not empty string) is used.",
    value:
      "Template to render Kafka message value. If the template is rendered into a NULL value (i.e. there is no such data field in Rule Engine context) then Kafka's <code>NULL</code> (but not empty string) is used.",
    partition_strategy:
      'Partition strategy is to tell the producer how to dispatch messages to Kafka partitions.<br/><code>random</code>: Randomly pick a partition for each message<br/><code>key_dispatch</code>: Hash Kafka message key to a partition number',
    max_batch_bytes:
      "Maximum bytes to collect in a Kafka message batch. Most of the Kafka brokers default to a limit of 1 MB batch size. EMQX's default value is less than 1 MB in order to compensate Kafka message encoding overheads (especially when each individual message is very small). When a single message is over the limit, it is still sent (as a single element batch).",
    required_acks:
      "Required acknowledgements for Kafka partition leader to wait for its followers before it sends back the acknowledgement to EMQX Kafka producer<br/><code>all_isr</code>: Require all in-sync replicas to acknowledge.<br/><code>leader_only</code>: Require only the partition-leader's acknowledgement.<br/><code>none</code>: No need for Kafka to acknowledge at all.",
    partition_count_refresh_interval:
      'The time interval for Kafka producer to discover increased number of partitions.<br/>After the number of partitions is increased in Kafka, EMQX will start taking the <br/>discovered partitions into account when dispatching messages per <code>partition_strategy</code>.',
    max_inflight:
      'Maximum number of batches allowed for Kafka producer (per-partition) to send before receiving acknowledgement from Kafka. Greater value typically means better throughput. However, there can be a risk of message reordering when this value is greater than 1.',
    query_mode: "Query mode. Optional 'sync/async', default 'async'.",
    sync_query_timeout:
      "This parameter defines the timeout limit for synchronous queries. It applies only when the bridge query mode is configured to 'sync'.",
    mode: 'Message buffer mode.<br/><code>memory</code>: Buffer all messages in memory. The messages will be lost in case of EMQX node restart<br/><code>disk</code>: Buffer all messages on disk. The messages on disk are able to survive EMQX node restart.<br/><code>hybrid</code>: Buffer message in memory first, when up to certain limit (see <code>segment_bytes</code> config for more information), then start offloading messages to disk, Like <code>memory</code> mode, the messages will be lost in case of EMQX node restart.',
    per_partition_limit:
      'Number of bytes allowed to buffer for each Kafka partition. When this limit is exceeded, old messages will be dropped in a trade for credits for new messages to be buffered.',
    segment_bytes:
      'Applicable when buffer mode is set to <code>disk</code> or <code>hybrid</code>.<br/>This value is to specify the size of each on-disk buffer file.',
    compression: 'Compression method.',
    partitions_limit:
      'Limits the maximum number of partitions to which a producer can send messages.',
  },
  kafka_producer: {
    bootstrap_hosts:
      'A comma separated list of Kafka <code>host[:port]</code> endpoints to bootstrap the client. Default port number is 9092.',
    authentication: 'Authentication configs.',
    connect_timeout:
      'Maximum wait time for TCP connection establishment (including authentication time if enabled).',
    min_metadata_refresh_interval:
      'Minimum time interval the client has to wait before refreshing Kafka broker and topic metadata. Setting too small value may add extra load on Kafka.',
    metadata_request_timeout: 'Maximum wait time when fetching metadata from Kafka.',
    topic: 'Kafka topic',
    kafka_headers:
      "Please provide a placeholder to be used as Kafka Headers<br/>e.g. <code>${'{'}pub_props{'}'}</code><br/>Notice that the value of the placeholder must either be an object:<br/>`{'{'}\"foo\": \"bar\"{'}'}`<br/>",
    kafka_header_value_encode_mode:
      'Kafka headers value encode mode:<br/>- `NONE`: only add binary values to Kafka headers;<br/>- `JSON`: only add JSON values to Kafka headers, and encode it to JSON strings before sending.',
    kafka_ext_headers:
      'Please provide more key-value pairs for Kafka headers.<br/>The key-value pairs here will be combined with the value of `kafka_headers` field before sending to Kafka.',
    key: "Template to render Kafka message key. If the template is rendered into a NULL value (i.e. there is no such data field in Rule Engine context) then Kafka's <code>NULL</code> (but not empty string) is used.",
    value:
      "Template to render Kafka message value. If the template is rendered into a NULL value (i.e. there is no such data field in Rule Engine context) then Kafka's <code>NULL</code> (but not empty string) is used.",
    kafka_message_timestamp:
      "Which timestamp to use. The timestamp is expected to be a millisecond precision Unix epoch which can be in string format, e.g. <code>1661326462115</code> or <code>'1661326462115'</code>. When the desired data field for this template is not found, or if the found data is not a valid integer, the current system timestamp will be used.",
    compression: 'Compression method.',
    partition_strategy:
      'Partition strategy is to tell the producer how to dispatch messages to Kafka partitions.<br/><code>random</code>: Randomly pick a partition for each message<br/><code>key_dispatch</code>: Hash Kafka message key to a partition number',
    max_batch_bytes:
      "Maximum bytes to collect in a Kafka message batch. Most of the Kafka brokers default to a limit of 1 MB batch size. EMQX's default value is less than 1 MB in order to compensate Kafka message encoding overheads (especially when each individual message is very small). When a single message is over the limit, it is still sent (as a single element batch).",
    required_acks:
      "Required acknowledgements for Kafka partition leader to wait for its followers before it sends back the acknowledgement to EMQX Kafka producer<br/><code>all_isr</code>: Require all in-sync replicas to acknowledge.<br/><code>leader_only</code>: Require only the partition-leader's acknowledgement.<br/><code>none</code>: No need for Kafka to acknowledge at all.",
    partition_count_refresh_interval:
      'The time interval for Kafka producer to discover increased number of partitions.<br/>After the number of partitions is increased in Kafka, EMQX will start taking the <br/>discovered partitions into account when dispatching messages per <code>partition_strategy</code>.',
    max_inflight:
      'Maximum number of batches allowed for Kafka producer (per-partition) to send before receiving acknowledgement from Kafka. Greater value typically means better throughput. However, there can be a risk of message reordering when this value is greater than 1.',
    query_mode: "Query mode. Optional 'sync/async', default 'async'.",
    sync_query_timeout:
      "This parameter defines the timeout limit for synchronous queries. It applies only when the bridge query mode is configured to 'sync'.",
    mode: 'Message buffer mode.<br/><code>memory</code>: Buffer all messages in memory. The messages will be lost in case of EMQX node restart<br/><code>disk</code>: Buffer all messages on disk. The messages on disk are able to survive EMQX node restart.<br/><code>hybrid</code>: Buffer message in memory first, when up to certain limit (see <code>segment_bytes</code> config for more information), then start offloading messages to disk, Like <code>memory</code> mode, the messages will be lost in case of EMQX node restart.',
    per_partition_limit:
      'Number of bytes allowed to buffer for each Kafka partition. When this limit is exceeded, old messages will be dropped in a trade for credits for new messages to be buffered.',
    segment_bytes:
      'Applicable when buffer mode is set to <code>disk</code> or <code>hybrid</code>.<br/>This value is to specify the size of each on-disk buffer file.',
    kafka_ext_header_key:
      "Key of the Kafka header. Placeholders in the format of <code>${'{'}var{'}'}</code> are supported.",
    mechanism: 'SASL authentication mechanism.',
    kerberos_principal:
      "SASL GSSAPI authentication Kerberos principal. For example <code>client_name{'@'}MY.KERBEROS.REALM.MYDOMAIN.COM</code>, NOTE: The realm in use has to be configured in /etc/krb5.conf in EMQX nodes.",
    kerberos_keytab_file:
      'SASL GSSAPI authentication Kerberos keytab file path. NOTE: This file has to be placed in EMQX nodes, and the EMQX service runner user requires read permission.',
    kafka_ext_header_value:
      "Value of the Kafka header. Placeholders in the format of <code>${'{'}var{'}'}</code> are supported.",
    partitions_limit:
      'Limits the maximum number of partitions to which a producer can send messages.',
  },
  kafka_consumer: {
    bootstrap_hosts:
      'A comma separated list of Kafka <code>host[:port]</code> endpoints to bootstrap the client. Default port number is 9092.',
    key_encoding_mode:
      'Defines how the key from the Kafka message is encoded before being forwarded via MQTT.<br/><code>none</code> Uses the key from the Kafka message unchanged.  Note: in this case, the key must be a valid UTF-8 string.<br/><code>base64</code> Uses base-64 encoding on the received key.',
    value_encoding_mode:
      'Defines how the value from the Kafka message is encoded before being forwarded via MQTT.<br/><code>none</code> Uses the value from the Kafka message unchanged.  Note: in this case, the value must be a valid UTF-8 string.<br/><code>base64</code> Uses base-64 encoding on the received value.',
    offset_reset_policy:
      'Defines from which offset a consumer should start fetching when there is no commit history or when the commit history becomes invalid.',
    min_metadata_refresh_interval:
      'Minimum time interval the client has to wait before refreshing Kafka broker and topic metadata. Setting too small value may add extra load on Kafka.',
    metadata_request_timeout: 'Maximum wait time when fetching metadata from Kafka.',
    connect_timeout:
      'Maximum wait time for TCP connection establishment (including authentication time if enabled).',
    max_batch_bytes:
      'Set how many bytes to pull from Kafka in each fetch request.<br/>Messages are fetched in batches by the consumer, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that the consumer can make progress. As such, this is not an absolute maximum. Set `1` for minimal latency.',
    offset_commit_interval_seconds:
      'Defines the time interval between two offset commit requests sent for each consumer group.',
    topic: 'Kafka topic',
    group_id:
      'Consumer group identifier to be used for this source. If omitted, one based off the source name will be automatically generated.',
    max_wait_time:
      'Maximum amount of time that is waited for the Kafka broker to send a fetch response.',
  },
  mongodb: {
    collection: 'The collection where data will be stored into',
    payload_template:
      'The template for formatting the outgoing messages.  If undefined, rule engine will use JSON format to serialize all visible inputs, such as clientid, topic, payload etc.',
    auth_source: "Database name associated with the user's credentials.",
    use_legacy_protocol:
      "Whether to use MongoDB's legacy protocol for communicating with the database. The default is to attempt to automatically determine if the newer protocol is supported.",
    srv_record: 'Use DNS SRV record.',
    max_overflow:
      'The maximum number of additional workers that can be created when all workers in the pool are busy. This helps to manage temporary spikes in workload by allowing more concurrent connections to the MongoDB server.',
    overflow_ttl:
      'Period of time before workers that exceed the configured pool size ("overflow") to be terminated.',
    overflow_check_period:
      'Period for checking if there are more workers than configured ("overflow").',
    local_threshold:
      'The size of the latency window for selecting among multiple suitable MongoDB instances.',
    connect_timeout: 'The duration to attempt a connection before timing out.',
    socket_timeout:
      'The duration to attempt to send or to receive on a socket before the attempt times out.',
    server_selection_timeout:
      'Specifies how long to block for server selection before throwing an exception.',
    wait_queue_timeout:
      'The maximum duration that a worker can wait for a connection to become available.',
    heartbeat_frequency:
      'Controls when the driver checks the state of the MongoDB deployment. Specify the interval between checks, counted from the end of the previous check until the beginning of the next one. If the number of connections is increased (which will happen, for example, if you increase the pool size), you may need to increase this period as well to avoid creating too many log entries in the MongoDB log file.',
    min_heartbeat_frequency: 'Controls the minimum amount of time to wait between heartbeats.',
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The MongoDB default port 27017 is used if `[:Port]` is not specified.',
    w_mode: 'Write mode.',
    servers:
      'A Node list for Cluster to connect to. The nodes should be separated with commas, such as: `Node[,Node].`<br/>For each Node should be: The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The MongoDB default port 27017 is used if `[:Port]` is not specified.',
    replica_set_name: 'Name of the replica set.',
    r_mode: 'Read mode.',
  },
  mysql: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The MySQL default port 3306 is used if `[:Port]` is not specified.',
    sql: 'SQL Template',
  },
  pgsql: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The default port 5432 is used if `[:Port]` is not specified.',
    sql: 'SQL Template',
  },
  redis: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The Redis default port 6379 is used if `[:Port]` is not specified.',
    servers:
      'A Node list for Cluster to connect to. The nodes should be separated with commas, such as: `Node[,Node].`<br/>For each Node should be: The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The Redis default port 6379 is used if `[:Port]` is not specified.',
    sentinel:
      "Sentinel mode. Must be set to 'sentinel' when Redis server is running in sentinel mode.",
    command_template:
      "Redis command template used to export messages. Each list element stands for a command name or its argument.<br/>For example, to push payloads in a Redis list by key `msgs`, the elements should be the following:<br/>`rpush`, `msgs`, `${'{'}payload{'}'}`.",
  },
  rocketmq: {
    servers:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The RocketMQ default port 9876 is used if `[:Port]` is not specified.',
    access_key: 'RocketMQ server `accessKey`.',
    secret_key: 'RocketMQ server `secretKey`.',
    security_token: 'RocketMQ Server Security Token',
    topic: 'RocketMQ Topic',
    refresh_interval: 'RocketMQ Topic Route Refresh Interval.',
    send_buffer: 'The socket send buffer size of the RocketMQ driver client.',
    template:
      "Template, the default value is empty. When this value is empty the whole message will be stored in the RocketMQ.<br/>The template can be any valid string with placeholders, example:<br/>- ${'{'}id{'}'}, ${'{'}username{'}'}, ${'{'}clientid{'}'}, ${'{'}timestamp{'}'}<br/>- {'{'}\"id\" : ${'{'}id{'}'}, \"username\" : ${'{'}username{'}'}{'}'}",
    sync_timeout: 'Timeout of RocketMQ driver synchronous call.',
    namespace:
      'The namespace field MUST be set if you are using the RocketMQ service in aliyun cloud and also the namespace is enabled, or if you have configured a namespace in your RocketMQ server. For RocketMQ in aliyun cloud, the namespace is the instance ID.',
    strategy:
      'Producer key dispatch strategy, the default is `roundrobin`, also supports placeholders.',
  },
  tdengine: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `[http[s]://]Host[:Port]`.<br/>The TDengine default port 6041 is used if `[:Port]` is not specified.',
    sql: 'SQL Template',
    token:
      'The token used when connecting to TDengine Cloud. <br/>If this value is provided, it will override the authentication method of Username and Password.',
  },
  sqlserver: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The SQL Server default port 1433 is used if `[:Port]` is not specified.',
    driver: 'SQL Server Driver Name',
    sql: 'SQL Template',
  },
  iotdb: {
    base_url:
      "The base URL of the external IoTDB service's REST interface.<br/> The URL has the following form `http://Host:Port`.",
    iotdb_version: 'The version of the IoTDB system to connect to.',
    enable_pipelining:
      'A positive integer. Whether to send HTTP requests continuously, when set to 1, it means that after each HTTP request is sent, you need to wait for the server to return and then continue to send the next request.',
    connect_timeout: 'The timeout when connecting to the IoTDB server.',
    timestamp:
      "Supports the use of ${'{'}var{'}'} format as a placeholder, which should be in timestamp format. You can also use the following special characters to insert system time:<br/>- `now`: Current millisecond-level timestamp<br/>- `now_ms`: Current millisecond-level timestamp<br/>- `now_us`: Current microsecond-level timestamp<br/>- `now_ns`: Current nanosecond-level timestamp",
    measurement: "Supports the use of ${'{'}var{'}'} format as a placeholder.",
    data_type:
      'The data type for the value. Supported types: boolean, int32, int64, float, double, text.',
    value: "The value to be inserted, supports the use of ${'{'}var{'}'} format as a placeholder.",
    device_id:
      'A fixed device name this data should be inserted for. If empty it must either be set in the rule action, the message itself, or it will be extracted from the topic.',
    is_aligned: 'Whether to align the timeseries',
    recv_timeout: 'Timeout for receiving from IoTDB Thrift server.',
  },
  opents: {
    server: 'The URL of OpenTSDB endpoint.',
    summary: 'Whether to return summary information.',
    details: 'Whether to return detailed information.',
    timestamp:
      "Second or millisecond level timestamp, supports placeholders in the format of ${'{'}var{'}'}.",
    metric:
      "The name of the metric, should be a unique identifier for the time series data, supports placeholders in the format of ${'{'}var{'}'}.",
    tags: "Tags for attaching metadata, each tag is a key-value pair, configured in the `key=value,key2=value2` format, and supports placeholders in the format of ${'{'}var{'}'}.",
    value:
      "The value of the data point, supports placeholders in the format of ${'{'}var{'}'}. It represents the actual measurement or observed value.",
  },
  oracle: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to.<br/>A host entry has the following form: `Host[:Port]`.<br/>The Oracle Database default port 1521 is used if `[:Port]` is not specified.',
    sid: 'SID for Oracle Database.',
    sql: 'SQL Template. The template string can contain placeholders for message metadata and payload field. The placeholders are inserted without any checking and special formatting, so it is important to ensure that the inserted values are formatted and escaped correctly.',
  },
  rabbitmq: {
    server: 'The RabbitMQ server address that you want to connect to (for example, localhost).',
    port: 'The port number on which the RabbitMQ server is listening (default is 5672).',
    exchange: 'The name of the RabbitMQ exchange where the messages will be sent.',
    routing_key:
      'The routing key used to route messages to the correct queue in the RabbitMQ exchange.',
    virtual_host: 'The virtual host to use when connecting to the RabbitMQ server.',
    heartbeat: 'The interval for sending heartbeat messages to the RabbitMQ server.',
    delivery_mode:
      "The delivery mode for messages published to RabbitMQ. Delivery mode `non_persistent` is suitable for messages that don't require persistence across RabbitMQ restarts, whereas delivery mode `persistent` is designed for messages that must survive RabbitMQ restarts.",
    wait_for_publish_confirmations:
      'A boolean value that indicates whether to wait for RabbitMQ to confirm message publication when using publisher confirms.',
    publish_confirmation_timeout:
      'The timeout for waiting for RabbitMQ to confirm message publication when using publisher confirms.',
    timeout: 'The timeout for waiting on the connection to be established.',
    payload_template:
      "The template for formatting the payload of the message before sending it to RabbitMQ. Template placeholders, such as ${'{'}field1.sub_field{'}'}, will be substituted with the respective field's value. When left empty, the entire input message will be used as the payload, formatted as a JSON text. This behavior is equivalent to specifying ${'{'}.{'}'} as the payload template.",
    queue: 'The queue name of the RabbitMQ.',
    no_ack: 'Whether to use no_ack mode when consuming messages from the RabbitMQ.',
  },
  pulsar: {
    servers:
      'Specify the Pulsar Server URL in the format of <code>scheme://host[:port]</code> for the client to connect to. Multiple servers should be added as a comma-separated list. The supported schemes are <code>pulsar://</code> (default) and <code>pulsar+ssl://</code>. The default port is 6650.',
    pulsar_topic: 'Pulsar topic name',
    strategy:
      'Choose how messages are dispatched to Pulsar partitions:<br/><code>random</code>: Messages are randomly assigned to partitions.<br/><code>roundrobin</code>: Messages are evenly distributed across available producers.<br/><code>key_dispatch</code>: Partitions to be selected are hashed and stored in the Pulsar message key of the first message in a batch.',
    compression: 'Compression method.',
    message_key: 'Template to render Pulsar message key.',
    message_value: 'Template to render Pulsar message value.',
    sync_timeout: 'Maximum wait time for receipt in synchronously publishing.',
    retention_period:
      'Specify the duration to buffer messages when disconnected from the Pulsar broker. Longer times increase memory/disk usage.',
    send_buffer:
      'Fine tune the socket send buffer. The default value is tuned for high throughput.',
    max_batch_bytes:
      'Specify the limit on the number of bytes collected in a batch. EMQX has set the default value to less than 5 MB to account for encoding overheads especially when handling small messages. If a single message exceeds the batch size limit, it will still be sent as a single-element batch, indicating it will be treated as a separate batch containing only that specific message.',
    connect_timeout:
      'Maximum wait time for TCP connection establishment (including authentication time if enabled).',
    mode: 'Message buffer mode:<br/><code>memory</code>: Buffer all messages in memory. The messages will be lost if EMQX node restarts.<br/><code>disk</code>: Buffer all messages on disk. The messages are designed to persist even during an EMQX node restart.<br/><code>hybrid</code>: Buffer message in memory first, when up to a certain limit (see <code>segment_bytes</code> config for more information), then start offloading messages to disk, the messages will be lost in if EMQX node restarts.',
    per_partition_limit:
      'Number of bytes allowed to buffer for each Pulsar partition. When the message limit is exceeded, older messages will be selectively dropped to allocate buffer space for new messages.',
    segment_bytes:
      'Applicable when buffer mode is set to <code>disk</code> or <code>hybrid</code>.<br/>This value is to specify the size of each on-disk buffer file.',
    authentication_jwt: 'JWT authentication token.',
    max_inflight:
      'The maximum number of message batches that the producer can send to each partition before it must wait for a receipt.<br/>Setting a higher number can enhance throughput.',
  },
  azure_event_hub_producer: {
    bootstrap_hosts:
      'A comma separated list of Azure Event Hubs Kafka <code>host[:port]</code> namespace endpoints to bootstrap the client.  Default port number is 9093.',
    connect_timeout:
      'Maximum wait time for TCP connection establishment (including authentication time if enabled).',
    min_metadata_refresh_interval:
      'Minimum time interval the client has to wait before refreshing Azure Event Hubs Kafka broker and topic metadata. Setting too small value may add extra load on Azure Event Hubs.',
    metadata_request_timeout: 'Maximum wait time when fetching metadata from Azure Event Hubs.',
    password:
      'The Connection String for connecting to Azure Event Hubs. Should be the "connection string-primary key" of a Namespace shared access policy.',
    topic: 'Event Hub name',
    max_batch_bytes:
      "Maximum bytes to collect in an Azure Event Hubs message batch. Most of the Kafka brokers default to a limit of 1 MB batch size. EMQX's default value is less than 1 MB in order to compensate Kafka message encoding overheads (especially when each individual message is very small). When a single message is over the limit, it is still sent (as a single element batch).",
    partition_strategy:
      'Partition strategy is to tell the producer how to dispatch messages to Azure Event Hubs partitions.\n\n<code>random</code>: Randomly pick a partition for each message\n<code>key_dispatch</code>: Hash Azure Event Hubs message key to a partition number',
    required_acks:
      "Required acknowledgements for Azure Event Hubs partition leader to wait for its followers before it sends back the acknowledgement to EMQX Azure Event Hubs producer\n\n<code>all_isr</code>: Require all in-sync replicas to acknowledge.\n<code>leader_only</code>: Require only the partition-leader's acknowledgement.",
    kafka_headers:
      "Please provide a placeholder to be used as Azure Event Hubs Headers<br/>\ne.g. <code>${'{'}pub_props{'}'}</code><br/>\nNotice that the value of the placeholder must either be an object:\n<code>{'{'}\\\"foo\\\": \\\"bar\\\"{'}'}</code>",
    kafka_ext_headers:
      'Please provide more key-value pairs for Azure Event Hubs headers<br/>The key-value pairs here will be combined with the value of <code>kafka_headers</code> field before sending to Azure Event Hubs.',
    kafka_header_value_encode_mode:
      'Azure Event Hubs headers value encode mode<br/>\n - NONE: only add binary values to Azure Event Hubs headers;<br/>\n - JSON: only add JSON values to Azure Event Hubs headers,\nand encode it to JSON strings before sending.',
    partition_count_refresh_interval:
      'The time interval for Azure Event Hubs producer to discover increased number of partitions.\nAfter the number of partitions is increased in Azure Event Hubs, EMQX will start taking the\ndiscovered partitions into account when dispatching messages per <code>partition_strategy</code>.',
    max_inflight:
      'Maximum number of batches allowed for Azure Event Hubs producer (per-partition) to send before receiving acknowledgement from Azure Event Hubs. Greater value typically means better throughput. However, there can be a risk of message reordering when this value is greater than 1.',
    query_mode: "Query mode. Optional 'sync/async', default 'async'.",
    sync_query_timeout:
      "This parameter defines the timeout limit for synchronous queries. It applies only when the bridge query mode is configured to 'sync'.",
    key: "Template to render Azure Event Hubs message key. If the template is rendered into a NULL value (i.e. there is no such data field in Rule Engine context) then Azure Event Hubs's <code>NULL</code> (but not empty string) is used.",
    value:
      "Template to render Azure Event Hubs message value. If the template is rendered into a NULL value (i.e. there is no such data field in Rule Engine context) then Azure Event Hubs's <code>NULL</code> (but not empty string) is used.",
    kafka_ext_header_key:
      "Key of the Azure Event Hubs header. Placeholders in format of ${'{'}var{'}'} are supported.",
    kafka_ext_header_value:
      "Value of the Azure Event Hubs header. Placeholders in format of ${'{'}var{'}'} are supported.",
    mode: 'Message buffer mode.\n\n<code>memory</code>: Buffer all messages in memory. The messages will be lost in case of EMQX node restart\n<code>disk</code>: Buffer all messages on disk. The messages on disk are able to survive EMQX node restart.\n<code>hybrid</code>: Buffer message in memory first, when up to certain limit (see <code>segment_bytes</code> config for more information), then start offloading messages to disk, Like <code>memory</code> mode, the messages will be lost in case of EMQX node restart.',
    per_partition_limit:
      'Number of bytes allowed to buffer for each Azure Event Hubs partition. When this limit is exceeded, old messages will be dropped in a trade for credits for new messages to be buffered.',
    segment_bytes:
      'Applicable when buffer mode is set to <code>disk</code> or <code>hybrid</code>.\nThis value is to specify the size of each on-disk buffer file.',
    partitions_limit:
      'Limits the maximum number of partitions to which a producer can send messages.',
  },
  kinesis: {
    payload_template:
      'The template for formatting the outgoing messages.  If undefined, will send all the available context in JSON format.',
    aws_access_key_id: 'Access Key ID for connecting to Amazon Kinesis.',
    aws_secret_access_key: 'AWS Secret Access Key for connecting to Amazon Kinesis.',
    endpoint: 'The url of Amazon Kinesis endpoint.',
    stream_name: 'The Amazon Kinesis Stream to publish messages to.',
    partition_key:
      "The Amazon Kinesis Partition Key associated to published message. Placeholders in format of ${'{'}var{'}'} are supported.",
  },
  greptimedb: {
    server:
      'The IPv4 or IPv6 address or the hostname to connect to. A host entry has the following form: `Host[:Port]`.',
    dbname: 'GreptimeDB database.',
    precision: 'GreptimeDB time precision.',
    write_syntax:
      "Conf of GreptimeDB gRPC protocol to write data points. Write syntax is a text-based format that provides the measurement, tag set, field set, and timestamp of a data point, and placeholder supported, which is the same as InfluxDB line protocol.\nSee also [InfluxDB 2.3 Line Protocol](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/) and\n[InfluxDB 1.8 Line Protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) <br/>\nTLDR:<br/>\n```\n<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]\n```\nPlease note that a placeholder for an integer value must be annotated with a suffix `i`. For example `${'{'}payload.int_value{'}'}i`.",
    ttl: 'The time-to-live setting for automatically created tables in GreptimeDB.',
  },
  syskeeper_proxy: {
    listen: 'The listening address for this Syskeeper proxy server',
    acceptors: 'The number of the acceptors',
    handshake_timeout: 'The maximum to wait for the handshake when a connection is created',
  },
  syskeeper_forwarder: {
    server: 'The address of the Syskeeper proxy server',
    ack_mode:
      'Specify whether the proxy server should reply with an acknowledgement for the message forwarding, can be:<br/>- need_ack <br/>- no_ack <br/>',
    ack_timeout: 'The maximum time to wait for an acknowledgement from the proxy server',
    target_topic: 'The topic for the forwarded message',
    target_qos: 'The QoS for the forwarded message, left blank for the original topic',
    template: 'Message template. Placeholders supported.',
  },
  elasticsearch: {
    server: 'The REST server address of the ElasticSearch service.',
    routing:
      'Specifies the shard in the index where the document should be stored. If left blank, Elasticsearch decides.',
    wait_for_active_shards:
      'Number of shard replicas that must be active before proceeding.\nSet to "all" or any positive integer, up to the total number of shards in the index (number_of_replicas+1).\nDefault: 1, i.e., the primary shard.',
    index:
      "Name of the index or index alias to perform the operation on, supports ${'{'}var{'}'} format placeholders.",
    id: "Unique identifier for the document within the index, supports ${'{'}var{'}'} format placeholders. If ID is not specified, it is autogenerated by Elasticsearch.",
    doc: "Custom document template, supports ${'{'}var{'}'} format placeholders, must be convertible to a JSON object.\nFor example, `{'{'} \"field\": \"${'{'}payload.field{'}'}\" {'}'}`, or `${'{'}payload{'}'}`.",
    overwrite: 'Overwrites the document if it already exists, otherwise the write will fail.',
    enable_pipelining:
      'A positive integer. Whether to send HTTP requests continuously, when set to 1, it means that after each HTTP request is sent, you need to wait for the server to return and then continue to send the next request.',
    connect_timeout: 'The timeout when connecting to the ElasticSearch server.',
    doc_as_upsert:
      'Treat the update operation as an insert operation when the document to be updated does not exist, and insert the provided document as a new document.',
  },
  s3: {
    acl: 'The Access Control List (ACL) to use for the uploaded objects.',
    content: 'The content of the object to be uploaded supports placeholders.',
    bucket:
      "The name of the bucket to which files will be uploaded. Needs to be pre-created in S3. Supports the ${'{'}var{'}'} placeholder format.",
    key: "The content of the object to be stored. By default, it is in JSON text format containing all fields. Supports placeholder settings such as ${'{'}payload{'}'}. The storage format depends on the format of the variable and can be stored in binary format.",
    column_order: `Event fields that will be ordered first as columns in the resulting CSV file.<br/>Regardless of this setting, resulting CSV will contain all the fields of aggregated events, but all the columns not explicitly mentioned here will be ordered after the ones listed here in the lexicographical order.`,
    time_interval: 'Amount of time events will be aggregated in a single object before uploading.',
  },
  azure_blob_storage: {
    column_order: `Event fields that will be ordered first as columns in the resulting CSV file.<br/>Regardless of this setting, resulting CSV will contain all the fields of aggregated events, but all the columns not explicitly mentioned here will be ordered after the ones listed here in the lexicographical order.`,
    time_interval: 'Amount of time events will be aggregated in a single object before uploading.',
    content: 'The content of the object to be uploaded supports placeholders.',
    blob: 'Azure Blob Storage blob name.',
    parameters_container: 'Azure Blob Storage container name.',
  },
  snowflake: {
    private_key:
      'The private key configured for the Pipe User. This supports the input formats below:\n- Plain key: Enter the private key contents in PEM format directly as a string value.\n- File Path: Specify the path to a file that contains the private key. Ensure the path starts with <code>file://</code>. The file path must be the same on all nodes in the cluster.',
    database: 'Name of the Database that contains the Snowflake resources.',
    schema: 'Name of the Schema that contains the Snowflake resources.',
    stage: "Name of the Stage that'll be used for loading data files into Snowflake.",
    pipe: "Name of the Pipe that'll be used to ingest data into the table.",
    pipe_user:
      'A username which has a role with permissions over the Pipe to be used. The minimum permissions are `operate` and `monitor`.',
    proxy: 'Proxy configuration. Only HTTP proxies are currently supported (no HTTPS).',
    private_key_path:
      'Full file path to the private key to be used for the ODBC connection. This path must be the same on all nodes of the cluster.',
    private_key_password:
      'Password to decrypt the private key. Do not set this value if the private key is not encrypted.',
  },
  tablestore: {
    isint:
      'Whether try to write numeric value as integer. Defaults to false, means that write integers as floats.',
    isbinary:
      'Whether try to write binary values as binary type. Defaults to false, means that write binary values as strings.',
  },
  disk_log: {
    filepath:
      "Base file path to the log file to be written to.  Actual log files will have the format `filepath.N`, where `N` is `1..max_file_number`.  The currently used file can be found by taking the file with the most recent modification date.  Note that the directory containing it must also be writable by the EMQX application user, as it'll also contain extra files for internal use (ending in `.siz` and `.idx`).",
    max_file_size:
      'Maximum size for the currently active log file.  At least one entry is written to each log, so the final file size may exceed this maximum if a single log entry exceeds this value.',
    max_file_number:
      'Maximum number of log files to be used.  Once the maximum number of files is reached and a new rotation is required, the oldest such file is truncated and used as the new current file.',
    write_mode: 'Whether to write logs synchronously or asynchronously to disk.',
    template: 'Content of the JSON object to be written. Supports templates.',
  },
  s3tables: {
    s_3_client_transport_options_request_timeout:
      'The maximum time allowed for a single HTTP request to the S3 service. If exceeded, the request will be retried or fail.',
  },
}
