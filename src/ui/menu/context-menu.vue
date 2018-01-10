<template lang="pug">
  include ../mixins.pug
  +base()(
    class= "overlay context-menu"
    :href="href"
    @click.stop="dismiss"
    v-if="open"
  )
    slot
</template>

<script>
import overlay from '../overlay/overlay.vue'

export default {
  name: 'qx-contextmenu',
  extends: overlay,
  beforeCreate () {
    this.cascading = true
  }
}
</script>

<style>
.qxw.overlay.context-menu {
  background-color: #fff;
  min-width: 120px;
  cursor: default;
}

.qxw.overlay.context-menu > * {
  padding: 4px 8px;
}

.qxw.overlay.context-menu > .qxw.icon {
  text-align: left;
}

.qxw.overlay.context-menu > *:hover {
  background-color: #3F7ED1;
  color: white;
}
</style>
