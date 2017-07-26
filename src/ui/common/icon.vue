<template>
  <div class="qxw icon"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div :class="!autoHeight ? 'valign-center' : ''">
      <template v-if="iconPosition === 'start' || iconPosition === 'top'">
        <img v-if="src" class="qxw-img" :style="iconStyle" :src="src"/>
        <span v-if="icon" :class="['qxw-icon', icon]" :style="iconStyle"/>
        <template v-if="text">{{ text }}</template>
      </template>
      <template v-if="iconPosition === 'end' || iconPosition === 'bottom'">
        <template v-if="text">{{ text }}</template>
        <span v-if="icon" :class="['qxw-icon', icon]" :style="iconStyle"/>
        <img v-if="src" class="qxw-img" :style="iconStyle" :src="src"/>
      </template>
    </div>
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
      default: 4
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
          styleObj.width = size
        } else {
          styleObj.fontSize = size
        }
      }
      if (this.text) {
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
  cursor: default;
}

.qxw.icon > div:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qxw.icon .qxw-icon {
  padding: 1px;
}

.qxw.icon .qxw-img,
.qxw.icon .qxw-icon {
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}

.qxw.icon.vertical .qxw-img,
.qxw.icon.vertical .qxw-icon {
  display: block;
  margin: 0 auto;
}

/* presets */
.qxw.icon.x-small .qxw-img {
  width: 8px;
}
.qxw.icon.small .qxw-img {
  width: 16px;
}
.qxw.icon.medium .qxw-img {
  width: 24px;
}
.qxw.icon.large .qxw-img {
  width: 32px;
}
.qxw.icon.x-large .qxw-img {
  width: 64px;
}
.qxw.icon.x-small .qxw-icon {
  font-size: 8px;
}
.qxw.icon.small .qxw-icon {
  font-size: 16px;
}
.qxw.icon.medium .qxw-icon {
  font-size: 24px;
}
.qxw.icon.large .qxw-icon {
  font-size: 32px;
}
.qxw.icon.x-large .qxw-icon {
  font-size: 64px;
}
</style>
