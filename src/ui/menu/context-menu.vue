<template>
  <div class="qxw fixed overlay"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      @click.stop="open = false"
      @pointerdown.capture="closeOverlay"
      v-show="open">
    <slot></slot>
  </div>
</template>

<script>
import overlay from '../overlay/overlay.vue'

export default {
  name: 'qx-contextmenu',
  mixins: [overlay],
  class: {
    'context-menu': true
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
