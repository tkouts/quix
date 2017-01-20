<template>
  <div class="qxw slider"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <qx-rect class="slot" abs
        left="=> this.parent.paddingLeft + (this.app.theme['qx-slider'].handle.width / 2)"
        right="=> this.parent.paddingRight + (this.app.theme['qx-slider'].handle.width / 2)"
        :height="app.theme['qx-slider'].slot.height"
        top="center"
        border="1"
        ref="slot">
      <qx-rect height="100%" :width="handleOffset"></qx-rect>
    </qx-rect>
    <qx-rect abs no-clip
        top="center"
        left="=> this.parent.paddingLeft"
        right="=> this.parent.paddingRight + this.app.theme['qx-slider'].handle.width"
        :height="app.theme['qx-slider'].handle.height">
      <qx-rect abs class="handle"
        :left="handleOffset"
        :width="app.theme['qx-slider'].handle.width"
        :height="app.theme['qx-slider'].handle.height"
        v-movable:horizontal
        ref="handle"
        @pointerdown.native="$emit('startdrag', $event)"
        @pointerup.native="$emit('enddrag', $event)"
        @move.native="update">
      </qx-rect>
    </qx-rect>
  </div>
</template>

<script>
import rect from '../rect.vue'

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
    handleOffset () {
      const x = (this.value - this.min) / (this.max - this.min)
      return `${x * 100}%`
    }
  },
  methods: {
    update (evt) {
      const oldValue = this.value
      const x = evt.detail.x
      const value = truncateDecimals(
        ((this.max - this.min) * (x / this.$refs.slot.getOuterWidth())) + this.min, this.decimals)
      if (value !== oldValue) {
        this.$emit('input', value)
      }
      evt.preventDefault()
    }
  },
  watch: {
    value (val) {
      let value = truncateDecimals(val, this.decimals)
      if (value > this.max) {
        value = this.max
      } else if (value < this.min) {
        value = this.min
      }
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
}

.qxw.slider .slot > .qxw {
  background-color: #999;
}

</style>
