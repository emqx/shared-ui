import { FlowConnectionStatus } from '../types'
import { useFlowLocale } from './useFlowLocale'

export default (): {
  statusOptList: Array<{ value: FlowConnectionStatus; label: string }>
  statusLabelMap: Partial<Record<FlowConnectionStatus, string>>
  getActionStatusLabel: (status?: FlowConnectionStatus) => string
} => {
  const { t } = useFlowLocale()
  const statusLabelMap: Partial<Record<FlowConnectionStatus, string>> = {
    [FlowConnectionStatus.Connected]: t('flow.actionAvailable'),
    [FlowConnectionStatus.Disconnected]: t('flow.actionUnavailable'),
    [FlowConnectionStatus.Connecting]: t('flow.connecting'),
    [FlowConnectionStatus.Inconsistent]: t('flow.inconsistent'),
  }
  const statusOptList = (Object.entries(statusLabelMap) as [FlowConnectionStatus, string][]).map(
    ([key, value]) => ({
      value: key,
      label: value,
    }),
  )
  const getActionStatusLabel = (status?: FlowConnectionStatus) => {
    return status ? statusLabelMap[status] || t('flow.disconnected') : ''
  }

  return {
    statusLabelMap,
    statusOptList,
    getActionStatusLabel,
  }
}
