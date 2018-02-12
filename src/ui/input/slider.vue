<template lang="pug">
  include ../mixins.pug
  +base()(class="slider")
    qx-rect(
      abs
      no-clip
      ref="slot"
      class="slot"
      top="center"
      :left="slotLeft"
      :right="slotRight"
      :height="app.theme['qx-slider'].slot.height"
      :border="app.theme['qx-slider'].handle.border"
    )
      slot(name="slot")
      qx-rect(abs class="progress" :width="handleOffset")
    qx-rect(
      abs
      no-clip
      top="center"
      :left="handleContainerLeft"
      :right="handleContainerRight"
      :height="app.theme['qx-slider'].handle.height"
      @pointerdown.native="update"
    )
      qx-rect(
        abs
        class="handle"
        :left="handleOffset"
        :width="app.theme['qx-slider'].handle.width"
        :height="app.theme['qx-slider'].handle.height"
        v-movable:horizontal
        ref="handle"
        @startmove="startSliderMove"
        @move="sliderMove"
        @endmove="$emit('enddrag')"
      )
</template>

<script>
import rect from '../rect.vue'
import { reactive } from '../../core/runtime'

function truncateDecimals (val, decimals) {
  return Math.round(parseFloat(val) * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export default {
  name: 'qx-slider',
  mixins: [rect],
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    decimals: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    paddingX: reactive(function paddinngX () {
      return [this.paddingLeft(), this.paddingRight()]
    }, 0),
    slotLeft () {
      return this.paddingX[0] +
        (this.app.theme['qx-slider'].handle.width / 2)
    },
    slotRight () {
      return this.paddingX[1] +
        (this.app.theme['qx-slider'].handle.width / 2)
    },
    handleContainerLeft () {
      return this.paddingX[0]
    },
    handleContainerRight () {
      return this.paddingX[1] +
        this.app.theme['qx-slider'].handle.width
    },
    handleOffset () {
      const x = (this.value - this.min) / (this.max - this.min)
      return `${x * 100}%`
    }
  },
  methods: {
    startSliderMove () {
      this.initialValue = this.value
      this.$emit('startdrag')
    },
    sliderMove ({ offsetX }) {
      const initialValue = this.initialValue
      const unitsPerPixel = (this.max - this.min) / this.$refs.slot.outerWidth()
      const value = this.sanitize(initialValue + (offsetX * unitsPerPixel))
      if (value !== initialValue) {
        this.$emit('input', value)
      }
    },
    update (evt) {
      const oldValue = this.value
      const slotLeft = this.$refs.slot.$el.getBoundingClientRect().left
      const x = evt.clientX - slotLeft
      const value = this.sanitize(
        ((this.max - this.min) * (x / this.$refs.slot.outerWidth())) + this.min)
      if (value !== oldValue) {
        this.$emit('input', value)
      }
    },
    sanitize (val) {
      let value = truncateDecimals(val, this.decimals)
      if (value > this.max) {
        value = this.max
      } else if (value < this.min) {
        value = this.min
      }
      return value
    }
  },
  watch: {
    value (val) {
      const value = this.sanitize(val)
      if (val !== value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.qxw.slider .handle {
  background-color: #3F7ED1;
  border-radius: 100%;
}

.qxw.slider .slot {
  border-color: #666;
  background-color: #666;
}

.qxw.slider .slot > .progress {
  background-color: #999;
  top:0;
  left:0;
  height:100%;
}

</style>
