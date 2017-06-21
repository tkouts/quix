<template>
  <textarea v-if="supportsPlaceholder"
      class="qxw text-area"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)">
  </textarea>
  <div v-else
      class="qxw text-area"
      :class="classes"
      :style="[boxStyle, sizeStyle, positionStyle]">
    <textarea ref="input" :value="value" :style="paddingStyle"
      @keydown="update"></textarea>
    <qx-label ref="placeholder" abs v-if="placeholder && value === ''" disabled
      :style="paddingStyle"
      :text="placeholder"/>
  </div>
</template>

<script>
import rect from '../rect.vue'
import inputHelper from './input-helper'

export default {
  name: 'qx-text-area',
  mixins: [rect, inputHelper]
}
</script>

<style>
TEXTAREA.qxw {
  outline: none;
  resize: none;
  font: inherit;
}

.qxw.text-area {
  background: white;
}

.qxw.text-area > TEXTAREA {
  box-sizing: border-box;
  outline: none;
  font: inherit;
  border: none;
  background-color: transparent;
  display: block;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.qxw.text-area > .qxw.label {
  position: absolute;
  cursor: text;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
