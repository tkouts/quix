<template lang="pug">
  include ../mixins.pug
  +base()
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
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'QxMenuBar',
  extends: rect,
  qxClass: 'menu-bar',
  props: {
    spacing: {
      type: Number,
      default: 0,
    },
    justify: distinctValues('', ['start', 'end', 'center']),
  },
  computed: {
    menus() {
      return this.children.filter(c => c.showOn)
    },
    showMenusOn() {
      const oneOpen = this.menus.some(o => o.open)
      return oneOpen ? 'pointerenter' : 'click'
    },
  },
  watch: {
    showMenusOn(val) {
      this.menus.forEach((menu) => {
        const m = menu
        m.showOn = val
      })
    },
  },
  beforeCreate() {
    this._retainPercentageX = true
    this._retainPercentageY = true
  },
}
</script>

<style>
.qxw.menu-bar {
  padding: 0 8px;
}
</style>
