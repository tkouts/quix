<template lang="pug">
  include ../mixins.pug
  +base()(class="menu-bar")
    qx-hbox(
      height="100%"
      items-align="stretch"
      :spacing="spacing"
      :justify="justify"
      ref="root"
    )
      slot
</template>

<script>
import rect from '../rect.vue'
import box from '../box/box'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-menu-bar',
  extends: rect,
  governance: box.hbox.governance,
  props: {
    spacing: {
      type: Number,
      default: 0
    },
    justify: distinctValues('', ['start', 'end', 'center'])
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
