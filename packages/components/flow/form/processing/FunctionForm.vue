<template>
  <div class="function-form">
    <template v-if="record.editedWay === EditedWay.Form">
      <el-table
        :data="record.form"
        style="width: 100%"
        row-key="id"
        :expand-row-keys="expandRowKeys"
      >
        <el-table-column type="expand" width="1">
          <template #default="{ $index }">
            <FunctionParamsColumnContent
              v-model="record.form[$index]"
              v-bind="columnContentProps"
              :ref="(el) => setFormCom(el, $index)"
              @before-unmount="delFormCom($index)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="t('common.field')" prop="field" width="150">
          <template #default="{ $index }">
            <FunctionFieldColumnContent
              v-model="record.form[$index]"
              v-bind="columnContentProps"
              :error="getErrorMsg($index, 'field')"
              @blur="validateItem($index, 'field')"
            />
          </template>
        </el-table-column>
        <el-table-column :label="t('common.transform')" prop="func.name">
          <template #default="{ $index }">
            <FunctionFuncColumnContent v-model="record.form[$index]" v-bind="columnContentProps" />
          </template>
        </el-table-column>
        <el-table-column prop="alias" width="150">
          <template #header>
            <span class="mr-2">{{ t('common.alias') }}</span>
            <component :is="tipComponent" :content="t('ruleFunction.aliasDesc')"></component>
          </template>
          <template #default="{ $index }">
            <CustomFormItem
              prop="alias"
              class="item-alias"
              :readonly="readonly"
              :error="getErrorMsg($index, 'alias')"
            >
              <el-input
                v-model="record.form[$index].alias"
                :placeholder="t('common.alias')"
                @blur="validateItem($index, 'alias')"
              />
            </CustomFormItem>
          </template>
        </el-table-column>
        <el-table-column v-if="!readonly" :label="t('common.actions')" width="90">
          <template #default="{ $index }">
            <el-button link :disabled="record.form.length < 2" @click="deleteItem($index)">
              <i class="iconfont icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button v-if="!readonly" link type="primary" @click="addItem">
        <i class="iconfont icon-add"></i>{{ t('common.add') }}
      </el-button>
    </template>

    <el-form
      v-else
      ref="FormCom"
      class="message-form"
      hide-required-asterisk
      :rules="rules"
      :model="record"
      :validate-on-rule-change="false"
    >
      <el-form-item prop="sql">
        <component
          :is="monacoComponent"
          :id="createRandomString()"
          v-model="record.sql"
          lang="sql"
          :disabled="readonly"
          isDynamicHeight
          @blur="transformToFormFromSql"
        ></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { get, isFunction, set } from 'lodash'
import { ElTable, ElTableColumn, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import type { Node } from '@vue-flow/core'
import Schema, { type Rules, type ValidateError } from 'async-validator'
import {
  Component,
  PropType,
  computed,
  defineEmits,
  defineExpose,
  defineProps,
  ref,
  watch,
} from 'vue'
import { correctAliasReg, DEFAULT_SELECT } from '@emqx/shared-ui-constants'
import { waitAMoment, createRandomString, trimSpacesAndLFs } from '@emqx/shared-ui-utils'
import { useRuleFunc } from '../../composables/useRuleFunc'
import { useFlowLocale } from '../../composables/useFlowLocale'
import CustomFormItem from '../../../common/CustomFormItem.vue'
import { createFunctionItem } from '../../composables/useNodeForm'
import FunctionFieldColumnContent from './FunctionFieldColumnContent.vue'
import FunctionFuncColumnContent from './FunctionFuncColumnContent.vue'
import FunctionParamsColumnContent from './FunctionParamsColumnContent.vue'
import { useHandleFlowDataUtils } from '../../composables/useHandleFlowDataUtils'
import { useGenerateFlowDataUtils } from '../../composables/useGenerateFlowDataUtils'
import { type FunctionFormType, EditedWay } from '../../types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<FunctionFormType>,
    default: () => ({ form: [] }),
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  nodes: {
    type: Array as PropType<Array<Node>>,
  },
  availableFields: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
  monacoComponent: {
    type: Object as PropType<Component>,
    required: true,
  },
  tipComponent: {
    type: Object as PropType<Component>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { t } = useFlowLocale()

const { getFuncExpressionFromFuncList } = useHandleFlowDataUtils()
const { generateFunctionFormFromExpression } = useGenerateFlowDataUtils()

const FormCom = ref()
const FormComArr: Array<any> = []
const setFormCom = (form: any, index: number) => {
  FormComArr[index] = form
}
const delFormCom = (index: number) => {
  FormComArr.splice(index, 1)
}

const record = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const addItem = () => {
  record.value.form.push(createFunctionItem())
}

const deleteItem = (index: number) => {
  record.value.form.splice(index, 1)
}

const { getFuncItemByName } = useRuleFunc()
const expandRowKeys = computed(() => {
  return record.value.form
    .filter(({ func }) => {
      const funcItem = func.name ? getFuncItemByName(func.name) : null
      return funcItem?.args?.length && funcItem.args.length > 1
    })
    .map(({ id }) => id)
})
const columnContentProps = computed(() => ({
  readonly: props.readonly,
  availableFields: props.availableFields,
}))

const rules: Rules = {
  field: {
    validator: (_rule: unknown, value: string, _callback: unknown, source: any) => {
      const errors = []
      if (!value) {
        errors.push(
          new Error(t('ruleFunction.inputFieldRequiredError', { name: t('common.field') })),
        )
      } else if (source.func.args.length && !source.func.args.includes(value)) {
        errors.push(new Error(t('ruleFunction.unusedField')))
      }
      return errors
    },
  },
  alias: {
    validator: (_rule: unknown, value: string, _callback: unknown, source: any) => {
      const errors = []
      if (source.func.name && !value) {
        errors.push(new Error(t('ruleFunction.aliasRequired')))
      } else if (!correctAliasReg.test(value)) {
        errors.push(new Error(t('ruleFunction.aliasFormatError')))
      }
      return errors
    },
  },
}
const errorMsgMap = ref<Record<string, Record<string, string>>>({})
const getErrorMsg = (index: number, field: string) => get(errorMsgMap.value, `${index}.${field}`)
const updateErrorMsg = (errorArr: Array<Array<ValidateError> | null>) => {
  errorArr.forEach((error, index) => {
    if (error) {
      errorMsgMap.value[index.toString()] = error.reduce(
        (map: Record<string, string>, { field, message }) => {
          if (field) {
            map[field] = message?.toString() ?? ''
          }
          return map
        },
        {},
      )
    }
  })
}
const customValidate = async () => {
  return new Promise((resolve, reject) => {
    const validator = new Schema(rules)
    errorMsgMap.value = {}
    const errorArr: Array<Array<ValidateError> | null> = []
    record.value.form.forEach((item) => validator.validate(item, (error) => errorArr.push(error)))
    updateErrorMsg(errorArr)
    errorArr.some(Boolean) ? reject() : resolve(undefined)
  })
}
const validateItem = async (index: number, field: string) => {
  await waitAMoment()
  const validator = new Schema({ [field]: rules[field] })
  validator.validate(record.value.form[index], (errors) => {
    set(errorMsgMap.value, `${index}.${field}`, errors ? errors[0].message ?? '' : '')
  })
}

const validate = () => {
  if (record.value.editedWay === EditedWay.Form) {
    return Promise.all([
      customValidate(),
      ...FormComArr.map((item) => {
        if (item.validate && isFunction(item.validate)) {
          return item.validate()
        }
        return Promise.resolve()
      }),
    ])
  }
  return FormCom.value.validate()
}

const transformToSqlFormForm = () => {
  record.value.sql = getFuncExpressionFromFuncList(record.value.form) || ''
}

const transformToFormFromSql = () => {
  const defaultForm = [createFunctionItem()]
  if (trimSpacesAndLFs(record.value.sql) === DEFAULT_SELECT) {
    record.value.form = defaultForm
  } else {
    const form = generateFunctionFormFromExpression(record.value.sql)
    record.value.form = form?.length ? form : defaultForm
  }
}

watch(
  () => props.modelValue?.editedWay,
  (val) => {
    if (val === EditedWay.SQL) {
      transformToSqlFormForm()
    } else {
      transformToFormFromSql()
    }
  },
)

defineExpose({ validate })
</script>

<style lang="scss">
@use 'sass:math';
.function-form {
  .el-table .el-table__expand-icon {
    display: none;
  }
  .el-table__expanded-cell {
    background: #f8fafe;
    .el-form-item__label {
      padding-right: 16px;
    }
  }
  .el-table__cell {
    .cell {
      overflow: visible;
    }
    .el-form-item {
      &:not(:last-child) {
        margin-bottom: 12px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-form-item__content > .value {
      padding-left: 0;
    }
  }
  .form-item-param {
    // alias column width + last column width + padding right
    margin-right: 150px + 80px + 16px;
    .el-form-item__content {
      margin-left: 16px;
    }
  }
  .el-table {
    margin-bottom: 16px;
  }
}
</style>
