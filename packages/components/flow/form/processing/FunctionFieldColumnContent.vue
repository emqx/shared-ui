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
import { useFunctionItemData, type FunctionItem, useLocale } from '@emqx/shared-ui-utils'
import CustomFormItem from '../../../common/CustomFormItem.vue'

const props = withDefaults(
  defineProps<{
    modelValue: FunctionItem
    readonly: boolean
    availableFields: Array<string>
    lang: 'en' | 'zh' | 'ja'
  }>(),
  {
    modelValue: () => ({ func: {} }) as FunctionItem,
  },
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: FunctionItem): void
  (e: 'blur', value: FocusEvent): void
}>()

const { t } = useLocale(props.lang)

const { record, getFieldList, handleFieldChanged } = useFunctionItemData(props, emit, props.lang)

const handleBlur = (value: FocusEvent) => {
  emit('blur', value)
}
</script>
