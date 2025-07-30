<template>
  <el-form
    ref="FormCom"
    label-width="164px"
    class="provider-form"
    label-position="right"
    :rules="rules"
    :model="record"
    :validate-on-rule-change="false"
    @submit.prevent
  >
    <CustomFormItem prop="input" :label="t('flow.input')" :readonly="readonly">
      <el-autocomplete
        v-model="record.input"
        :fetch-suggestions="getFieldList"
        clearable
        popper-class="is-wider"
      />
    </CustomFormItem>
    <CustomFormItem prop="system_prompt" :readonly="readonly">
      <template #label>
        {{ t('flow.systemPrompt') }}
        <component :is="tipComponent" :content="t('flow.systemPromptDesc')" />
      </template>
      <InputWithTextEditDialog v-model="record.system_prompt" :title="t('flow.systemPrompt')" />
    </CustomFormItem>
    <CustomFormItem prop="base_url" :readonly="readonly">
      <template #label>
        {{ t('flow.baseURL') }}
        <component
          :is="tipComponent"
          :content="
            isGemini
              ? t('flow.geminiBaseUrlTips')
              : t('flow.baseURLDesc', { url: defaultBaseURL, name: title })
          "
        />
      </template>
      <el-input v-model="baseUrlProxy" :placeholder="defaultBaseURL"> </el-input>
    </CustomFormItem>
    <CustomFormItem prop="api_key" :label="t('flow.apiKey')" :readonly="readonly">
      <CustomInputPassword v-model="record.api_key" />
    </CustomFormItem>
    <CustomFormItem prop="model" :label="t('flow.model')" :readonly="readonly">
      <InputWithOptions v-model="record.model" :options="modelOpts" :filterable="false" />
    </CustomFormItem>
    <template v-if="isAnthropicProfile(record)">
      <CustomFormItem prop="max_tokens" :label="t('flow.maxTokens')" :readonly="readonly">
        <component :is="inputNumberComponent" v-model="record.max_tokens" />
      </CustomFormItem>
      <CustomFormItem
        prop="anthropic_version"
        :label="t('flow.anthropicVersion')"
        :readonly="readonly"
      >
        <el-select v-model="record.anthropic_version">
          <el-option v-for="item in anthropicVersionOpts" :key="item" :label="item" :value="item" />
        </el-select>
      </CustomFormItem>
    </template>
    <CustomFormItem prop="alias" :readonly="readonly">
      <template #label>
        {{ t('flow.aiOutputAlias') }}
        <component
          :is="tipComponent"
          :content="`${t('flow.aiOutputAliasDesc')}<br />${t('flow.aliasDesc')}`"
          :is-html="true"
          :desc-marked="true"
        />
      </template>
      <el-input v-model="record.alias" />
    </CustomFormItem>
    <slot name="advancedSettings"></slot>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm, ElAutocomplete, ElSelect, ElOption, ElInput, type FormRules } from 'element-plus'
import {
  GEMINI_DEFAULT_BASE_URL,
  ProcessingType,
  ANTHROPIC_VERSION_MAP,
  AIProviderType,
} from '@emqx/shared-ui-constants'
import { Component, computed, ref } from 'vue'
import aiModels from './aiModels.json'
import { useFlowLocale } from '../../composables/useFlowLocale'
import useFlowNode from '../../composables/useFlowNode'
import CustomFormItem from '../../../common/CustomFormItem.vue'
import CustomInputPassword from '../../../common/CustomInputPassword.vue'
import InputWithOptions from '../../../common/InputWithOptions.vue'
import InputWithTextEditDialog from '../../../common/InputWithTextEditDialog.vue'
import type { Node } from '@vue-flow/core'
import type { AIAnthropicConfig, AIConfig } from '../../types'

const defaultModelOptsMap = new Map([
  [ProcessingType.AIOpenAI, aiModels.openai],
  [ProcessingType.AIAnthropic, aiModels.anthropic],
  [ProcessingType.AIGemini, aiModels.gemini],
])

const props = defineProps<{
  modelValue: AIConfig
  nodeSpecificType: ProcessingType
  readonly: boolean
  availableFields: Array<{ value: string }>
  rules: FormRules
  inputNumberComponent: Component
  tipComponent: Component
  modelOptsMap?: Map<ProcessingType, Array<string>>
  nodes?: Array<Node>
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: AIConfig): void
}>()

const { t } = useFlowLocale()
const { getCommonTypeLabel } = useFlowNode()

const FormCom = ref()

const record = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const getFieldList = (queryString: string, cb: any) => {
  if (!queryString) {
    cb(props.availableFields)
  }
  const ret = props.availableFields.filter(({ value }) => value.includes(queryString))
  cb(ret)
}

const anthropicVersionOpts = Object.values(ANTHROPIC_VERSION_MAP)

const isAnthropicProfile = (profile: AIConfig): profile is AIAnthropicConfig => {
  return profile.type === AIProviderType.Anthropic
}

const modelOpts = computed(
  () => (props.modelOptsMap ?? defaultModelOptsMap).get(props.nodeSpecificType) ?? [],
)
const isGemini = computed(() => props.nodeSpecificType === ProcessingType.AIGemini)
const baseUrlProxy = computed({
  get() {
    const { base_url } = record.value
    if (isGemini.value && base_url === GEMINI_DEFAULT_BASE_URL) {
      return ''
    }
    return base_url
  },
  set(val: string) {
    if (isGemini.value) {
      if (!val) {
        record.value.base_url = GEMINI_DEFAULT_BASE_URL
      } else {
        record.value.base_url = val
      }
    } else {
      record.value.base_url = val
    }
  },
})
const defaultBaseURL = computed(() =>
  isGemini.value ? GEMINI_DEFAULT_BASE_URL : `https://api.${props.modelValue.type}.com/v1`,
)
const title = computed(() => getCommonTypeLabel(props.nodeSpecificType))

defineExpose({ validate: () => FormCom.value.validate(), defaultBaseURL })
</script>
