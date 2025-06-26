<script setup lang="ts">
import { useAILogLocale } from './composables/useAILogLocale'
import UserMessage from './UserMessage.vue'

const emit = defineEmits<(e: 'select', sample: string) => void>()

const { t } = useAILogLocale()

const sampleLog =
  '2025-05-26T09:20:40.690493+08:00 [warning] clientid: meck_clientid, peername: 127.0.0.1:38499, username: username, pid: <0.20943.4>, reason: not_authorized, tag: AUTHN, msg: authentication_failure'

const samples = [
  t('aiLog.querySample3') + sampleLog,
  t('aiLog.querySample1'),
  t('aiLog.querySample2'),
]
</script>

<template>
  <div class="chat-guidance flex flex-col w-full">
    <p class="mb-6">{{ t('aiLog.guidanceText') }}</p>
    <div class="grid gap-4">
      <div class="flex" v-for="(sample, $index) in samples" :key="sample">
        <UserMessage class="cursor-pointer" message-align="left" @click="emit('select', sample)">
          <p :class="{ 'max-w-3xl truncate': $index === 0 }">{{ sample }}</p>
        </UserMessage>
      </div>
    </div>
  </div>
</template>
