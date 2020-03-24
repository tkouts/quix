<template lang="pug">
  include ../mixins.pug
  +base()
    slot
</template>

<script>
import hbox from './hbox.vue'
import capabilities from '../../core/capabilities'

const VBoxGovernance = {
  margin(child) {
    if (!capabilities.cssVariables || child.orientation) {
      const vbox = child.container
      if (child === vbox.firstChild) {
        return null
      }
      return [vbox.spacing, 0, 0, 0]
    }
    return null
  },
}

export default {
  name: 'QxVBox',
  extends: hbox,
  qxClass: 'vertical',
  governance: VBoxGovernance,
  beforeCreate() {
    this.orientation = 'v'
  },
}
</script>

<style>
.qxw.box.vertical {
    flex-direction: column;
}

.qxw.box.vertical > * {
  margin-top: var(--qx-spacing);
}

.qxw.box.vertical > :first-child {
  margin-top: 0;
}
</style>
