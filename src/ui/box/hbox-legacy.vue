<template lang="pug">
  include ../mixins.pug
  +base()(class="hbox-legacy")
    div(
      :class="height && !flow ? 'valign-container' : ''"
      ref="root"
    )
      slot
</template>

<script>
import hbox from './hbox.vue'
import { reactive } from '../../core/runtime'
import legacyBoxBase from './legacy-box-base'

const LegacyHBoxGovernance = {
  ...hbox.governance,
  ...{
    width (child) {
      if (child.flex && !child.container.autoWidth) {
        return 'flex-compute'
      }
      return hbox.governance.width(child)
    },

    height (child) {
      const box = child.container
      const flexAlign = child.flexAlign || box.itemsAlign
      if (flexAlign === 'stretch' && child.height == null) {
        return box.height != null ? '100%' : box.innerHeight()
      }
      return hbox.governance.height(child)
    },

    bottom (child) {
      const box = child.container
      const flexAlign = child.flexAlign || box.itemsAlign
      if (!box.flow && box.height && (flexAlign === 'end' || flexAlign === 'center')) {
        const heightAvailable = box.innerHeight() + box.paddingTop + box.paddingBottom
        if (heightAvailable < box.scrollHeight()) {
          // reposition h-box child
          if (flexAlign === 'end') {
            return 'inner-end'
          }
          return 'center'
        }
      }
      return hbox.governance.bottom(child)
    }
  }
}

export default {
  mixins: [hbox, legacyBoxBase],
  governance: LegacyHBoxGovernance,
  beforeCreate () {
    this._retainPercentageX = true
    this._retainPercentageY = true
  },
  computed: {
    floatingSpace: reactive(function floatingSpace () {
      if (this.flexCount) {
        let fixedSpace = 0
        for (let i = 0; i < this.children.length; i += 1) {
          // TODO: exclude non displayed
          if (!this.children[i].flex) {
            fixedSpace += this.children[i].outerWidth()
          }
          if (i > 0) {
            fixedSpace += this.spacing
          }
        }
        // console.log('float', fixedSpace, this.innerWidth())
        return this.innerWidth() - fixedSpace
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
    height: 100%;
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
