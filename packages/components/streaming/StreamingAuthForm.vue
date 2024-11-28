<template>
  <el-form :model="record" label-position="top">
    <el-form-item prop="mechanism" :label="t('streaming.authType')">
      <el-select v-model="record.mechanism" :disabled="isEdit">
        <el-option v-for="item in authTypeList" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item prop="user_name" :label="t('auth.username')">
      <el-input v-model="record.user_name" clearable :disabled="isEdit" />
    </el-form-item>
    <el-form-item prop="password" :label="t('common.password')">
      <el-input
        type="password"
        v-model="record.password"
        show-password
        autocomplete="new-password"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { StreamAuthType } from '@emqx/shared-ui-constants'
import { useLocale } from '@emqx/shared-ui-utils'
import { computed } from 'vue'

interface StreamRecord {
  user_name: string
  mechanism: StreamAuthType
  password?: string
}

const props = defineProps<{
  modelValue: StreamRecord
  isEdit: boolean
  // TODO: try to optimize
  lang: 'en' | 'zh' | 'ja'
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: StreamRecord): void
}>()

const { t } = useLocale(props.lang)

const record = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const authTypeList = [StreamAuthType.Plain, StreamAuthType.SHA256]
</script>

<style lang="scss" />
