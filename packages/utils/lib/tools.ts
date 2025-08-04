import {
  aiExpressionPartReg,
  BridgeType,
  isForeachReg,
  RULE_INPUT_BRIDGE_TYPE_PREFIX,
} from '@emqx/shared-ui-constants'

export const waitAMoment = (ms = 100): Promise<boolean> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

const ZERO_ASCII = 48
const LOWER_A_ASCII = 97
const charLib = String.fromCharCode(
  ...new Array(10)
    .fill(ZERO_ASCII)
    .map((item, index) => item + index)
    .concat(new Array(26).fill(LOWER_A_ASCII).map((item, index) => item + index)),
)

export const createRandomString = (length = 8) => {
  const libLength = charLib.length
  return new Array(length).fill('').reduce((str) => {
    const randomIndex = Math.floor(Math.random() * libLength)
    return str + charLib.substring(randomIndex, randomIndex + 1)
  }, '')
}

export const trimSpacesAndLFs = (input: string): string =>
  input?.replace(/(^\s+)|(\s+$)/g, '').replace(/(^\n+)|(\n+$)/g, '')

/**
 * do not support single/double quote and bracket
 */
export const splitOnSymbol = (input: string, symbol: string): string[] => {
  const bracketStack: Array<string> = []
  let quoteFlag = false
  let doubleQuoteFlag = false
  const output = ['']

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i]

    if (currentChar === '(') {
      bracketStack.push(currentChar)
    } else if (currentChar === ')') {
      if (bracketStack.length > 0) {
        bracketStack.pop()
      }
    } else if (currentChar === "'") {
      quoteFlag = !quoteFlag
    } else if (currentChar === '"') {
      doubleQuoteFlag = !doubleQuoteFlag
    } else if (
      currentChar === symbol &&
      bracketStack.length === 0 &&
      !quoteFlag &&
      !doubleQuoteFlag
    ) {
      output.push('')
      continue
    }

    output[output.length - 1] += currentChar
  }

  return output
}

export const splitOnComma = (input: string): string[] => {
  // empty string ''
  if (!input) {
    return []
  }
  return splitOnSymbol(input, ',')
}

export const ruleSelectionAliasPartReg = /\sas\s(\S+)/
const ruleSelectionAliasReg = new RegExp(`.+${ruleSelectionAliasPartReg.source}`)
export const getRuleSelectionAlias = (selection: string): string | undefined => {
  const withAlias = ruleSelectionAliasReg.test(selection)
  if (withAlias) {
    const [, alias = ''] = selection.match(ruleSelectionAliasReg) || []
    return alias
  }
  return undefined
}

const ruleSelectionWithFunc = /^\w+\((.|\n)+\)$/
export const judgeRuleSelectionWithFunc = (selection: string): boolean =>
  ruleSelectionWithFunc.test(selection)

export const numToFixed = (number: number, digits = 3): number => parseFloat(number.toFixed(digits))
/**
 * will change original arr
 */
export const removeFromArr = <T>(arr: Array<T>, index: number): Array<T> => {
  arr.splice(index, 1)
  return arr
}

/**
 * the title -> The Title
 */
export const titleCase = (str: string): string => {
  return str.replace(/(^[a-z])|(\s[a-z])/g, (a: string) => {
    return a.toUpperCase()
  })
}

const keyReg = /^(?<type>\w+):(?<name>.+)$/
/**
 * for connector, action and bridge
 */
export const getTypeAndNameFromKey = (key: string): { type: BridgeType; name: string } => {
  const matchResult = key.match(keyReg)
  if (!matchResult) {
    throw new Error('invalid key')
  }
  const { type, name } = matchResult.groups || {}
  return {
    type: type as BridgeType,
    name,
  }
}

export const getBridgeIdFromInput = (input: string) =>
  input.replace(RULE_INPUT_BRIDGE_TYPE_PREFIX, '')
export const getBridgeTypeFromId = (id: string): string => getTypeAndNameFromKey(id).type
export const getBridgeNameFromId = (id: string): string => getTypeAndNameFromKey(id).name

/**
 * Compared with the `getKeywordsFromSQL` below, the difference is that when a value cannot be obtained here, it returns undefined.
 */
const notInQuoteReg = /(?:[^"']|"[^"]*"|'[^']*')/
const normalSQLReg = new RegExp(
  `^SELECT(?<select>${notInQuoteReg.source}+?)[\\s\\n]FROM(?<from>${notInQuoteReg.source}+)`,
  'i',
)
const withConditionSQLReg = new RegExp(
  `${normalSQLReg.source}([\\s\\n]WHERE(?<where>${notInQuoteReg.source}+))`,
  'i',
)
export const getKeyPartsFromSQL = (sqlStr: string) => {
  const sql = sqlStr.trim()
  let fieldStr = undefined
  let fromStr = undefined
  let whereStr = undefined
  let matchResult = null

  if (isForeachReg.test(sql)) {
    matchResult = sql.match(/(?<foreach>(.|\n)+)FROM(?<from>(.|\n)+)/)
  } else {
    matchResult = sql.match(withConditionSQLReg) || sql.match(normalSQLReg)
  }
  if (matchResult) {
    const { groups } = matchResult
    const { foreach = '', select = '', from = '', where = '' } = groups || {}
    fieldStr = foreach ? foreach : select.trim()
    fromStr = from.trim()
    if (where) {
      whereStr = where.trim()
    }
  }
  return {
    fieldStr,
    fromStr,
    whereStr,
  }
}

export const isContainsAIExpression = (sql: string) => aiExpressionPartReg.test(sql)

export const getBridgeKey = ({ type, name }: { type: string; name: string } & unknown): string =>
  `${type}:${name}`

export const checkNeedRequestAPI = (isChanged?: boolean) => isChanged || isChanged === undefined

interface SQLKeywords {
  fieldStr: string
  fromStr: string
  whereStr: string
}
/**
 * If there is FOREACH in the SQL statement
 * put the FOREACH and the following statements into the SELECT
 */
export const getKeywordsFromSQL = (sqlStr: string): SQLKeywords => {
  const { fieldStr = '', fromStr = '', whereStr = '' } = getKeyPartsFromSQL(sqlStr)
  return {
    fieldStr,
    fromStr,
    whereStr,
  }
}
