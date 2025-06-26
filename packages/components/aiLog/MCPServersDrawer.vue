<script setup lang="ts">
import { Refresh, SuccessFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { isFunction } from 'lodash'
import { computed, ref } from 'vue'
import { useAILogLocale } from './composables/useAILogLocale'
import type { MCPServer } from './types'

const props = defineProps<{
  modelValue: boolean
  getMCPServers: () => Promise<Array<MCPServer>>
  connectMCPServer: (cluster: string) => Promise<any>
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'open-config-dialog'): void
  (e: 'update'): void
}>()

const { t } = useAILogLocale()

const isDrawerOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:model-value', value)
  },
})

const openConfigDialog = () => {
  emit('open-config-dialog')
}

const MCPServers = ref<MCPServer[]>([])
const isLoading = ref(false)
const requestMCPServers = async () => {
  if (!isFunction(props.getMCPServers)) {
    ElMessage.error('No getMCPServers function provided')
    return
  }
  try {
    isLoading.value = true
    MCPServers.value = await props.getMCPServers()
    record.value.selectedCluster =
      MCPServers.value.find(({ success }) => success)?.server_name ?? ''
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const FormRef = ref()
const rules = { selectedCluster: [{ required: true, message: t('aiLog.selectServerRequired') }] }

const record = ref<{ selectedCluster: string }>({ selectedCluster: '' })
const isSubmitting = ref(false)
const saveMCPServer = async () => {
  if (!isFunction(props.connectMCPServer)) {
    ElMessage.error('No connectMCPServer function provided')
    return
  }
  try {
    await FormRef.value.validate()
    isSubmitting.value = true
    await props.connectMCPServer(record.value.selectedCluster)
    ElMessage.success(t('aiLog.saveSuccess'))
    isDrawerOpen.value = false
    emit('update')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

defineExpose({ openConfigDialog })
</script>

<template>
  <el-drawer v-model="isDrawerOpen" @open="requestMCPServers">
    <div v-loading="isLoading">
      <div v-if="!MCPServers.length" class="flex flex-col items-center gap-4">
        <slot name="empty-placeholders"></slot>
        <p class="text-sm">{{ t('aiLog.noMCPServers') }}</p>
        <el-button type="primary" @click="openConfigDialog">
          {{ t('aiLog.configMCPServerGateway') }}
        </el-button>
      </div>
      <div v-else>
        <div class="flex justify-end mb-6">
          <el-button type="primary" @click="openConfigDialog">
            {{ t('aiLog.configMCPServerGateway') }}
          </el-button>
        </div>
        <el-card shadow="never">
          <el-form ref="FormRef" :model="record" :rules="rules" hide-required-asterisk>
            <fieldset class="flex items-center gap-2">
              <el-icon class="text-primary"><SuccessFilled /></el-icon>
              <el-form-item prop="selectedCluster" class="flex-1 mb-0">
                <el-select v-model="record.selectedCluster">
                  <el-option
                    v-for="server in MCPServers"
                    :key="server.server_name"
                    :label="server.server_name"
                    :value="server.server_name"
                  />
                </el-select>
              </el-form-item>
              <el-button link @click="requestMCPServers">
                <el-icon><Refresh /></el-icon>
              </el-button>
            </fieldset>
          </el-form>
        </el-card>
      </div>
    </div>
    <template #footer>
      <el-button @click="isDrawerOpen = false">{{ t('aiLog.cancel') }}</el-button>
      <el-button type="primary" @click="saveMCPServer" :loading="isSubmitting">
        {{ t('aiLog.save') }}
      </el-button>
    </template>
  </el-drawer>
</template>
