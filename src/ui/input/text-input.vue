<template>
  <input v-if="supportsPlaceholder"
      class="qxw text-input"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)">
  </input>
  <div v-else
      class="qxw text-input"
      :class="classes"
      :style="[boxStyle, sizeStyle, positionStyle]">
    <input ref="input" :type="type" :style="paddingStyle" :value="value"
      @keydown="update"/>
    <qx-label ref="placeholder" abs v-if="placeholder && value === ''" disabled
      :style="[paddingStyle, placeholderAlign]"
      :text="placeholder"/>
  </div>
</template>

<script>
import rect from '../rect.vue'
import inputHelper from './input-helper'
import { reactive } from '../../core/runtime'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-text-input',
  mixins: [rect, inputHelper],
  props: {
    type: distinctValues('', ['text', 'password'])
  },
  computed: {
    placeholderAlign: reactive(function placeholderAlign () {
      if (this.height != null) {
        return { lineHeight: `${this.innerHeight}px` }
      }
      return {}
    }, {})
  }
}
</script>

<style>
INPUT.qxw {
  outline: none;
  font: inherit;
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
