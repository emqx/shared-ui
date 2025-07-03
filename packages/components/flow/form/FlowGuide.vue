<template>
  <VueFlow
    class="flow-guide"
    ref="FlowInstance"
    :modelValue="guideFlowData || allGuideFlowData"
    :id="flowId"
    :deleteKeyCode="null"
    :nodes-draggable="false"
    :nodes-connectable="false"
    :zoom-on-scroll="false"
    :zoom-on-double-click="false"
    :zoom-on-pinch="false"
    :pan-on-drag="false"
    :min-zoom="1"
    :max-zoom="1"
  >
    <template #node-guide="data">
      <FlowGuideNode :data="data" :supportFallbackActions="supportFallbackActions" />
    </template>
  </VueFlow>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { VueFlow, useVueFlow, type Node, type Edge } from '@vue-flow/core'
import { createRandomString } from '@emqx/shared-ui-utils'
import FlowGuideNode from './FlowGuideNode.vue'
import useFlowGuideNodes from '../composables/useFlowGuideNodes'

defineProps({
  guideFlowData: {
    type: Object as PropType<Array<Node | Edge>>,
    required: true,
  },
  supportFallbackActions: {
    type: Boolean,
    default: true,
  },
})

const flowId = `flow-guide-${createRandomString()}`
useVueFlow(flowId)

const { allGuideFlowData } = useFlowGuideNodes()

const FlowInstance = ref()

const fitView = () => {
  FlowInstance.value?.fitView()
}

defineExpose({
  fitView,
})
</script>

<style lang="scss">
.flow-guide {
  .vue-flow__node {
    cursor: default;
  }
}
</style>
