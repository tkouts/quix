<template>
  <input class="qxw input"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :value="value"
      @input="$emit('input', $event.target.value)">
  </input>
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-text-input',
  mixins: [rect],
  props: ['value']
}
</script>

<style>
INPUT.qxw {
  outline: none;
}
</style>
