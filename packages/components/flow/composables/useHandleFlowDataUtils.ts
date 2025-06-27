import { useRuleFunc, numberArgTypes } from './useRuleFunc'
import { type FunctionFormType, type FunctionItem, ArgumentType, EditedWay } from '../types'

export const useHandleFlowDataUtils = (): {
  getFuncExpressionFromForm: (funcForm: FunctionFormType) => string
  getFuncExpressionFromFuncList: (funcList: Array<FunctionItem>) => string
} => {
  /* FUNCTION */
  const { getFuncItemByName } = useRuleFunc()
  const getExpressionFromFunctionItem = (
    {
      name,
      args,
    }: {
      name: string
      args: Array<string | number>
    },
    field: string,
  ): string => {
    const argsStr = args.reduce((result, argItem, index) => {
      if (argItem === '' || argItem === undefined) {
        return result
      }
      const funcItem = getFuncItemByName(name)
      const argInfo = funcItem?.args[index]
      const isStringType =
        argInfo?.type === ArgumentType.String ||
        (argInfo?.type === ArgumentType.Enum &&
          typeof argInfo?.optionalValues?.find((enumItem) => enumItem === argItem) === 'string')
      const isNumType = argInfo?.type && numberArgTypes.includes(argInfo?.type)
      let argResult = argItem
      if (argItem !== field) {
        if (isStringType) {
          argResult = `'${argItem}'`
        } else if (isNumType && Number(argItem).toString() === argItem) {
          argResult = Number(argItem)
        }
      }
      return result ? `${result}, ${argResult}` : `${argResult}`
    }, '')
    return `${name}(${argsStr})`
  }

  const getFuncExpressionFromFormItem = (formItem: FunctionItem) => {
    const { field, func, alias } = formItem
    const selection = func.name ? getExpressionFromFunctionItem(func, field) : field
    const aliasStr = alias ? ` as ${alias}` : ''
    return selection + aliasStr
  }

  const getFuncExpressionFromFuncList = (funcList: Array<FunctionItem>) => {
    return funcList.reduce((str: string, item: FunctionItem) => {
      const currentExpression = getFuncExpressionFromFormItem(item)
      return str ? `${str}, ${currentExpression}` : currentExpression
    }, '')
  }

  const getFuncExpressionFromForm = (formData: FunctionFormType) => {
    const { editedWay, form, sql } = formData
    if (editedWay === EditedWay.SQL) {
      return sql
    }
    return getFuncExpressionFromFuncList(form)
  }

  return {
    getFuncExpressionFromForm,
    getFuncExpressionFromFuncList,
  }
}
