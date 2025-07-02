export enum FilterLogicalOperator {
  And = 'and',
  Or = 'or',
}

export enum ArgumentType {
  Number = 'number',
  Any = 'any',
  Float = 'float',
  Integer = 'integer',
  String = 'string',
  Enum = 'enum',
  Object = 'object',
  Array = 'array',
  Binary = 'binary',
}

export type FetchSuggestionsCallback = (result: Array<{ value: string }>) => void

export interface FunctionItem {
  id: string
  field: string
  func: {
    name: string
    args: Array<string | number>
  }
  alias: string
}

export enum EditedWay {
  Form,
  SQL,
}

export type FunctionFormType = {
  editedWay: EditedWay
  form: Array<FunctionItem>
  sql: string
}

export interface FilterItem {
  field: string
  operator: string
  valueForComparison: string | number
}

export interface FilterFormData {
  groupOperator: FilterLogicalOperator
  // It can be used as the ID attribute for list elements, and can be used to
  // identify the source list and target list after a drag-and-drop operation.
  id: string
  items: Array<FilterItem | FilterFormData>
}

export interface FilterFormType {
  editedWay: EditedWay
  sql: string
  form: FilterFormData
}
