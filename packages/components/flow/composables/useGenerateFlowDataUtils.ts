import { DEFAULT_SELECT } from '@emqx/shared-ui-constants'
import {
  trimSpacesAndLFs,
  splitOnComma,
  ruleSelectionAliasPartReg,
  getRuleSelectionAlias,
  judgeRuleSelectionWithFunc,
} from '@emqx/shared-ui-utils'
import { isUndefined } from 'lodash'
import type { FunctionItem } from '../types'
import { createFunctionItem } from './useNodeForm'
import { useRuleFunc, type ArgItem } from './useRuleFunc'

export const useGenerateFlowDataUtils = (): {
  generateFunctionFormFromExpression: (expression: string) => Array<FunctionItem> | undefined
} => {
  const { getFuncGroupByName, getFuncItemByName, getArgIndex } = useRuleFunc()

  /* FIELDS */
  const countArgsWhenLengthNotMatch = (
    functionParamTemplate: Array<ArgItem>,
    actualParams: Array<string>,
  ) => {
    let startIndex = -1
    return functionParamTemplate.map((item, index) => {
      if (item.required && startIndex < 0) {
        startIndex = index
      }
      const argIndex = index - startIndex
      return startIndex > -1 && actualParams[argIndex] !== undefined ? actualParams[argIndex] : ''
    })
  }

  /**
   * Because the subbits parameter is special, it is handled specially.
   * https://docs.emqx.com/en/enterprise/v5.1/data-integration/rule-sql-builtin-functions.html#bit-functions
   */
  const countActualArgsForSubbits = (actualParams: Array<string>): Array<string> => {
    return actualParams.length === 2 ? [actualParams[0], '', actualParams[1]] : actualParams
  }

  const strArgReg = /^'.*'$/
  const getFuncDataFromExpression = (
    expression: string,
  ): { field: string; func: { name: string; args: Array<string | number> } } | undefined => {
    const funcName = expression.slice(0, expression.indexOf('('))
    const funcGroup = getFuncGroupByName(funcName)
    const funcItem = getFuncItemByName(funcName)
    if (!funcGroup || !funcItem) {
      console.error(`can not find function ${funcName}`)
      return
    }
    const argIndex = getArgIndex(funcItem, funcGroup)
    const argsContent = expression.slice(expression.indexOf('(') + 1, expression.lastIndexOf(')'))
    let funcArgs = splitOnComma(argsContent).map((item) => item.trim())

    if (funcName === 'subbits') {
      funcArgs = countActualArgsForSubbits(funcArgs)
    }
    let argStrArr: Array<string> = []
    if (funcArgs.length !== funcItem.args.length) {
      argStrArr = countArgsWhenLengthNotMatch(funcItem.args, funcArgs)
    } else {
      argStrArr = funcArgs
    }
    const args = argStrArr.reduce(
      (result: Array<string | number>, argItem: string, index: number) => {
        const argInfo = funcItem.args?.[index]
        const isStringType =
          argInfo?.type === 'string' ||
          (argInfo?.type === 'enum' &&
            typeof argInfo?.optionalValues?.find(
              (enumItem) => enumItem === argItem.slice(1, -1),
            ) === 'string')
        const argResult = strArgReg.test(argItem) && isStringType ? argItem.slice(1, -1) : argItem
        result.push(argResult)
        return result
      },
      [],
    )
    return { func: { name: funcName, args }, field: argStrArr[argIndex].toString() }
  }

  const generateFunctionFormItemFromExpression = (expressionItem: string): FunctionItem => {
    const form = createFunctionItem()
    const alias = getRuleSelectionAlias(expressionItem)
    if (!isUndefined(alias)) {
      form.alias = alias
    }

    const selection = expressionItem.replace(ruleSelectionAliasPartReg, '')

    if (judgeRuleSelectionWithFunc(selection)) {
      const funcData = getFuncDataFromExpression(selection)
      if (funcData) {
        return { ...form, ...funcData }
      }
    }
    return { ...form, field: selection }
  }

  const generateFunctionFormFromExpression = (expression: string) => {
    if (trimSpacesAndLFs(expression) === DEFAULT_SELECT) {
      return
    }
    const expressionArr = splitOnComma(expression).map((item) => trimSpacesAndLFs(item))
    const formData = expressionArr.map((item) => generateFunctionFormItemFromExpression(item))
    return formData
  }

  return {
    generateFunctionFormFromExpression,
  }
}
