export const zhConnectorsLabel: Record<string, Record<string, string>> = {
  common: {
    connect_timeout: '连接超时',
  },
  kafka_producer: {
    bootstrap_hosts: '主机列表',
    min_metadata_refresh_interval: '元数据刷新最小间隔',
    metadata_request_timeout: '元数据请求超时',
    tcp_keepalive: 'TCP Keepalive',
    sndbuf: 'Socket 发送缓存大小',
    recbuf: 'Socket 收包缓存大小',
    nodelay: '是否关闭延迟发送',
    kerberos_principal: 'Kerberos Principal',
    kerberos_keytab_file: 'Kerberos keytab 文件',
    mechanism: '认证方法',
    username: '用户名',
    password: '密码',
  },
  http: {
    url: 'URL',
    headers: '请求头',
    enable_pipelining: 'HTTP 管道',
    pool_size: '连接池大小',
    pool_type: '连接池类型',
  },
}
