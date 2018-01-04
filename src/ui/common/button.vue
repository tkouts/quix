<template>
  <button class="qxw icon button"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :data-style="laddaStyle">
    <div :class="laddaStyle? 'ladda-label' : null">
      <template v-if="iconPosition === 'start' || iconPosition === 'top'">
        <img v-if="src" class="img-icon" :style="iconStyle" :src="src"/>
        <span v-if="icon" :class="['fnt-icon', icon]" :style="iconStyle"/>
        <span v-if="text" class="text">{{ text }}</span>
      </template>
      <template v-if="iconPosition === 'end' || iconPosition === 'bottom'">
        <span v-if="text" class="text">{{ text }}</span>
        <span v-if="icon" :class="['fnt-icon', icon]" :style="iconStyle"/>
        <img v-if="src" class="img-icon" :style="iconStyle" :src="src"/>
      </template>
    </div>
    <slot></slot>
  </button>
</template>

<script>
import ladda from './ladda'
import icon from './icon.vue'

export default {
  name: 'qx-button',
  extends: icon,
  mixins: [ladda],
  computed: {
    classes () {
      const classes = icon.computed.classes.call(this)
      classes['ladda-button'] = this.laddaStyle !== ''
      return classes
    }
  }
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
  border: 1px inset #ccc;
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
