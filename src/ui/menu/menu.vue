<template>
  <div class="qxw icon menu"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div :class="computedHeight ? 'valign-center' : ''">
      <img v-if="src" :style="imgStyle" :src="src"/>
      <label v-if="text">{{ text }}</label>
    </div>
    <qx-contextmenu
        :auto-close="autoClose"
        :show-on="showOn"
        :overlay-position="overlayPosition"
        ref="root">
      <slot></slot>
    </qx-contextmenu>
  </div>
</template>

<script>
import icon from '../common/icon.vue'
import embeddedOverlay from '../overlay/overlay-embedded'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-menu',
  mixins: [icon, embeddedOverlay('click', 'bottom', false)],
  props: {
    align: distinctValues('start', ['start', 'center', 'end'])
  },
  computed: {
    classes () {
      const classes = icon.computed.classes.call(this)
      classes.active = this.open
      return classes
    }
  }
}
</script>

<style>
.qxw.icon.menu {
  padding: 4px 8px;
}

.qxw.icon.menu.active {
  background-color: #3F7ED1;
  color: white;
}
</style>
