import { StreamOperation, StreamPermission, StreamResourceType } from '@emqx/shared-ui-constants'
import { useLocale } from '@emqx/shared-ui-utils'
import { computed } from 'vue'

export default (lang: string) => {
  const { t } = useLocale(lang)

  const permissionOptions = computed(() => {
    return [
      {
        label: t('streaming.allow'),
        value: StreamPermission.Allow,
      },
      {
        label: t('streaming.deny'),
        value: StreamPermission.Deny,
      },
    ]
  })
  const resourceTypeOptions = computed(() => {
    return [
      {
        label: t('acl.topic'),
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
  })
  const operationOptions = computed(() => {
    return Object.values(StreamOperation).map((value) => {
      return {
        label: t(`streaming.aclOperationLabelDic.${value}`),
        value,
      }
    })
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
    const list = validOperationMap[resourceType]
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
