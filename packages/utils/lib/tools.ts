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
