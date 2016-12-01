<template>
  <div class="qxw hbox-legacy" :class="classes" :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div :class="$height && !flow ? 'valign-container' : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import hbox from './hbox.vue'
// import rect from '../rect.vue'
import { reactive } from '../../core/runtime'
import legacyBoxBase from './legacy-box-base'

export default {
  mixins: [hbox, legacyBoxBase],
  computed: {
    // boxStyle: reactive(function boxStyle () {
    //   const styleObj = rect.computed.boxStyle.call(this)
    //   if (!this.flow) {
    //     styleObj.lineHeight = `${this.innerHeight}px`
    //   }
    //   return styleObj
    // }, {}),
    floatingSpace: reactive(function floatingSpace () {
      if (this.flexCount) {
        let fixedSpace = 0
        for (let i = 0; i < this.children.length; i += 1) {
          // TODO: exclude non displayed
          if (!this.children[i].$flex) {
            fixedSpace += this.children[i].outerWidth
          }
          if (i > 0) {
            fixedSpace += this.$spacing
          }
        }
        return this.innerWidth - fixedSpace
      }
      return 0
    }, 0)
  }
}

</script>

<style>
.qxw.hbox-legacy > div {
    white-space: nowrap;
    text-align: start;
}

.qxw.hbox-legacy.flow > div {
    white-space: normal;
}

.qxw.hbox-legacy.justify-start > div {
    text-align: left;
}

.qxw.hbox-legacy.justify-center > div {
    text-align: center;
}

.qxw.hbox-legacy.justify-end > div {
    text-align: right;
}

.qxw.hbox-legacy > div > *,
.qxw.hbox-legacy > div > .qxw.self-align-start {
    vertical-align: top;
    display: inline-block;
}

.qxw.hbox-legacy.align-center > div > *,
.qxw.hbox-legacy > div > .qxw.self-align-center {
    vertical-align: middle;
    display: inline-block;
}

.qxw.hbox-legacy.align-end > div > *,
.qxw.hbox-legacy > div > .qxw.self-align-end {
    vertical-align: bottom;
    display: inline-block;
}
</style>
