<template>
  <div class="qxw menu-bar"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <qx-hbox
        height="100%"
        width="100%"
        items-align="stretch"
        :spacing="$spacing"
        :justify="$justify"
        ref="root">
      <slot></slot>
    </qx-hbox>
  </div>
</template>

<script>
import rect from '../rect.vue'
import { mutableInt, mutableString, cssBox } from '../../core/prop-types'

export default {
  name: 'qx-menu-bar',
  mixins: [rect],
  props: {
    spacing: mutableInt(0),
    justify: mutableString('', ['start', 'end', 'center']),
    padding: Object.assign({}, cssBox, { default: '0 8' })
  },
  beforeCreate () {
    this._retainPercentageX = true
    this._retainPercentageY = true
  },
  computed: {
    showMenusOn () {
      const oneOpen = this.overlays.some(o => o.open)
      return oneOpen ? 'pointerenter' : 'click'
    }
  },
  watch: {
    showMenusOn (val) {
      this.overlays.forEach((menu) => {
        const m = menu
        m.showOn = val
      })
    }
  }
}
</script>

<style>
</style>
