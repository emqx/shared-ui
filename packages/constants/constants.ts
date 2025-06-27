export const STREAMING_MATCH_ALL = '*'
export const STREAMING_CLUSTER_NAME = 'kafka-cluster'

export const correctAliasALevelReg = /([_a-zA-Z]\w*|".+")/
export const correctAliasReg = new RegExp(
  `^${correctAliasALevelReg.source}(\\.${correctAliasALevelReg.source})*$`,
)
export const DEFAULT_SELECT = '*'
