<template lang="pug">
  include ../mixins.pug
  +base('label') {{text}}
</template>

<script>
import rect from '../rect.vue'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'QxLabel',
  mixins: [rect],
  qxClass: 'label',
  props: {
    text: {
      type: String,
      default: '',
    },
    align: distinctValues('', ['start', 'center', 'end']),
    wrap: Boolean,
    color: {
      type: String,
      default: null,
    },
  },
  computed: {
    boxStyle() {
      const boxStyle = rect.computed.boxStyle.call(this)
      if (this.color) {
        boxStyle.color = this.color
      }
      return boxStyle
    },
    classes() {
      const classes = {}
      classes.wrap = this.wrap
      if (this.align) {
        classes[`text-align-${this.align}`] = true
      }
      return [...rect.computed.classes.call(this), classes]
    },
  },
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
