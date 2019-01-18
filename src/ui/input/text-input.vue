<template lang="pug">
  include ../mixins.pug
  +base('input')(
    v-if="!placeholder || supportsPlaceholder"
    :type="type"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @pointerdown.stop
    @change="$emit('change', $event.target.value)"
    @input="$emit('input', $event.target.value)"
  )
  +base()(
    v-else
    class="text-input"
    :style="[boxStyle, sizeStyle, positionStyle]"
  )
    input(
      ref="input"
      :type="type"
      :style="paddingStyle"
      :value="value"
      :name="name"
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
      :style="[paddingStyle, placeholderAlign]"
      :text="placeholder"
    )
</template>

<script>
import rect from '../rect.vue'
import inputHelper from './input-helper'
import { reactive } from '../../core/runtime'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'QxTextInput',
  mixins: [rect, inputHelper],
  qxClass: 'text-input',
  props: {
    type: distinctValues('', ['text', 'password']),
  },
  computed: {
    placeholderAlign: reactive(function placeholderAlign() {
      return { lineHeight: `${this.innerHeight()}px` }
    }, {}),
  },
}
</script>

<style>
INPUT.qxw {
  outline: none;
  font: inherit;
}

.qxw.text-input {
  background: white;
  border-width: 1px;
  padding: 2px;
}

.qxw.text-input > INPUT {
  box-sizing: border-box;
  outline: none;
  font: inherit;
  border: none;
  background-color: transparent;
  display: block;
  width: 100%;
  height: 100%;
}

.qxw.text-input > .qxw.label {
  cursor: text;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
