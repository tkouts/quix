<template lang="pug">
include ../mixins.pug
+base()
  div(
    class="box-container"
    :class="boxContainerClasses"
    :style="boxContainerStyle"
  )
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
.qxw.box.vertical > .box-container {
    flex-direction: column;
}

.qxw.box.vertical > .box-container > * {
  margin: var(--qx-spacing) 0 0 0 !important;
}

.qxw.box.vertical > .box-container > :first-child {
  margin: 0 !important;
}
</style>
