<template>
  <div class="qxw box vertical" :class="classes" :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import hbox from './hbox.vue'
import rect from '../rect.vue'
import capabilities from '../../core/capabilities'

const VBoxGovernance = Object.assign({}, rect.governance, {
  margin (child) {
    if (!capabilities.cssVariables || child.orientation) {
      const vbox = child.parent
      if (child === vbox.firstChild) {
        return null
      }
      return [vbox.spacing, 0, 0, 0]
    }
    return null
  }
})

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

.qxw.box.vertical > .qxw {
  margin: var(--qx-spacing) 0 0 0;
}

.qxw.box.vertical > .qxw:first-child {
  margin: 0;
}
</style>
