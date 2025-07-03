<template>
  <BaseEdge :id="id" :style="style" :path="path[0]" :marker-end="markerEnd" v-bind="$attrs" />

  <EdgeLabelRenderer>
    <div
      v-show="data?.isHover"
      :style="{ transform: `translate(-50%, -95%) translate(${path[1]}px,${path[2]}px)` }"
      class="nodrag nopan btn-edge-del"
      @click="removeEdges(id)"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="deleteIcon">
        <el-icon :size="18"><Delete /></el-icon>
      </slot>
    </div>
  </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { ElIcon } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
import type { Position } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String as PropType<Position>,
    required: true,
  },
  targetPosition: {
    type: String as PropType<Position>,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['mouse-enter', 'mouse-leave'])

const { removeEdges } = useVueFlow()

const path = computed(() => getBezierPath(props))

const handleMouseEnter = () => emit('mouse-enter')

const handleMouseLeave = () => emit('mouse-leave')
</script>

<style lang="scss">
.btn-edge-del {
  position: absolute;
  z-index: 3;
  padding: 8px;
  cursor: pointer;
  pointer-events: all;
  svg {
    stroke-width: 2;
  }
  &:hover {
    svg {
      color: #5e4eff;
    }
  }
}
</style>
