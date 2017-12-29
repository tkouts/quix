<template>
  <div class="qxw fixed overlay"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      @click.stop
      @pointerdown.capture="closeOverlay"
      v-if="open">
    <slot></slot>
  </div>
</template>

<script>
import rect from '../rect.vue'
import overlayContainer from './overlay-container'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-overlay',
  mixins: [rect, overlayContainer],
  props: {
    showOn: distinctValues('contextmenu', [
      'click',
      'contextmenu',
      'pointerenter',
      'pointerdown',
      'tap',
      '']),
    overlayPosition: distinctValues('bottom', ['top', 'right', 'bottom', 'right']),
    autoClose: Boolean
  },
  data () {
    return {
      open: false,
      x: 0,
      y: 0
    }
  },
  mounted () {
    if (this.showOn) {
      this.parent.$el.addEventListener(this.showOn, this.showOverlay)
    }
    // DOM transfer
    if (this.parent !== this.app) {
      this.app.$el.appendChild(this.$el)
    }
  },
  beforeDestroy () {
    this.parent.$el.removeEventListener(this.showOn, this.showOverlay)
    if (this.autoClose) {
      this.parentOverlay.$el.removeEventListener('pointerover', this.pointerWatcher)
    }
    this.app.$el.removeChild(this.$el)
  },
  computed: {
    toggle () {
      return ['pointerdown', 'click'].indexOf(this.showOn) > -1
    },
    parentOverlay () {
      // locate parent overlay
      let parentOverlay = this.app
      let parent = this.parent
      if (this === parent.$refs.root) {
        parent = parent.parent
      }
      while (parent) {
        if (parent.showOn || (parent.$refs.root && parent.$refs.root.showOn)) {
          parentOverlay = parent.$refs.root || parent
          break
        }
        parent = parent.parent
      }
      return parentOverlay
    },
    computedLeft () {
      return this.x
    },
    computedTop () {
      return this.y
    }
  },
  methods: {
    contains (el) {
      let contains = this.open && rect.methods.contains.call(this, el)
      if (!contains && this.overlayPosition) {
        contains = this.parent.$el.contains(el)
      }
      return contains
    },
    showOverlay (evt) {
      if (this.toggle) {
        this.open = !this.open
      } else if (!this.open) {
        this.y = evt.pageY
        this.x = evt.pageX
        this.open = true
      }
      evt.preventDefault()
      evt.stopPropagation()
    },
    pointerWatcher (evt) {
      const target = evt.target
      const contains = this.contains(target)
      if (!contains) {
        this.open = false
      }
    }
  },
  watch: {
    open (isOpen) {
      if (!isOpen) {
        if (this.parentOverlay.activeOverlay === this) {
          this.parentOverlay.activeOverlay = null
        }
        if (this.autoClose) {
          this.parentOverlay.$el.removeEventListener('pointerover', this.pointerWatcher)
        }
        this.overlays.forEach((o) => {
          const childOverlay = o
          childOverlay.open = false
        })
        this.$emit('close', this)
      } else {
        this.parentOverlay.activeOverlay = this
        if (this.autoClose) {
          this.parentOverlay.$el.addEventListener('pointerover', this.pointerWatcher)
        }
        const parentRect = this.parent.$el.getBoundingClientRect()
        if (this.overlayPosition) {
          if (this.overlayPosition === 'bottom') {
            this.y = parentRect.top + parentRect.height
            this.x = parentRect.left
          } else if (this.overlayPosition === 'right') {
            this.y = parentRect.top
            this.x = parentRect.left + parentRect.width
          }
        }
        this.$emit('open', this)
        // reposition if necessary
        this.$nextTick(function repositionOverlay () {
          if (this.open) {
            const menuWidth = this.outerWidth()
            const menuHeight = this.outerHeight()
            if (this.overlayPosition === 'bottom') {
              if (this.y + menuHeight > window.innerHeight) {
                // move to top
                this.y = parentRect.top - menuHeight
              }
            } else if (this.overlayPosition === 'right') {
              if (this.x + menuWidth > window.innerWidth) {
                // move to left
                this.x = parentRect.left - menuWidth
              }
            }
            if (this.overlayPosition !== 'right' && this.overlayPosition !== 'left') {
              if (this.x + menuWidth > window.innerWidth) {
                this.x = window.innerWidth - menuWidth
              }
            }
            if (this.overlayPosition !== 'top' && this.overlayPosition !== 'bottom') {
              if (this.y + menuHeight > window.innerHeight) {
                this.y = window.innerHeight - menuHeight
              }
            }
          }
        })
      }
    },
    showOn (val, oldVal) {
      this.parent.$el.addEventListener(val, this.showOverlay)
      if (oldVal) {
        this.parent.$el.removeEventListener(oldVal, this.showOverlay)
      }
    }
  }
}
</script>

<style>
.qxw.overlay {
  z-index: 9999;
}
</style>
