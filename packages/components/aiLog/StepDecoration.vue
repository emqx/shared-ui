<script setup lang="ts">
import { CircleCheckFilled } from '@element-plus/icons-vue'
defineProps<{
  iconClass?: string
}>()
</script>

<template>
  <div class="step-line shrink-0 py-0.5 leading-none">
    <el-icon :class="iconClass" :size="16"><CircleCheckFilled /></el-icon>
  </div>
</template>

<style lang="scss" scoped>
.step-line {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 48%;
    top: 18px;
    display: block;
    height: calc(100% - 8px);
    width: 1px;
    // TODO: Configurable line color
    border-left: 1px dashed var(--shared-color-text-tip);
  }
}
</style>
