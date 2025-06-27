<template>
  <CustomFormItem :readonly="readonly" prop="field">
    <el-autocomplete
      v-model="record.field"
      :fetch-suggestions="getFieldList"
      :placeholder="t('common.field')"
      clearable
      class="common-fields"
      popper-class="is-wider"
      @change="handleFieldChanged($event)"
      @blur="handleBlur($event)"
      @select="handleFieldChanged($event.value)"
    />
  </CustomFormItem>
</template>

<script setup lang="ts">
import { ElAutocomplete } from 'element-plus'
import { useFunctionItemData } from '../../composables/useRuleFunc'
import { useFlowLocale } from '../../composables/useFlowLocale'
import CustomFormItem from '../../../common/CustomFormItem.vue'
import type { FunctionItem } from '../../types'

const props = withDefaults(
  defineProps<{
    modelValue: FunctionItem
    readonly: boolean
    availableFields: Array<string>
  }>(),
  {
    modelValue: () => ({ func: {} }) as FunctionItem,
  },
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: FunctionItem): void
  (e: 'blur', value: FocusEvent): void
}>()

const { t } = useFlowLocale()

const { record, getFieldList, handleFieldChanged } = useFunctionItemData(props, emit)

const handleBlur = (value: FocusEvent) => {
  emit('blur', value)
}
</script>
