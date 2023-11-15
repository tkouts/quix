<template lang="pug">
include ../mixins.pug
+base()
  slot
</template>

<script>
import hbox from './hbox.vue'

export default {
  name: 'QxVBox',
  extends: hbox,
  qxClass: 'vertical',
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
  margin: var(--qx-spacing) 0 0 0 !important;
}

.qxw.box.vertical > :first-child {
  margin: 0 !important;
}
</style>
