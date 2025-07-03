<template>
  <div class="custom-height-resizer" @mousedown="handleMouseDown">
    <slot name="icon"></slot>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    /**
     * Whether the resizer is forward or not
     */
    isForward?: boolean
  }>(),
  {
    min: 40,
  },
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'resize', value: number): void
}>()

let lastYPosition = 0

function setWidth(width: number) {
  emit('update:modelValue', width)
}

const resize = (event: MouseEvent) => {
  const max = props.max || Number.MAX_SAFE_INTEGER
  const offset = Math.floor(event.pageY) - lastYPosition
  let targetHeight = props.modelValue + (props.isForward ? offset : -offset)
  if (targetHeight <= props.min) {
    targetHeight = props.min
  } else if (targetHeight >= max) {
    targetHeight = max
  }
  setWidth(targetHeight)
  lastYPosition = Math.floor(event.pageY)
}

const handleMouseUp = () => {
  window.removeEventListener('mousemove', resize)
  window.removeEventListener('mouseup', handleMouseUp)
  emit('resize', props.modelValue)
}

const handleMouseDown = (event: MouseEvent) => {
  lastYPosition = Math.floor(event.pageY)
  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', handleMouseUp)
  event.preventDefault()
}

onUnmounted(() => {
  window.removeEventListener('mousemove', resize)
  window.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style lang="scss">
.custom-height-resizer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8px;
  z-index: 1;
  padding-left: 16px;
  padding-right: 16px;
  cursor: row-resize;
}
</style>
