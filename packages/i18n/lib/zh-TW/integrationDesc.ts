export const zhTWIntegrationDesc: Record<string, Record<string, string>> = {
  common: {
    auto_restart_interval: '資源斷開以後，自動重連的時間間隔。',
    batch_size: '最大批次請求大小。如果設為 1，則無批處理。',
    batch_time: '在較低訊息率情況下嘗試累積批次輸出時的最長等待間隔，以提高資源的利用率。',
    enable_queue: '啟用磁碟快取佇列（僅對 egress 方向橋接有用）。',
    health_check_interval: '健康檢查間隔。',
    health_check_interval_jitter:
      '在健康檢查間隔中新增一個均勻的隨機延遲，以便使用同一連接器的動作和 Source 在不同時間點開始其健康檢查。',
    inflight_window:
      '請求飛行佇列視窗大小。當請求模式為非同步時，如果需要嚴格保證來自同一 MQTT 用戶端的訊息有序，則必須將此值設為 1。',
    query_mode: "請求模式。可選 '同步/非同步'，預設為'非同步'模式。",
    dispatch_strategy:
      '當請求未顯式設定 pick key 時的分發策略。預設值 <code>按用戶端 ID</code> 保持現有行為；設定為 <code>隨機</code> 時，此類請求會隨機分散到多個 worker。',
    request_ttl:
      '從請求進入緩衝區開始計時，如果請求在規定的時間內仍停留在緩衝區內或者已傳送但未能及時收到回應或確認，該請求將被視為過期。<br/>連接器斷開連線期間，不會嘗試傳送訊息。如果請求超期小於健康檢查逾時時間（<code>health_check_timeout</code>）與連線重建耗時之和，連接器斷開時排隊的訊息可能在連線恢復前過期。<br/>建議將請求超期設定為大於健康檢查逾時時間，併為連線建立預留額外時間。',
    start_timeout: '在回覆資源建立請求前等待資源進入健康狀態的時間。',
    worker_pool_size:
      '快取佇列 worker 數量。僅對 egress 類型的橋接有意義。當橋接僅有 ingress 方向時，可設定為 0，否則必須大於 0。',
    max_buffer_bytes: '每個快取 worker 允許使用的最大位元組數。',
    password: '相關聯的外部資料庫中，用於認證或識別的密碼。',
    pool_size: '橋接遠端服務時使用的連線池大小。',
    prepare_statement: 'SQL 預處理語句列表。',
    ssl: '啟用 SSL 連線。',
    username: '相關聯的外部資料庫中，用於認證或識別的使用者名稱。',
    database: '資料庫名字。',
    tcp_keepalive:
      '啟用連接器的 TCP keepalive。<br/>該值是三個逗號分隔的數字，格式為`空閒時間,間隔時間,嘗試次數`<br/>- 空閒時間：連線在伺服器開始傳送 keep-alive 探測之前需要空閒的秒數（Linux 預設為 7200）。<br/>- 間隔時間：TCP keep-alive 探測之間的秒數（Linux 預設為 75）。<br/>- 嘗試次數：在從另一端獲得回應之前傳送的 TCP keep-alive 探測的最大次數（Linux 預設為 9）。<br/>例如，"240,30,5" 表示：在連線空閒 240 秒後傳送 TCP keepalive 探測，並在每隔 30 秒傳送一次探測，如果連續 5 次沒有回應，則應該關閉連線。<br/>預設值：\'none\'',
    sndbuf: 'TCP socket 的傳送快取調優。預設值是針對高吞吐量的一個推薦值。',
    recbuf: 'TCP socket 的收包快取調優。預設值是針對高吞吐量的一個推薦值。',
    nodelay:
      '設定 `true` 讓系統核心立即傳送。否則當需要傳送的內容很少時，可能會有一定延遲（預設 40 毫秒）。',
    ip_family:
      '連線 Kafka broker 時使用的 IP 地址族。<br/>- <code>自動</code>（預設）：使用 IP 地址自身的地址族連線；對於主機名，先嚐試 IPv4，失敗後再嘗試 IPv6。<br/>- <code>IPv4</code>：僅透過 IPv4 連線。<br/>- <code>IPv6</code>：僅透過 IPv6 連線。',
    pool_type: '連線池的類型。可以是`random`、`hash`之一。',
    max_retries: '請求出錯時的最大重試次數。',
    memory_overload_protection:
      '在緩衝區模式設定為 <code>memory</code> 時適用\n在記憶體壓力較大時，EMQX 將刪除舊的緩衝訊息。注意：此設定僅適用於 Linux。',
    disable_prepared_statements:
      '在連線中停用預處理語句。某些端點（如交易模式下的 PGBouncer 或 Supabase）不支援會話功能（如預處理語句）。對於此類連線，應啟用此選項。',
    application_name:
      '用於 PostgreSQL 連線的應用名稱。該值會顯示在 PostgreSQL 活動檢視和日誌中。長度必須為 1 到 63 個位元組，且不能包含空位元組。',
    health_check_topic: '專用於精確檢查健康狀態的主題名稱。',
    max_records:
      '每個聚合物件允許的記錄（事件）數量。每次聚合上傳包含的事件數量不會超過此數值，但可能會更少。<br/>如果事件速率足夠高，在同一時間間隔內顯然可能會有多個聚合上傳。這些上傳將具有不同但連續的序列號，這些序列號將是 S3 物件鍵的一部分。',
    max_linger_time:
      '每個分割區生產者為將更多訊息累積成更大批次而等待的最長時間。<br/>預設值 <code>0</code> 表示不等待（訊息到達後立即傳送）。<br/>一旦累積的資料達到完整批次大小，等待將提前結束，因此繁忙的生產者不會被延遲。<br/>使用磁碟緩衝時，等待發生在寫入緩衝區之前；建議至少設定 <code>5ms</code> 以減少磁碟 IOPS。<br/>部分 EMQX 版本在使用記憶體緩衝時會忽略此設定，不進行等待。具體受影響版本請參閱版本相容性說明。',
    max_linger_bytes:
      '每個分割區生產者在等待期間可累積的最大位元組數；達到該值後將停止等待併發送批次。',
    undefined_vars_as_null:
      "在寫入資料庫時，將未定義的變數視為 NULL。<br/>當啟用此選項時，如果在模板中使用未定義的變數（例如 `${'{'}var{'}'}`），它們將被替換為 `NULL`，而不是字串 `undefined`。如果此選項未啟用（預設為關閉），可能會插入字串 `undefined`。<br/>如果可能，此選項應始終設定為 `true`；預設值 `false` 僅用於確保向後相容性。",
    max_inactive: 'HTTP 驅動在無任何活動時，嘗試重連前的最長等待時間。',
    ipv6_probe: '是否探測 IPv6 支援。',
    min_part_size: '分塊上傳的最小分塊大小。<br/>上傳的資料將在記憶體中累積，直到達到此大小。',
    max_part_size: '分塊上傳的最大分塊大小。<br/>S3 上傳程式不會嘗試上傳超過此大小的部分。',
    private_key:
      '為 Pipe User 設定的私鑰。支援以下輸入格式：\n- 明文金鑰：直接以字串形式輸入PEM格式的私鑰內容。\n- 檔案路徑：指定包含私鑰的檔案路徑。確保路徑以<code>file://</code>開頭。檔案路徑必須在叢集的所有節點上相同。',
    pipe_user: '具有使用 Pipe 權限的角色的使用者名稱。最低要求的權限是`operate`和`monitor`。',
    proxy: 'Proxy 設定。目前僅支援 HTTP Proxy（不支援 HTTPS）。',
    private_key_path: '用於 ODBC 連線的私鑰的完整檔案路徑。此路徑必須在叢集的所有節點上保持一致。',
    private_key_password: '用於解密私鑰的密碼。如果私鑰未加密，請不要設定此值。',
    allow_auto_topic_creation: '是否允許在後設資料取得請求時自動建立主題。',
    schema: '用於 Parquet 檔案的 Schema，使用 Avro 格式',
    max_row_group_bytes:
      '行組大小超過此值時，將重新整理行組。 實際觸發行組重新整理使用緩衝資料大小的估計值，因為實際輸出可能與原始輸入資料大小不同。',
    name: 'Schema Registry 中的 Avro Schema 名稱。',
    default_compression: '用於壓縮 Parquet 行組中資料頁的預設演算法。',
    def: 'JSON 格式的 Avro Schema。',
    audience: '指定請求 OAuth 存取權杖時提供的 `audience` 參數。',
    authentication:
      '選擇 EMQX 連線 GCP 時使用的認證方式。<br/>- 服務帳號 JSON：上傳服務帳號金鑰 JSON 檔案。<br/>- 工作負載身分聯合 (WIF)：使用外部 OIDC Token 換取 Google 憑證。<br/>- 附加服務帳號：使用執行環境繫結的服務帳號。',
    service_account_json:
      '包含將與 PubSub 一起使用的 GCP 服務帳戶憑證的 JSON。<br/>當建立 GCP 服務帳戶時（如 https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount ），可以選擇下載 JSON 形式的憑證，然後在該設定項中使用。',
    ack_deadline:
      'PubSub 等待訂閱者確認收到訊息的大致時長（盡力而為）。超過該時長後，Pub/Sub 將重新發送訊息。',
  },
  mqtt: {
    bridge_mode:
      '該設定僅適用於 MQTT 協定版本低於 5.0 的情況，且遠端 MQTT 服務必須支援該功能。開啟後，遠端伺服器將識別目前連線為一個橋接，訊息迴環檢測更高效，收到的保留訊息標誌位會透傳給本地。',
    clean_start: '當重新連線到遠端服務，該 MQTT 服務作為入口橋接時，是否啟動一個乾淨的會話。',
    retry_interval: '在未收到 ACK 的情況下，QoS1/QoS2 訊息的重試間隔。',
    clientid_prefix: '連接器隨機生成用戶端 ID 時所使用的字首。',
    max_inflight: '訊息發布時，可以同時等待確認的未確認訊息數量，用以提高訊息傳遞效率和吞吐量。',
    topic: "訊息發布主題，支援使用 ${'{'}field{'}'} 語法提取變數動態拼接主題。",
    source_topic:
      '訊息訂閱主題，支援使用 + 和 # 萬用字元。當 EMQX 執行在叢集模式下或連接器設定了連線池時，為了避免訊息重複，必須使用共享訂閱。',
    retain_as_published:
      '是否在遠端訂閱中設定 MQTT 5.0 的 Retain As Published 訂閱選項。啟用後，上游 broker 會保留轉發訊息的 retain 標誌；關閉後，上游 broker 會清除該標誌。僅當連接器使用 MQTT 5.0 時生效。',
    payload:
      "例如：${'{'}payload{'}'}, ${'{'}clientid{'}'}, ${'{'}topic{'}'}, ${'{'}username{'}'} 等。請根據使用動作的業務需求來選擇欄位，置空則原樣轉發訊息。支援使用 ${'{'}field{'}'} 語法讀取資料。",
    static_clientids:
      '設定 EMQX 節點與靜態用戶端 ID 的對應關係。當設定了對映關係後，只有在對映中指定的 EMQX 節點才會建立對應的 MQTT 用戶端連線。',
    node: "EMQX 的節點名稱，例如：<code>emqx{'@'}10.0.0.1</code>",
    ids: '指定給該節點的靜態用戶端 ID 列表',
    delay_send:
      '啟用後，EMQX 可能會將較小的 TCP 寫入短暫快取，併合並後一次傳送為較大的資料包。適合大量小訊息場景，可提升吞吐，但可能增加少量延遲。預設值：<code>false</code>。',
    active_n:
      '每個連線在一次批處理中處理的 TCP 入站事件數量。值越大，繁忙連線的吞吐可能越高；值越小，單連線延遲可能更低。預設值：<code>10</code>。',
  },
  http: {
    url: "HTTP 連接器的 URL。<br/>路徑中支援佔位符，但在主機或連接埠部分中不能使用佔位符。<br/>例如，`http://localhost:9901/${'{'}topic{'}'}` 是允許的，但是 `http://${'{'}host{'}'}:9901/message` 或 `http://localhost:${'{'}port{'}'}/message `不允許。",
    body: "例如：${'{'}payload{'}'}, ${'{'}clientid{'}'}, ${'{'}topic{'}'}, ${'{'}username{'}'} 等。請根據使用動作的業務需求來選擇欄位，置空則原樣轉發訊息。",
    path: "此操作的 URL 路徑。<br/>此路徑將附加到連接器的 <code>url</code> 設定中，以形成完整的 URL 地址。此選項中允許使用帶有變數的模板。 例如，<code>/room/{'{'}$room_no{'}'}</code>",
    oauth2:
      '啟用 OAuth2 用戶端憑證認證。EMQX 會取得並快取存取權杖，並以 Bearer Token 的形式新增到發出的 HTTP 請求中。',
    oauth2_token_endpoint: '用於請求存取權杖的 OAuth2 授權伺服器端點。',
    oauth2_client_id: '請求存取權杖時使用的 OAuth2 用戶端 ID。',
    oauth2_client_secret: '請求存取權杖時使用的 OAuth2 用戶端金鑰。',
    oauth2_scope: '請求存取權杖時使用的可選 OAuth2 授權範圍。',
    oauth2_timeout: '向 Token 端點發起 HTTP 請求的逾時時間。',
    oauth2_ssl: '連線 OAuth2 Token 端點時使用的 TLS 設定。',
  },
  cassandra: {
    keyspace: '要連線到的 Keyspace 名稱。',
    servers:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port][,Host2:Port]`。<br/>如果未指定 `[:Port]`，則使用 Cassandra 預設連接埠 9042。',
    cql: 'CQL 模板',
  },
  clickhouse: {
    batch_value_separator:
      "預設為逗號 ','，適用於 VALUES 格式。您也可以使用其他分隔符， 請參考 [INSERT INTO 語句](https://clickhouse.com/docs/zh/sql-reference/statements/insert-into)。",
    connect_timeout: '連線 Clickhouse 伺服器的逾時時間。',
    url: '你想連線到的 Clickhouse 伺服器的 HTTP URL（例如 http://myhostname:8123）。',
    sql: "可以使用 ${'{'}field{'}'} 佔位符來引用訊息與用戶端上下文中的變數，請確保對應欄位存在且資料格式符合預期。此處不支援 [SQL 預處理](https://docs.emqx.com/zh/enterprise/v5.0/data-integration/data-bridges.html#sql-預處理)。",
  },
  dynamo: {
    template:
      "模板，預設值為空。當此值為空時，整個訊息將儲存在資料庫中。<br/>模板可以是任何帶有佔位符的有效 JSON，並確保表中所有的鍵都在這裡，例如：<br/>  `{'{'}\"id\" : \"${'{'}id{'}'}\", \"clientid\" : \"${'{'}clientid{'}'}\", \"data\" : \"${'{'}payload.data{'}'}\"{'}'}`",
    url: 'DynamoDB 的地址。',
    table: 'DynamoDB 的表。',
    aws_access_key_id:
      '用於連線 DynamoDB 的 AWS 存取金鑰 ID。<br/>在支援 IAM Role 認證的 EMQX 版本中，存取金鑰 ID 和秘密存取金鑰均留空時，將使用 EMQX 執行環境的 EC2 實例角色或 ECS 任務角色提供的臨時憑據。手動設定憑據時，必須同時填寫這兩個欄位。<br/>不支援此功能的版本仍需填寫兩項憑據。具體支援版本請參閱版本相容性說明。',
    aws_secret_access_key:
      '用於連線 DynamoDB 的 AWS 秘密存取金鑰。<br/>在支援 IAM Role 認證的 EMQX 版本中，存取金鑰 ID 和秘密存取金鑰均留空時，將使用 EMQX 執行環境的 EC2 實例角色或 ECS 任務角色提供的臨時憑據。手動設定憑據時，必須同時填寫這兩個欄位。<br/>不支援此功能的版本仍需填寫兩項憑據。具體支援版本請參閱版本相容性說明。',
    region: 'AWS DynamoDB 所在的區域',
  },
  gcp_pubsub_producer: {
    pipelining:
      '正整數，設定最大可傳送的非同步 HTTP 請求數量。當設定為 1 時，表示每次傳送完成 HTTP 請求後都需要等待伺服器回傳，再繼續傳送下一個請求。',
    connect_timeout: '連線 GCP 伺服器的逾時時間。',
    pubsub_topic: '要發布訊息的 GCP PubSub 主題。',
    payload_template: '用於格式化外發資訊的模板。 如果未定義，將以 JSON 格式傳送所有可用的上下文。',
    attributes_template:
      '用於格式化訊息屬性的模板。未定義的值將被渲染為空字串。空鍵將從屬性對映中刪除。',
    ordering_key_template:
      '用於格式化訊息排序鍵的模板。未定義的值將被渲染為空字串。如果此值為空，則不會將其新增到訊息中。',
  },
  gcp_pubsub_consumer_grpc: {
    authentication_initial_token_type:
      '工作負載身分聯合（WIF）取得初始 OIDC 權杖時使用的憑證類型。',
    connect_timeout: '建立 GCP PubSub gRPC 連線的逾時時間。',
    topic: '要消費的 GCP PubSub 主題。',
    max_outstanding_messages:
      '已傳送給用戶端但尚未處理並確認的最大訊息數。達到上限時，PubSub 暫停傳送訊息；未確認訊息數低於上限後恢復傳送。設定為 0 表示不限制，預設 100。',
  },
  gcp_pubsub_consumer: {
    topic: '要消費的 GCP PubSub 主題。',
    pipelining:
      '正整數，設定最大可傳送的非同步 HTTP 請求數量。當設定為 1 時，表示每次傳送完成 HTTP 請求後都需要等待伺服器回傳，再繼續傳送下一個請求。',
    pull_max_messages:
      '從 GCP PubSub 中在一個拉取請求裡檢索的最大訊息數。\n實際數量可能小於指定的值。',
    connect_timeout: '連線 GCP 伺服器的逾時時間。',
  },
  hstreamdb: {
    url: 'HStreamDB 伺服器的 URL。使用 gRPC HTTP 伺服器地址。',
    partition_key: 'HStreamDB 分割區鍵。支援佔位符。',
    grpc_flush_timeout: '重新整理 gRPC 呼叫到 HStreamDB 伺服器的時間間隔。',
    aggregation_pool_size:
      '記錄聚合池的大小。增大聚合池可提升並行處理能力，但可能會因批處理變小而影響效率。',
    max_batches: '重新整理佇列中最大未確認批次數。',
    writer_pool_size:
      '寫入池大小。擴大池規模可增加並行化和同時寫入操作，可能提升吞吐量。但需權衡記憶體消耗和資源競爭。',
    batch_interval: '兩個連續（批次）請求之間的最長間隔。',
    record_template:
      '將被轉發到 HStreamDB 的 HStream record 模板。支援佔位符。<br/>注意：當使用 `raw record` 模板（意味著資料不是有效的 JSON）時，應該在 HStream 中使用 `read` 或 `subscription` 來取得資料。',
    parameters_batch_size: '單個請求中可傳送的插入資料子句的最大數量。',
  },
  influxdb: {
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/><br/>主機名具有以下形式：`Host[:Port]`。<br/><br/>如果未指定 `[:Port]`，則使用 InfluxDB 預設連接埠 8086。',
    token: 'InfluxDB token。',
    org: 'InfluxDB 組織名稱。',
    bucket: 'InfluxDB bucket 名稱。',
    write_syntax:
      "使用 InfluxDB API Line Protocol 寫入 InfluxDB 的資料，支援佔位符，參考 [InfluxDB 2.3 Line Protocol](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/) 及 [InfluxDB 1.8 Line Protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) <br/>TLDR: <br/>```<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]```<br/>注意，整形數值佔位符後需要新增一個字元 `i` 類型識別。例如 `${'{'}payload.int_value{'}'}i`",
    precision: 'InfluxDB 時間精度。',
    ping_with_auth:
      '控制 EMQX 在傳送 /ping 健康檢查請求時是否附帶連接器認證資訊。如果你的 InfluxDB 服務要求 /ping 也進行認證，請啟用此項。預設值為 false，即保持原有行為，不在 /ping 請求中附帶認證資訊。',
  },
  datalayers: {
    write_syntax:
      'Datalayers 採用與 InfluxDB v1 完全相容的行協定，為使用者提供了熟悉且高效的資料寫入方式。雖然相容InfluxDB v1 的語法，但 Datalayers 在底層實現上有其獨特之處，以最佳化效能和適應其特定的儲存結構。參考 [InfluxDB Line Protocol](https://docs.datalayers.cn/datalayers/latest/development-guide/writing-with-influxdb-line-protocol.html)',
    precision: 'Datalayers 時間精度。',
    enable_prepared:
      '啟用 Datalayers 連接器的預處理語句。\n    注意：此參數僅在 <code>驅動類型</code> 設定為 <code>Arrow Flight</code> 時生效。',
    server: '驅動類型為 Arrow Flight 時，預設連接埠應為 8360',
  },
  confluent_producer: {
    connect_timeout:
      '建立 TCP 連線時的最長等待時長（若啟用認證，這個等待時長也包含完成認證所需時間）。',
    bootstrap_hosts: '用逗號分隔的 <code>host[:port]</code> 主機列表。預設連接埠號為 9092。',
    min_metadata_refresh_interval:
      '重新整理 Kafka broker 和 Kafka 主題後設資料的最短時間間隔。設定太小可能會增加 Kafka 壓力。',
    metadata_request_timeout: '重新整理後設資料時最長等待時長。',
    topic: 'Kafka 主題名稱',
    kafka_headers:
      "請提供用作 Kafka Headers 的佔位符<br/>例如：<code>${'{'}pub_props{'}'}</code><br/>注意佔位符的值必須是一個物件：<br/>`{'{'}\"foo\": \"bar\"{'}'}`",
    kafka_header_value_encode_mode:
      'Kafka Headers 的值編碼類型：<br/>- `NONE`：僅將二進位制值新增到 Kafka Headers；<br/>- `JSON`：僅將 JSON 值新增到 Kafka Headers，並在傳送之前將其編碼為 JSON 字串。',
    kafka_ext_headers:
      '請提供更多的鍵值對，用於 Kafka Headers。<br/>這裡的鍵值對將與 `kafka_headers` 欄位的值合併後傳送到 Kafka。',
    key: '生成 Kafka 訊息鍵的模版。如果模版生成後為空值，則會使用 Kafka 的 <code>NULL</code> ，而非空字串。',
    value:
      '生成 Kafka 訊息的值的模版。如果模版生成後為空值，則會使用 Kafka 的 <code>NULL</code>，而非空字串。',
    partition_strategy:
      '設定訊息發布時應該如何選擇 Kafka 分割區。<br/><code>random</code>: 為每個訊息隨機選擇一個分割區。<br/><code>key_dispatch</code>：對 Kafka 訊息鍵進行雜湊，以得到一個分割區號。',
    max_batch_bytes:
      '最大訊息批次位元組數。大多數 Kafka 環境的預設最低值是 1 MB，EMQX 的預設值比 1 MB 更小是因為需要補償 Kafka 訊息編碼所需要的額外位元組（尤其是當每條訊息都很小的情況下）。當單個訊息的大小超過該限制時，它仍然會被傳送，（相當於該批次中只有單個訊息）。',
    required_acks:
      '設定 Kafka leader 在回傳給 EMQX 確認之前需要等待多少個 follower 的確認。<br/><code>all_isr</code>: 需要所有的線上複製者都確認。<br/><code>leader_only</code>: 僅需要分割區 leader 確認。<br/><code>none</code>: 無需 Kafka 回覆任何確認。',
    partition_count_refresh_interval:
      '設定 Kafka 重新整理分割區數量的時間間隔。<br/>EMQX 發現 Kafka 分割區數量增加後，會開始按 <code>partition_strategy</code> 設定，把訊息傳送到新的分割區中。',
    max_inflight:
      '設定 Kafka 生產者（每個分割區一個）在收到 Kafka 的確認前最多傳送多少個請求（批次）。調大這個值通常可以增加吞吐量，但是，當該值設定大於 1 時存在訊息亂序的風險。',
    sync_query_timeout: "同步查詢的逾時時間。僅當請求模式設定為'同步'時才使用該設定。",
    mode: '訊息快取模式。<br/><code>memory</code>: 所有的訊息都快取在記憶體裡。如果 EMQX 服務重啟，快取的訊息會遺失。<br/><code>disk</code>: 快取到磁碟上。EMQX 重啟後會繼續傳送重啟前未傳送完成的訊息。<br/><code>hybrid</code>: 先將訊息快取在記憶體中，當記憶體中的訊息堆積超過一定限制（設定項 <code>segment_bytes</code> 描述了該限制）後，後續的訊息會快取到磁碟上。與 <code>memory</code> 模式一樣，如果 EMQX 服務重啟，快取的訊息會遺失。',
    per_partition_limit:
      '為每個 Kafka 分割區設定的最大快取位元組數。當超過這個上限之後，老的訊息會被丟棄，為新的訊息騰出空間。',
    segment_bytes:
      '當快取模式是 <code>disk</code> 或 <code>hybrid</code> 時適用。該設定用於指定快取到磁碟上的檔案的大小。',
    compression: '壓縮方法。',
    partitions_limit: '限制生產者能夠傳送訊息的最大分割區數量。',
  },
  kafka_producer: {
    bootstrap_hosts: '用逗號分隔的 <code>host[:port]</code> 主機列表。預設連接埠號為 9092。',
    authentication: '認證參數。',
    authentication_endpoint: 'AWS IAM Roles Anywhere 憑證行程提供 API 的端點。',
    authentication_region: 'MSK 叢集執行所在的 AWS 區域。',
    connect_timeout:
      '建立 TCP 連線時的最長等待時長（若啟用認證，這個等待時長也包含完成認證所需時間）。',
    min_metadata_refresh_interval:
      '重新整理 Kafka broker 和 Kafka 主題後設資料的最短時間間隔。設定太小可能會增加 Kafka 壓力。',
    metadata_request_timeout: '重新整理後設資料時最長等待時長。',
    topic: 'Kafka 主題名稱',
    kafka_headers:
      "請提供用作 Kafka Headers 的佔位符<br/>例如：<code>${'{'}pub_props{'}'}</code><br/>注意佔位符的值必須是一個物件：<br/>`{'{'}\"foo\": \"bar\"{'}'}`",
    kafka_header_value_encode_mode:
      'Kafka Headers 的值編碼類型：<br/>- `NONE`：僅將二進位制值新增到 Kafka Headers；<br/>- `JSON`：僅將 JSON 值新增到 Kafka Headers，並在傳送之前將其編碼為 JSON 字串。',
    kafka_ext_headers:
      '請提供更多的鍵值對，用於 Kafka Headers。<br/>這裡的鍵值對將與 `kafka_headers` 欄位的值合併後傳送到 Kafka。',
    key: '生成 Kafka 訊息鍵的模版。如果模版生成後為空值，則會使用 Kafka 的 <code>NULL</code> ，而非空字串。',
    value:
      '生成 Kafka 訊息的值的模版。如果模版生成後為空值，則會使用 Kafka 的 <code>NULL</code>，而非空字串。',
    kafka_message_timestamp:
      "生成 Kafka 訊息時間戳的模版。該時間必需是一個整型數值（可以是字串格式）例如 <code>1661326462115</code> 或 <code>'1661326462115'</code>。當所需的輸入欄位不存在，或不是一個整型時，則會使用目前系統時間。",
    compression: '壓縮方法。',
    partition_strategy:
      '設定訊息發布時應該如何選擇 Kafka 分割區。<br/><code>random</code>: 為每個訊息隨機選擇一個分割區。<br/><code>key_dispatch</code>：對 Kafka 訊息鍵進行雜湊，以得到一個分割區號。',
    max_batch_bytes:
      '最大訊息批次位元組數。大多數 Kafka 環境的預設最低值是 1 MB，EMQX 的預設值比 1 MB 更小是因為需要補償 Kafka 訊息編碼所需要的額外位元組（尤其是當每條訊息都很小的情況下）。當單個訊息的大小超過該限制時，它仍然會被傳送，（相當於該批次中只有單個訊息）。',
    required_acks:
      '設定 Kafka leader 在回傳給 EMQX 確認之前需要等待多少個 follower 的確認。<br/><code>all_isr</code>: 需要所有的線上複製者都確認。<br/><code>leader_only</code>: 僅需要分割區 leader 確認。<br/><code>none</code>: 無需 Kafka 回覆任何確認。',
    partition_count_refresh_interval:
      '設定 Kafka 重新整理分割區數量的時間間隔。<br/>EMQX 發現 Kafka 分割區數量增加後，會開始按 <code>partition_strategy</code> 設定，把訊息傳送到新的分割區中。',
    max_inflight:
      '設定 Kafka 生產者（每個分割區一個）在收到 Kafka 的確認前最多傳送多少個請求（批次）。調大這個值通常可以增加吞吐量，但是，當該值設定大於 1 時存在訊息亂序的風險。',
    sync_query_timeout: "同步查詢的逾時時間。僅當請求模式設定為'同步'時才使用該設定。",
    mode: '訊息快取模式。<br/><code>memory</code>: 所有的訊息都快取在記憶體裡。如果 EMQX 服務重啟，快取的訊息會遺失。<br/><code>disk</code>: 快取到磁碟上。EMQX 重啟後會繼續傳送重啟前未傳送完成的訊息。<br/><code>hybrid</code>: 先將訊息快取在記憶體中，當記憶體中的訊息堆積超過一定限制（設定項 <code>segment_bytes</code> 描述了該限制）後，後續的訊息會快取到磁碟上。與 <code>memory</code> 模式一樣，如果 EMQX 服務重啟，快取的訊息會遺失。',
    per_partition_limit:
      '為每個 Kafka 分割區設定的最大快取位元組數。當超過這個上限之後，老的訊息會被丟棄，為新的訊息騰出空間。',
    segment_bytes:
      '當快取模式是 <code>disk</code> 或 <code>hybrid</code> 時適用。該設定用於指定快取到磁碟上的檔案的大小。',
    kafka_ext_header_key: "Kafka Headers 的鍵。支援使用 <code>${'{'}var{'}'}</code> 格式的佔位符。",
    mechanism: 'SASL 認證方法名稱。',
    kerberos_principal:
      "SASL GSSAPI 認證方法的 Kerberos principal，例如 <code>client_name{'@'}MY.KERBEROS.REALM.MYDOMAIN.COM</code>注意：這裡使用的 realm 需要設定在 EMQX 伺服器的 /etc/krb5.conf 中",
    kerberos_keytab_file:
      'SASL GSSAPI 認證方法的 Kerberos keytab 檔案。注意：該檔案需要上傳到 EMQX 伺服器中，且執行 EMQX 服務的系統帳戶需要有讀取權限。',
    kafka_ext_header_value:
      "Kafka Headers 的值。支援使用 <code>${'{'}var{'}'}</code> 格式的佔位符。",
    partitions_limit: '限制生產者能夠傳送訊息的最大分割區數量。',
  },
  kafka_consumer: {
    bootstrap_hosts: '用逗號分隔的 <code>host[:port]</code> 主機列表。預設連接埠號為 9092。',
    authentication_endpoint: 'AWS IAM Roles Anywhere 憑證行程提供 API 的端點。',
    authentication_region: 'MSK 叢集執行所在的 AWS 區域。',
    key_encoding_mode:
      '透過 MQTT 轉發之前，如何處理 Kafka 訊息的 Key。<code>none</code> 使用 Kafka 訊息中的 Key 原始值，不進行編碼。  注意：在這種情況下，Key 必須是一個有效的 UTF-8 字串。<br/><code>base64</code> 對收到的金鑰或值使用 base-64 編碼。',
    value_encoding_mode:
      '透過 MQTT 轉發之前，如何處理 Kafka 訊息的 Value。<code>none</code> 使用 Kafka 訊息中的 Value 原始值，不進行編碼。  注意：在這種情況下，Value 必須是一個有效的 UTF-8 字串。<br/><code>base64</code> 對收到的 Value 使用 base-64 編碼。',
    offset_reset_policy: '如不存在偏移量歷史記錄或歷史記錄失效，消費者應使用哪個偏移量開始消費。',
    min_metadata_refresh_interval:
      '重新整理 Kafka broker 和 Kafka 主題後設資料的最短時間間隔。設定太小可能會增加 Kafka 壓力。',
    metadata_request_timeout: '重新整理後設資料時最長等待時長。',
    connect_timeout:
      '建立 TCP 連線時的最長等待時長（若啟用認證，這個等待時長也包含完成認證所需時間）。',
    max_batch_bytes:
      '設定每次從 Kafka 拉取資料的位元組數。<br/>消費者按批次取得訊息，如果取得的第一個非空分割區中的第一個記錄批次大小大於這個值，該記錄批次仍會被回傳，以確保消費者能夠繼續處理。因此，這並不是一個絕對的最大值限制。如果需要實現最小延遲，可將該值設為 `1`',
    offset_commit_interval_seconds: '指定 Kafka 消費組偏移量提交的時間間隔。',
    topic: 'Kafka 主題名稱',
    group_id: '用於此 Source 的消費者組 ID。如果未指定，系統將自動生成一個基於 Source 名稱的 ID。',
    max_wait_time: '等待 Kafka broker 傳送回應物件的最長時間。',
  },
  mongodb: {
    collection: '資料將被儲存到的集合',
    payload_template:
      '用於格式化寫入 MongoDB 的訊息模板。 如果未定義，規則引擎會使用 JSON 格式序列化所有的可見輸入，例如 clientid, topic, payload 等。',
    auth_source: '與使用者憑證關聯的資料庫名稱。',
    use_legacy_protocol:
      '是否使用 MongoDB 的舊協定與資料庫通訊。預設情況下，系統會嘗試自動確定是否支援新協定。',
    srv_record: '使用 DNS SRV 記錄。',
    max_overflow:
      '當連線池中所有執行緒都被佔用時，可以建立的最大附加工作執行緒數。這有助於透過允許更多併發連線到 MongoDB 伺服器來管理暫時的工作負載峰值。',
    overflow_ttl: '當池內工人太多時，等待多久清除多餘工人。',
    overflow_check_period: '檢查是否有超過設定的工人的週期（"溢位"）。',
    local_threshold: '在多個合適的 MongoDB 實例中進行選擇的延遲視窗的大小。',
    connect_timeout: '逾時重連的等待時間。',
    socket_timeout: '在嘗試逾時之前，在套接字上嘗試傳送或接收的持續時間。',
    server_selection_timeout: '指定在丟擲異常之前為伺服器選擇阻斷多長時間。',
    wait_queue_timeout: '工作者等待連線可用的最長時間。',
    heartbeat_frequency:
      '控制驅動程式何時檢查 MongoDB 部署的狀態。指定檢查的間隔時間，從上一次檢查結束到下一次檢查開始計算。如果連線數增加（例如，如果你增加池子的大小，就會發生這種情況），你可能也需要增加這個週期，以避免在 MongoDB 日誌檔案中建立太多的日誌條目。',
    min_heartbeat_frequency: '心跳間的最小間隙',
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 MongoDB 預設連接埠 27017。',
    w_mode: '寫模式。',
    servers:
      '叢集將要連線的節點列表。 節點之間用逗號分隔，如：`Node[,Node].`<br/>每個節點的設定為：將要連線的 IPv4 或 IPv6 地址或主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 MongoDB 預設連接埠 27017。',
    replica_set_name: '副本集的名稱。',
    r_mode: '讀模式。',
  },
  mysql: {
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 MySQL 預設連接埠 3306。',
    sql: 'SQL 模板',
  },
  pgsql: {
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用預設連接埠 5432。',
    sql: 'SQL 模板',
  },
  redis: {
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 Redis 預設連接埠 6379。',
    servers:
      '叢集將要連線的節點列表。 節點之間用逗號分隔，如：`Node[,Node].`<br/>每個節點的設定為：將要連線的 IPv4 或 IPv6 地址或主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 Redis 預設連接埠 6379。',
    sentinel: "哨兵模式。當 Redis 服務執行在哨兵模式下，該設定必須設定為 'sentinel'。",
    sentinel_username:
      '用於向 Redis Sentinel 進行身分認證的使用者名稱。若 Sentinel 不需要 ACL 使用者名稱認證，請留空。',
    sentinel_password: '用於向 Redis Sentinel 進行身分認證的密碼。若 Sentinel 不需要認證，請留空。',
    command_template:
      "用於推送資料的 Redis 命令模板。 每個列表元素代表一個命令名稱或其參數。<br/>例如，要透過鍵 `msgs` 將訊息體推送到 Redis 列表中，陣列元素應該是： `rpush`, `msgs`, `${'{'}payload{'}'}`。",
  },
  rocketmq: {
    servers:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 RocketMQ 預設連接埠 9876。',
    access_key: 'RocketMQ 伺服器的 `accessKey`。',
    secret_key: 'RocketMQ 伺服器的 `secretKey`。',
    security_token: 'RocketMQ 伺服器安全權杖',
    topic: 'RocketMQ 主題',
    refresh_interval: 'RocketMQ 主題路由更新間隔。',
    send_buffer: 'RocketMQ 驅動的套位元組傳送訊息的緩衝區大小',
    template:
      "模板, 預設為空，為空時將會將整個訊息轉發給 RocketMQ。 <br/>模板可以是任意帶有佔位符的合法字串, 例如:<br/>- ${'{'}id{'}'}, ${'{'}username{'}'}, ${'{'}clientid{'}'}, ${'{'}timestamp{'}'}<br/>- {'{'}\"id\" : ${'{'}id{'}'}, \"username\" : ${'{'}username{'}'}{'}'}",
    sync_timeout: 'RocketMQ 驅動同步呼叫的逾時時間。',
    namespace:
      '如果你正在使用阿里雲的 RocketMQ 服務並且啟用了命名空間，或者你在你自己的 RocketMQ 服務裡設定了命名空間，那麼你必須設定命名空間欄位。對於阿里雲的 RocketMQ 服務來說，命名空間就是實例 ID。',
    rocketmq_namespace:
      'RocketMQ 服務中設定的命名空間。使用已啟用命名空間的阿里雲 RocketMQ 時，請填寫實例 ID。',
    strategy: '生產者金鑰分派策略，預設為 `roundrobin`，從 EMQX 6.0.0 版本後不支援佔位符。',
  },
  tdengine: {
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`[http[s]://]Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 TDengine 預設連接埠 6041。',
    sql: 'SQL 模板',
    token:
      '連線到 TDengine Cloud 時使用的權杖。<br/>如果提供了權杖，它將覆寫使用者名稱和密碼的認證方式。',
  },
  sqlserver: {
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 SQL Server 預設連接埠 1433。',
    driver: 'SQL Server Driver 名稱',
    sql: 'SQL 模板',
  },
  iotdb: {
    base_url: '外部 IoTDB 服務的 REST 介面的基礎 URL。<br/>URL 具有以下形式：`http://Host:Port`',
    iotdb_version: '要連線的 IoTDB 系統的版本。',
    enable_pipelining:
      '一個正整數。是否連續傳送 HTTP 請求，當設定為 1 時，這意味著每次傳送 HTTP 請求後，您需要等待伺服器回傳，然後繼續傳送下一個請求。',
    connect_timeout: '連線到 IoTDB 伺服器時的逾時時間。',
    timestamp:
      "支援使用 ${'{'}var{'}'} 格式的佔位符，要求是時間戳格式。也可以使用以下特殊字元插入系統時間：<br/>- `now`: 目前毫秒級時間戳<br/>- `now_ms`: 目前毫秒級時間戳<br/>- `now_us`: 目前微秒級時間戳<br/>- `now_ns`: 目前納秒級時間戳",
    measurement: "也稱 Measurement，支援使用 ${'{'}var{'}'} 格式的佔位符。",
    data_type: '插入值的資料型別。支援的類型：boolean、int32、int64、float、double、text。',
    value: "要插入的值，支援使用 ${'{'}var{'}'} 格式的佔位符。",
    device_id:
      '應插入此資料的固定裝置名稱。如果為空，則必須在規則操作中設定，訊息本身中設定，或從主題中提取。',
    is_aligned: '是否對齊時間序列',
    recv_timeout: '接收 IoTDB Thrift 伺服器的逾時時間。',
    parameters: 'SQL 方言，選擇項必須與連接器中的 SQL 方言一致，否則將無法儲存資料。',
  },
  opents: {
    server: '伺服器的地址。',
    summary: '是否回傳摘要資訊。',
    details: '是否回傳詳細資訊。',
    timestamp: "秒級或毫秒級時間戳，支援 ${'{'}var{'}'} 格式的佔位符。",
    metric: "度量的名稱，應為時間序列資料的唯一識別碼，支援 ${'{'}var{'}'} 格式的佔位符，",
    tags: "附加後設資料的標籤，每個標籤都是一個鍵值對，採用 `key=value,key2=value2` 的格式進行設定，並支援 ${'{'}var{'}'} 形式的佔位符。",
    value: "資料點的值，支援 ${'{'}var{'}'} 格式的佔位符。它代表實際的測量或觀察值。",
  },
  oracle: {
    sql: 'SQL 模板。模板中描述訊息後設資料和有效載荷的字串可以包含佔位符。這些佔位符在插入時不會做任何檢查和格式轉換，所以請務必確保插入值被正確地格式化和轉義。',
    sid: 'Oracle Database SID 名稱',
    server:
      '將要連線的 IPv4 或 IPv6 地址，或者主機名。<br/>主機名具有以下形式：`Host[:Port]`。<br/>如果未指定 `[:Port]`，則使用 Oracle Database 預設連接埠 1521。',
  },
  rabbitmq: {
    server: '你想要連線的 RabbitMQ 伺服器地址（例如，localhost）。',
    port: 'RabbitMQ 伺服器監聽的連接埠號（預設為 5672）。',
    exchange: '訊息將被傳送到的 RabbitMQ 交換機的名稱。',
    routing_key: '用於將訊息路由到 RabbitMQ 交換機的正確佇列的路由鍵。',
    virtual_host: '連線到 RabbitMQ 伺服器時要使用的虛擬主機。',
    heartbeat: '傳送心跳訊息到 RabbitMQ 伺服器的時間間隔。',
    delivery_mode:
      '發布到 RabbitMQ 的訊息的傳遞模式。非永續性的傳遞模式適用於不需要在 RabbitMQ 重啟時保持永續性的訊息，而永續性的傳遞模式適用於必須在 RabbitMQ 重啟時保持永續性的訊息。',
    wait_for_publish_confirmations: '使用發布者確認時，是否要等待 RabbitMQ 確認訊息。',
    publish_confirmation_timeout: '使用發布者確認時等待 RabbitMQ 確認訊息發布的逾時時間。',
    timeout: '等待建立連線的逾時時間。',
    payload_template:
      "傳送訊息到 RabbitMQ 之前格式化訊息有效載荷的模板。模板佔位符（例如 ${'{'}field1.sub_field{'}'} ）將被替換為相應欄位的值。如果為空，則整個輸入訊息將被用作有效載荷，格式化為 JSON 文本。此行為相當於將 ${'{'}.{'}'} 指定為有效載荷模板。",
    queue: 'RabbitMQ 佇列名稱。',
    no_ack: '在從 RabbitMQ 消費訊息時是否使用 `no_ack` 模式。',
    properties_template:
      '訊息屬性模板，可檢視: https://www.rabbitmq.com/docs/publishers#message-properties',
  },
  pulsar: {
    servers:
      '以逗號分隔的 <code>scheme://host[:port]</code> 格式的 Pulsar URL 列表，支援的 scheme 有 <code>pulsar://</code> （預設）和<code>pulsar+ssl://</code>。預設連接埠：6650。',
    pulsar_topic: 'Pulsar 主題名稱',
    strategy:
      '設定訊息發布時的 Pulsar 分割區選擇策略。<br/><code>random</code>: 為每個訊息隨機選擇一個分割區。<br/><code>roundrobin</code>: 依次為每條資訊挑選可用的 producer。<br/><code>key_dispatch</code>: 將待選擇分割區的編碼進行雜湊，並存儲在一批資訊中第一條資訊的 Pulsar 資訊金鑰中。',
    compression: '壓縮方法。',
    message_key: '生成 Pulsar 訊息 Key 的模版。',
    message_value: '生成 Pulsar 訊息 Value 的模版。',
    sync_timeout: '同步發布時，從 Pulsar 接收發送回執的最長等待時間。',
    retention_period:
      '指定在與 Pulsar broker 斷開連線時緩衝訊息的持續時間。請合理設定該值，時間設定越久，需要的記憶體/磁碟的使用量越高。',
    send_buffer: 'TCP socket 的傳送快取調優，高吞吐量下建議保留預設值。',
    max_batch_bytes:
      '每個批次可收集的最大訊息位元組數。EMQX 將預設值設為小於 5 MB，以便補償編碼開銷，特別是在處理較小的訊息時。當單條訊息的大小超過該限制時，會做為單獨批次處理，即該批次中僅包含這條訊息。',
    connect_timeout:
      '建立 TCP 連線時的最長等待時長（若啟用認證，這個等待時長也包含完成認證所需時間）。',
    mode: '訊息快取模式。<br/><code>memory</code>: 所有的訊息都快取在記憶體裡。如果 EMQX 服務重啟，快取的訊息會遺失。<br/><code>disk</code>: 快取到磁碟上。EMQX 重啟後會繼續傳送重啟前未傳送完成的訊息。<br/><code>hybrid</code>: 先將訊息快取在記憶體中，當記憶體中的訊息堆積超過一定限制（設定項 <code>segment_bytes</code> 描述了該限制）後，後續的訊息會快取到磁碟上。如果 EMQX 服務重啟，快取訊息會遺失。',
    per_partition_limit:
      '為每個 Pulsar 分割區設定的最大快取位元組數。當超過這個上限之後，老的訊息會被丟棄，以便接收新的訊息。',
    segment_bytes:
      '當快取模式是 <code>disk</code> 或 <code>hybrid</code> 時適用。該設定用於指定快取到磁碟上的檔案的大小。',
    authentication_jwt: 'JWT 認證權杖。',
    max_inflight:
      '生產者在等待接收回執前可以傳送給每個分割區的最大訊息批次數量。<br/>設定更高的值可以提高吞吐量。',
  },
  azure_event_hub_producer: {
    bootstrap_hosts:
      '用於引導用戶端的 Azure Event Hubs Kafka <code>host[:port]</code>命名空間端點的逗號分隔列表。預設連接埠號為 9093。',
    connect_timeout: 'TCP 連線建立的最長等待時間（包括啟用身分驗證的時間）。',
    min_metadata_refresh_interval:
      '用戶端在重新整理 Azure Event Hubs Kafka broker 和主題後設資料之前必須等待的最小時間間隔。設定太小的值可能會對 Azure Event Hubs 造成額外的負載。',
    metadata_request_timeout: '從 Azure Event Hubs 取得後設資料時的最長等待時間。',
    password:
      '用於連線到 Azure Event Hubs 的連線字串。應為命名空間共享存取策略的 "連線字串 - 主鍵"。',
    topic: '事件中心名稱',
    max_batch_bytes:
      '在 Azure Event Hubs 訊息批次中收集的最大位元組數。大多數 Azure Event Hubs 代理的預設限制為 1 MB 批次大小。EMQX 的預設值小於 1 MB，以補償 Azure Event Hubs 訊息編碼開銷（特別是當每個單獨訊息非常小時）。當單個訊息超過限制時，仍然會發送（作為單個元素批次）。',
    partition_strategy:
      '分割區策略用於告訴生產者如何將訊息分派到 Azure Event Hubs 分割區。\n\n<code>random</code>：隨機選擇每個訊息的分割區\n<code>key_dispatch</code>：將 Azure Event Hubs 訊息鍵雜湊到分割區號',
    required_acks:
      'Azure Event Hubs 分割區領導者在向其追隨者傳送確認之前必須等待的所需確認\n\n<code>all_isr</code>：要求所有同步副本進行確認。\n<code>leader_only</code>：僅需要分割區領導者的確認。',
    kafka_headers:
      "請提供一個佔位符用於用作 Azure Event Hubs 標頭<br/>\n例如：<code>${'{'}pub_props{'}'}</code><br/>\n請注意，佔位符的值必須是物件：\n<code>{'{'}\\\"foo\\\": \\\"bar\\\"{'}'}</code>",
    kafka_ext_headers:
      '請為 Azure Event Hubs 提供更多的鍵值對標頭資訊<br/>此處的鍵值對將在傳送到 Azure Event Hubs 之前與 <code>kafka_headers</code> 欄位的值進行組合。',
    kafka_header_value_encode_mode:
      'Azure Event Hubs 標頭值編碼模式<br/>\n - NONE：僅將二進位制值新增到 Azure Event Hubs 標頭；<br/>\n - JSON：僅將 JSON 值新增到 Azure Event Hubs 標頭，並在傳送前將其編碼為 JSON 字串。',
    partition_count_refresh_interval:
      'Azure Event Hubs 生產者用於發現增加的分割區數的時間間隔。\n在 Azure Event Hubs 中增加分割區數後，EMQX 將在根據<code>partition_strategy</code>分派訊息時考慮已發現的分割區。',
    max_inflight:
      'Azure Event Hubs 生產者（每個分割區）允許傳送的最大批次數，然後從 Azure Event Hubs 接收確認。較大的值通常意味著更高的吞吐量。但是，當該值大於 1 時，可能會有訊息重新排序的風險。',
    sync_query_timeout: "該參數定義同步查詢的逾時限制。僅在橋接查詢模式設定為'同步'時適用。",
    key: '用於呈現 Azure Event Hubs 訊息鍵的模板。如果模板呈現為空值（即在規則引擎上下文中沒有此類資料欄位），則使用 Azure Event Hubs 的<code>NULL</code>（而不是空字串）。',
    value:
      '用於呈現 Azure Event Hubs 訊息值的模板。如果模板呈現為空值（即在規則引擎上下文中沒有此類資料欄位），則使用 Azure Event Hubs 的<code>NULL</code>（而不是空字串）。',
    kafka_ext_header_key: "Azure Event Hubs 標頭的鍵。支援格式為${'{'}var{'}'}的佔位符。",
    kafka_ext_header_value: "Azure Event Hubs 標頭的值。支援格式為${'{'}var{'}'}的佔位符。",
    mode: '訊息緩衝區模式。\n\n<code>memory</code>：在記憶體中緩衝所有訊息。在 EMQX 節點重啟時，訊息將會遺失\n<code>disk</code>：將所有訊息緩衝到磁碟上。磁碟上的訊息能夠在 EMQX 節點重啟時倖存下來。\n<code>hybrid</code>：首先在記憶體中緩衝訊息，當達到一定限制時（有關更多資訊，請參閱<code>segment_bytes</code>設定），然後開始將訊息轉移到磁碟上，與<code>memory</code>模式一樣，訊息將會在 EMQX 節點重啟時遺失。',
    per_partition_limit:
      '每個 Azure Event Hubs 分割區允許緩衝的位元組數。當超過此限制時，舊訊息將被刪除以獲得新訊息的緩衝區配額。',
    segment_bytes:
      '在緩衝區模式設定為<code>disk</code>或<code>hybrid</code>時適用。\n此值用於指定每個磁碟緩衝檔案的大小。',
    partitions_limit: '限制生產者能夠傳送訊息的最大分割區數量。',
  },
  kinesis: {
    payload_template: '用於格式化輸出訊息的模板。如果未定義，將以 JSON 格式傳送所有可用上下文。',
    aws_access_key_id: '用於連線到 Amazon Kinesis 的存取金鑰 ID。',
    aws_secret_access_key: '用於連線到 Amazon Kinesis 的 AWS 秘密存取金鑰。',
    endpoint: 'Amazon Kinesis 端點的 URL。',
    stream_name: '要發布訊息的 Amazon Kinesis 流。',
    partition_key: "與發布的訊息關聯的 Amazon Kinesis 分割區鍵。支援 ${'{'}var{'}'} 格式的佔位符。",
  },
  greptimedb: {
    server: '要連線的 IPv4 或 IPv6 地址或主機名。<br/>\n主機條目的格式為：`Host[:Port]`。',
    dbname: 'GreptimeDB 資料庫名稱。',
    precision: 'GreptimeDB 時間精度。',
    write_syntax:
      "GreptimeDB gRPC 協定寫資料點的設定。寫語法是一種基於文本的格式，提供資料點的測量、標籤集、欄位集和時間戳，支援佔位符，與 InfluxDB 行協定相同。\n參考 [InfluxDB 2.3 行協定](https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/) 和\n[InfluxDB 1.8 行協定](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/) <br/>\n簡而言之：<br/>\n```\n<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]\n```\n請注意，整數值的佔位符必須使用字尾 `i` 進行註解。例如 `${'{'}payload.int_value{'}'}i`。",
    ttl: 'GreptimeDB 自動建立的表的資料保留期限 (TTL)。',
    ts_column: '指定查詢時將顯示的自訂時間戳列名。',
  },
  syskeeper_proxy: {
    listen: 'Syskeeper Proxy 伺服器的監聽地址',
    acceptors: '接收器的數量',
    handshake_timeout: '在建立連線時等待握手的最長時間',
  },
  syskeeper_forwarder: {
    server: 'Syskeeper Proxy 伺服器的地址',
    ack_mode: '指定 Proxy 伺服器是否應該回復確認訊息，可以是：<br/>- need_ack <br/>- no_ack <br/>',
    ack_timeout: '等待回覆確認訊息的最長時間',
    target_topic: '轉發訊息的主題',
    target_qos: '轉發訊息的服務品質（QoS），留空表示使用原始主題的 QoS',
    template: '訊息模板, 支援佔位符',
  },
  elasticsearch: {
    server: 'ElasticSearch 服務的 REST 介面地址。',
    routing: '指定應將文件儲存在索引的哪個分片中，留空則由 Elasticsearch 決定。',
    wait_for_active_shards:
      '在繼續操作之前必須啟用的分片副本數。\n設定為 all 或任何正整數，最多為索引中的總分片數（number_of_replicas+1）。\n預設值：1，即主分片。',
    index: "要執行操作的索引或索引別名的名稱，支援 ${'{'}var{'}'} 格式的佔位符。",
    id: "索引內文件的唯一識別碼，支援 ${'{'}var{'}'} 格式的佔位符。如果未指定 ID，則由 Elasticsearch 自動生成。",
    doc: "自訂文件模板，支援 ${'{'}var{'}'} 格式的佔位符，要求必須可以被轉換為 JSON 物件。\n 例如 `{'{'} \"field\": \"${'{'}payload.field{'}'}\" {'}'}`，或 `${'{'}payload{'}'}`。",
    overwrite: '當文件已經存在時覆寫文件，否則文件將寫入失敗。',
    enable_pipelining:
      '一個正整數。是否連續傳送 HTTP 請求，當設定為 1 時，這意味著每次傳送 HTTP 請求後，您需要等待伺服器回傳，然後繼續傳送下一個請求。',
    connect_timeout: '連線到 ElasticSearch 伺服器時的逾時時間。',
    doc_as_upsert:
      '嘗試更新的文件不存在時，將更新操作當作一個插入操作，並將提供的文件當作新文件插入。',
  },
  s3: {
    region:
      '用於對 S3 端點請求進行簽名的區域，例如 `us-west-2`。顯式設定的值優先於從端點地址推斷的區域。留空時會從端點地址自動推斷區域；無法推斷時使用 `us-east-1`。當自訂端點地址不包含預期區域時，可透過此欄位指定。',
    acl: '上傳的物件的存取權限。',
    content:
      "要儲存的物件的內容。預設情況下，它是包含所有欄位的 JSON 文本格式。支援如 ${'{'}payload{'}'} 的佔位符設定。儲存格式取決於變數的格式，支援二進位制內容。",
    bucket: "將要上傳檔案的儲存桶的名稱。需要在 S3 中預先建立好，支援 ${'{'}var{'}'} 佔位符格式。",
    key: "要儲存的物件的鍵。支援如 ${'{'}var{'}'} 的佔位符設定。",
    column_order:
      '在生成的 CSV 檔案中首先按列排序的事件欄位。<br/>無論此設定如何，生成的 CSV 都將包含聚合事件的所有欄位，但此處未明確提及的所有列將按字典順序排在這裡列出的欄位之後。',
    time_interval: '在上傳前將事件聚合到單個物件中的時間量。',
  },
  azure_blob_storage: {
    column_order:
      '在生成的 CSV 檔案中首先按列排序的事件欄位。<br/>無論此設定如何，生成的 CSV 都將包含聚合事件的所有欄位，但此處未明確提及的所有列將按字典順序排在這裡列出的欄位之後。',
    time_interval: '在上傳前將事件聚合到單個物件中的時間量。',
    content:
      "要儲存的物件的內容。預設情況下，它是包含所有欄位的 JSON 文本格式。支援如 ${'{'}payload{'}'} 的佔位符設定。儲存格式取決於變數的格式，支援二進位制內容。",
    blob: 'Azure Blob Storage blob 名稱。',
    parameters_container: 'Azure Blob Storage 容器名稱。',
  },
  snowflake: {
    database: '包含 Snowflake 資源的資料庫名稱。',
    schema: '包含 Snowflake 資源的模式名稱。',
    stage: '用於將資料檔案載入到 Snowflake 的 Stage 名稱。',
    pipe: '用於將資料攝取到表中的 Pipe 名稱。',
  },
  snowflake_streaming: {
    schema: '包含 Snowflake 資源的模式名稱。',
    pipe: '用於將資料匯入表的管道名稱。',
  },
  tablestore: {
    probe_table_name:
      '用於健康檢查連線性的已有時序表名稱。未設定時，健康檢查將回退到列出所有時序表。',
    isint: '是否嘗試將數值寫為整數。預設為 false，表示將整數寫為浮點數。',
    isbinary: '是否嘗試將二進位制值寫為二進位制類型。預設為 false，表示將二進位制值寫為字串。',
  },
  disk_log: {
    filepath:
      '待寫入日誌檔案的基礎路徑。實際日誌檔案採用 `filepath.N` 格式，其中 `N` 的範圍為 `1..max_file_number`。啟用基於時間的輪轉（`rotation.period`）後，目前週期的日期標記還會插入副檔名之前：例如 `filepath = /var/log/emqx/mqtt-trace.log` 時，檔名為 `mqtt-trace-2026062400.log.N`。可透過最近修改時間確定目前使用的檔案。包含該檔案的目錄必須允許 EMQX 應用使用者寫入，因為目錄中還會包含以 `.siz` 和 `.idx` 結尾的內部檔案。',
    max_file_size:
      '目前活動日誌檔案的最大大小。每個日誌檔案至少會寫入一條記錄，因此如果單條日誌記錄超過此值，最終檔案大小可能會超過此最大值。',
    max_file_number:
      '使用的最大日誌檔案數量。啟用基於時間的輪轉（`rotation.period`）後，此限制分別應用於每個輪轉週期的檔案集。達到最大檔案數量且需要再次輪轉時，最舊檔案的內容會被丟棄，該檔案將作為新的目前檔案重複使用。',
    rotation:
      '用於在日或小時等日曆週期的邊界輪轉到一組新的日誌檔案，將週期日期編碼到檔名中，並清理舊週期的檔案。',
    rotation_period:
      '輪轉週期選擇**每天**（`day`）或**每小時**（`hour`）時，連接器會在每個週期邊界啟動一組新的日誌檔案，並將週期日期標記（`YYYYMMDDHH`）插入副檔名之前。例如 `filepath = /var/log/emqx/mqtt-trace.log` 時，**每小時**輪轉的檔名為 `mqtt-trace-2026062413.log.N`，**每天**輪轉的檔名為 `mqtt-trace-2026062400.log.N`（每日標記的小時固定為 `00`，因此之後切換輪轉週期時檔名格式保持不變）。`.N` 字尾中的 `N` 範圍為 `1..max_file_number`，由底層迴圈日誌生成且始終存在；每個週期的檔案集還包含 `.idx` 和 `.siz` 管理檔案。一個週期內仍會按大小（`max_file_size`）輪轉，因此應根據最壞情況下單個週期的資料量設定 `max_file_size × max_file_number`，避免週期內迴圈覆寫導致資料遺失。連接器在健康檢查時檢測週期邊界，所以新週期檔案會在邊界後的一個 `health_check_interval` 內出現。選擇**僅按檔案大小輪轉**（`none`，預設值）時，不啟用基於時間的輪轉。',
    rotation_retention_period:
      '上一輪轉週期的檔案保留時長。每次週期輪轉後，早於此時長的帶日期標記日誌檔案會被刪除，包括對應的 `.idx` 和 `.siz` 管理檔案。預設值 `infinity` 表示永久保留。當輪轉週期選擇**僅按檔案大小輪轉**（`none`）時，此設定不生效。',
    rotation_timezone:
      '用於確定週期邊界和日期標記的時區。可設定為 `UTC`（預設值）、`local`（伺服器本地時間）或 `+02:00` 等固定 UTC 偏移量。',
    write_mode: '同步或非同步寫入日誌到磁碟。',
    template: '寫入的 JSON 物件的內容。支援模板。',
  },
  s3tables: {
    s_3_client_transport_options_request_timeout:
      '向 S3 服務發起單次 HTTP 請求的最長等待時間，逾時後會重試或失敗。',
  },
  quasardb: {
    health_check_table:
      '在動作健康檢查中使用的表名。目前，無法直接從 SQL 中推斷表名。如果設定，此值將在 `SHOW TABLE <table>` 語句中用於在動作健康檢查期間探測表的存在。',
  },
  bigquery: {
    project_id: '如果設定，將覆寫從認證設定中提取的專案 ID。僅應用於目前動作。',
  },
  bigtable: {
    authentication_type: '用於連線 GCP 的認證方式。',
    instance_id:
      'Bigtable 實例識別碼。請填寫 `myinst` 這樣的簡單 ID，而不是 `projects/.../instances/...` 這樣的完整識別碼。',
    table_id:
      'Bigtable 表識別碼。請填寫 `mytable` 這樣的簡單 ID，而不是 `projects/.../instances/.../tables/...` 這樣的完整識別碼。',
    row_key: '包含訊息行鍵的欄位名。',
    mutations: '對單條接收訊息執行的單元格變更列表。',
    type: 'Set Cell 變更。',
    family_name: '包含變更列族的欄位名。',
    column_qualifier: '包含變更列限定符的欄位名。',
    timestamp_micros: '包含變更時間戳（微秒）的欄位名。',
    value: '包含變更值的欄位名。',
  },
  emqx_tables: {
    ciphers:
      '此設定儲存由逗號分隔的 TLS 密碼套件名稱。支援的套件如下\n- TLS_AES_256_GCM_SHA384\n- TLS_AES_128_GCM_SHA256\n- TLS_CHACHA20_POLY1305_SHA256\n- TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384\n- TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256\n- TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384\n- TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
  },
  dameng: {
    dsn: 'odbc.ini 中設定的 ODBC 資料來源名稱。設定後將忽略伺服器地址、連接埠、驅動和字元集；使用者名稱和密碼留空時使用 DSN 中的憑據。',
    server:
      '達夢 DM8 伺服器的 IP 地址或主機名，可包含連接埠（host:port）。未設定 ODBC DSN 時必填。',
    port: '達夢 DM8 伺服器連接埠，在伺服器地址未包含連接埠時使用。設定 ODBC DSN 後忽略此項。',
    driver:
      'odbcinst.ini 中註冊的 ODBC 驅動名稱（例如 DM8 ODBC DRIVER），或 EMQX 節點上驅動庫的絕對路徑。設定 ODBC DSN 後忽略此項。',
    username: '未設定 ODBC DSN 時預設為 SYSDBA；設定 DSN 時留空可使用 DSN 中設定的使用者名稱。',
    charset: '傳遞給 ODBC 連線的字元集。設定 ODBC DSN 後忽略此項。',
    ssl_path:
      '每個 EMQX 節點上的憑證目錄，包含 ca-cert.pem；雙向 TLS 還需 client-cert.pem 和 client-key.pem。僅在 DM8 伺服器啟用加密時需要，由 DM8 ODBC 驅動讀取檔案並完成 TLS 握手。',
    ssl_pwd: 'SSL 憑證目錄中用戶端加密私鑰的密碼；私鑰未加密時可留空。',
    sql: '僅支援 INSERT SQL 模板，必須明確列出目標列，並在 VALUES 中使用佔位符。單條與批次寫入均使用參數繫結，請勿手動給佔位符加引號或轉義。',
  },
  zerobus: {
    zerobus_endpoint: 'Databricks Zerobus 資料攝入服務端點，必須指定連接埠號。',
    authentication: '用於 Databricks 工作區認證的 OAuth 2.0 用戶端憑據。',
    workspace_id: 'Zerobus 使用的 Databricks 工作區 ID。',
    workspace_url: 'Databricks 工作區 URL，EMQX 使用它構造認證端點。',
    client_id: '用於工作區認證的 OAuth 用戶端 ID。',
    client_secret: '用於工作區認證的 OAuth 用戶端金鑰。',
    authentication_timeout: '請求認證權杖的逾時時間。',
    authentication_ssl: '連線認證端點時使用的 TLS 設定。',
    ssl: '連線 Zerobus 資料攝入服務時使用的 TLS 設定。',
    transport: '連線 Zerobus 使用的傳輸類型。gRPC 支援 JSON 和 Protobuf，REST 僅支援 JSON。',
    transport_connect_timeout: '建立 Zerobus 連線的逾時時間。',
    transport_pool_size: 'Zerobus 連線池中的連線數。',
    transport_pipelining: 'REST 連線上無需等待回應即可連續傳送的 HTTP 請求數量上限。',
    transport_max_inactive: 'REST 連線空閒多久後關閉。',
    catalog: '目標表所屬的目錄名稱。',
    schema: '目標表所屬的模式名稱。',
    table: 'Databricks 中的目標表名稱。',
    record:
      '傳送到 Zerobus 的記錄格式。REST 傳輸僅支援 JSON；Protobuf 需要在 Schema Registry 中註冊對應的 Schema。',
    schema_name: 'EMQX Schema Registry 中的 Protobuf Schema 名稱。',
    message_type: '編碼資料時使用的 Protobuf 訊息類型。',
  },
}
