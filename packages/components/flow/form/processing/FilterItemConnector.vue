<template>
  <div class="filter-item-connector">
    <svg ref="SVGCom" id="svg-container" width="100%" height="100%">
      <circle
        v-for="(_item, $index) in circleList"
        class="circle dot"
        :key="$index"
        :cx="DOT_RADIUS"
        :cy="getNodeYPosition($index)"
        :r="DOT_RADIUS"
        :_index="$index"
      ></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { numToFixed } from '@emqx/shared-ui-utils'
import { isFunction, isUndefined } from 'lodash'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  DOT_RADIUS,
  INPUT_HEIGHT,
  INPUT_MARGIN_BOTTOM,
} from '../../composables/useFilterConnectorInForm'

const props = defineProps({
  data: {
    type: Object,
  },
})

const emit = defineEmits(['connected'])

const getNodeYPosition = (index: number) => {
  return index * (INPUT_HEIGHT + INPUT_MARGIN_BOTTOM) + DOT_RADIUS
}

const circleList = computed(() => {
  const { startIndex, endIndex } = props.data || {}
  if (isUndefined(startIndex) || isUndefined(endIndex)) {
    return []
  }
  return new Array(endIndex - startIndex + 1).fill({}).map((_item, index) => ({ index }))
})

const SVGCom = ref()
let sourcePoint: null | { x: string; y: string } = null
const lines: Array<SVGLineElement> = []

let drawStartIndex = -1
let drawEndIndex = -1

const getRelativePositionInSVG = (event: any) => {
  const rect = SVGCom.value.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

const getIntersectedCircle = (_x: number, y: number) => {
  for (let i = 0; i < circleList.value.length; i++) {
    const circle = SVGCom.value.querySelector('.circle:nth-of-type(' + (i + 1) + ')')
    const cy = numToFixed(parseFloat(circle.getAttribute('cy')))
    const distance = Math.abs(cy - y)
    if (distance <= numToFixed(parseFloat(circle.getAttribute('r')) * 3)) {
      return circle
    }
  }
  return null
}

const handleMouseDown = (event: any) => {
  if (event?.target?.classList?.contains('circle')) {
    const circle = event.target
    drawStartIndex = parseInt(circle.getAttribute('_index'))
    const x1 = parseFloat(circle.getAttribute('cx')).toFixed(2)
    const y1 = parseFloat(circle.getAttribute('cy')).toFixed(2)
    sourcePoint = { x: x1, y: y1 }

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('class', 'line')
    line.setAttribute('x1', x1)
    line.setAttribute('y1', y1)
    line.setAttribute('x2', x1)
    line.setAttribute('y2', y1)
    SVGCom.value.appendChild(line)
    lines.push(line)
  }
}

const handleMouseMove = (event: any) => {
  if (sourcePoint) {
    const y2 = (event.clientY - SVGCom.value.getBoundingClientRect().top).toFixed(2)
    lines[lines.length - 1].setAttribute('x2', sourcePoint.x)
    lines[lines.length - 1].setAttribute('y2', y2)
  }
}

const handleMouseUp = (event: any) => {
  if (sourcePoint && props.data) {
    const { x, y } = getRelativePositionInSVG(event)
    const circle = getIntersectedCircle(x, y)
    if (circle) {
      const { startIndex } = props.data
      drawEndIndex = parseInt(circle.getAttribute('_index'))
      const start = Math.min(drawStartIndex, drawEndIndex)
      const end = Math.max(drawStartIndex, drawEndIndex)
      if (start !== end) {
        emit('connected', { startIndex: startIndex + start, endIndex: startIndex + end })
      }
    }

    lines.pop()?.remove()
    sourcePoint = null
  }
}

const bindEvents = () => {
  SVGCom.value.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const unbindEvent = () => {
  if (isFunction(SVGCom.value?.removeEventListener)) {
    SVGCom.value.removeEventListener('mousedown', handleMouseDown)
  }
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

onMounted(bindEvents)
onUnmounted(unbindEvent)
</script>

<style lang="scss">
.filter-item-connector {
  .dot {
    cursor: pointer;
  }
  .line {
    cursor: crosshair;
  }
}
</style>
