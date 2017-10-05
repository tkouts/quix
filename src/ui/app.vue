<template>
  <div class="qxw app"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      v-visible="ready"
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
        'qx-button': {
          border: '1'
        },
        'qx-menu-bar': {
          padding: '0 8'
        },
        'qx-contextmenu': {
          border: '1'
        },
        'qx-overlay': {
          border: '1'
        },
        'qx-text-input': {
          border: '1',
          padding: '2'
        },
        'qx-text-area': {
          border: '1',
          padding: '2'
        },
        'qx-slider': {
          handle: {
            width: 16,
            height: 16
          },
          slot: {
            border: '0',
            height: 4
          }
        }
      }
    }
  },
  beforeCreate () {
    this.$root.app = this.app = this
    this.dynamic = new MasterComponents()
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.closeOverlay()
      repaint.call(this)
    }, true)
    window.addEventListener('scroll', () => {
      this.closeOverlay()
    }, true)
  },
  computed: {
    repaintBox () {
      return this
    },
    governance () {
      return rect.governance
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
