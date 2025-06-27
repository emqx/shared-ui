<script setup lang="ts">
defineProps<{
  code?: string | Record<any, any>
  noWrap?: boolean
}>()
</script>

<template>
  <div class="shared-bg-gray-content px-6 py-3 shared-rounded-card mb-2">
    <template v-if="!$slots.default">
      <pre class="whitespace-pre-wrap break-all" v-if="!noWrap">{{ code }}</pre>
      <pre class="truncate" v-else>{{ code }}</pre>
    </template>
    <slot></slot>
  </div>
</template>
