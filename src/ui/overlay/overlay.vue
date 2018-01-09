<template>
  <div class="qxw overlay"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle]"
      @click.stop
      @pointerdown.capture="closeOverlay"
      v-if="open">
    <slot></slot>
    <div x-arrow v-if="arrow"/>
  </div>
</template>

<script>
import Popper from 'popper.js'
import rect from '../rect.vue'
import modifiers from './modifiers'
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
    overlayPosition: distinctValues('bottom', [
      'top', 'right', 'bottom', 'right',
      'top-start', 'right-start', 'bottom-start', 'right-start',
      'top-end', 'right-end', 'bottom-end', 'right-end'
    ]),
    autoClose: Boolean,
    pointerReference: Boolean,
    arrow: Boolean
  },
  beforeCreate () {
    this.x = null
    this.y = null
    this.popperJS = null
  },
  data () {
    return {
      open: false
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
    if (this.popperJS) {
      this.popperJS.destroy()
    }
    this.app.$el.removeChild(this.$el)
  },
  computed: {
    classes () {
      const classes = rect.computed.classes.call(this)
      if (this.arrow) {
        classes['with-arrow'] = true
      }
      return classes
    },
    computedMargin () {
      return null
    },
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
    }
  },
  methods: {
    contains (el) {
      let contains = this.open && rect.methods.contains.call(this, el)
      if (!contains && !this.pointerReference) {
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
    update () {
      if (this.open) {
        this.popperJS.update()
      }
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
        if (this.popperJS) {
          this.popperJS.destroy()
        }
        this.$emit('close', this)
      } else {
        this.parentOverlay.activeOverlay = this
        if (this.autoClose) {
          this.parentOverlay.$el.addEventListener('pointerover', this.pointerWatcher)
        }
        let reference
        if (this.pointerReference) {
          reference = {
            getBoundingClientRect: () => ({
              left: this.x,
              top: this.y,
              right: this.x,
              bottom: this.y,
              width: 0,
              height: 0
            }),
            clientWidth: 0,
            clientHeight: 0
          }
        } else {
          reference = this.parent.$el
        }
        this.$nextTick(() => {
          this.popperJS = new Popper(reference, this.$el, {
            placement: this.overlayPosition,
            modifiers
          })
          this.$emit('open', this)
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
  top: 0;
  left: 0;
  overflow: visible;
}

.qxw.overlay.with-arrow[x-placement^="bottom"] {
  margin-top: 5px;
}

.qxw.overlay.with-arrow[x-placement^="top"] {
  margin-bottom: 5px;
}

.qxw.overlay.with-arrow[x-placement^="left"] {
  margin-right: 5px;
}

.qxw.overlay.with-arrow[x-placement^="right"] {
  margin-left: 5px;
}

.qxw.overlay[x-out-of-boundaries] {
  visibility: hidden;
  pointer-events: none;
}

.qxw.overlay.with-arrow [x-arrow] {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: transparent;
  position: absolute;
}

.qxw.overlay.with-arrow[x-placement^="bottom"] [x-arrow] {
  border-top-width: 0;
  border-bottom-color: inherit;
  top: -6px;
  left: calc(50% - 6px);
}

.qxw.overlay.with-arrow[x-placement^="top"] [x-arrow] {
  border-bottom-width: 0;
  border-top-color: inherit;
  top: 100%;
  left: calc(50% - 6px);
}

.qxw.overlay.with-arrow[x-placement^="right"] [x-arrow] {
  border-left-width: 0;
  border-right-color: inherit;
  left: -6px;
  top: calc(50% - 6px);
}

.qxw.overlay.with-arrow[x-placement^="left"] [x-arrow] {
  border-right-width: 0;
  border-left-color: inherit;
  left: 100%;
  top: calc(50% - 6px);
}
</style>
