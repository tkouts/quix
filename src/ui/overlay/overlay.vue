<template lang="pug">
  include ../mixins.pug
  +base()(
    :style="[boxStyle, paddingStyle, sizeStyle]"
    @click.stop
    v-if="open"
  )
    slot
    div(data-popper-arrow v-if="arrow")
</template>

<script>
import { createPopper } from '@popperjs/core'
import rect from '../rect.vue'
// import getModifiers from './modifiers'
import overlayContainer from './overlay-container'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'QxOverlay',
  extends: rect,
  qxClass: 'overlay',
  mixins: [overlayContainer],
  props: {
    showOn: distinctValues('contextmenu', [
      'click',
      'contextmenu',
      'pointerenter',
      'pointerdown',
      '']),
    overlayPosition: distinctValues('bottom-start', [
      'top', 'right', 'bottom', 'right',
      'top-start', 'right-start', 'bottom-start', 'right-start',
      'top-end', 'right-end', 'bottom-end', 'right-end',
    ]),
    autoClose: Boolean,
    pointerReference: Boolean,
    arrow: Boolean,
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    classes() {
      const classes = {
        'with-arrow': this.arrow,
      }
      return [...rect.computed.classes.call(this), classes]
    },
    computedMargin() {
      return null
    },
    toggle() {
      return ['pointerdown', 'click'].indexOf(this.showOn) > -1
    },
    popperOptions() {
      const modifiers = []
      if (this.arrow) {
        modifiers.push({
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        })
      }
      return {
        placement: this.overlayPosition,
        modifiers,
      }
    },
  },
  watch: {
    open(isOpen) {
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
              height: 0,
            }),
          }
        } else {
          reference = this.parent.$el
        }
        this.$nextTick(() => {
          this.popperJS = createPopper(reference, this.$el, this.popperOptions)
          this.$emit('open', this)
        })
      }
    },
    popperOptions(options) {
      if (this.open) {
        this.popperJS.setOptions(options)
        this.update()
      }
    },
    showOn(val, oldVal) {
      this.parent.$el.addEventListener(val, this.display)
      if (oldVal) {
        this.parent.$el.removeEventListener(oldVal, this.display)
      }
    },
  },
  beforeCreate() {
    this.x = null
    this.y = null
    this.popperJS = null
  },
  mounted() {
    if (this.showOn) {
      this.parent.$el.addEventListener(this.showOn, this.display)
    }
    // DOM transfer
    if (this.parent !== this.app) {
      this.app.$el.appendChild(this.$el)
    }
  },
  beforeDestroy() {
    this.parent.$el.removeEventListener(this.showOn, this.display)
    if (this.autoClose) {
      this.parentOverlay.$el.removeEventListener('pointerover', this.pointerWatcher)
    }
    if (this.popperJS) {
      this.popperJS.destroy()
    }
    this.app.$el.removeChild(this.$el)
  },
  methods: {
    contains(el) {
      let contains = this.open && overlayContainer.methods.contains.call(this, el)
      if (!contains && !this.pointerReference) {
        contains = this.parent.$el.contains(el)
      }
      return contains
    },
    display(evt) {
      if (this.toggle) {
        this.open = !this.open
      } else if (!this.open) {
        if (this.pointerReference) {
          this.y = evt.pageY
          this.x = evt.pageX
        }
        this.open = true
      }
      evt.preventDefault()
      evt.stopPropagation()
    },
    dismiss() {
      if (this.open) {
        let popper = this
        while (popper.cascading) {
          popper = popper.parentOverlay
        }
        popper.activeOverlay = null
      }
    },
    update() {
      if (this.open) {
        this.popperJS.update()
      }
    },
    pointerWatcher(evt) {
      const { target } = evt
      const contains = this.contains(target)
      if (!contains) {
        this.open = false
      }
    },
  },
}
</script>

<style>
.qxw.overlay {
  z-index: 9999;
  top: 0;
  left: 0;
  overflow: visible;
  border-width: 1px;
}

.qxw.overlay[data-popper-reference-hidden] {
  visibility: hidden;
  pointer-events: none;
}

.qxw.overlay.with-arrow [data-popper-arrow] {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: transparent;
  position: absolute;
}

.qxw.overlay.with-arrow[data-popper-placement^="bottom"] [data-popper-arrow] {
  border-top-width: 0;
  border-bottom-color: inherit;
  top: -6px;
  left: calc(50% - 6px);
}

.qxw.overlay.with-arrow[data-popper-placement^="top"] [data-popper-arrow] {
  border-bottom-width: 0;
  border-top-color: inherit;
  top: 100%;
  left: calc(50% - 6px);
}

.qxw.overlay.with-arrow[data-popper-placement^="right"] [data-popper-arrow] {
  border-left-width: 0;
  border-right-color: inherit;
  left: -6px;
  top: calc(50% - 6px);
}

.qxw.overlay.with-arrow[data-popper-placement^="left"] [data-popper-arrow] {
  border-right-width: 0;
  border-left-color: inherit;
  left: 100%;
  top: calc(50% - 6px);
}
</style>
