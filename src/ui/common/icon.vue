<template>
  <div class="qxw icon"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div :class="!autoHeight ? 'valign-center' : ''">
      <template v-if="iconPosition === 'start' || iconPosition === 'top'">
        <img v-if="src" class="img-icon" :style="iconStyle" :src="src"/>
        <span v-if="icon" :class="['fnt-icon', icon]" :style="iconStyle"/>
        <span v-if="text" class="text">{{ text }}</span>
      </template>
      <template v-if="iconPosition === 'end' || iconPosition === 'bottom'">
        <span v-if="text" class="text">{{ text }}</span>
        <span v-if="icon" :class="['fnt-icon', icon]" :style="iconStyle"/>
        <img v-if="src" class="img-icon" :style="iconStyle" :src="src"/>
      </template>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import rect from '../rect.vue'
import { distinctValues } from '../../core/prop-types'

const sizes = {
  'x-small': null,
  small: null,
  medium: null,
  large: null,
  'x-large': null
}

export default {
  name: 'qx-icon',
  mixins: [rect],
  props: {
    spacing: {
      type: Number,
      default: 0
    },
    iconPosition: distinctValues('start', ['start', 'end', 'top', 'bottom']),
    align: distinctValues('', ['start', 'center', 'end']),
    size: {
      type: [Number, String],
      default: 'medium'
    },
    color: String,
    icon: String, // font-icon name OR
    src: String, // image src
    text: String
  },
  computed: {
    classes () {
      const classes = rect.computed.classes.call(this)
      if (!this.autoHeight) {
        classes['valign-container'] = true
      }
      if (this.align) {
        classes[`text-align-${this.align}`] = true
      }
      if (this.iconPosition === 'top' || this.iconPosition === 'bottom') {
        classes.vertical = true
      }
      if (this.size in sizes) {
        classes[this.size] = true
      }
      if (this.icon) {
        classes['with-icon'] = true
      }
      return classes
    },
    boxStyle () {
      const boxStyle = rect.computed.boxStyle.call(this)
      if (this.color) {
        boxStyle.color = this.color
      }
      return boxStyle
    },
    iconStyle () {
      const styleObj = {}
      if (!(this.size in sizes)) {
        const size = isNaN(this.size) ? this.size : `${this.size}px`
        if (this.src) {
          styleObj.height = size
        } else {
          styleObj.fontSize = size
        }
      }
      if (this.text && this.spacing) {
        if (this.iconPosition === 'start') {
          styleObj.margin = `0 ${this.spacing}px 0 0`
        } else if (this.iconPosition === 'end') {
          styleObj.margin = `0 0 0 ${this.spacing}px`
        } else if (this.iconPosition === 'top') {
          styleObj.margin = `0 auto ${this.spacing}px auto`
        } else if (this.iconPosition === 'bottom') {
          styleObj.margin = `${this.spacing}px auto 0 auto`
        }
      }
      return styleObj
    }
  }
}
</script>

<style>
.qxw.icon {
  text-align: center;
}

.qxw.icon > div:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: inherit;
  white-space: nowrap;
}

.qxw.icon > div:first-child .fnt-icon {
  padding: 1px;
}

.qxw.icon > div:first-child .text {
  vertical-align: middle;
  cursor: default;
}

.qxw.icon.vertical > div:first-child .text {
  vertical-align: inherit;
}

.qxw.icon > div:first-child .img-icon,
.qxw.icon > div:first-child .fnt-icon {
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
}

.qxw.icon.vertical > div:first-child .img-icon,
.qxw.icon.vertical > div:first-child .fnt-icon {
  display: block;
  margin: 0 auto;
}

/* presets */
.qxw.icon.x-small > div:first-child .img-icon {
  height: 8px;
}
.qxw.icon.small > div:first-child .img-icon {
  height: 16px;
}
.qxw.icon.medium > div:first-child .img-icon {
  height: 24px;
}
.qxw.icon.large > div:first-child .img-icon {
  height: 32px;
}
.qxw.icon.x-large > div:first-child .img-icon {
  height: 64px;
}
.qxw.icon.x-small > div:first-child .fnt-icon {
  font-size: 8px;
}
.qxw.icon.small > div:first-child .fnt-icon {
  font-size: 16px;
}
.qxw.icon.medium > div:first-child .fnt-icon {
  font-size: 24px;
}
.qxw.icon.large > div:first-child .fnt-icon {
  font-size: 32px;
}
.qxw.icon.x-large > div:first-child .fnt-icon {
  font-size: 64px;
}
</style>
