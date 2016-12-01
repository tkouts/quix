<template>
  <label class="qxw label"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    {{ $text }}
  </label>
</template>

<script>
import rect from '../rect.vue'
import { mutableString, mutableBoolean } from '../../core/prop-types'

export default {
  name: 'qx-label',
  mixins: [rect],
  props: {
    text: mutableString(),
    align: mutableString('', ['start', 'center', 'end']),
    wrap: mutableBoolean
  },
  computed: {
    classes () {
      const classes = rect.computed.classes.call(this)
      classes.wrap = this.$wrap
      if (this.$align) {
        classes[`align-${this.$align}`] = true
      }
      return classes
    }
  }
}
</script>

<style>
.qxw.label {
  cursor: default;
  white-space: nowrap;
  text-align: start;
  text-overflow: ellipsis;
}

.qxw.label.wrap {
  white-space: normal;
}
</style>
