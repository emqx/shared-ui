import { camelCase } from 'lodash'
import {
  AIResponseError,
  AIResponseFuncCall,
  AIResponseItem,
  AIResponseMessage,
  AIResponseRequestPermission,
  AIResponseStatus,
  MessageStatus,
  MessageType,
  UserCancelledMessage,
} from '../types'
import { useAILogLocale } from './useAILogLocale'

const useDisplayAIResponse = () => {
  const isStatusMessage = (msg: AIResponseItem): msg is AIResponseStatus =>
    msg.type === MessageType.Status
  const isFuncCallMessage = (msg: AIResponseItem): msg is AIResponseFuncCall =>
    msg.type === MessageType.FuncCall
  const isAnalysisResultMessage = (msg: AIResponseItem): msg is AIResponseMessage =>
    msg.type === MessageType.Message
  const isResponseConfirm = (msg: AIResponseItem) => msg.type === MessageType.InputRequired
  const isErrorMessage = (msg: AIResponseItem): msg is AIResponseError =>
    msg.type === MessageType.Error
  const isRequestPermission = (msg: AIResponseItem): msg is AIResponseRequestPermission =>
    msg.type === MessageType.PermissionRequest
  const isCancelledMessage = (msg: AIResponseItem): msg is UserCancelledMessage =>
    msg.type === MessageType.UserCancelled

  const { t } = useAILogLocale()
  const getStatusLabel = (status: MessageStatus) => {
    const key = camelCase(status)
    return t(`Base.${key}`)
  }

  const funcCallLabel = t('aiLog.funcCall')

  return {
    isStatusMessage,
    isFuncCallMessage,
    isAnalysisResultMessage,
    isResponseConfirm,
    isErrorMessage,
    isRequestPermission,
    isCancelledMessage,
    getStatusLabel,
    funcCallLabel,
  }
}

export default useDisplayAIResponse
