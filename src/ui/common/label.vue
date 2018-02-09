<template lang="pug">
  include ../mixins.pug
  +base('label')(class="label") {{text}}
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
    wrap: Boolean,
    color: String
  },
  computed: {
    boxStyle () {
      const boxStyle = rect.computed.boxStyle.call(this)
      if (this.color) {
        boxStyle.color = this.color
      }
      return boxStyle
    },
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
  text-align: left;
}

.qxw.label.wrap {
  white-space: normal;
}
</style>
