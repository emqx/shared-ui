<template>
  <div>
    <template v-if="modelValue.editedWay === EditedWay.Form">
      <FilterFormReadonly v-if="readonly" :record="record" />
      <el-form
        v-else
        ref="FormCom"
        label-width="0px"
        class="filter-form"
        label-position="right"
        hide-required-asterisk
        :rules="rules"
        :model="record"
        :validate-on-rule-change="false"
        @keyup.enter="saveConfig()"
      >
        <!-- key is a hack, for refresh list -->
        <div class="filter-container" ref="ListContainer">
          <FilterOperatorLine
            v-if="record.items.length > 1"
            :operator="record.groupOperator"
            @toggle="toggleGroupOperator(record)"
          />
          <div
            class="connector-container"
            :class="{ 'is-hidden': hideConnector }"
            v-if="showConnector"
          >
            <FilterItemConnector
              v-for="item in connectorArr"
              :data="item"
              :key="item.startIndex"
              :style="getConnectorStyle(item)"
              @connected="handleFiltersConnected"
            />
          </div>
          <div :class="listWrapClass" :id="record.id" :key="randomStr">
            <template v-for="(filter, index) in record.items">
              <div class="sub-level filter-container" v-if="filter.items" :key="filter.id">
                <FilterOperatorLine
                  class="sub-level"
                  show-del
                  :operator="filter.groupOperator"
                  @toggle="toggleGroupOperator(filter)"
                  @delete="deleteGroup(index, filter)"
                />
                <div :class="listWrapClass" :id="filter.id">
                  <FilterItemCom
                    v-for="(_subFilter, subIndex) in filter.items"
                    v-model="filter.items[subIndex]"
                    :key="subIndex"
                    :index="index"
                    :subIndex="subIndex"
                    @delete="deleteFilterItem(index, subIndex)"
                  >
                    <template #deleteIcon>
                      <slot name="deleteIcon"></slot>
                    </template>
                  </FilterItemCom>
                </div>
              </div>
              <FilterItemCom
                v-else
                v-model="record.items[index]"
                :key="index"
                :index="index"
                :deletable="record.items.length > 1"
                :class="{ 'can-connect': getCanConnect(index) && showConnector }"
                @delete="deleteFilterItem(index)"
              >
                <template #deleteIcon>
                  <slot name="deleteIcon"></slot>
                </template>
              </FilterItemCom>
            </template>
          </div>
        </div>
        <el-button link type="primary" @click="addFilterItem">
          <slot name="addIcon">
            <el-icon :size="16"><Plus /></el-icon>
          </slot>
          {{ t('common.add') }}
        </el-button>
      </el-form>
    </template>
    <el-form
      v-else
      ref="SQLFormCom"
      hide-required-asterisk
      :rules="sqlRecordRules"
      :model="sqlRecord"
      :validate-on-rule-change="false"
    >
      <el-form-item prop="sql">
        <component
          :is="monacoComponent"
          :id="createRandomString()"
          lang="sql"
          v-model="sqlRecord.sql"
          :disabled="readonly"
          isDynamicHeight
          @change="updateSQLRecord"
          @blur="transformToFormFromSql"
        ></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  Component,
  computed,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch,
  WritableComputedRef,
} from 'vue'
import { ElForm, ElFormItem, ElButton, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { EditedWay, FilterLogicalOperator } from '@emqx/shared-ui-constants'
import useFormRules from '../../composables/useFormRules'
import useFilterConnectorInForm from '../../composables/useFilterConnectorInForm'
import useHandleFlowDataUtils from '../../composables/useHandleFlowDataUtils'
import {
  createFilterForm,
  createFilterFormData,
  createFilterItem,
} from '../../composables/useNodeForm'
import useParseWhere from '../../composables/useParseWhere'
import useSortableFilterList from '../../composables/useSortableFilterList'
import { createRandomString, removeFromArr } from '@emqx/shared-ui-utils'
import FilterFormReadonly from './FilterFormReadonly.vue'
import FilterItemCom from './FilterItem.vue'
import FilterItemConnector from './FilterItemConnector.vue'
import FilterOperatorLine from './FilterOperatorLine.vue'
import { useFlowLocale } from '../../composables/useFlowLocale'
import type { FilterFormType, FilterFormData, FilterItem } from '../../types'

const FormCom = ref()

const props = defineProps({
  modelValue: {
    type: Object as PropType<FilterFormType>,
    default: () => createFilterForm(),
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  monacoComponent: {
    type: Object as PropType<Component>,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'save'])

const { t } = useFlowLocale()

const record: WritableComputedRef<any> = computed({
  get() {
    return props.modelValue.form
  },
  set(val) {
    emit('update:modelValue', { ...props.modelValue, form: val })
  },
})

const { newRequiredRule } = useFormRules()
const ruleItem = {
  field: newRequiredRule(),
  operator: newRequiredRule('select'),
  valueForComparison: newRequiredRule(),
}
/**
 * rules for form
 */
const rules = computed(() => {
  return {
    items: record.value.items.map((filter: FilterItem | FilterFormData) => {
      if (!('items' in filter)) {
        return { ...ruleItem }
      }
      return { items: filter.items.map(() => ({ ...ruleItem })) }
    }),
  }
})

const SQLFormCom = ref()
const sqlRecord: WritableComputedRef<any> = computed({
  get() {
    return { sql: props.modelValue.sql }
  },
  set(val) {
    const { sql } = val
    emit('update:modelValue', { ...props.modelValue, sql })
  },
})

const sqlRecordRules = { sql: newRequiredRule() }

const updateSQLRecord = (sql: string) => {
  sqlRecord.value = { sql }
}

/**
 * If there is only one group item in the current first level,
 * make this group item the new first level.
 */
const handleAllInSecondLevel = () => {
  if (record.value.items.length === 1 && 'items' in record.value.items[0]) {
    record.value = record.value.items[0]
  }
}

/**
 * If there is only one item inside the group's items, move it out of the group.
 */
const handleOnlyOneInGroup = () => {
  record.value.items.forEach((filter: FilterItem | FilterFormData, index: number) => {
    if ('items' in filter && filter.items.length === 1) {
      record.value.items[index] = filter.items[0]
    }
  })
}

const addFilterItem = () => {
  record.value.items = [...record.value.items, createFilterItem()]
}

const deleteFilterItem = (index: number, subIndex?: number) => {
  const subItems =
    subIndex !== undefined ? (record.value.items[index] as FilterFormData)?.items || [] : []
  if (subIndex !== undefined && subItems.length > 1) {
    ;(record.value.items[index] as FilterFormData).items = removeFromArr(subItems, subIndex)
    // so, if items.length === 1, it's a empty group, delete it
  } else {
    record.value.items = removeFromArr(record.value.items, index)
  }
  handleOnlyOneInGroup()
  handleAllInSecondLevel()
}

const toggleGroupOperator = (group: FilterFormData) => {
  group.groupOperator =
    group.groupOperator === FilterLogicalOperator.Or
      ? FilterLogicalOperator.And
      : FilterLogicalOperator.Or
}

const deleteGroup = (index: number, group: FilterFormData) => {
  const filterItems = [...group.items]
  record.value.items.splice(index, 1, ...filterItems)
}

/**
 * To ensure proper styling during dragging, hide the connector
 */
const hideConnector = ref(false)
const sortEventOpt = {
  onStart: () => {
    hideConnector.value = true
  },
}

const { connectorArr, getCanConnect, getConnectorStyle } = useFilterConnectorInForm(record)
const showConnector = computed(() => record.value.items.length > 2)
const handleFiltersConnected = async ({
  startIndex,
  endIndex,
}: {
  startIndex: number
  endIndex: number
}) => {
  const { items } = record.value
  const filters = items.slice(startIndex, endIndex + 1)
  record.value.items = [
    ...items.slice(0, startIndex),
    { groupOperator: FilterLogicalOperator.And, id: createRandomString(), items: filters },
    ...items.slice(endIndex + 1),
  ]
  handleAllInSecondLevel()
  await nextTick()
  initSortable(sortEventOpt)
}

const findItemById = (id: string): FilterFormData => {
  if (record.value.id === id) {
    return record.value
  }
  return record.value.items.find(
    ({ items, id: subId }: any) => items && id === subId,
  ) as FilterFormData
}

const moveElement = (arr: any, oldIndex: any, newIndex: any) => {
  if (oldIndex < 0 || oldIndex >= arr.length || newIndex < 0 || newIndex >= arr.length) {
    throw new Error('Index out of bound')
  }
  const element = arr.splice(oldIndex, 1)[0]
  arr.splice(newIndex, 0, element)
  return arr
}

const randomStr = ref(createRandomString())
const handleDragged = async (evt: any) => {
  const { to: toList, from: fromList, oldIndex, newIndex } = evt
  const fromID = fromList.id
  const toID = toList.id
  const fromItem = findItemById(fromID)
  const toItem = findItemById(toID)
  if (!fromItem || !toItem) {
    return
  }
  const target = fromItem.items[oldIndex]
  if (fromID === toID) {
    moveElement(fromItem.items, oldIndex, newIndex)
  } else {
    fromItem.items = removeFromArr(fromItem.items, oldIndex)
    if (fromItem.items.length === 0 && fromItem.id !== record.value.id) {
      deleteFilterItem(record.value.items.findIndex((item: any) => item.id === fromItem.id))
    }
    toItem.items.splice(newIndex, 0, target)
  }
  handleAllInSecondLevel()
  handleOnlyOneInGroup()
  randomStr.value = createRandomString()
  await nextTick()
  initSortable(sortEventOpt)
  hideConnector.value = false
}
const { ListContainer, listWrapClass, initSortable } = useSortableFilterList(handleDragged)

const saveConfig = () => {
  emit('save', record.value)
}

const { getFilterExpressionFromFormData } = useHandleFlowDataUtils()
const transformToSqlFormForm = () => {
  sqlRecord.value.sql = getFilterExpressionFromFormData(record.value) || ''
}

const { generateFilterForm, discardHighLevelCondition } = useParseWhere()
const transformToFormFromSql = async () => {
  if (!sqlRecord.value.sql) {
    record.value = createFilterFormData()
  } else {
    record.value = discardHighLevelCondition(generateFilterForm(sqlRecord.value.sql))
    await nextTick()
    handleOnlyOneInGroup()
  }
}

watch(
  () => props.modelValue?.editedWay,
  async (val) => {
    if (val === EditedWay.SQL) {
      transformToSqlFormForm()
    } else {
      transformToFormFromSql()
      await nextTick()
      initSortable()
    }
  },
)

onMounted(async () => {
  await nextTick()
  initSortable(sortEventOpt)
})

const validate = () => {
  const Component = props.modelValue.editedWay === EditedWay.Form ? FormCom.value : SQLFormCom.value
  return Component.validate()
}
defineExpose({ validate })
</script>

<style lang="scss">
.filter-form {
  user-select: none;
  input {
    user-select: auto;
  }
  .filter-container {
    display: flex;
  }
  .list-wrap {
    flex-grow: 1;
  }
  // If you want to make changes here, please modify it along with @/composables/integration/emqxVersion5/flow/useFilterConnectorInForm.ts:8:31
  &:not(.is-readonly) {
    .filter-container:not(:last-child),
    .filter-item:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  $large-padding-right: 40px;
  $middle-padding-right: 32px;
  $small-padding-right: 24px;

  $gap-left: 8px;
  .filter-item {
    margin-left: $gap-left;
    padding-right: $large-padding-right;
  }

  .sub-level .filter-item {
    padding-right: $small-padding-right;
  }

  .filter-item {
    position: relative;
  }
  $dot-color: #ccefe3;
  // If you want to make changes here, please modify it along with @/composables/integration/emqxVersion5/flow/useFilterConnectorInForm.ts:9:21
  $dot-radius: 3px;
  .filter-item.can-connect::before,
  .filter-item-connector .dot {
    display: block;
    width: $dot-radius * 2;
    height: $dot-radius * 2;
    border-radius: $dot-radius;
    background: $dot-color;
  }
  .filter-item-connector .dot {
    z-index: 1;
    fill: $dot-color;
    stroke: $dot-color;
    stroke-width: 0;
  }
  .filter-item-connector .line {
    stroke: $dot-color;
    stroke-width: $dot-radius * 2;
  }
  $margin-left: $gap-left + $dot-radius * 2 + 20px;
  $connector-left-position: 20px;
  .filter-item.can-connect {
    margin-left: $margin-left;
    padding-right: $middle-padding-right;
  }
  .filter-item.can-connect::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -$margin-left + $connector-left-position;
    transform: translateY(-50%);
  }
  .connector-container {
    position: relative;
    left: $connector-left-position;
    &.is-hidden {
      visibility: hidden;
    }
  }

  .filter-item-connector {
    position: absolute;
    z-index: 1;
    width: 6px;
  }
}
</style>
