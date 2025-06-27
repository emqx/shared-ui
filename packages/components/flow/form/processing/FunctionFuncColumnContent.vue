<template>
  <CustomFormItem class="form-item-func" :readonly="readonly" prop="func.name">
    <el-cascader
      v-model="record.func.name"
      filterable
      class="select-func"
      v-bind="{ options: funcOptList as any }"
      :show-all-levels="false"
      :props="cascaderProps"
      :placeholder="t('common.transform')"
      @change="handleSelectFunc(record.func.name)"
    />
  </CustomFormItem>
</template>

<script setup lang="ts">
import { ElCascader } from 'element-plus'
import { useFunctionItemData } from '../../composables/useRuleFunc'
import { useFlowLocale } from '../../composables/useFlowLocale'
import CustomFormItem from '../../../common/CustomFormItem.vue'
import type { FunctionItem } from '../../types'

const props = defineProps<{
  modelValue: FunctionItem
  readonly: boolean
  availableFields: Array<string>
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: FunctionItem): void }>()

const { t } = useFlowLocale()

const { record, funcOptList, handleSelectFunc } = useFunctionItemData(props, emit)
const cascaderProps = { value: 'name', label: 'name', children: 'list', emitPath: false }
</script>

<style lang="scss">
.form-item-func {
  .el-cascader {
    width: 100%;
  }
}
</style>
