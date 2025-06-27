<template>
  <CustomFormItem
    class="form-item-param"
    v-for="(item, $index) in args || []"
    :key="`${record.func.name}-${item.name}`"
    :label-width="150"
    :label="getValidI18nText(`ruleFunction.${item.name}`, item.name)"
    :required="item.required && !readonly"
    :error="getErrorMsg($index)"
  >
    <template v-if="!readonly">
      <el-select
        v-if="item.type === ArgumentType.Enum"
        clearable
        filterable
        allow-create
        v-model="record.func.args[$index]"
        @change="onSelectChange($event, $index)"
      >
        <el-option
          v-for="value in item.optionalValues"
          :key="value"
          :label="value"
          :value="value"
        />
      </el-select>
      <el-input
        v-else
        v-model="record.func.args[$index]"
        @change="handleArgChanged($event, $index, item.type), validateItem($index)"
      />
    </template>
    <p v-else class="value">{{ record.func.args[$index] }}</p>
  </CustomFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElSelect, ElOption } from 'element-plus'
import type { Rules, ValidateError } from 'async-validator'
import Schema from 'async-validator'
import { get, pick } from 'lodash'
import { computed, ref } from 'vue'
import { useFunctionItemData } from '../../composables/useRuleFunc'
import { useFlowLocale } from '../../composables/useFlowLocale'
import useFormRules from '../../composables/useFormRules'
import CustomFormItem from '../../../common/CustomFormItem.vue'
import { ArgumentType, type FunctionItem } from '../../types'

const props = defineProps<{
  modelValue: FunctionItem
  readonly: boolean
  availableFields: Array<string>
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: FunctionItem): void
  (e: 'onVueBeforeUnmount'): void
}>()

const { getValidI18nText } = useFlowLocale()

const { record, args, handleSelectFunc, handleArgChanged } = useFunctionItemData(props, emit)

const { newRequiredRule } = useFormRules()
const rules = computed(() =>
  args.value.reduce((rules: Rules, argItem, index) => {
    if (argItem.required) {
      rules[index] = newRequiredRule()
    }
    return rules
  }, {}),
)
const errorMsgMap = ref<Record<string, string>>({})
const getErrorMsg = (index: number) => get(errorMsgMap.value, index)
const updateErrorMsg = (error: Array<ValidateError> | null) => {
  if (error) {
    errorMsgMap.value = error.reduce((map: Record<string, string>, { field, message }) => {
      if (field) {
        map[field] = message?.toString() ?? ''
      }
      return map
    }, {})
  }
}
const validate = async () => {
  return new Promise((resolve, rejects) => {
    const validator = new Schema(rules.value)
    errorMsgMap.value = {}
    validator.validate(record.value.func.args, updateErrorMsg)
    Object.keys(errorMsgMap.value).length ? rejects() : resolve(undefined)
  })
}
const validateItem = (index: number) => {
  const validator = new Schema({ [index]: rules.value[index] })
  validator.validate(pick(record.value.func.args, index), (errors) => {
    errorMsgMap.value[index] = errors ? errors[0].message ?? '' : ''
  })
}
const onSelectChange = ($event: string, $index: number) => {
  handleSelectFunc($event)
  validateItem($index)
}
defineExpose({ validate })
</script>

<style lang="scss">
.form-item-param {
  display: flex;
  align-items: center;
  .el-form-item__label {
    text-align: right;
  }
}
</style>
