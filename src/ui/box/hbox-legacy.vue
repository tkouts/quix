<template>
  <div class="qxw hbox-legacy" :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div :class="height && !flow ? 'valign-container' : ''">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import hbox from './hbox.vue'
import { reactive } from '../../core/runtime'
import legacyBoxBase from './legacy-box-base'

const LegacyHBoxGovernance = Object.assign({}, hbox.governance, {
  width (child) {
    if (child.flex && !child.$parent.autoWidth) {
      return 'flex-compute'
    }
    return hbox.governance.width(child)
  },

  height (child) {
    const flexAlign = child.flexAlign || child.$parent.itemsAlign
    if (flexAlign === 'stretch' && child.height == null) {
      return '100%'
    }
    return hbox.governance.height(child)
  },

  bottom (child) {
    const box = child.$parent
    const flexAlign = child.flexAlign || box.itemsAlign
    if (!box.flow && box.height && (flexAlign === 'end' || flexAlign === 'center')) {
      const heightAvailable = box.innerHeight + box.paddingTop + box.paddingBottom
      if (heightAvailable < box.scrollHeight) {
        // reposition h-box child
        if (flexAlign === 'end') {
          return 'inner-end'
        }
        return 'center'
      }
    }
    return hbox.governance.bottom(child)
  }
})

export default {
  mixins: [hbox, legacyBoxBase],
  governance: LegacyHBoxGovernance,
  computed: {
    floatingSpace: reactive(function floatingSpace () {
      if (this.flexCount) {
        let fixedSpace = 0
        for (let i = 0; i < this.children.length; i += 1) {
          // TODO: exclude non displayed
          if (!this.children[i].flex) {
            fixedSpace += this.children[i].outerWidth
          }
          if (i > 0) {
            fixedSpace += this.spacing
          }
        }
        // console.log('float', fixedSpace, this.innerWidth)
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
