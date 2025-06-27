<!-- eslint-disable prettier/prettier -->
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
import { useFunctionItemData, type FunctionItem, useLocale } from '@emqx/shared-ui-utils'
import CustomFormItem from '../../../common/CustomFormItem.vue'

const props = defineProps<{
  modelValue: FunctionItem
  readonly: boolean
  availableFields: Array<string>
  lang: 'en' | 'zh' | 'ja'
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: FunctionItem): void }>()

const { t } = useLocale(props.lang)

const { record, funcOptList, handleSelectFunc } = useFunctionItemData(props, emit, props.lang)
const cascaderProps = { value: 'name', label: 'name', children: 'list', emitPath: false }
</script>

<style lang="scss">
.form-item-func {
  .el-cascader {
    width: 100%;
  }
}
</style>
