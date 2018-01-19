<template lang="pug">
  include ../mixins.pug
  +icon()(class="menu")
    qx-contextmenu(
      :auto-close="autoClose"
      :show-on="showOn"
      :overlay-position="overlayPosition"
      ref="root"
    )
      slot
</template>

<script>
import icon from '../common/icon.vue'
import embeddedOverlay from '../overlay/overlay-embedded'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-menu',
  extends: icon,
  mixins: [embeddedOverlay('click', 'bottom-start', false)],
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
