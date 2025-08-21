import { createRandomString } from '@emqx/shared-ui-utils'
import {
  AIProviderType,
  ANTHROPIC_VERSION_MAP,
  EditedWay,
  FilterLogicalOperator,
  FrontendSinkType,
  FrontendSourceType,
  GEMINI_DEFAULT_BASE_URL,
  ProcessingType,
} from '@emqx/shared-ui-constants'
import { isObject } from 'lodash'
import type {
  FunctionItem,
  FunctionFormType,
  FilterItem,
  FilterFormType,
  FilterFormData,
  OutputItemObj,
} from '../types'

export const createMessageForm = (topic = ''): { topic: string } => ({ topic })
export const createEventForm = (event = ''): { event: string } => ({ event })

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

export const createAICommonForm = () => ({
  api_key: '',
  system_prompt: '',
  input: '',
  base_url: '',
  name: `flow_ai_${createRandomString(4)}`,
})
export const createAIOpenAIForm = () => ({
  type: AIProviderType.OpenAI,
  model: 'gpt-4o',
  ...createAICommonForm(),
})
export const createAIAnthropicForm = () => ({
  type: AIProviderType.Anthropic,
  model: 'claude-3-5-sonnet-20240620',
  ...createAICommonForm(),
  anthropic_version: ANTHROPIC_VERSION_MAP['2023-06-01'],
  max_tokens: 100,
})

export const createAIGeminiForm = () => ({
  // FIXME: Gemini is currently under OpenAI type
  type: AIProviderType.OpenAI,
  model: 'gemini-2.0-flash',
  ...createAICommonForm(),
  base_url: GEMINI_DEFAULT_BASE_URL,
})

export const createRePubForm = (): OutputItemObj => ({
  function: 'republish',
  args: {
    topic: '',
    qos: 0,
    payload: '',
    retain: false,
    mqtt_properties: {},
    user_properties: '',
  },
})

export const createConsoleForm = (): OutputItemObj => ({ function: 'console' })

/**
 *  If you are using a schema bridge, create an empty object directly
 */
export const emptyCreator = () => ({})

const checkALevelFormIsEmpty = (form: Record<string, any>): boolean => {
  const keys = Object.keys(form)
  return keys.every((key): boolean => {
    const val = form[key]
    if (Array.isArray(val)) {
      return val.length === 0
    }
    if (isObject(val)) {
      if (Object.keys(val).length === 0) {
        return true
      }
      return checkALevelFormIsEmpty(val)
    }
    return val === undefined || val === ''
  })
}

const checkFilterFormDataIsEmpty = (form: FilterFormData): boolean => {
  return form.items.every((filter) => {
    if ('items' in filter) {
      return checkFilterFormDataIsEmpty(filter)
    }
    return checkALevelFormIsEmpty(filter)
  })
}

const checkFilterFormIsEmpty = (data: FilterFormType): boolean => {
  const { editedWay, form, sql } = data
  if (editedWay === EditedWay.Form) {
    return checkFilterFormDataIsEmpty(form)
  }
  return !sql
}

export default (): {
  getCommonFormDataByType: (type: string) => Record<string, any>
  checkFormIsEmpty: (
    type: string,
    form: Record<string, any>,
    needCheckTypes?: Array<string>,
  ) => boolean
} => {
  const formDataCreatorMap: Record<string, any> = {
    [FrontendSourceType.Message]: createMessageForm,
    [FrontendSourceType.Event]: createEventForm,
    [ProcessingType.Filter]: createFilterForm,
    [ProcessingType.Function]: createFunctionForm,
    [FrontendSinkType.Republish]: createRePubForm,
    [FrontendSinkType.Console]: createConsoleForm,
    [ProcessingType.AIOpenAI]: createAIOpenAIForm,
    [ProcessingType.AIAnthropic]: createAIAnthropicForm,
    [ProcessingType.AIGemini]: createAIGeminiForm,
  }

  const getCommonFormDataByType = (type: string) => {
    const func = formDataCreatorMap[type] || emptyCreator
    return func()
  }

  /**
   * Only check for types where the form may be empty
   */
  const typesFormNeedCheck: Array<string> = [
    FrontendSourceType.Message,
    FrontendSourceType.Event,
    ProcessingType.Filter,
    ProcessingType.Function,
  ]
  const checkFormIsEmpty = (
    type: string,
    form: Record<string, any>,
    needCheckTypes: Array<string> = typesFormNeedCheck,
  ) => {
    if (!isObject(form) || !needCheckTypes.includes(type)) {
      return false
    }
    if (type === ProcessingType.Filter) {
      return checkFilterFormIsEmpty(form as FilterFormType)
    }
    return checkALevelFormIsEmpty(form)
  }

  return {
    getCommonFormDataByType,
    checkFormIsEmpty,
  }
}
