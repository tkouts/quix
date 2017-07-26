<template>
  <div class="qxw icon menu"
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
  mixins: [embeddedOverlay('click', 'bottom', false)],
  extends: icon,
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
