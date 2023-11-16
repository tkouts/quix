<template lang="pug">
include ../mixins.pug
+base()
  div(
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
.qxw.box.vertical > :first-child {
    flex-direction: column;
}

.qxw.box.vertical > :first-child > * {
  margin: var(--qx-spacing) 0 0 0;
}

.qxw.box.vertical > :first-child > :first-child {
  margin: 0;
}
</style>
