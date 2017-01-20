<template>
  <div class="qxw box vertical" :class="classes" :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import hbox from './hbox.vue'
import rect from '../rect.vue'

class VBoxGovernance extends rect.governance {
  static margin (child) {
    const vbox = child.parent
    if (child === vbox.firstChild) {
      return null
    }
    return [vbox.spacing, 0, 0, 0]
  }
}

export default {
  name: 'qx-vbox',
  mixins: [hbox],
  governance: VBoxGovernance,
  beforeCreate () {
    this.orientation = 'v'
  }
}
</script>

<style>
.qxw.box.vertical {
    flex-direction: column;
}
</style>
