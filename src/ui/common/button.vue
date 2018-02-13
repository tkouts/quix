<template lang="pug">
  include ../mixins.pug
  +icon('button')(class="button")
</template>

<script>
import icon from './icon.vue'

export default {
  name: 'qx-button',
  extends: icon
}
</script>

<style>
.qxw.button {
  cursor: default;
  font: inherit;
  border: 1px outset #ccc;
  padding: 4px;
  white-space: nowrap;
  background-color: #efefef;
}

.qxw.button[data-loading] {
  pointer-events: none;
}

.qxw.button:active {
  border-style: inset;
}

.qxw.button:focus {
  outline: none;
}

/*.qxw.button > div:first-child {
  position: relative;
  overflow: hidden;
}*/

.qxw.button:active > div:first-child {
  left: 0px;
  top: 1px;
}
</style>
