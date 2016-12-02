<template>
  <button class="qxw icon button"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div>
      <template v-if="$imgAlign === 'start' || $imgAlign === 'top'">
        <img v-if="$src" :style="imgStyle" :src="$src"/>
        <label v-if="$text">{{ $text }}</label>
      </template>
      <template v-if="$imgAlign === 'end' || $imgAlign === 'bottom'">
        <label v-if="$text">{{ $text }}</label>
        <img v-if="$src" :style="imgStyle" :src="$src"/>
      </template>
    </div>
  </button>
</template>

<script>
import icon from './icon.vue'
import { cssBox } from '../../core/prop-types'

export default {
  name: 'qx-button',
  mixins: [icon],
  props: {
    border: Object.assign({}, cssBox, {
      get (value) {
        if (value !== undefined) {
          return value
        }
        return this.app.theme.button.border
      }
    })
  }
}
</script>

<style>
.qxw.button {
    border: 1px outset threedlightshadow;
    padding: 4px;
    white-space: nowrap;
    background-color: #efefef;
}

.qxw.button:active {
    border: 1px inset threedlightshadow;
}

.qxw.button:focus {
    outline: none;
}

.qxw.button > div:first-child {
    position: relative;
    overflow: hidden;
}

.qxw.button:active > div:first-child {
    left: 1px;
    top: 1px;
}
</style>
