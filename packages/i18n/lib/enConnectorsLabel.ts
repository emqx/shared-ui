export const enConnectorsLabel: Record<string, Record<string, string>> = {
  kafka_producer: {
    bootstrap_hosts: 'Bootstrap Hosts',
    connect_timeout: 'Connect Timeout',
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
}
