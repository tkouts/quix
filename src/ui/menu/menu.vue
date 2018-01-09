<template>
  <div class="qxw icon menu"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :data-style="laddaStyle">
    <div :class="{'valign-center' : !autoHeight,
                  'ladda-label': laddaStyle != null}">
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
import ladda from '../common/ladda'
import embeddedOverlay from '../overlay/overlay-embedded'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-menu',
  extends: icon,
  mixins: [embeddedOverlay('click', 'bottom-start', false), ladda],
  props: {
    align: distinctValues('start', ['start', 'center', 'end'])
  },
  computed: {
    classes () {
      const classes = icon.computed.classes.call(this)
      classes.active = this.open
      classes['ladda-button'] = this.laddaStyle != null
      return classes
    }
  }
}
</script>

<style>
.qxw.icon.menu {
  padding: 4px 8px;
}

.qxw.icon.menu.ladda-button {
  transition: all .3s cubic-bezier(.175,.885,.32,1.275), color 1ms, background-color 1ms !important;
}

.qxw.icon.menu[data-loading] {
  pointer-events: none;
}

.qxw.icon.menu.active {
  background-color: #3F7ED1;
  color: white;
}
</style>
