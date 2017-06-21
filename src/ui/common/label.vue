<template>
  <label class="qxw label"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    {{ text }}
  </label>
</template>

<script>
import rect from '../rect.vue'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-label',
  mixins: [rect],
  props: {
    text: String,
    align: distinctValues('', ['start', 'center', 'end']),
    wrap: Boolean
  },
  computed: {
    classes () {
      const classes = rect.computed.classes.call(this)
      classes.wrap = this.wrap
      if (this.align) {
        classes[`text-align-${this.align}`] = true
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
  text-overflow: ellipsis;
}

.qxw.label.wrap {
  white-space: normal;
}
</style>
