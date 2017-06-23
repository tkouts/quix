<template>
  <button class="qxw icon button"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :data-style="laddaStyle">
    <div :class="laddaStyle? 'ladda-label':''">
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
import 'ladda/dist/ladda-themeless.min.css'
import ladda from 'ladda'
import icon from './icon.vue'

export default {
  name: 'qx-button',
  mixins: [icon],
  props: {
    laddaStyle: String
  },
  computed: {
    classes () {
      const classes = icon.computed.classes.call(this)
      if (this.laddaStyle) {
        classes['ladda-button'] = true
      }
      return classes
    }
  },
  mounted () {
    this._ladda = null
    if (this.laddaStyle) {
      this._ladda = ladda.create(this.$el)
    }
  },
  methods: {
    toggle () {
      this._ladda.toggle()
    }
  },
  watch: {
    laddaStyle (v) {
      if (v) {
        this._ladda = ladda.create(this.$el)
      } else if (this._ladda) {
        this._ladda.remove()
        this._ladda = null
      }
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

.qxw.button > div:first-child {
  position: relative;
  overflow: hidden;
}

.qxw.button:active > div:first-child {
  left: 0px;
  top: 1px;
}
</style>
