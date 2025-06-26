<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { isFunction } from 'lodash'
import { computed, ref } from 'vue'
import { useAILogLocale } from './composables/useAILogLocale'
import type { GlobalConfig } from './types'

const props = defineProps<{
  modelValue: boolean
  getConfig: () => Promise<GlobalConfig>
  updateConfig: (config: GlobalConfig) => Promise<any>
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'update'): void
}>()

const isDialogOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:model-value', value)
  },
})

const { t } = useAILogLocale()

const form = ref<GlobalConfig>({})

const createDefaultConfig = () => ({
  mqtt_host: 'localhost',
  mqtt_port: 1883,
})

const isLoading = ref(false)
const requestConfig = async () => {
  if (!props.getConfig || !isFunction(props.getConfig)) {
    ElMessage.error('No getConfig function provided')
    return
  }
  try {
    isLoading.value = true
    form.value = await props.getConfig()
  } catch (error: any) {
    if (error?.response?.status === 404) {
      form.value = createDefaultConfig()
    }
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const isSubmitting = ref(false)
const saveConfig = async () => {
  try {
    if (!props.updateConfig || !isFunction(props.updateConfig)) {
      ElMessage.error('No updateConfig function provided')
      return
    }
    isSubmitting.value = true
    await props.updateConfig(form.value)
    ElMessage.success(t('aiLog.saveSuccess'))
    isDialogOpen.value = false
    emit('update')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const defaultConfig: GlobalConfig = createDefaultConfig()
</script>

<template>
  <el-dialog
    v-model="isDialogOpen"
    :title="t('aiLog.mcpServerGatewayConfigs')"
    width="500"
    @open="requestConfig"
  >
    <el-form :model="form" v-loading="isLoading" label-position="top">
      <el-form-item :label="t('aiLog.mqttHost')">
        <el-input v-model="form.mqtt_host" :placeholder="defaultConfig.mqtt_host" />
      </el-form-item>
      <el-form-item :label="t('aiLog.mqttPort')">
        <el-input v-model="form.mqtt_port" :placeholder="defaultConfig.mqtt_port?.toString()" />
      </el-form-item>
      <el-form-item :label="t('aiLog.mqttUsername')">
        <el-input v-model="form.mqtt_username" />
      </el-form-item>
      <el-form-item :label="t('aiLog.mqttPassword')">
        <el-input
          v-model="form.mqtt_password"
          type="password"
          show-password
          autocomplete="one-time-code"
        />
      </el-form-item>
      <el-form-item :label="t('aiLog.mqttClientId')">
        <el-input v-model="form.mqtt_clientid" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="isDialogOpen = false">{{ t('aiLog.cancel') }}</el-button>
      <el-button type="primary" @click="saveConfig" :disabled="isLoading" :loading="isSubmitting">
        {{ t('aiLog.save') }}
      </el-button>
    </template>
  </el-dialog>
</template>
