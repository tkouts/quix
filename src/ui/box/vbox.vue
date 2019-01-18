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

.qxw.box.vertical > .qxw {
  margin: var(--qx-spacing) 0 0 0;
}

.qxw.box.vertical > .qxw:first-child {
  margin: 0;
}
</style>
