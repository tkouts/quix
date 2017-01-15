<template>
  <div class="qxw slider"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <qx-rect class="slot" abs
        left="=> this.parent.paddingLeft + (this.app.theme.slider.handle.width / 2)"
        right="=> this.parent.paddingRight + (this.app.theme.slider.handle.width / 2)"
        :height="app.theme.slider.slot.height"
        top="center"
        border="1"
        ref="slot">
      <qx-rect height="100%" :width="handleOffset"></qx-rect>
    </qx-rect>
    <qx-rect abs no-clip
        top="center"
        left="=> this.parent.paddingLeft"
        right="=> this.parent.paddingRight + this.app.theme.slider.handle.width"
        :height="app.theme.slider.handle.height">
      <qx-rect abs class="handle"
        :left="handleOffset"
        :width="app.theme.slider.handle.width"
        :height="app.theme.slider.handle.height"
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

export default {
  name: 'qx-slider',
  mixins: [rect],
  props: {
    min: {
      type: [String, Number],
      default: 0,
      convert: parseFloat
    },
    max: {
      type: [String, Number],
      default: 100,
      convert: parseFloat
    },
    decimals: {
      type: [String, Number],
      default: 0,
      convert: parseInt
    },
    value: {
      type: [String, Number],
      default: 0,
      convert: parseFloat,
      mutable: true,
      set (val) {
        let value = Math.round(parseFloat(val) * Math.pow(10, this.decimals)) /
          Math.pow(10, this.decimals)
        if (value > this.max) {
          value = this.max
        } else if (value < this.min) {
          value = this.min
        }
        return value
      }
    }
  },
  computed: {
    handleOffset () {
      const x = (this.$value - this.min) / (this.max - this.min)
      return `${x * 100}%`
    }
  },
  methods: {
    update (evt) {
      const oldValue = this.$value
      const x = evt.detail.x
      const value = ((this.max - this.min) * (x / this.$refs.slot.getOuterWidth())) + this.min
      this.$value = value
      if (this.$value !== oldValue) {
        // TODO: Watcher?
        this.$emit('change', evt)
      }
      evt.preventDefault()
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
