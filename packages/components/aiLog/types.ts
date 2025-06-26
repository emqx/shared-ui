export const enum MessageStatus {
  ParseUserIntention = 'parse_user_intention',
  LoadLogEntries = 'load_log_entries',
  GeneralConversation = 'general_conversation',
  ExtractAndExplainLogEntries = 'extract_and_explain_log_entries',
  QueryEmqxContext = 'query_emqx_context',
  GenAnalysisReport = 'gen_analysis_report',
  CompleteReport = 'complete_report',
}

export const enum MessageType {
  FuncCall = 'func_call',
  Message = 'message',
  Status = 'status',
  InputRequired = 'input_required',
  UserCancelled = 'cancelled',
  Error = 'error',
  PermissionRequest = 'permission_request',
}

export const enum ResponseStatus {
  Success = 'success',
  Error = 'error',
  EmptyUpdate = 'empty_update',
}

export const enum ConversationDataFrom {
  User = 'user',
  AI = 'ai',
}

export const enum UserConfirmation {
  Yes = 'yes',
  No = 'no',
}

export const enum ExecutionPermission {
  Deny = 'deny',
  AllowOnce = 'allow_once',
  AllowAlways = 'allow_always',
}

export interface GlobalConfig {
  mqtt_host?: string
  mqtt_port?: number
  mqtt_username?: string
  mqtt_password?: string
  mqtt_clientid?: string
}

export interface ConfigData {
  app_id: string
  mqtt_config: GlobalConfig
}

export interface MCPServer {
  server_name: string
  success: boolean
}

export interface ConnectionStatus {
  app_id: string
  connected: boolean
  server_count: number
}

export type CustomConnectionStatus = ConnectionStatus & {
  is_configured: boolean
}

export interface ResponseData<T> {
  status: ResponseStatus
  data: T
}

export type UserMessage = string

export interface AIResponseFuncCall {
  type: MessageType.FuncCall
  object: {
    tool_name: string
    tool_kwargs: Record<string, any>
    tool_output: string
  }
}

export interface AIResponseMessage {
  type: MessageType.Message
  message: string
}

export interface AIResponseStatus {
  type: MessageType.Status
  message: MessageStatus
}

export interface UserCancelledMessage {
  type: MessageType.UserCancelled
  message: MessageType.UserCancelled
}

export interface AIResponseError {
  type: MessageType.Error
  message: string
}

export interface AIResponseRequestPermission {
  type: MessageType.PermissionRequest
  permission_key: string
  id: string
}

export interface UnknownAIResponse {
  type: MessageType
}

export type AIResponseItem =
  | AIResponseFuncCall
  | AIResponseMessage
  | AIResponseStatus
  | UserCancelledMessage
  | AIResponseError
  | UnknownAIResponse

export interface ConversationUserData {
  from: ConversationDataFrom.User
  content: UserMessage
  timestamp: number
}

export interface ConversationAIData {
  from: ConversationDataFrom.AI
  content: AIResponseItem[]
}

export type ConversationDataItem = ConversationUserData | ConversationAIData

export interface ConfirmExecutionPermissionPayload {
  /**
   * from ai response
   */
  id: string
  /**
   * from ai response
   */
  permission_key: string
  granted_type: ExecutionPermission
}
