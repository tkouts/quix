<template>
  <button class="qxw icon button"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div>
      <template v-if="imgAlign === 'start' || imgAlign === 'top'">
        <img v-if="src" :style="imgStyle" :src="src"/>
        <template v-if="text">{{ text }}</template>
      </template>
      <template v-if="imgAlign === 'end' || imgAlign === 'bottom'">
        <template v-if="text">{{ text }}</template>
        <img v-if="src" :style="imgStyle" :src="src"/>
      </template>
    </div>
    <slot></slot>
  </button>
</template>

<script>
import icon from './icon.vue'

export default {
  name: 'qx-button',
  mixins: [icon]
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

.qxw.button:active {
  border: 1px inset #ccc;
}

.qxw.button:focus {
  outline: none;
}

.qxw.button > div:first-child {
  position: relative;
  overflow: hidden;
}

.qxw.button:active > div:first-child {
  left: 0px;
  top: 1px;
}
</style>
