<template>
  <el-form ref="form" :model="record" label-position="top">
    <el-form-item prop="stream_name">
      <template #label>
        {{ t('streaming.streamName') }}
        <component v-if="tipComponent" :is="tipComponent" :content="t('streaming.streamNameTip')" />
      </template>
      <el-input v-model="record.stream_name" />
    </el-form-item>
    <el-form-item prop="stream_type">
      <template #label>
        {{ t('streaming.streamType') }}
        <component v-if="tipComponent" :is="tipComponent" :content="t('streaming.streamTypeTip')" />
      </template>
      <el-select v-model="record.stream_type" @change="handleStreamTypeChange">
        <el-option
          v-for="item in allStreamTypes"
          :key="item"
          :value="item"
          :label="$t(`streaming.streamTypeLabel.${item}`)"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="record.stream_type === StreamType.Default" prop="mqtt_topic_filter">
      <template #label>
        {{ t('streaming.mqttTopic') }}
        <component v-if="tipComponent" :is="tipComponent" :content="t('streaming.mqttTopicTip')" />
      </template>
      <el-input v-model="record.mqtt_topic_filter" />
    </el-form-item>
    <el-form-item v-else prop="partition_number" :label="t('streaming.partitionNum')">
      <el-input-number
        v-model="record.partition_number"
        :min="1"
        :max="64"
        :precision="0"
        controls-position="right"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { StreamType } from '@emqx/shared-ui-constants'
import { useLocale } from '@emqx/shared-ui-utils'
import { Component, computed, defineEmits, defineProps } from 'vue'

interface StreamRecord {
  stream_name: string
  stream_type: StreamType
  mqtt_topic_filter?: string
  partition_number: number
  retention_time: string
}

const props = defineProps<{
  tipComponent?: Component
  modelValue: StreamRecord
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

const allStreamTypes = Object.values(StreamType)

const handleStreamTypeChange = (val: StreamType) => {
  const { stream_name, stream_type } = record.value
  if (val === StreamType.Default) {
    record.value = {
      stream_name,
      stream_type,
      mqtt_topic_filter: '',
    } as StreamRecord
  } else {
    record.value = {
      stream_name,
      stream_type,
      partition_number: 16,
    } as StreamRecord
  }
}
</script>

<style lang="scss"></style>
