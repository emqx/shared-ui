<script setup lang="ts">
import { ArrowDown, CircleCheckFilled, Loading, WarningFilled } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useAILogLocale } from './composables/useAILogLocale'
import useDisplayAIResponse from './composables/useDisplayAIResponse'
import GrayContent from './GrayContent.vue'
import StepDecoration from './StepDecoration.vue'
import type {
  AIResponseItem,
  AIResponseRequestPermission,
  ConfirmExecutionPermissionPayload,
} from './types'
import { ExecutionPermission, UserConfirmation } from './types'
import UserOperationContainer from './UserOperationContainer.vue'

const props = defineProps<{
  content: AIResponseItem[]
  isLoading?: boolean
}>()
const emit = defineEmits<{
  (e: 'confirm', v: UserConfirmation): void
  (e: 'select-permission', v: ConfirmExecutionPermissionPayload): void
}>()

const isUndefined = (val: any): val is undefined => val === undefined
const last = <T,>(arr: Array<T>): T => arr[arr.length - 1]

const {
  isAnalysisResultMessage,
  isStatusMessage,
  isFuncCallMessage,
  isResponseConfirm,
  isErrorMessage,
  isRequestPermission,
  isCancelledMessage,
  getStatusLabel,
  funcCallLabel,
} = useDisplayAIResponse()

const { t } = useAILogLocale()

const confirmResponse = (index: number, v: UserConfirmation) => {
  if (isConfirmed(index)) {
    return
  }
  confirmedResultMap.value.set(index, v)
  emit('confirm', v)
}

const isExpandedMap = ref(new Map<number, boolean>())
const isExpanded = (index: number) => {
  const ret = isExpandedMap.value.get(index)
  return isUndefined(ret) ? false : ret
}
const toggleExpanded = (index: number) => {
  const currentValue = isExpanded(index)
  isExpandedMap.value.set(index, !currentValue)
}

const isFuncExpandedMap = ref(new Map<number, boolean>())
const isFuncOutputExpanded = (index: number) => {
  const ret = isFuncExpandedMap.value.get(index)
  return isUndefined(ret) ? false : ret
}
const toggleFuncOutputExpanded = (index: number) => {
  const currentValue = isFuncOutputExpanded(index)
  isFuncExpandedMap.value.set(index, !currentValue)
}

const confirmedResultMap = ref(new Map<number, UserConfirmation>())
const getConfirmedResult = (index: number): undefined | UserConfirmation =>
  confirmedResultMap.value.get(index)
const isConfirmed = (index: number): boolean => {
  const confirmedResult = getConfirmedResult(index)
  return !isUndefined(confirmedResult)
}

const permissionOpts = [
  { value: ExecutionPermission.Deny, label: t('aiLog.deny') },
  { value: ExecutionPermission.AllowOnce, label: t('aiLog.allowOnce') },
  {
    value: ExecutionPermission.AllowAlways,
    label: t('aiLog.allowAlways'),
    buttonProps: { type: 'primary' },
  },
]
const permissionResultMap = ref(new Map<number, ExecutionPermission>())
const getPermissionResult = (index: number): undefined | ExecutionPermission =>
  permissionResultMap.value.get(index)
const isSelectedPermission = (index: number): boolean => {
  const permissionResult = getPermissionResult(index)
  return !isUndefined(permissionResult)
}
const selectedPermission = (index: number, permission: ExecutionPermission) => {
  permissionResultMap.value.set(index, permission)
  const { id, permission_key } = props.content[index] as AIResponseRequestPermission
  if (!id || !permission_key) {
    return
  }
  emit('select-permission', { id, permission_key, granted_type: permission })
}
const getPermissionLabel = (value: ExecutionPermission) => {
  const item = permissionOpts.find(({ value: v }) => v === value)
  return item?.label ?? value
}

const isWaitingUserConfirm = computed(() => {
  const lastItem = last(props.content)
  return lastItem && isResponseConfirm(lastItem)
})

const isMessageUnderUserConfirm = (index: number) => {
  const preItem = props.content[index - 1]
  return isResponseConfirm(preItem)
}
</script>

<template>
  <div class="ai-response min-w-0 w-full py-0.5">
    <div v-for="(item, $index) in content" :key="$index" class="mb-4">
      <!-- STATUS -->
      <div v-if="isStatusMessage(item)" class="flex gap-3">
        <StepDecoration />
        <div>
          <p>{{ getStatusLabel(item.message) }}({{ item.message }})</p>
        </div>
      </div>
      <!-- REQUEST PERMISSION -->
      <div v-if="isRequestPermission(item)" class="flex gap-3">
        <StepDecoration />
        <UserOperationContainer>
          <p>{{ t('aiLog.permissionRequest', { tool: item.permission_key }) }}</p>
          <div v-if="!isSelectedPermission($index)" class="flex gap-1">
            <el-button
              v-for="{ value, label, buttonProps } in permissionOpts"
              :key="value"
              v-bind="buttonProps"
              @click="selectedPermission($index, value)"
            >
              {{ label }}
            </el-button>
          </div>
          <div v-else class="flex items-center">
            <span class="leading-8 text-text-secondary">
              {{ getPermissionLabel(getPermissionResult($index)!) }}
            </span>
          </div>
        </UserOperationContainer>
      </div>
      <!-- FUNC CALL -->
      <div v-else-if="isFuncCallMessage(item)" class="flex gap-3">
        <StepDecoration />
        <div class="min-w-0 flex-1">
          <div
            class="flex items-center mb-2 select-none cursor-pointer"
            @click="toggleExpanded($index)"
          >
            <p class="mr-1">
              {{ funcCallLabel }}
              <span class="text-text-secondary" v-if="item?.object?.tool_name">
                ({{ t('Base.funcName') }}: {{ item?.object?.tool_name }})
              </span>
            </p>
            <el-icon :class="{ '-rotate-90': !isExpanded($index) }">
              <ArrowDown />
            </el-icon>
          </div>
          <div v-if="isExpanded($index)">
            <div>
              <p class="mb-1 text-text-secondary">{{ t('aiLog.funcArgs') }}</p>
              <GrayContent :code="item?.object?.tool_kwargs" />
            </div>
            <div>
              <p class="mb-1 text-text-secondary">{{ t('aiLog.funcOutput') }}</p>
              <div class="func-output-wrap relative">
                <el-button
                  link
                  class="absolute top-3 right-1"
                  @click="toggleFuncOutputExpanded($index)"
                >
                  <el-icon :class="{ '-rotate-90': !isFuncOutputExpanded($index) }">
                    <ArrowDown />
                  </el-icon>
                </el-button>
                <GrayContent
                  :code="item?.object?.tool_output"
                  :no-wrap="!isFuncOutputExpanded($index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ANALYSIS RESULT -->
      <div v-else-if="isAnalysisResultMessage(item)" class="mt-6">
        <GrayContent v-if="isMessageUnderUserConfirm($index)">
          <div class="flex items-center gap-3">
            <el-icon class="text-text-tip" :size="16"><CircleCheckFilled /></el-icon>
            <span>{{ t('aiLog.reportGenerationCompleted') }}</span>
          </div>
        </GrayContent>
        <template v-else>
          <p class="text-text-title font-semibold mb-4">{{ t('aiLog.analysisResultTip') }}</p>
          <slot :message="item.message"></slot>
        </template>
      </div>
      <!-- CANCELLED -->
      <GrayContent v-if="isCancelledMessage(item)">
        <div class="flex items-center gap-3">
          <el-icon class="text-text-tip" :size="16"><CircleCloseFilled /></el-icon>
          <span>{{ t('Base.userCancelled') }}</span>
        </div>
      </GrayContent>
      <!-- RESPONSE CONFIRM -->
      <UserOperationContainer v-else-if="isResponseConfirm(item)">
        <p>{{ t('aiLog.responseConfirm') }}</p>
        <div v-if="!isConfirmed($index)" class="flex gap-2">
          <el-button @click="confirmResponse($index, UserConfirmation.No)">
            {{ t('aiLog.no') }}
          </el-button>
          <el-button type="primary" @click="confirmResponse($index, UserConfirmation.Yes)">
            {{ t('aiLog.yes') }}
          </el-button>
        </div>
        <div v-else class="flex items-center">
          <span class="leading-8 text-text-secondary">
            {{
              getConfirmedResult($index) === UserConfirmation.Yes ? t('aiLog.yes') : t('aiLog.no')
            }}
          </span>
        </div>
      </UserOperationContainer>
      <!-- ERROR -->
      <div v-else-if="isErrorMessage(item)" class="flex">
        <el-alert class="rounded-button w-auto" type="error" :closable="false">
          <div class="flex items-center gap-2">
            <el-icon><WarningFilled /></el-icon>
            <span>{{ item.message }}</span>
          </div>
        </el-alert>
      </div>
    </div>
    <el-icon
      class="is-loading opacity-50 -ml-0.5"
      v-if="isLoading && !isWaitingUserConfirm"
      :size="20"
    >
      <Loading />
    </el-icon>
  </div>
</template>
