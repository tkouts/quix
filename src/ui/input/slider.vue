<template lang="pug">
  include ../mixins.pug
  +base()
    qx-rect(
      abs
      no-clip
      ref="slot"
      class="slot"
      top="center"
      left="inner-end"
      right="inner-end"
    )
      slot(name="slot")
      qx-rect(abs class="progress" :width="handleOffset")
    qx-rect(
      abs
      no-clip
      top="center"
      left="inner-end"
      right="inner-end"
      :height="handleHeight"
      @pointerdown.native="update"
    )
      qx-rect(
        abs
        class="handle"
        :left="handleOffset"
        v-movable:horizontal
        ref="handle"
        @startmove="startSliderMove"
        @move="sliderMove"
        @endmove="$emit('enddrag')"
      )
</template>

<script>
import rect from '../rect.vue'

function truncateDecimals(val, decimals) {
  return Math.round(parseFloat(val) * (10 ** decimals)) / (10 ** decimals)
}

export default {
  name: 'QxSlider',
  mixins: [rect],
  qxClass: 'slider',
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    decimals: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    handleHeight() {
      if (!this.ready) return 0
      return +(getComputedStyle(this.$refs.handle.$el).getPropertyValue('height').slice(0, -2))
    },
    handleOffset() {
      const x = (this.value - this.min) / (this.max - this.min)
      return `${x * 100}%`
    },
  },
  watch: {
    value(val) {
      const value = this.sanitize(val)
      if (val !== value) {
        this.$emit('input', value)
      }
    },
  },
  methods: {
    startSliderMove() {
      this.initialValue = this.value
      this.$emit('startdrag')
    },
    sliderMove({ offsetX }) {
      const { initialValue } = this
      const unitsPerPixel = (this.max - this.min) / this.$refs.slot.outerWidth()
      const value = this.sanitize(initialValue + (offsetX * unitsPerPixel))
      if (value !== initialValue) {
        this.$emit('input', value)
      }
    },
    update(evt) {
      const oldValue = this.value
      const slotLeft = this.$refs.slot.$el.getBoundingClientRect().left
      const x = evt.clientX - slotLeft
      const value = this.sanitize(
        ((this.max - this.min) * (x / this.$refs.slot.outerWidth())) + this.min,
      )
      if (value !== oldValue) {
        this.$emit('input', value)
      }
    },
    sanitize(val) {
      let value = truncateDecimals(val, this.decimals)
      if (value > this.max) {
        value = this.max
      } else if (value < this.min) {
        value = this.min
      }
      return value
    },
  },
}
</script>

<style>
.qxw.slider {
  padding-left: 8px;
  padding-right: 8px;
}

.qxw.slider .handle {
  background-color: #3F7ED1;
  border-radius: 100%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
}

.qxw.slider .slot {
  border-color: #666;
  background-color: #666;
  height: 4px;
}

.qxw.slider .slot > .progress {
  background-color: #999;
  top:0;
  left:0;
  height:100%;
}

</style>
