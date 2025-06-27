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
