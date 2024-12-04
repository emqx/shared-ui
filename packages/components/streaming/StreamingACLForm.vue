<template>
  <el-form ref="FormCom" :model="record" label-position="top">
    <el-form-item prop="principal_name" :label="t('common.username')">
      <el-input v-model="record.principal_name" :disabled="matchAllUsers">
        <template #prepend>
          <el-select
            class="prepend-select"
            v-model="record.principal_name_type"
            @change="changeNameType"
          >
            <el-option :label="t('streaming.matchAll')" :value="StreamPatternType.All" />
            <el-option :label="t('streaming.literal')" :value="StreamPatternType.Literal" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="host" :label="tl('host')">
      <el-input v-model="record.host" :disabled="matchAllHost">
        <template #prepend>
          <el-select class="prepend-select" v-model="record.host_type" @change="changeHostType">
            <el-option :label="tl('matchAll')" :value="StreamPatternType.All" />
            <el-option :label="tl('literal')" :value="StreamPatternType.Literal" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="resource_type" :label="tl('aclResourceType')">
      <el-radio-group v-model="record.resource_type" @change="changeResourceType">
        <el-radio
          v-for="item in resourceTypeOptions"
          :key="item.value"
          :value="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="resource_name" :label="tl('aclResourceName')">
      <el-input v-model="record.resource_name" :disabled="matchAllResources || selectedCluster">
        <template #prepend>
          <el-select
            class="prepend-select"
            v-model="record.pattern_type"
            :disabled="selectedCluster"
            @change="changeResourcePattern"
          >
            <el-option :label="tl('matchAll')" :value="StreamPatternType.All" />
            <el-option :label="tl('literal')" :value="StreamPatternType.Literal" />
            <el-option :label="tl('prefixed')" :value="StreamPatternType.Prefixed" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="operation" :label="tl('aclOperation')">
      <el-select v-model="record.operation">
        <el-option
          v-for="item in getValidOperations(record.resource_type)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="permission" :label="t('common.access')">
      <el-radio-group v-model="record.permission">
        <el-radio
          v-for="item in permissionOptions"
          :key="item.value"
          :value="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  STREAMING_CLUSTER_NAME,
  STREAMING_MATCH_ALL,
  StreamOperation,
  StreamPatternType,
  StreamPermission,
  StreamResourceType,
} from '@emqx/shared-ui-constants'
import { useLocale, useStreamingAuth } from '@emqx/shared-ui-utils'
import { computed, ref } from 'vue'

interface StreamACL {
  principal_type: string
  principal_name: string
  host_type: StreamPatternType
  host: string
  resource_type: StreamResourceType
  pattern_type: StreamPatternType
  resource_name: string
  operation: StreamOperation
  permission: StreamPermission
  principal_name_type: StreamPatternType
}

const props = defineProps<{
  modelValue: StreamACL
  isEdit: boolean
  // TODO: try to optimize
  lang: 'en' | 'zh' | 'ja'
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: StreamACL): void
}>()

const { t } = useLocale(props.lang)
const tl = (key: string) => t(`streaming.${key}`)

const record = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const matchAllUsers = computed(() => record.value.principal_name_type === StreamPatternType.All)
const matchAllHost = computed(() => record.value.host_type === StreamPatternType.All)
const matchAllResources = computed(() => record.value.pattern_type === StreamPatternType.All)

const { permissionOptions, resourceTypeOptions, getValidOperations } = useStreamingAuth(props.lang)

const selectedCluster = computed(() => record.value.resource_type === StreamResourceType.Cluster)

const changeHostType = async () => {
  if (matchAllHost.value) {
    record.value.host = STREAMING_MATCH_ALL
  } else {
    record.value.host = ''
    clearSpecialValidate('host')
  }
}
const changeNameType = async () => {
  if (matchAllUsers.value) {
    record.value.principal_name = STREAMING_MATCH_ALL
  } else {
    record.value.principal_name = ''
    clearSpecialValidate('principal_name')
  }
}
const changeResourcePattern = async () => {
  if (matchAllResources.value) {
    record.value.resource_name = STREAMING_MATCH_ALL
  } else if (record.value.resource_name === STREAMING_MATCH_ALL) {
    record.value.resource_name = ''
    clearSpecialValidate('resource_name')
  }
}
const changeResourceType = () => {
  if (selectedCluster.value) {
    record.value.pattern_type = StreamPatternType.Literal
    record.value.resource_name = STREAMING_CLUSTER_NAME
  } else {
    record.value.pattern_type = StreamPatternType.All
    record.value.resource_name = STREAMING_MATCH_ALL
  }
  record.value.operation = StreamOperation.All
}

const clearSpecialValidate = (key: string) => {
  window.setTimeout(() => FormCom.value.clearValidate([key]))
}

const FormCom = ref()
const validate = () => {
  return FormCom.value.validate()
}

defineExpose({
  FormCom,
  validate,
})
</script>

<style lang="scss" />
