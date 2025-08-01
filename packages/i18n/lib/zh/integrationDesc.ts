export const zhIntegrationDesc: Record<string, Record<string, string>> = {
  common: {
    auto_restart_interval: '资源断开以后，自动重连的时间间隔。',
    batch_size: '最大批量请求大小。如果设为 1，则无批处理。',
    batch_time: '在较低消息率情况下尝试累积批量输出时的最大等待间隔，以提高资源的利用率。',
    enable_queue: '启用磁盘缓存队列（仅对 egress 方向桥接有用）。',
    health_check_interval: '健康检查间隔。',
    health_check_interval_jitter:
      '在健康检查间隔中添加一个均匀的随机延迟，以便使用同一连接器的动作和 Source 在不同时间点开始其健康检查。',
    inflight_window:
      '请求飞行队列窗口大小。当请求模式为异步时，如果需要严格保证来自同一 MQTT 客户端的消息有序，则必须将此值设为 1。',
    query_mode: "请求模式。可选 '同步/异步'，默认为'异步'模式。",
    request_ttl:
      '从请求进入缓冲区开始计时，如果请求在规定的时间内仍停留在缓冲区内或者已发送但未能及时收到响应或确认，该请求将被视为过期。',
    start_timeout: '在回复资源创建请求前等待资源进入健康状态的时间。',
    worker_pool_size:
      '缓存队列 worker 数量。仅对 egress 类型的桥接有意义。当桥接仅有 ingress 方向时，可设置为 0，否则必须大于 0。',
    max_buffer_bytes: '每个缓存 worker 允许使用的最大字节数。',
    password: '相关联的外部数据库中，用于认证或识别的密码。',
    pool_size: '桥接远端服务时使用的连接池大小。',
    prepare_statement: 'SQL 预处理语句列表。',
    ssl: '启用 SSL 连接。',
    username: '相关联的外部数据库中，用于认证或识别的用户名。',
    database: '数据库名字。',
    tcp_keepalive:
      '启用连接器的 TCP keepalive。<br/>该值是三个逗号分隔的数字，格式为`空闲时间,间隔时间,尝试次数`<br/>- 空闲时间：连接在服务器开始发送 keep-alive 探测之前需要空闲的秒数（Linux 默认为 7200）。<br/>- 间隔时间：TCP keep-alive 探测之间的秒数（Linux 默认为 75）。<br/>- 尝试次数：在从另一端获得响应之前发送的 TCP keep-alive 探测的最大次数（Linux 默认为 9）。<br/>例如，"240,30,5" 表示：在连接空闲 240 秒后发送 TCP keepalive 探测，并在每隔 30 秒发送一次探测，如果连续 5 次没有响应，则应该关闭连接。<br/>默认值：\'none\'',
    sndbuf: 'TCP socket 的发送缓存调优。默认值是针对高吞吐量的一个推荐值。',
    recbuf: 'TCP socket 的收包缓存调优。默认值是针对高吞吐量的一个推荐值。',
    nodelay:
      '设置 `true` 让系统内核立即发送。否则当需要发送的内容很少时，可能会有一定延迟（默认 40 毫秒）。',
    pool_type: '连接池的类型。可以是`random`、`hash`之一。',
    max_retries: '请求出错时的最大重试次数。',
    memory_overload_protection:
      '在缓冲区模式设置为 <code>memory</code> 时适用\n在内存压力较大时，EMQX 将删除旧的缓冲消息。注意：此配置仅适用于 Linux。',
    disable_prepared_statements:
      '在连接中禁用预处理语句。某些端点（如事务模式下的 PGBouncer 或 Supabase）不支持会话功能（如预处理语句）。对于此类连接，应启用此选项。',
    health_check_topic: '专用于精确检查健康状态的主题名称。',
    max_records: `每个聚合对象允许的记录（事件）数量。每次聚合上传包含的事件数量不会超过此数值，但可能会更少。<br/>如果事件速率足够高，在同一时间间隔内显然可能会有多个聚合上传。这些上传将具有不同但连续的序列号，这些序列号将是 S3 对象键的一部分。`,
    max_linger_time:
      '每个分区生产者，等待收集消息以形成批次的最长时间。<br/>默认值 <code>0</code> 表示不等待。对于非内存缓冲模式，建议至少配置 <code>5ms</code> 以减少 I/O 操作。',
    max_linger_bytes: '每个分区生产者，等待收集消息以形成批次的最大字节数。',
    undefined_vars_as_null:
      "在写入数据库时，将未定义的变量视为 NULL。<br/>当启用此选项时，如果在模板中使用未定义的变量（例如 `${'{'}var{'}'}`），它们将被替换为 `NULL`，而不是字符串 `undefined`。如果此选项未启用（默认为关闭），可能会插入字符串 `undefined`。<br/>如果可能，此选项应始终设置为 `true`；默认值 `false` 仅用于确保向后兼容性。",
    max_inactive: 'HTTP 驱动在无任何活动时，尝试重连前的最大等待时间。',
    ipv6_probe: '是否探测 IPv6 支持。',
    min_part_size: `分块上传的最小分块大小。<br/>上传的数据将在内存中累积，直到达到此大小。`,
    max_part_size: `分块上传的最大分块大小。<br/>S3 上传程序不会尝试上传超过此大小的部分。`,
  },
  mqtt: {
    bridge_mode:
      '该设置仅适用于 MQTT 协议版本低于 5.0 的情况，且远程 MQTT 服务必须支持该功能。开启后，远端服务器将识别当前连接为一个桥接，消息回环检测更高效，收到的保留消息标志位会透传给本地。',
    clean_start: '当重新连接到远程服务，该 MQTT 服务作为入口桥接时，是否启动一个干净的会话。',
    retry_interval: '在未收到 ACK 的情况下，QoS1/QoS2 消息的重试间隔。',
    clientid_prefix: '连接器随机生成客户端 ID 时所使用的前缀。',
    max_inflight: '消息发布时，可以同时等待确认的未确认消息数量，用以提高消息传递效率和吞吐量。',
    topic: "消息发布主题，支持使用 ${'{'}field{'}'} 语法提取变量动态拼接主题。",
    source_topic:
      '消息订阅主题，支持使用 + 和 # 通配符。当 EMQX 运行在集群模式下或连接器配置了连接池时，为了避免消息重复，必须使用共享订阅。',
    payload:
      "例如：${'{'}payload{'}'}, ${'{'}clientid{'}'}, ${'{'}topic{'}'}, ${'{'}username{'}'} 等。请根据使用动作的业务需求来选择字段，置空则原样转发消息。支持使用 ${'{'}field{'}'} 语法读取数据。",
    static_clientids:
      '配置 EMQX 节点与静态客户端 ID 的对应关系。当配置了映射关系后，只有在映射中指定的 EMQX 节点才会创建对应的 MQTT 客户端连接。',
    node: "EMQX 的节点名称，例如：<code>emqx{'@'}10.0.0.1</code>",
    ids: '指定给该节点的静态客户端 ID 列表',
  },
  http: {
    url: "HTTP 连接器的 URL。<br/>路径中支持占位符，但在主机或端口部分中不能使用占位符。<br/>例如，`http://localhost:9901/${'{'}topic{'}'}` 是允许的，但是 `http://${'{'}host{'}'}:9901/message` 或 `http://localhost:${'{'}port{'}'}/message `不允许。",
    body: "例如：${'{'}payload{'}'}, ${'{'}clientid{'}'}, ${'{'}topic{'}'}, ${'{'}username{'}'} 等。请根据使用动作的业务需求来选择字段，置空则原样转发消息。",
    path: "此操作的 URL 路径。<br/>此路径将附加到连接器的 <code>url</code> 配置中，以形成完整的 URL 地址。此选项中允许使用带有变量的模板。 例如，<code>/room/{'{'}$room_no{'}'}</code>",
  },
  cassandra: {
    keyspace: '要连接到的 Keyspace 名称。',
    servers:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port][,Host2:Port]`。<br/>如果未指定 `[:Port]`，则使用 Cassandra 默认端口 9042。',
    cql: 'CQL 模板',
  },
  clickhouse: {
    batch_value_separator:
      "默认为逗号 ','，适用于 VALUES 格式。您也可以使用其他分隔符， 请参考 [INSERT INTO 语句](https://clickhouse.com/docs/zh/sql-reference/statements/insert-into)。",
    connect_timeout: '连接 Clickhouse 服务器的超时时间。',
    url: '你想连接到的 Clickhouse 服务器的 HTTP URL（例如 http://myhostname:8123）。',
    sql: "可以使用 ${'{'}field{'}'} 占位符来引用消息与客户端上下文中的变量，请确保对应字段存在且数据格式符合预期。此处不支持 [SQL 预处理](https://docs.emqx.com/zh/enterprise/v5.0/data-integration/data-bridges.html#sql-预处理)。",
  },
  dynamo: {
    template:
      "模板，默认值为空。当此值为空时，整个消息将存储在数据库中。<br/>模板可以是任何带有占位符的有效 JSON，并确保表中所有的键都在这里，例如：<br/>  `{'{'}\"id\" : \"${'{'}id{'}'}\", \"clientid\" : \"${'{'}clientid{'}'}\", \"data\" : \"${'{'}payload.data{'}'}\"{'}'}`",
    url: 'DynamoDB 的地址。',
    table: 'DynamoDB 的表。',
    aws_access_key_id: 'DynamoDB 的访问 ID。',
    aws_secret_access_key: 'DynamoDB 的访问密钥。',
    region: 'AWS DynamoDB 所在的区域',
  },
  gcp_pubsub_producer: {
    pipelining:
      '正整数，设置最大可发送的异步 HTTP 请求数量。当设置为 1 时，表示每次发送完成 HTTP 请求后都需要等待服务器返回，再继续发送下一个请求。',
    connect_timeout: '连接 GCP 服务器的超时时间。',
    service_account_json:
      '包含将与 PubSub 一起使用的 GCP 服务账户凭证的 JSON。<br/>当创建 GCP 服务账户时（如 https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount ），可以选择下载 JSON 形式的凭证，然后在该配置项中使用。',
    pubsub_topic: '要发布消息的 GCP PubSub 主题。',
    payload_template: '用于格式化外发信息的模板。 如果未定义，将以 JSON 格式发送所有可用的上下文。',
    attributes_template:
      '用于格式化消息属性的模板。未定义的值将被渲染为空字符串。空键将从属性映射中删除。',
    ordering_key_template:
      '用于格式化消息排序键的模板。未定义的值将被渲染为空字符串。如果此值为空，则不会将其添加到消息中。',
  },
  gcp_pubsub_consumer: {
    topic: '要消费的 GCP PubSub 主题。',
    pipelining:
      '正整数，设置最大可发送的异步 HTTP 请求数量。当设置为 1 时，表示每次发送完成 HTTP 请求后都需要等待服务器返回，再继续发送下一个请求。',
    service_account_json:
      '包含将与 PubSub 一起使用的 GCP 服务账户凭证的 JSON。<br/>当创建 GCP 服务账户时（如 https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount ），可以选择下载 JSON 形式的凭证，然后在该配置项中使用。',
    pull_max_messages:
      '从 GCP PubSub 中在一个拉取请求里检索的最大消息数。\n实际数量可能小于指定的值。',
    connect_timeout: '连接 GCP 服务器的超时时间。',
  },
  hstreamdb: {
    url: 'HStreamDB 服务器的 URL。使用 gRPC HTTP 服务器地址。',
    partition_key: 'HStreamDB 分区键。支持占位符。',
    grpc_flush_timeout: '刷新 gRPC 调用到 HStreamDB 服务器的时间间隔。',
    aggregation_pool_size:
      '记录聚合池的大小。增大聚合池可提升并行处理能力，但可能会因批处理变小而影响效率。',
    max_batches: '刷新队列中最大未确认批次数。',
    writer_pool_size:
      '写入池大小。扩大池规模可增加并行化和同时写入操作，可能提升吞吐量。但需权衡内存消耗和资源竞争。',
    batch_interval: '两个连续（批量）请求之间的最大间隔。',
    record_template:
      '将被转发到 HStreamDB 的 HStream record 模板。支持占位符。<br/>注意：当使用 `raw record` 模板（意味着数据不是有效的 JSON）时，应该在 HStream 中使用 `read` 或 `subscription` 来获取数据。',
    parameters_batch_size: '单个请求中可发送的插入数据子句的最大数量。',
  },
  influxdb: {
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/><br/>主机名具有以下形式：`Host[:Port]`。<br/><br/>如果未指定 `[:Port]`，则使用 InfluxDB 默认端口 8086。',
    token: 'InfluxDB token。',
    org: 'InfluxDB 组织名称。',
    bucket: 'InfluxDB bucket 名称。',
    write_syntax:
      "使用 InfluxDB API Line Protocol 写入 InfluxDB 的数据，支持占位符，参考 [InfluxDB 2.3 Line Protocol](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/) 及 [InfluxDB 1.8 Line Protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) <br/>TLDR: <br/>```<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]```<br/>注意，整形数值占位符后需要添加一个字符 `i` 类型标识。例如 `${'{'}payload.int_value{'}'}i`",
    precision: 'InfluxDB 时间精度。',
  },
  datalayers: {
    write_syntax:
      'Datalayers 采用与 InfluxDB v1 完全兼容的行协议，为用户提供了熟悉且高效的数据写入方式。虽然兼容InfluxDB v1 的语法，但 Datalayers 在底层实现上有其独特之处，以优化性能和适应其特定的存储结构。参考 [InfluxDB Line Protocol](https://docs.datalayers.cn/datalayers/latest/development-guide/writing-with-influxdb-line-protocol.html)',
    precision: 'Datalayers 时间精度。',
  },
  confluent_producer: {
    connect_timeout:
      '建立 TCP 连接时的最大等待时长（若启用认证，这个等待时长也包含完成认证所需时间）。',
    bootstrap_hosts: '用逗号分隔的 <code>host[:port]</code> 主机列表。默认端口号为 9092。',
    min_metadata_refresh_interval:
      '刷新 Kafka broker 和 Kafka 主题元数据的最短时间间隔。设置太小可能会增加 Kafka 压力。',
    metadata_request_timeout: '刷新元数据时最大等待时长。',
    topic: 'Kafka 主题名称',
    kafka_headers:
      "请提供用作 Kafka Headers 的占位符<br/>例如：<code>${'{'}pub_props{'}'}</code><br/>注意占位符的值必须是一个对象：<br/>`{'{'}\"foo\": \"bar\"{'}'}`",
    kafka_header_value_encode_mode:
      'Kafka Headers 的值编码类型：<br/>- `NONE`：仅将二进制值添加到 Kafka Headers；<br/>- `JSON`：仅将 JSON 值添加到 Kafka Headers，并在发送之前将其编码为 JSON 字符串。',
    kafka_ext_headers:
      '请提供更多的键值对，用于 Kafka Headers。<br/>这里的键值对将与 `kafka_headers` 字段的值合并后发送到 Kafka。',
    key: '生成 Kafka 消息键的模版。如果模版生成后为空值，则会使用 Kafka 的 <code>NULL</code> ，而非空字符串。',
    value:
      '生成 Kafka 消息的值的模版。如果模版生成后为空值，则会使用 Kafka 的 <code>NULL</code>，而非空字符串。',
    partition_strategy:
      '设置消息发布时应该如何选择 Kafka 分区。<br/><code>random</code>: 为每个消息随机选择一个分区。<br/><code>key_dispatch</code>：对 Kafka 消息键进行哈希，以得到一个分区号。',
    max_batch_bytes:
      '最大消息批量字节数。大多数 Kafka 环境的默认最低值是 1 MB，EMQX 的默认值比 1 MB 更小是因为需要补偿 Kafka 消息编码所需要的额外字节（尤其是当每条消息都很小的情况下）。当单个消息的大小超过该限制时，它仍然会被发送，（相当于该批量中只有单个消息）。',
    required_acks:
      '设置 Kafka leader 在返回给 EMQX 确认之前需要等待多少个 follower 的确认。<br/><code>all_isr</code>: 需要所有的在线复制者都确认。<br/><code>leader_only</code>: 仅需要分区 leader 确认。<br/><code>none</code>: 无需 Kafka 回复任何确认。',
    partition_count_refresh_interval:
      '配置 Kafka 刷新分区数量的时间间隔。<br/>EMQX 发现 Kafka 分区数量增加后，会开始按 <code>partition_strategy</code> 配置，把消息发送到新的分区中。',
    max_inflight:
      '设置 Kafka 生产者（每个分区一个）在收到 Kafka 的确认前最多发送多少个请求（批量）。调大这个值通常可以增加吞吐量，但是，当该值设置大于 1 时存在消息乱序的风险。',
    sync_query_timeout: "同步查询的超时时间。仅当请求模式配置为'同步'时才使用该配置。",
    mode: '消息缓存模式。<br/><code>memory</code>: 所有的消息都缓存在内存里。如果 EMQX 服务重启，缓存的消息会丢失。<br/><code>disk</code>: 缓存到磁盘上。EMQX 重启后会继续发送重启前未发送完成的消息。<br/><code>hybrid</code>: 先将消息缓存在内存中，当内存中的消息堆积超过一定限制（配置项 <code>segment_bytes</code> 描述了该限制）后，后续的消息会缓存到磁盘上。与 <code>memory</code> 模式一样，如果 EMQX 服务重启，缓存的消息会丢失。',
    per_partition_limit:
      '为每个 Kafka 分区设置的最大缓存字节数。当超过这个上限之后，老的消息会被丢弃，为新的消息腾出空间。',
    segment_bytes:
      '当缓存模式是 <code>disk</code> 或 <code>hybrid</code> 时适用。该配置用于指定缓存到磁盘上的文件的大小。',
    compression: '压缩方法。',
    partitions_limit: '限制生产者能够发送消息的最大分区数量。',
  },
  kafka_producer: {
    bootstrap_hosts: '用逗号分隔的 <code>host[:port]</code> 主机列表。默认端口号为 9092。',
    authentication: '认证参数。',
    connect_timeout:
      '建立 TCP 连接时的最大等待时长（若启用认证，这个等待时长也包含完成认证所需时间）。',
    min_metadata_refresh_interval:
      '刷新 Kafka broker 和 Kafka 主题元数据的最短时间间隔。设置太小可能会增加 Kafka 压力。',
    metadata_request_timeout: '刷新元数据时最大等待时长。',
    topic: 'Kafka 主题名称',
    kafka_headers:
      "请提供用作 Kafka Headers 的占位符<br/>例如：<code>${'{'}pub_props{'}'}</code><br/>注意占位符的值必须是一个对象：<br/>`{'{'}\"foo\": \"bar\"{'}'}`",
    kafka_header_value_encode_mode:
      'Kafka Headers 的值编码类型：<br/>- `NONE`：仅将二进制值添加到 Kafka Headers；<br/>- `JSON`：仅将 JSON 值添加到 Kafka Headers，并在发送之前将其编码为 JSON 字符串。',
    kafka_ext_headers:
      '请提供更多的键值对，用于 Kafka Headers。<br/>这里的键值对将与 `kafka_headers` 字段的值合并后发送到 Kafka。',
    key: '生成 Kafka 消息键的模版。如果模版生成后为空值，则会使用 Kafka 的 <code>NULL</code> ，而非空字符串。',
    value:
      '生成 Kafka 消息的值的模版。如果模版生成后为空值，则会使用 Kafka 的 <code>NULL</code>，而非空字符串。',
    kafka_message_timestamp:
      "生成 Kafka 消息时间戳的模版。该时间必需是一个整型数值（可以是字符串格式）例如 <code>1661326462115</code> 或 <code>'1661326462115'</code>。当所需的输入字段不存在，或不是一个整型时，则会使用当前系统时间。",
    compression: '压缩方法。',
    partition_strategy:
      '设置消息发布时应该如何选择 Kafka 分区。<br/><code>random</code>: 为每个消息随机选择一个分区。<br/><code>key_dispatch</code>：对 Kafka 消息键进行哈希，以得到一个分区号。',
    max_batch_bytes:
      '最大消息批量字节数。大多数 Kafka 环境的默认最低值是 1 MB，EMQX 的默认值比 1 MB 更小是因为需要补偿 Kafka 消息编码所需要的额外字节（尤其是当每条消息都很小的情况下）。当单个消息的大小超过该限制时，它仍然会被发送，（相当于该批量中只有单个消息）。',
    required_acks:
      '设置 Kafka leader 在返回给 EMQX 确认之前需要等待多少个 follower 的确认。<br/><code>all_isr</code>: 需要所有的在线复制者都确认。<br/><code>leader_only</code>: 仅需要分区 leader 确认。<br/><code>none</code>: 无需 Kafka 回复任何确认。',
    partition_count_refresh_interval:
      '配置 Kafka 刷新分区数量的时间间隔。<br/>EMQX 发现 Kafka 分区数量增加后，会开始按 <code>partition_strategy</code> 配置，把消息发送到新的分区中。',
    max_inflight:
      '设置 Kafka 生产者（每个分区一个）在收到 Kafka 的确认前最多发送多少个请求（批量）。调大这个值通常可以增加吞吐量，但是，当该值设置大于 1 时存在消息乱序的风险。',
    sync_query_timeout: "同步查询的超时时间。仅当请求模式配置为'同步'时才使用该配置。",
    mode: '消息缓存模式。<br/><code>memory</code>: 所有的消息都缓存在内存里。如果 EMQX 服务重启，缓存的消息会丢失。<br/><code>disk</code>: 缓存到磁盘上。EMQX 重启后会继续发送重启前未发送完成的消息。<br/><code>hybrid</code>: 先将消息缓存在内存中，当内存中的消息堆积超过一定限制（配置项 <code>segment_bytes</code> 描述了该限制）后，后续的消息会缓存到磁盘上。与 <code>memory</code> 模式一样，如果 EMQX 服务重启，缓存的消息会丢失。',
    per_partition_limit:
      '为每个 Kafka 分区设置的最大缓存字节数。当超过这个上限之后，老的消息会被丢弃，为新的消息腾出空间。',
    segment_bytes:
      '当缓存模式是 <code>disk</code> 或 <code>hybrid</code> 时适用。该配置用于指定缓存到磁盘上的文件的大小。',
    kafka_ext_header_key: "Kafka Headers 的键。支持使用 <code>${'{'}var{'}'}</code> 格式的占位符。",
    mechanism: 'SASL 认证方法名称。',
    kerberos_principal:
      "SASL GSSAPI 认证方法的 Kerberos principal，例如 <code>client_name{'@'}MY.KERBEROS.REALM.MYDOMAIN.COM</code>注意：这里使用的 realm 需要配置在 EMQX 服务器的 /etc/krb5.conf 中",
    kerberos_keytab_file:
      'SASL GSSAPI 认证方法的 Kerberos keytab 文件。注意：该文件需要上传到 EMQX 服务器中，且运行 EMQX 服务的系统账户需要有读取权限。',
    kafka_ext_header_value:
      "Kafka Headers 的值。支持使用 <code>${'{'}var{'}'}</code> 格式的占位符。",
    partitions_limit: '限制生产者能够发送消息的最大分区数量。',
  },
  kafka_consumer: {
    bootstrap_hosts: '用逗号分隔的 <code>host[:port]</code> 主机列表。默认端口号为 9092。',
    key_encoding_mode:
      '通过 MQTT 转发之前，如何处理 Kafka 消息的 Key。<code>none</code> 使用 Kafka 消息中的 Key 原始值，不进行编码。  注意：在这种情况下，Key 必须是一个有效的 UTF-8 字符串。<br/><code>base64</code> 对收到的密钥或值使用 base-64 编码。',
    value_encoding_mode:
      '通过 MQTT 转发之前，如何处理 Kafka 消息的 Value。<code>none</code> 使用 Kafka 消息中的 Value 原始值，不进行编码。  注意：在这种情况下，Value 必须是一个有效的 UTF-8 字符串。<br/><code>base64</code> 对收到的 Value 使用 base-64 编码。',
    offset_reset_policy: '如不存在偏移量历史记录或历史记录失效，消费者应使用哪个偏移量开始消费。',
    min_metadata_refresh_interval:
      '刷新 Kafka broker 和 Kafka 主题元数据的最短时间间隔。设置太小可能会增加 Kafka 压力。',
    metadata_request_timeout: '刷新元数据时最大等待时长。',
    connect_timeout:
      '建立 TCP 连接时的最大等待时长（若启用认证，这个等待时长也包含完成认证所需时间）。',
    max_batch_bytes:
      '设置每次从 Kafka 拉取数据的字节数。<br/>消费者按批次获取消息，如果获取的第一个非空分区中的第一个记录批次大小大于这个值，该记录批次仍会被返回，以确保消费者能够继续处理。因此，这并不是一个绝对的最大值限制。如果需要实现最小延迟，可将该值设为 `1`',
    offset_commit_interval_seconds: '指定 Kafka 消费组偏移量提交的时间间隔。',
    topic: 'Kafka 主题名称',
    group_id: '用于此 Source 的消费者组 ID。如果未指定，系统将自动生成一个基于 Source 名称的 ID。',
    max_wait_time: '等待 Kafka broker 发送响应对象的最大时间。',
  },
  mongodb: {
    collection: '数据将被存储到的集合',
    payload_template:
      '用于格式化写入 MongoDB 的消息模板。 如果未定义，规则引擎会使用 JSON 格式序列化所有的可见输入，例如 clientid, topic, payload 等。',
    auth_source: '与用户证书关联的数据库名称。',
    use_legacy_protocol:
      '是否使用 MongoDB 的旧协议与数据库通信。默认情况下，系统会尝试自动确定是否支持新协议。',
    srv_record: '使用 DNS SRV 记录。',
    max_overflow:
      '当连接池中所有线程都被占用时，可以创建的最大附加工作线程数。这有助于通过允许更多并发连接到 MongoDB 服务器来管理暂时的工作负载峰值。',
    overflow_ttl: '当池内工人太多时，等待多久清除多余工人。',
    overflow_check_period: '检查是否有超过配置的工人的周期（"溢出"）。',
    local_threshold: '在多个合适的 MongoDB 实例中进行选择的延迟窗口的大小。',
    connect_timeout: '超时重连的等待时间。',
    socket_timeout: '在尝试超时之前，在套接字上尝试发送或接收的持续时间。',
    server_selection_timeout: '指定在抛出异常之前为服务器选择阻断多长时间。',
    wait_queue_timeout: '工作者等待连接可用的最长时间。',
    heartbeat_frequency:
      '控制驱动程序何时检查 MongoDB 部署的状态。指定检查的间隔时间，从上一次检查结束到下一次检查开始计算。如果连接数增加（例如，如果你增加池子的大小，就会发生这种情况），你可能也需要增加这个周期，以避免在 MongoDB 日志文件中创建太多的日志条目。',
    min_heartbeat_frequency: '心跳间的最小间隙',
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 MongoDB 默认端口 27017。',
    w_mode: '写模式。',
    servers:
      '集群将要连接的节点列表。 节点之间用逗号分隔，如：`Node[,Node].`<br/>每个节点的配置为：将要连接的 IPv4 或 IPv6 地址或主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 MongoDB 默认端口 27017。',
    replica_set_name: '副本集的名称。',
    r_mode: '读模式。',
  },
  mysql: {
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 MySQL 默认端口 3306。',
    sql: 'SQL 模板',
  },
  pgsql: {
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用默认端口 5432。',
    sql: 'SQL 模板',
  },
  redis: {
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 Redis 默认端口 6379。',
    servers:
      '集群将要连接的节点列表。 节点之间用逗号分隔，如：`Node[,Node].`<br/>每个节点的配置为：将要连接的 IPv4 或 IPv6 地址或主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 Redis 默认端口 6379。',
    sentinel: "哨兵模式。当 Redis 服务运行在哨兵模式下，该配置必须设置为 'sentinel'。",
    command_template:
      "用于推送数据的 Redis 命令模板。 每个列表元素代表一个命令名称或其参数。<br/>例如，要通过键 `msgs` 将消息体推送到 Redis 列表中，数组元素应该是： `rpush`, `msgs`, `${'{'}payload{'}'}`。",
  },
  rocketmq: {
    servers:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 RocketMQ 默认端口 9876。',
    access_key: 'RocketMQ 服务器的 `accessKey`。',
    secret_key: 'RocketMQ 服务器的 `secretKey`。',
    security_token: 'RocketMQ 服务器安全令牌',
    topic: 'RocketMQ 主题',
    refresh_interval: 'RocketMQ 主题路由更新间隔。',
    send_buffer: 'RocketMQ 驱动的套字节发送消息的缓冲区大小',
    template:
      "模板, 默认为空，为空时将会将整个消息转发给 RocketMQ。 <br/>模板可以是任意带有占位符的合法字符串, 例如:<br/>- ${'{'}id{'}'}, ${'{'}username{'}'}, ${'{'}clientid{'}'}, ${'{'}timestamp{'}'}<br/>- {'{'}\"id\" : ${'{'}id{'}'}, \"username\" : ${'{'}username{'}'}{'}'}",
    sync_timeout: 'RocketMQ 驱动同步调用的超时时间。',
    namespace:
      '如果你正在使用阿里云的 RocketMQ 服务并且启用了命名空间，或者你在你自己的 RocketMQ 服务里配置了命名空间，那么你必须配置命名空间字段。对于阿里云的 RocketMQ 服务来说，命名空间就是实例 ID。',
    strategy: '生产者密钥分派策略，默认为 `roundrobin`，支持占位符。',
  },
  tdengine: {
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`[http[s]://]Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 TDengine 默认端口 6041。',
    sql: 'SQL 模板',
    token:
      '连接到 TDengine Cloud 时使用的令牌。<br/>如果提供了令牌，它将覆盖用户名和密码的认证方式。',
  },
  sqlserver: {
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 SQL Server 默认端口 1433。',
    driver: 'SQL Server Driver 名称',
    sql: 'SQL 模板',
  },
  iotdb: {
    base_url: '外部 IoTDB 服务的 REST 接口的基础 URL。<br/>URL 具有以下形式：`http://Host:Port`',
    iotdb_version: '要连接的 IoTDB 系统的版本。',
    enable_pipelining:
      '一个正整数。是否连续发送 HTTP 请求，当设置为 1 时，这意味着每次发送 HTTP 请求后，您需要等待服务器返回，然后继续发送下一个请求。',
    connect_timeout: '连接到 IoTDB 服务器时的超时时间。',
    timestamp:
      "支持使用 ${'{'}var{'}'} 格式的占位符，要求是时间戳格式。也可以使用以下特殊字符插入系统时间：<br/>- `now`: 当前毫秒级时间戳<br/>- `now_ms`: 当前毫秒级时间戳<br/>- `now_us`: 当前微秒级时间戳<br/>- `now_ns`: 当前纳秒级时间戳",
    measurement: "也称 Measurement，支持使用 ${'{'}var{'}'} 格式的占位符。",
    data_type: '插入值的数据类型。支持的类型：boolean、int32、int64、float、double、text。',
    value: "要插入的值，支持使用 ${'{'}var{'}'} 格式的占位符。",
    device_id:
      '应插入此数据的固定设备名称。如果为空，则必须在规则操作中设置，消息本身中设置，或从主题中提取。',
    is_aligned: '是否对齐时间序列',
    recv_timeout: '接收 IoTDB Thrift 服务器的超时时间。',
  },
  opents: {
    server: '服务器的地址。',
    summary: '是否返回摘要信息。',
    details: '是否返回详细信息。',
    timestamp: "秒级或毫秒级时间戳，支持 ${'{'}var{'}'} 格式的占位符。",
    metric: "度量的名称，应为时间序列数据的唯一标识符，支持 ${'{'}var{'}'} 格式的占位符，",
    tags: "附加元数据的标签，每个标签都是一个键值对，采用 `key=value,key2=value2` 的格式进行配置，并支持 ${'{'}var{'}'} 形式的占位符。",
    value: "数据点的值，支持 ${'{'}var{'}'} 格式的占位符。它代表实际的测量或观察值。",
  },
  oracle: {
    sql: 'SQL 模板。模板中描述消息元数据和有效载荷的字符串可以包含占位符。这些占位符在插入时不会做任何检查和格式转换，所以请务必确保插入值被正确地格式化和转义。',
    sid: 'Oracle Database SID 名称',
    server:
      '将要连接的 IPv4 或 IPv6 地址，或者主机名。<br/>主机名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，则使用 Oracle Database 默认端口 1521。',
  },
  rabbitmq: {
    server: '你想要连接的 RabbitMQ 服务器地址（例如，localhost）。',
    port: 'RabbitMQ 服务器监听的端口号（默认为 5672）。',
    exchange: '消息将被发送到的 RabbitMQ 交换机的名称。',
    routing_key: '用于将消息路由到 RabbitMQ 交换机的正确队列的路由键。',
    virtual_host: '连接到 RabbitMQ 服务器时要使用的虚拟主机。',
    heartbeat: '发送心跳消息到 RabbitMQ 服务器的时间间隔。',
    delivery_mode:
      '发布到 RabbitMQ 的消息的传递模式。非持久性的传递模式适用于不需要在 RabbitMQ 重启时保持持久性的消息，而持久性的传递模式适用于必须在 RabbitMQ 重启时保持持久性的消息。',
    wait_for_publish_confirmations: '使用发布者确认时，是否要等待 RabbitMQ 确认消息。',
    publish_confirmation_timeout: '使用发布者确认时等待 RabbitMQ 确认消息发布的超时时间。',
    timeout: '等待建立连接的超时时间。',
    payload_template:
      "发送消息到 RabbitMQ 之前格式化消息有效载荷的模板。模板占位符（例如 ${'{'}field1.sub_field{'}'} ）将被替换为相应字段的值。如果为空，则整个输入消息将被用作有效载荷，格式化为 JSON 文本。此行为相当于将 ${'{'}.{'}'} 指定为有效载荷模板。",
    queue: 'RabbitMQ 队列名称。',
    no_ack: '在从 RabbitMQ 消费消息时是否使用 `no_ack` 模式。',
  },
  pulsar: {
    servers:
      '以逗号分隔的 <code>scheme://host[:port]</code> 格式的 Pulsar URL 列表，支持的 scheme 有 <code>pulsar://</code> （默认）和<code>pulsar+ssl://</code>。默认端口：6650。',
    pulsar_topic: 'Pulsar 主题名称',
    strategy:
      '设置消息发布时的 Pulsar 分区选择策略。<br/><code>random</code>: 为每个消息随机选择一个分区。<br/><code>roundrobin</code>: 依次为每条信息挑选可用的 producer。<br/><code>key_dispatch</code>: 将待选择分区的编码进行哈希，并存储在一批信息中第一条信息的 Pulsar 信息密钥中。',
    compression: '压缩方法。',
    message_key: '生成 Pulsar 消息 Key 的模版。',
    message_value: '生成 Pulsar 消息 Value 的模版。',
    sync_timeout: '同步发布时，从 Pulsar 接收发送回执的最长等待时间。',
    retention_period:
      '指定在与 Pulsar broker 断开连接时缓冲消息的持续时间。请合理设置该值，时间设置越久，需要的内存/磁盘的使用量越高。',
    send_buffer: 'TCP socket 的发送缓存调优，高吞吐量下建议保留默认值。',
    max_batch_bytes:
      '每个批次可收集的最大消息字节数。EMQX 将默认值设为小于 5 MB，以便补偿编码开销，特别是在处理较小的消息时。当单条消息的大小超过该限制时，会做为单独批次处理，即该批次中仅包含这条消息。',
    connect_timeout:
      '建立 TCP 连接时的最大等待时长（若启用认证，这个等待时长也包含完成认证所需时间）。',
    mode: '消息缓存模式。<br/><code>memory</code>: 所有的消息都缓存在内存里。如果 EMQX 服务重启，缓存的消息会丢失。<br/><code>disk</code>: 缓存到磁盘上。EMQX 重启后会继续发送重启前未发送完成的消息。<br/><code>hybrid</code>: 先将消息缓存在内存中，当内存中的消息堆积超过一定限制（配置项 <code>segment_bytes</code> 描述了该限制）后，后续的消息会缓存到磁盘上。如果 EMQX 服务重启，缓存消息会丢失。',
    per_partition_limit:
      '为每个 Pulsar 分区设置的最大缓存字节数。当超过这个上限之后，老的消息会被丢弃，以便接收新的消息。',
    segment_bytes:
      '当缓存模式是 <code>disk</code> 或 <code>hybrid</code> 时适用。该配置用于指定缓存到磁盘上的文件的大小。',
    authentication_jwt: 'JWT 认证令牌。',
    max_inflight:
      '生产者在等待接收回执前可以发送给每个分区的最大消息批次数量。<br/>设置更高的值可以提高吞吐量。',
  },
  azure_event_hub_producer: {
    bootstrap_hosts:
      '用于引导客户端的 Azure Event Hubs Kafka <code>host[:port]</code>命名空间端点的逗号分隔列表。默认端口号为 9093。',
    connect_timeout: 'TCP 连接建立的最大等待时间（包括启用身份验证的时间）。',
    min_metadata_refresh_interval:
      '客户端在刷新 Azure Event Hubs Kafka 代理和主题元数据之前必须等待的最小时间间隔。设置太小的值可能会对 Azure Event Hubs 造成额外的负载。',
    metadata_request_timeout: '从 Azure Event Hubs 获取元数据时的最大等待时间。',
    password:
      '用于连接到 Azure Event Hubs 的连接字符串。应为命名空间共享访问策略的 "连接字符串 - 主键"。',
    topic: '事件中心名称',
    max_batch_bytes:
      '在 Azure Event Hubs 消息批次中收集的最大字节数。大多数 Azure Event Hubs 代理的默认限制为 1 MB 批次大小。EMQX 的默认值小于 1 MB，以补偿 Azure Event Hubs 消息编码开销（特别是当每个单独消息非常小时）。当单个消息超过限制时，仍然会发送（作为单个元素批次）。',
    partition_strategy:
      '分区策略用于告诉生产者如何将消息分派到 Azure Event Hubs 分区。\n\n<code>random</code>：随机选择每个消息的分区\n<code>key_dispatch</code>：将 Azure Event Hubs 消息键哈希到分区号',
    required_acks:
      'Azure Event Hubs 分区领导者在向其追随者发送确认之前必须等待的所需确认\n\n<code>all_isr</code>：要求所有同步副本进行确认。\n<code>leader_only</code>：仅需要分区领导者的确认。',
    kafka_headers:
      "请提供一个占位符用于用作 Azure Event Hubs 头部<br/>\n例如：<code>${'{'}pub_props{'}'}</code><br/>\n请注意，占位符的值必须是对象：\n<code>{'{'}\\\"foo\\\": \\\"bar\\\"{'}'}</code>",
    kafka_ext_headers:
      '请为 Azure Event Hubs 提供更多的键值对头部信息<br/>此处的键值对将在发送到 Azure Event Hubs 之前与 <code>kafka_headers</code> 字段的值进行组合。',
    kafka_header_value_encode_mode:
      'Azure Event Hubs 头部值编码模式<br/>\n - NONE：仅将二进制值添加到 Azure Event Hubs 头部；<br/>\n - JSON：仅将 JSON 值添加到 Azure Event Hubs 头部，并在发送前将其编码为 JSON 字符串。',
    partition_count_refresh_interval:
      'Azure Event Hubs 生产者用于发现增加的分区数的时间间隔。\n在 Azure Event Hubs 中增加分区数后，EMQX 将在根据<code>partition_strategy</code>分派消息时考虑已发现的分区。',
    max_inflight:
      'Azure Event Hubs 生产者（每个分区）允许发送的最大批次数，然后从 Azure Event Hubs 接收确认。较大的值通常意味着更高的吞吐量。但是，当该值大于 1 时，可能会有消息重新排序的风险。',
    sync_query_timeout: "该参数定义同步查询的超时限制。仅在桥接查询模式配置为'同步'时适用。",
    key: '用于呈现 Azure Event Hubs 消息键的模板。如果模板呈现为空值（即在规则引擎上下文中没有此类数据字段），则使用 Azure Event Hubs 的<code>NULL</code>（而不是空字符串）。',
    value:
      '用于呈现 Azure Event Hubs 消息值的模板。如果模板呈现为空值（即在规则引擎上下文中没有此类数据字段），则使用 Azure Event Hubs 的<code>NULL</code>（而不是空字符串）。',
    kafka_ext_header_key: "Azure Event Hubs 头部的键。支持格式为${'{'}var{'}'}的占位符。",
    kafka_ext_header_value: "Azure Event Hubs 头部的值。支持格式为${'{'}var{'}'}的占位符。",
    mode: '消息缓冲区模式。\n\n<code>memory</code>：在内存中缓冲所有消息。在 EMQX 节点重启时，消息将会丢失\n<code>disk</code>：将所有消息缓冲到磁盘上。磁盘上的消息能够在 EMQX 节点重启时幸存下来。\n<code>hybrid</code>：首先在内存中缓冲消息，当达到一定限制时（有关更多信息，请参阅<code>segment_bytes</code>配置），然后开始将消息转移到磁盘上，与<code>memory</code>模式一样，消息将会在 EMQX 节点重启时丢失。',
    per_partition_limit:
      '每个 Azure Event Hubs 分区允许缓冲的字节数。当超过此限制时，旧消息将被删除以获得新消息的缓冲区配额。',
    segment_bytes:
      '在缓冲区模式设置为<code>disk</code>或<code>hybrid</code>时适用。\n此值用于指定每个磁盘缓冲文件的大小。',
    partitions_limit: '限制生产者能够发送消息的最大分区数量。',
  },
  kinesis: {
    payload_template: '用于格式化输出消息的模板。如果未定义，将以 JSON 格式发送所有可用上下文。',
    aws_access_key_id: '用于连接到 Amazon Kinesis 的访问密钥 ID。',
    aws_secret_access_key: '用于连接到 Amazon Kinesis 的 AWS 秘密访问密钥。',
    endpoint: 'Amazon Kinesis 端点的 URL。',
    stream_name: '要发布消息的 Amazon Kinesis 流。',
    partition_key: "与发布的消息关联的 Amazon Kinesis 分区键。支持 ${'{'}var{'}'} 格式的占位符。",
  },
  greptimedb: {
    server: '要连接的 IPv4 或 IPv6 地址或主机名。<br/>\n主机条目的格式为：`Host[:Port]`。',
    dbname: 'GreptimeDB 数据库名称。',
    precision: 'GreptimeDB 时间精度。',
    write_syntax:
      "GreptimeDB gRPC 协议写数据点的配置。写语法是一种基于文本的格式，提供数据点的测量、标签集、字段集和时间戳，支持占位符，与 InfluxDB 行协议相同。\n参考 [InfluxDB 2.3 行协议](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/) 和\n[InfluxDB 1.8 行协议](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) <br/>\n简而言之：<br/>\n```\n<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]\n```\n请注意，整数值的占位符必须使用后缀 `i` 进行注释。例如 `${'{'}payload.int_value{'}'}i`。",
    ttl: 'GreptimeDB 自动创建的表的数据保留期限 (TTL)。',
  },
  syskeeper_proxy: {
    listen: 'Syskeeper 代理服务器的监听地址',
    acceptors: '接收器的数量',
    handshake_timeout: '在创建连接时等待握手的最长时间',
  },
  syskeeper_forwarder: {
    server: 'Syskeeper 代理服务器的地址',
    ack_mode: '指定代理服务器是否应该回复确认消息，可以是：<br/>- need_ack <br/>- no_ack <br/>',
    ack_timeout: '等待回复确认消息的最长时间',
    target_topic: '转发消息的主题',
    target_qos: '转发消息的服务质量（QoS），留空表示使用原始主题的 QoS',
    template: '消息模板, 支持占位符',
  },
  elasticsearch: {
    server: 'ElasticSearch 服务的 REST 接口地址。',
    routing: '指定应将文档存储在索引的哪个分片中，留空则由 Elasticsearch 决定。',
    wait_for_active_shards:
      '在继续操作之前必须激活的分片副本数。\n设置为 all 或任何正整数，最多为索引中的总分片数（number_of_replicas+1）。\n默认值：1，即主分片。',
    index: "要执行操作的索引或索引别名的名称，支持 ${'{'}var{'}'} 格式的占位符。",
    id: "索引内文档的唯一标识符，支持 ${'{'}var{'}'} 格式的占位符。如果未指定 ID，则由 Elasticsearch 自动生成。",
    doc: "自定义文档模板，支持 ${'{'}var{'}'} 格式的占位符，要求必须可以被转换为 JSON 对象。\n 例如 `{'{'} \"field\": \"${'{'}payload.field{'}'}\" {'}'}`，或 `${'{'}payload{'}'}`。",
    overwrite: '当文档已经存在时覆盖文档，否则文档将写入失败。',
    enable_pipelining:
      '一个正整数。是否连续发送 HTTP 请求，当设置为 1 时，这意味着每次发送 HTTP 请求后，您需要等待服务器返回，然后继续发送下一个请求。',
    connect_timeout: '连接到 ElasticSearch 服务器时的超时时间。',
    doc_as_upsert:
      '尝试更新的文档不存在时，将更新操作当作一个插入操作，并将提供的文档当作新文档插入。',
  },
  s3: {
    acl: '上传的对象的访问权限。',
    content:
      "要存储的对象的内容。默认情况下，它是包含所有字段的 JSON 文本格式。支持如 ${'{'}payload{'}'} 的占位符设置。存储格式取决于变量的格式，支持二进制内容。",
    bucket: "将要上传文件的存储桶的名称。需要在 S3 中预先创建好，支持 ${'{'}var{'}'} 占位符格式。",
    key: "要存储的对象的键。支持如 ${'{'}var{'}'} 的占位符设置。",
    column_order: `在生成的 CSV 文件中首先按列排序的事件字段。<br/>无论此设置如何，生成的 CSV 都将包含聚合事件的所有字段，但此处未明确提及的所有列将按字典顺序排在这里列出的字段之后。`,
    time_interval: '在上传前将事件聚合到单个对象中的时间量。',
  },
  azure_blob_storage: {
    column_order: `在生成的 CSV 文件中首先按列排序的事件字段。<br/>无论此设置如何，生成的 CSV 都将包含聚合事件的所有字段，但此处未明确提及的所有列将按字典顺序排在这里列出的字段之后。`,
    time_interval: '在上传前将事件聚合到单个对象中的时间量。',
    content:
      "要存储的对象的内容。默认情况下，它是包含所有字段的 JSON 文本格式。支持如 ${'{'}payload{'}'} 的占位符设置。存储格式取决于变量的格式，支持二进制内容。",
    blob: 'Azure Blob Storage blob 名称。',
    parameters_container: 'Azure Blob Storage 容器名称。',
  },
  snowflake: {
    private_key:
      '为 Pipe User 配置的私钥。支持以下输入格式：\n- 明文密钥：直接以字符串形式输入PEM格式的私钥内容。\n- 文件路径：指定包含私钥的文件路径。确保路径以<code>file://</code>开头。文件路径必须在集群的所有节点上相同。',
    database: '包含 Snowflake 资源的数据库名称。',
    schema: '包含 Snowflake 资源的模式名称。',
    stage: '用于将数据文件加载到 Snowflake 的 Stage 名称。',
    pipe: '用于将数据摄取到表中的 Pipe 名称。',
    pipe_user: '具有使用 Pipe 权限的角色的用户名。最低要求的权限是`operate`和`monitor`。',
    proxy: '代理配置。当前仅支持 HTTP 代理（不支持 HTTPS）。',
    private_key_path: '用于 ODBC 连接的私钥的完整文件路径。此路径必须在集群的所有节点上保持一致。',
    private_key_password: '用于解密私钥的密码。如果私钥未加密，请不要设置此值。',
  },
  tablestore: {
    isint: '是否尝试将数值写为整数。默认为 false，表示将整数写为浮点数。',
    isbinary: '是否尝试将二进制值写为二进制类型。默认为 false，表示将二进制值写为字符串。',
  },
  disk_log: {
    filepath:
      '日志文件的基础路径。实际日志文件将采用 `filepath.N` 格式，其中 `N` 是 `1..max_file_number` 范围内的值。当前使用的文件可通过查找最近修改日期的文件来确定。注意，包含该文件的目录也必须对 EMQX 应用程序用户可写，因为目录中还会包含内部使用的额外文件（以 `.siz` 和 `.idx` 为后缀）。',
    max_file_size:
      '当前活动日志文件的最大大小。每个日志文件至少会写入一条记录，因此如果单条日志记录超过此值，最终文件大小可能会超过此最大值。',
    max_file_number:
      '要使用的最大日志文件数量。一旦达到最大文件数量且需要新的轮转时，最旧的文件将被截断并用作新的当前文件。',
    write_mode: '同步或异步写入日志到磁盘。',
    template: '写入的 JSON 对象的内容。支持模板。',
  },
  s3tables: {
    s_3_client_transport_options_request_timeout:
      '向 S3 服务发起单次 HTTP 请求的最大等待时间，超时后会重试或失败。',
  },
}
