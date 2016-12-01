<template>
  <div class="qxw box vertical" :class="classes" :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import hbox from './hbox.vue'

export default {
  name: 'qx-vbox',
  mixins: [hbox],
  beforeCreate () {
    this.orientation = 'v'
  },
  methods: {
    applyChildMargins () {
      if (this.children.length > 0) {
        // TODO: apply to first visible
        this.children[0].$margin = null
        for (let i = 1; i < this.children.length; i += 1) {
          this.children[i].$margin = [this.$spacing, 0, 0, 0]
        }
      }
    }
  }
}
</script>

<style>
.qxw.box.vertical {
    flex-direction: column;
}
</style>
