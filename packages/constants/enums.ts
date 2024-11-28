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
