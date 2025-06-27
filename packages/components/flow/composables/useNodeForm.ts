import { createRandomString } from '@emqx/shared-ui-utils'
import { type FunctionItem, type FunctionFormType, EditedWay } from '../types'

export const createFunctionItem = (): FunctionItem => ({
  id: createRandomString(),
  field: '',
  func: {
    name: '',
    args: [],
  },
  alias: '',
})

export const createFunctionForm = (): FunctionFormType => ({
  editedWay: EditedWay.Form,
  form: [createFunctionItem()],
  sql: '',
})
