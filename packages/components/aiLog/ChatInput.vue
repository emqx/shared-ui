<script setup lang="ts">
import { Close, Position, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'

defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'send', content: string): void
  (e: 'stop' | 'open-settings'): void
}>()

const openMCPServersDrawer = () => {
  emit('open-settings')
}

const inputContent = ref('')
const sendMsg = () => {
  if (!inputContent.value) {
    return
  }
  emit('send', inputContent.value)
  inputContent.value = ''
}

const stopResponse = () => {
  emit('stop')
}
</script>

<template>
  <div class="chat-input">
    <fieldset class="relative chat-input flex flex-col">
      <div class="relative left-0 top-0 w-full input-container">
        <el-input
          type="textarea"
          :rows="5"
          v-model="inputContent"
          @keyup.enter="sendMsg"
          resize="none"
        />
      </div>
      <div
        class="chat-input-ft absolute left-px bottom-px flex justify-between bg-white shared-rounded-bl-card shared-rounded-br-card py-2 pl-3 pr-1"
      >
        <el-button link @click="openMCPServersDrawer">
          <el-icon :size="28"><Setting /></el-icon>
        </el-button>
        <!-- TODO: fill icon -->
        <el-button v-if="!isLoading" link @click="sendMsg">
          <el-icon :size="28"><Position /></el-icon>
        </el-button>
        <div v-else class="flex items-center gap-2">
          <el-button link @click="stopResponse">
            <el-icon :size="28"><Close /></el-icon>
          </el-button>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
.chat-input {
  box-shadow: 0px 4px 12px 0px rgba(136, 142, 191, 0.07);
  :deep(.el-textarea__inner) {
    border-radius: var(--shared-radius-card);
    border-color: var(--shared-color-border-input);
    padding: 16px 16px 32px;
  }
  .chat-input-ft {
    width: calc(100% - 10px);
  }
}
</style>
