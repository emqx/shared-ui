export const enConnectorsLabel: Record<string, Record<string, string>> = {
  common: {
    connect_timeout: 'Connect Timeout',
  },
  kafka_producer: {
    bootstrap_hosts: 'Bootstrap Hosts',
    min_metadata_refresh_interval: 'Min Metadata Refresh Interval',
    metadata_request_timeout: 'Metadata Request Timeout',
    tcp_keepalive: 'TCP Keepalive',
    sndbuf: 'Socket Send Buffer Size',
    recbuf: 'Socket Receive Buffer Size',
    nodelay: 'No Delay',
    kerberos_principal: 'Kerberos Principal',
    kerberos_keytab_file: 'Kerberos keytab file',
    mechanism: 'Mechanism',
    username: 'Username',
    password: 'Password',
  },
  http: {
    url: 'URL',
    headers: 'Headers',
    enable_pipelining: 'HTTP Pipelining',
    pool_size: 'Connection Pool Size',
    pool_type: 'Pool Type',
  },
}
