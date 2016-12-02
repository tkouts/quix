<template>
  <div class="qxw app"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :touch-action="touchAction"
      @pointerdown.capture="closeOverlay">
    <slot></slot>
  </div>
</template>

<script>
import rect from './rect.vue'
import overlayContainer from './overlay/overlay-container'
import { repaint } from '../core/repaint'
import { MasterComponents } from '../core/runtime'

export default {
  name: 'qx-app',
  mixins: [rect, overlayContainer],
  props: {
    touchAction: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      theme: {
        button: {
          border: [1]
        },
        slider: {
          handle: {
            width: 16,
            height: 16
          }
        }
      }
    }
  },
  beforeCreate () {
    this.app = this
    this.$root.app = this
    this.dynamic = new MasterComponents()
  },
  beforeMount () {
    this.parent = this.$root
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.closeOverlay()
      repaint.call(this)
    }, true)
    window.addEventListener('scroll', () => {
      this.closeOverlay()
    }, true)
    this.ready = false
    this.$nextTick(() => {
      repaint.call(this)
      this.ready = true
    })
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
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
}
</style>
