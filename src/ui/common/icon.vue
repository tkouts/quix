<template>
  <div class="qxw icon"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div :class="computedHeight ? 'valign-center' : ''">
      <template v-if="imgAlign === 'start' || imgAlign === 'top'">
        <img v-if="src" :style="imgStyle" :src="src"/>
        <template v-if="text">{{ text }}</template>
      </template>
      <template v-if="imgAlign === 'end' || imgAlign === 'bottom'">
        <template v-if="text">{{ text }}</template>
        <img v-if="src" :style="imgStyle" :src="src"/>
      </template>
    </div>
  </div>
</template>

<script>
import rect from '../rect.vue'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-icon',
  mixins: [rect],
  props: {
    spacing: {
      type: Number,
      default: 4
    },
    imgAlign: distinctValues('start', ['start', 'end', 'top', 'bottom']),
    align: distinctValues('center', ['start', 'center', 'end']),
    imgWidth: String,
    imgHeight: String,
    src: String,
    text: String
  },
  computed: {
    classes () {
      const classes = rect.computed.classes.call(this)
      if (this.computedHeight) {
        classes['valign-container'] = true
      }
      if (this.align) {
        classes[`text-align-${this.align}`] = true
      }
      if (this.imgAlign === 'top' || this.imgAlign === 'bottom') {
        classes.vertical = true
      }
      return classes
    },
    imgStyle () {
      const styleObj = {
        width: this.imgWidth,
        height: this.imgHeight
      }
      if (this.text) {
        if (this.imgAlign === 'start') {
          styleObj.margin = `0 ${this.spacing}px 0 0`
        } else if (this.imgAlign === 'end') {
          styleObj.margin = `0 0 0 ${this.spacing}px`
        } else if (this.imgAlign === 'top') {
          styleObj.margin = `0 auto ${this.spacing}px auto`
        } else if (this.imgAlign === 'bottom') {
          styleObj.margin = `${this.spacing}px auto 0 auto`
        }
      }
      return styleObj
    }
  }
}
</script>

<style>
.qxw.icon img,
.qxw.icon label {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
}

.qxw.icon.vertical img,
.qxw.icon.vertical label {
    display: block;
    margin: 0 auto;
}
</style>
