<template>
  <CustomFormItem prop="transport_options.connect_timeout" :readonly="readonly">
    <template #label>
      {{ t('flow.connectTimeout') }}
    </template>
    <component :is="inputWithUnitComponent" v-model="transportOptions.connect_timeout" />
  </CustomFormItem>
  <CustomFormItem prop="transport_options.recv_timeout" :readonly="readonly">
    <template #label>
      {{ t('flow.recvTimeout') }}
    </template>
    <component :is="inputWithUnitComponent" v-model="transportOptions.recv_timeout" />
  </CustomFormItem>
  <CustomFormItem prop="transport_options.checkout_timeout" :readonly="readonly">
    <template #label>
      {{ t('flow.checkoutTimeout') }}
      <component :is="tipComponent" :content="t('flow.checkoutTimeoutDesc')" />
    </template>
    <component :is="inputWithUnitComponent" v-model="transportOptions.checkout_timeout" />
  </CustomFormItem>
  <CustomFormItem prop="transport_options.max_connections" :readonly="readonly">
    <template #label>
      {{ t('flow.maxConn') }}
      <component :is="tipComponent" :content="t('flow.maxConnectionsDesc')" />
    </template>
    <component :is="inputNumberComponent" v-model="transportOptions.max_connections" />
  </CustomFormItem>
</template>

<script lang="ts" setup>
import { Component, computed } from 'vue'
import CustomFormItem from '../../../common/CustomFormItem.vue'
import { useFlowLocale } from '../../composables/useFlowLocale'
import { AITransportOptions } from '../../types'

const { t } = useFlowLocale()

const props = defineProps<{
  modelValue: AITransportOptions
  readonly: boolean
  inputWithUnitComponent: Component
  inputNumberComponent: Component
  tipComponent: Component
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: AITransportOptions): void
}>()

const transportOptions = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
