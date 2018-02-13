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
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-menu-bar',
  extends: rect,
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
    menus () {
      return this.children.filter(c => c.showOn)
    },
    showMenusOn () {
      const oneOpen = this.menus.some(o => o.open)
      return oneOpen ? 'pointerenter' : 'click'
    }
  },
  watch: {
    showMenusOn (val) {
      this.menus.forEach((menu) => {
        const m = menu
        m.showOn = val
      })
    }
  }
}
</script>

<style>
.qxw.menu-bar {
  padding: 0 8px;
}
</style>
