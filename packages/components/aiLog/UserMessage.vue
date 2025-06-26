<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    content?: string
    messageAlign?: 'left' | 'right'
  }>(),
  { messageAlign: 'right' },
)

const roundedClass = computed(() => {
  if (props.messageAlign === 'right') {
    return `rounded-br-none`
  }
  return `rounded-bl-none`
})
</script>

<template>
  <div class="user-message inline-flex justify-end px-4 py-3 rounded-lg" :class="roundedClass">
    <template v-if="!$slots.default">
      {{ content }}
    </template>
    <slot />
  </div>
</template>
