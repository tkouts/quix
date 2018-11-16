<template lang="pug">
  include mixins.pug
  +base()(v-visible="ready" :touch-action="touchAction")
    slot
</template>

<script>
import rect from './rect.vue'
import overlayContainer from './overlay/overlay-container'
import { repaint } from '../core/repaint'
import { MasterComponents } from '../core/runtime'

export default {
  name: 'qx-app',
  extends: rect,
  qxClass: 'app',
  mixins: [overlayContainer],
  props: {
    touchAction: {
      type: String,
      default: 'auto'
    }
  },
  beforeCreate () {
    this.$root.app = this.app = this
    this.dynamic = new MasterComponents()
  },
  mounted () {
    window.addEventListener('resize', () => {
      repaint.call(this)
    }, true)
  },
  computed: {
    repaintBox () {
      return this
    }
  }
}
</script>

<style>
.qxw.app {
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
</style>
