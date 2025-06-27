<template>
  <el-autocomplete
    v-model="inputValue"
    :fetch-suggestions="getList"
    clearable
    class="common-fields"
    popper-class="is-wider"
    @change="handleChange"
    @select="handleChange($event.value)"
  />
</template>

<script setup lang="ts">
import { ElAutocomplete } from 'element-plus'
import { computed } from 'vue'
import RuleFieldList from '../json/ruleField.json'
import type { FetchSuggestionsCallback } from '../../flow/types'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'change'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const totalList = RuleFieldList.map((value) => ({ value }))
const getList = (queryString: string, cb: FetchSuggestionsCallback) => {
  if (!queryString) {
    cb(totalList)
  }
  const ret = totalList.filter(({ value }) => value.includes(queryString))
  cb(ret)
}

const handleChange = (val: string) => {
  emit('change', val)
}
</script>
