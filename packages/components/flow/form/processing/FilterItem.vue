<template>
  <div class="filter-item">
    <el-form-item :prop="getFormItemProp('field')">
      <CommonFields v-model="record.field" />
    </el-form-item>
    <el-form-item :prop="getFormItemProp('operator')">
      <el-select v-model="record.operator">
        <el-option v-for="item in RULE_LOGICAL_OPERATORS" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item :prop="getFormItemProp('valueForComparison')">
      <el-input v-model="record.valueForComparison" />
    </el-form-item>
    <el-button link v-show="deletable" :disabled="!deletable" @click="deleteItem">
      <i class="iconfont icon-delete"></i>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElButton, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import { RULE_LOGICAL_OPERATORS } from '@emqx/shared-ui-constants'
import CommonFields from '../CommonFields.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  index: {
    type: [Number, String],
    required: true,
  },
  subIndex: {
    type: [Number, String],
  },
  deletable: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:modelValue', 'delete'])

const record = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const LIST_KEY = 'items'
const getFormItemProp = (key: string) => {
  return props.subIndex !== undefined
    ? [LIST_KEY, props.index.toString(), LIST_KEY, props.subIndex.toString(), key]
    : [LIST_KEY, props.index.toString(), key]
}

const deleteItem = () => emit('delete')
</script>

<style lang="scss">
.filter-item {
  display: flex;
  align-items: center;
  .el-form-item {
    flex-grow: 1;
    flex-basis: 28%;
    margin-bottom: 0;
    margin-right: 16px;
  }
  .el-autocomplete {
    width: 100%;
    line-height: 0;
  }
}
</style>
