export const zhConnectorsLabel: Record<string, Record<string, string>> = {
  kafka_producer: {
    bootstrap_hosts: '主机列表',
    connect_timeout: '连接超时',
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
}
