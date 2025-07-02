import { createRandomString } from '@emqx/shared-ui-utils'
import {
  type FunctionItem,
  type FunctionFormType,
  EditedWay,
  FilterItem,
  FilterLogicalOperator,
  FilterFormType,
} from '../types'

export const createFilterItem = (): FilterItem => ({
  field: '',
  operator: '',
  valueForComparison: '',
})

export const createFilterFormData = (): {
  groupOperator: FilterLogicalOperator
  id: string
  items: Array<FilterItem>
} => ({
  groupOperator: FilterLogicalOperator.And,
  id: createRandomString(),
  items: [createFilterItem()],
})

export const createFilterForm = (): FilterFormType => ({
  editedWay: EditedWay.Form,
  sql: '',
  form: createFilterFormData(),
})

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
