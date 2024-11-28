import { StreamOperation, StreamPermission, StreamResourceType } from '@emqx/shared-ui-constants'
import { useLocale } from './useLocale'

export const useStreamingAuth = (lang: string) => {
  const { t } = useLocale(lang)

  const permissionOptions = [
    {
      label: t('streaming.allow'),
      value: StreamPermission.Allow,
    },
    {
      label: t('streaming.deny'),
      value: StreamPermission.Deny,
    },
  ]
  const resourceTypeOptions = [
    {
      label: t('common.topic'),
      value: StreamResourceType.Topic,
    },
    {
      label: t('streaming.consumerGroupType'),
      value: StreamResourceType.Group,
    },
    {
      label: t('streaming.clusterType'),
      value: StreamResourceType.Cluster,
    },
  ]
  const operationOptions = Object.values(StreamOperation).map((value) => {
    return {
      label: t(`streaming.aclOperationLabelDic.${value}`),
      value,
    }
  })

  const validOperationMap: Record<StreamResourceType, Array<StreamOperation>> = {
    [StreamResourceType.Topic]: [
      StreamOperation.All,
      StreamOperation.Read,
      StreamOperation.Write,
      StreamOperation.Describe,
      StreamOperation.Create,
      StreamOperation.Delete,
    ],
    [StreamResourceType.Group]: [
      StreamOperation.All,
      StreamOperation.Read,
      StreamOperation.Describe,
      StreamOperation.Delete,
    ],
    [StreamResourceType.Cluster]: [
      StreamOperation.All,
      StreamOperation.Read,
      StreamOperation.Describe,
      StreamOperation.Alter,
    ],
  }
  const getValidOperations = (resourceType: StreamResourceType) => {
    const list = validOperationMap[resourceType] || []
    return list.map((value) => {
      return {
        label: t(`streaming.aclOperationLabelDic.${value}`),
        value,
      }
    })
  }

  return {
    permissionOptions,
    resourceTypeOptions,
    operationOptions,
    getValidOperations,
  }
}
