<template lang="pug">
  include ../mixins.pug
  +base('textarea')(
    class="text-area"
    v-if="!placeholder || supportsPlaceholder"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @pointerdown.stop
    @change="$emit('change', $event.target.value)"
    @input="$emit('input', $event.target.value)"
  )
  +base()(
    v-else
    class="text-area"
    :style="[boxStyle, sizeStyle, positionStyle]"
  )
    textarea(
      ref="input"
      :style="paddingStyle"
      :name="name"
      :value="value"
      @pointerdown.stop
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @keyup="update"
    )
    qx-label(
      abs
      disabled
      ref="placeholder"
      v-if="placeholder && value === ''"
      :style="paddingStyle"
      :text="placeholder"
    )
  </div>
</template>

<script>
import rect from '../rect.vue'
import inputHelper from './input-helper'

export default {
  name: 'qx-text-area',
  extends: rect,
  mixins: [inputHelper]
}
</script>

<style>
TEXTAREA.qxw {
  outline: none;
  resize: none;
  font: inherit;
  overflow: auto;
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
