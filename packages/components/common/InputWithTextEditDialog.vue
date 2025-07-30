<template>
  <el-input v-model="inputValue">
    <template #suffix>
      <el-button link @click.stop.prevent="showDialog = true">
        <el-icon><FullScreen /></el-icon>
      </el-button>
    </template>
  </el-input>
  <el-dialog
    v-model="showDialog"
    append-to-body
    width="700"
    destroy-on-close
    :title="title"
    @open="handleDialogOpen"
  >
    <el-input ref="DialogInputRef" v-model="dialogInputValue" :rows="20" type="textarea" />
    <template #footer>
      <el-button type="primary" @click="submit">
        {{ t('flow.confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElDialog, ElInput, ElButton, ElIcon } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'
import { waitAMoment } from '@emqx/shared-ui-utils'
import { computed, ref } from 'vue'
import { useFlowLocale } from '../flow/composables/useFlowLocale'

const props = defineProps<{
  modelValue?: string
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const { t } = useFlowLocale()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(val: string) {
    emit('update:modelValue', val)
  },
})

const showDialog = ref(false)
const dialogInputValue = ref('')
const handleDialogOpen = async () => {
  dialogInputValue.value = props.modelValue ?? ''
  await waitAMoment(200)
  DialogInputRef.value?.focus?.()
}

const DialogInputRef = ref()

const submit = () => {
  emit('update:modelValue', dialogInputValue.value)
  showDialog.value = false
}
</script>
