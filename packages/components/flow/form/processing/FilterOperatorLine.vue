<template>
  <div class="filter-operator-line">
    <OperatorTag :operator="operator" :disabled="readonly" @click="handleClick">
      <CircleCloseFilled v-if="showDel" class="icon-del" @click="handleDel" />
      <p>{{ operator }}</p>
    </OperatorTag>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import OperatorTag from './OperatorTag.vue'
import { FilterLogicalOperator } from '@emqx/shared-ui-constants'

defineProps({
  operator: {
    type: String as PropType<FilterLogicalOperator>,
  },
  showDel: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggle', 'delete'])

const handleClick = () => {
  emit('toggle')
}

const handleDel = () => {
  emit('delete')
}
</script>

<style lang="scss">
.filter-operator-line {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;

  &.sub-level {
    width: 36px;
  }
  $icon-size: 14px;
  $icon-padding: 4px;
  $total-size: $icon-size + $icon-padding;
  .icon-del {
    display: none;
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
    transform: translate($icon-size - 2px, -$icon-size + 2px);
    width: $total-size;
    height: $total-size;
    padding-left: $icon-padding;
    padding-bottom: $icon-padding;
    color: #757789;
    svg {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    display: block;
    height: 100%;
    // 16px is the margin bottom of the form item.
    width: 1px;
    background-color: #babcbe;
  }

  /* Operator Tag in Filter Form */
  .operator-tag {
    &:not(.disabled) {
      &:hover {
        .icon-del {
          display: block;
        }
      }
    }
  }
}
</style>
