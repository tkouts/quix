<template>
  <input class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)">
  </input>
</template>

<script>
import rect from '../rect.vue'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-text-input',
  mixins: [rect],
  props: {
    value: null,
    type: distinctValues('', ['text', 'password'])
  }
}
</script>

<style>
INPUT.qxw {
  outline: none;
}
</style>
