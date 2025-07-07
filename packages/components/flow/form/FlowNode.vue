<template>
  <Handle
    v-if="data.type !== FlowNodeType.Input"
    type="target"
    :position="Position.Left"
    :class="{ 'is-error': isDisconnectedActionOrSource }"
  >
    <slot name="addIcon">
      <el-icon class="icon-add" :size="10"><Plus /></el-icon>
    </slot>
  </Handle>
  <div class="flow-node">
    <img :src="nodeIconSrc" alt="node-img" class="node-icon" :class="iconClass" />
    <div class="node-bd" :title="isAINode ? undefined : data.data.desc">
      <p class="label vertical-align-center">
        <span>
          {{ nodeLabel || data.label }}
        </span>
        <span class="extra" v-if="isDisconnectedActionOrSource">
          (<span class="status-label">{{ getActionStatusLabel(data?.data?.formData?.status) }}</span
          >)
        </span>
      </p>
      <p class="desc" v-if="!isAINode">
        {{ data.data.desc }}
      </p>
      <template v-else-if="data.data.desc">
        <component :is="overflowTooltipComponent" :content="data.data.desc" class="desc" />
      </template>
    </div>
  </div>
  <Handle
    v-if="showSourceHandle"
    type="source"
    :position="Position.Right"
    :class="{ 'is-error': isDisconnectedActionOrSource }"
  >
    <slot name="addIcon">
      <el-icon class="icon-add" :size="10"><Plus /></el-icon>
    </slot>
  </Handle>
</template>

<script setup lang="ts">
import { Component, computed, PropType } from 'vue'
import { ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { Handle, Position, type Node } from '@vue-flow/core'
import { FlowConnectionStatus, FlowNodeType } from '@emqx/shared-ui-constants'
import useFlowNode from '../composables/useFlowNode'
import useActionAndSourceStatus from '../composables/useActionAndSourceStatus'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  nodeIconSrc: {
    type: String,
    required: true,
  },
  nodeLabel: {
    type: String,
    required: true,
  },
  supportFallbackActions: {
    type: Boolean,
    default: true,
  },
  iconClass: {
    type: String,
  },
  overflowTooltipComponent: {
    type: Object as PropType<Component>,
    required: true,
  },
})

const { isBridgerNode, isWithFallbackNodes, isAIType } = useFlowNode()
const { getActionStatusLabel } = useActionAndSourceStatus()

const withFallbackNodes = computed(() => isWithFallbackNodes(props.data as Node))
const isActionNodeButNotFallback = computed(() => {
  if (props.data?.type !== FlowNodeType.Output || !props.supportFallbackActions) {
    return false
  }
  return isBridgerNode(props.data || {}) && !props.data?.data?.isFallback
})
const showSourceHandle = computed(() => {
  if (props.data?.type !== FlowNodeType.Output) {
    return true
  }
  if (!props.isEdit) {
    return withFallbackNodes.value
  }
  return isActionNodeButNotFallback.value
})

const isDisconnectedActionOrSource = computed(() => {
  const isActionOrSource = isBridgerNode(props.data || {})
  const isDisconnected =
    isActionOrSource && props.data?.data?.formData?.status === FlowConnectionStatus.Disconnected
  return isDisconnected
})
const isAINode = computed(() => isAIType(props.data?.data?.specificType))
</script>

<style lang="scss">
.flow-node {
  display: flex;
  width: 160px;
  align-items: center;
  p {
    margin: 0;
  }
  .node-icon {
    display: block;
    width: 20px;
    height: auto;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .node-bd {
    flex-grow: 1;
  }
  .node-bd {
    line-height: 24px;
    overflow: hidden;
  }
  .label {
    font-weight: 600;
    .extra {
      font-weight: normal;
      margin-left: 4px;
    }
    .status-label {
      color: var(--el-color-danger);
    }
  }
  .desc {
    color: #656b7d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    .el-tooltip__trigger {
      line-height: 1;
    }
    .status-label {
      margin-right: 4px;
    }
  }
}
.vue-flow__handle {
  &.is-error {
    --vf-handle: var(--el-color-danger);
  }
}
</style>
