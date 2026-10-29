<template>
  <el-form-item prop="questions" :label="t('flow.decisionQuestions')" :rules="rules">
    <template #label>
      {{ t('flow.decisionQuestions') }}
      <component :is="tipComponent" :content="t('flow.decisionOutputHint')" />
    </template>
    <div class="decision-questions">
      <ul class="question-list">
        <li v-for="(question, index) in modelValue" :key="index" class="question-item">
          <div class="question-body">
            <el-form-item :label="t('flow.decisionType')" label-width="88px" class="question-field">
              <el-select
                :model-value="question.type"
                :aria-label="t('flow.decisionType')"
                :disabled="readonly"
                @update:model-value="changeType(index, $event)"
              >
                <el-option
                  v-for="type in questionTypes"
                  :key="type.value"
                  :value="type.value"
                  :label="type.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('common.name')" label-width="88px" class="question-field">
              <el-input
                v-model="question.name"
                :aria-label="t('common.name')"
                :disabled="readonly"
              />
            </el-form-item>
            <el-form-item
              :label="t('flow.decisionInstructions')"
              label-width="88px"
              class="question-field"
            >
              <el-input
                v-model="question.instructions"
                :aria-label="t('flow.decisionInstructions')"
                type="textarea"
                :disabled="readonly"
                :autosize="{ minRows: 2, maxRows: 8 }"
              />
            </el-form-item>
            <div v-if="question.type === DecisionQuestionType.Choice" class="question-array-field">
              <div class="question-section-label">{{ t('flow.decisionChoices') }}</div>
              <el-table
                :data="question.choices"
                class="decision-table key-and-value-editor shadow-none"
              >
                <el-table-column :label="t('flow.decisionValue')" min-width="210">
                  <template #default="{ row: choice }">
                    <div class="choice-value">
                      <el-select
                        :model-value="typeof choice.value"
                        :disabled="readonly"
                        :aria-label="t('flow.decisionType')"
                        class="choice-type"
                        @update:model-value="choice.value = $event === 'boolean' ? false : ''"
                      >
                        <el-option value="string" :label="t('flow.decisionString')" />
                        <el-option value="boolean" :label="t('flow.decisionBoolean')" />
                      </el-select>
                      <el-select
                        v-if="typeof choice.value === 'boolean'"
                        v-model="choice.value"
                        :disabled="readonly"
                        :aria-label="t('flow.decisionValue')"
                      >
                        <el-option :value="true" label="true" />
                        <el-option :value="false" label="false" />
                      </el-select>
                      <el-input
                        v-else
                        v-model="choice.value"
                        :disabled="readonly"
                        :placeholder="t('flow.decisionValue')"
                        :aria-label="t('flow.decisionValue')"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="t('flow.decisionDescription')" min-width="140">
                  <template #default="{ row: choice }">
                    <el-input
                      v-model="choice.description"
                      :disabled="readonly"
                      :aria-label="t('flow.decisionDescription')"
                    />
                  </template>
                </el-table-column>
                <el-table-column v-if="!readonly" width="100" align="right">
                  <template #header>
                    <el-button link type="primary" @click="question.choices.push({ value: '' })">{{
                      t('flow.decisionAddChoice')
                    }}</el-button>
                  </template>
                  <template #default="{ $index }">
                    <el-button link type="primary" @click="question.choices.splice($index, 1)">{{
                      t('flow.decisionRemove')
                    }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="question.type === DecisionQuestionType.Score" class="question-array-field">
              <div class="question-section-label">{{ t('flow.decisionLevels') }}</div>
              <p class="decision-hint">{{ t('flow.decisionLevelsHint') }}</p>
              <el-table
                :data="question.levels"
                class="decision-table key-and-value-editor shadow-none"
              >
                <el-table-column width="42">
                  <template #default="{ $index }">{{ $index }}</template>
                </el-table-column>
                <el-table-column :label="t('flow.decisionLabel')" min-width="100">
                  <template #default="{ row: level }">
                    <el-input
                      v-model="level.label"
                      :disabled="readonly"
                      :aria-label="t('flow.decisionLabel')"
                    />
                  </template>
                </el-table-column>
                <el-table-column :label="t('flow.decisionDescription')" min-width="140">
                  <template #default="{ row: level }">
                    <el-input
                      v-model="level.description"
                      :disabled="readonly"
                      :aria-label="t('flow.decisionDescription')"
                    />
                  </template>
                </el-table-column>
                <el-table-column v-if="!readonly" width="120" align="right">
                  <template #header
                    ><el-button link type="primary" @click="question.levels.push({ label: '' })">{{
                      t('flow.decisionAddLevel')
                    }}</el-button></template
                  >
                  <template #default="{ $index }">
                    <div class="row-actions">
                      <el-button
                        link
                        :disabled="$index === 0"
                        :aria-label="t('flow.decisionMoveUp')"
                        :title="t('flow.decisionMoveUp')"
                        @click="moveLevel(question.levels, $index, -1)"
                        ><el-icon><ArrowUp /></el-icon
                      ></el-button>
                      <el-button
                        link
                        :disabled="$index === question.levels.length - 1"
                        :aria-label="t('flow.decisionMoveDown')"
                        :title="t('flow.decisionMoveDown')"
                        @click="moveLevel(question.levels, $index, 1)"
                        ><el-icon><ArrowDown /></el-icon
                      ></el-button>
                      <el-button
                        link
                        type="primary"
                        :aria-label="t('flow.decisionRemove')"
                        :title="t('flow.decisionRemove')"
                        @click="question.levels.splice($index, 1)"
                        ><el-icon><Delete /></el-icon
                      ></el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <el-button
            v-if="!readonly"
            link
            class="question-delete"
            :aria-label="t('flow.decisionRemoveQuestion')"
            :title="t('flow.decisionRemoveQuestion')"
            @click="deleteQuestion(index)"
          >
            <el-icon :size="16"><Delete /></el-icon>
          </el-button>
        </li>
      </ul>
      <el-button v-if="!readonly" link type="primary" class="btn-add" @click="addQuestion">
        <el-icon><Plus /></el-icon>{{ t('flow.decisionAddQuestion') }}
      </el-button>
    </div>
  </el-form-item>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElIcon,
} from 'element-plus'
import { Plus, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { DecisionQuestionType, type DecisionQuestion, type DecisionScoreLevel } from '../../types'
import { useFlowLocale } from '../../composables/useFlowLocale'
import { createDecisionQuestion } from '../../composables/useNodeForm'
import { validateDecisionQuestions } from '../../composables/decisionQuestions'

const props = withDefaults(
  defineProps<{
    modelValue: DecisionQuestion[]
    tipComponent: Component
    readonly?: boolean
  }>(),
  { readonly: false },
)
const emit = defineEmits<{ (e: 'update:modelValue', value: DecisionQuestion[]): void }>()
const { t } = useFlowLocale()
const rules = [
  {
    asyncValidator: async () => {
      const error = validateDecisionQuestions(props.modelValue)
      if (error) throw new Error(t(`flow.${error}`))
    },
    trigger: ['change', 'blur'],
  },
]
const questionTypes = computed(() => [
  { value: DecisionQuestionType.Predicate, label: t('flow.decisionPredicate') },
  { value: DecisionQuestionType.Choice, label: t('flow.decisionChoice') },
  { value: DecisionQuestionType.Score, label: t('flow.decisionScore') },
])
const addQuestion = () => {
  emit('update:modelValue', [...props.modelValue, createDecisionQuestion()])
}
const deleteQuestion = (index: number) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((_, i) => i !== index),
  )
}
const changeType = (index: number, type: DecisionQuestion['type']) => {
  const { name, instructions } = props.modelValue[index]
  const question = { ...createDecisionQuestion(type), name, instructions }
  emit(
    'update:modelValue',
    props.modelValue.map((item, i) => (i === index ? question : item)),
  )
}
const moveLevel = (levels: DecisionScoreLevel[], index: number, direction: number) => {
  const target = index + direction
  if (target < 0 || target >= levels.length) return
  ;[levels[index], levels[target]] = [levels[target], levels[index]]
}
</script>

<style scoped>
.decision-questions {
  width: 100%;
  min-width: 0;
}
.question-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.question-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}
.question-body {
  flex: 1;
  min-width: 0;
  padding: 16px;
  border-radius: var(--border-radius-small, 4px);
  background: var(--color-bg-split, var(--el-fill-color-light));
}
.question-section-label {
  margin-bottom: 8px;
}
.question-array-field {
  width: 100%;
}
.question-field {
  margin-bottom: 16px;
}
.question-field:last-child {
  margin-bottom: 0;
}
.question-field :deep(.el-form-item__content) {
  min-width: 0;
}
.question-field :deep(.el-select) {
  width: 100%;
}
.question-delete {
  height: var(--el-component-size, 32px);
  flex: 0 0 22px;
  width: 22px;
  min-width: 22px;
  padding: 0;
  margin-left: 6px;
  margin-top: 16px;
}
.btn-add :deep(.el-icon) {
  margin-right: 8px;
}
.choice-value {
  display: flex;
  align-items: center;
  gap: 8px;
}
.choice-value .choice-type {
  flex: 0 0 104px;
}
.choice-value > .el-input,
.choice-value > .el-select:not(.choice-type) {
  flex: 1;
  min-width: 0;
}
.decision-table {
  width: 100%;
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: transparent;
}
.decision-table :deep(.cell) {
  padding: 0 8px;
}
.row-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}
.row-actions :deep(.el-button + .el-button) {
  margin-left: 0;
}
.decision-hint {
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  margin: 0 0 12px;
}
</style>
