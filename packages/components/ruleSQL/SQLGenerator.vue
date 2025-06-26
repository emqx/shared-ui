<template>
  <div>
    <el-button v-bind="generateBtnProps" plain @click="openDialog">
      {{ t('ruleSQL.generateSQLByAIBtn') }}
    </el-button>
    <el-dialog
      v-model="dialogVisible"
      :title="t('ruleSQL.generateSQLWithAI')"
      width="650px"
      append-to-body
      :close-on-click-modal="false"
      @closed="resetDialogState"
      class="sql-generator-dialog"
    >
      <div v-if="currentStep === 1">
        <el-form :model="formData" :rules="rules" ref="formRef" label-position="top">
          <el-form-item :label="t('ruleSQL.taskDesc')" prop="description">
            <el-input
              v-model="formData.description"
              type="textarea"
              :rows="4"
              :placeholder="t('ruleSQL.taskDescPlaceholder')"
            />
          </el-form-item>
          <el-form-item prop="topics">
            <template #label>
              {{ t('ruleSQL.relatedTopics') }}
              <component :is="tipComponent" :content="t('ruleSQL.relatedTopicsDesc')" />
            </template>
            <el-input
              v-model="formData.topics"
              :placeholder="t('ruleSQL.relatedTopicsPlaceholder')"
            />
          </el-form-item>
          <el-form-item prop="exampleInput">
            <template #label>
              {{ t('ruleSQL.sqlExampleInput') }}
              <component :is="tipComponent" :content="t('ruleSQL.sqlExampleInputDesc')" />
            </template>
            <component
              :is="monacoComponent"
              :id="exampleInputMonacoId"
              v-model="formData.exampleInput"
              lang="json"
              :height="120"
            ></component>
          </el-form-item>
          <el-form-item prop="exampleOutput">
            <template #label>
              {{ t('ruleSQL.sqlExampleOutput') }}
              <component :is="tipComponent" :content="t('ruleSQL.sqlExampleOutputDesc')" />
            </template>
            <component
              :is="monacoComponent"
              :id="exampleOutputMonacoId"
              v-model="formData.exampleOutput"
              lang="json"
              :height="120"
            ></component>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="currentStep === 2">
        <slot name="resultHeader" v-bind="{ generatedSQL }"></slot>
        <component
          :is="monacoComponent"
          :id="generatedSQLMonacoId"
          v-model="generatedSQL"
          lang="sql"
          isDynamicHeight
        ></component>
      </div>

      <template #footer>
        <template v-if="currentStep === 1">
          <el-button @click="dialogVisible = false" plain>{{ t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleGenerate" :loading="isGenerating">
            {{ t('common.generate') }}
          </el-button>
        </template>
        <template v-else-if="currentStep === 2">
          <el-button @click="handleBackToForm" plain>{{ t('common.back') }}</el-button>
          <el-button type="primary" @click="handleApplySQL">
            {{ t('ruleSQL.applySQL') }}
          </el-button>
        </template>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'
import { useLocale } from '@emqx/shared-ui-utils'
import type { FormInstance, FormRules } from 'element-plus'
import { type Component, reactive, ref } from 'vue'

interface GenerateSQLPayload {
  description: string
  topics?: string
  exampleInput?: string
  exampleOutput?: string
}

const props = defineProps<{
  lang: 'en' | 'zh' | 'ja'
  tipComponent: Component
  monacoComponent: Component
  rules: FormRules
  generateBtnProps: Record<string, any>
  requestGenerateSQL: (payload: GenerateSQLPayload) => Promise<string>
  handleError?: (error: any) => void
}>()

const emit = defineEmits(['apply-sql'])

const { t } = useLocale(props.lang)

const generatedSQLMonacoId = 'sql-generator-monaco-output'
const exampleInputMonacoId = 'sql-generator-monaco-input-example'
const exampleOutputMonacoId = 'sql-generator-monaco-output-example'

const dialogVisible = ref(false)
const isGenerating = ref(false)
const currentStep = ref(1)
const generatedSQL = ref('')

const formRef = ref<FormInstance>()
const formData = reactive({
  description: '',
  topics: '',
  exampleInput: '',
  exampleOutput: '',
})

const openDialog = () => {
  dialogVisible.value = true
  currentStep.value = 1
  resetFormFields()
}

const resetFormFields = () => {
  formData.description = ''
  formData.topics = ''
  formData.exampleInput = ''
  formData.exampleOutput = ''
  formRef.value?.clearValidate()
}

const resetDialogState = () => {
  resetFormFields()
  currentStep.value = 1
  generatedSQL.value = ''
  isGenerating.value = false
}

const handleGenerate = async () => {
  try {
    await formRef.value?.validate()
    isGenerating.value = true
    const generatePayload: GenerateSQLPayload = {
      description: formData.description,
      topics: formData.topics || undefined,
      exampleInput: formData.exampleInput || undefined,
      exampleOutput: formData.exampleOutput || undefined,
    }
    const sql = await props.requestGenerateSQL(generatePayload)
    generatedSQL.value = sql
    currentStep.value = 2
  } catch (error: any) {
    props.handleError?.(error)
  } finally {
    isGenerating.value = false
  }
}

const handleBackToForm = () => {
  currentStep.value = 1
}

const handleApplySQL = () => {
  emit('apply-sql', generatedSQL.value)
  dialogVisible.value = false
}
</script>
