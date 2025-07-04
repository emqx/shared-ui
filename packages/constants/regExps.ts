import { AI_FUNCTION_NAME } from './constants'

export const correctAliasALevelReg = /([_a-zA-Z]\w*|".+")/
export const correctAliasReg = new RegExp(
  `^${correctAliasALevelReg.source}(\\.${correctAliasALevelReg.source})*$`,
)
export const aiExpressionPartReg = new RegExp(
  `${AI_FUNCTION_NAME}\\('(?<name>.+)'\\,\\s*(?<input>.+)\\)\\s+AS\\s+(?<alias>.+)`,
  'i',
)
export const isForeachReg = /^FOREACH/i
