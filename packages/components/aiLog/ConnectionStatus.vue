<script setup lang="ts">
import { CircleCloseFilled, Setting, WarningFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useAILogLocale } from './composables/useAILogLocale'
import type { CustomConnectionStatus } from './types'

const props = defineProps<{
  statusData: CustomConnectionStatus
}>()

const emit = defineEmits<(e: 'open-settings', openConfigDialog?: boolean) => void>()

const { t } = useAILogLocale()

const isNoConfig = computed(() => !props.statusData.is_configured)
const isDisconnected = computed(
  () => !props.statusData.connected || props.statusData.server_count === 0,
)

const showAlert = computed(() => isNoConfig.value || isDisconnected.value)
const statusText = computed(() => {
  if (isNoConfig.value) {
    return t('aiLog.noConfigStatus')
  }
  if (isDisconnected.value) {
    return t('aiLog.disconnectedStatus')
  }
  return ''
})
const isError = computed(() => isDisconnected.value)
const alertType = computed(() => (isNoConfig.value ? 'warning' : 'error'))

const openSettings = () => {
  emit('open-settings', isNoConfig.value)
}
</script>

<template>
  <div class="flex">
    <!-- TODO: move class to override -->
    <el-alert
      v-if="showAlert"
      class="border rounded-button bg-white"
      :type="alertType"
      :closable="false"
    >
      <div class="flex justify-between items-center gap-4">
        <div class="flex gap-2 items-center">
          <el-icon>
            <CircleCloseFilled v-if="isError" />
            <WarningFilled v-else />
          </el-icon>
          <span class="text-xs">
            {{ statusText }}
          </span>
        </div>
        <el-button link @click="openSettings">
          <el-icon :size="16"><Setting /></el-icon>
        </el-button>
      </div>
    </el-alert>
  </div>
</template>

<style lang="scss"></style>
