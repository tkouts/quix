<template>
  <textarea class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :value="value"
      @input="$emit('input', $event.target.value)">
  </textarea>
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-text-area',
  mixins: [rect],
  props: ['value']
}
</script>

<style>
TEXTAREA.qxw {
  outline: none;
  resize: none;
  font: inherit;
}
</style>
