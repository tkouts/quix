<template lang="pug">
  include ../mixins.pug
  +base()(class="legacy-vbox")
    div(class="qx-justify-helper" ref="root")
      slot
</template>

<script>
import vbox from './vbox.vue'
import boxBase from './box-base'
import legacyBoxBase from './legacy-box-base'
import { reactive } from '../../core/runtime'

const LegacyVBoxGovernance = {
  ...vbox.governance,
  ...{
    height (child) {
      if (child.flex && !child.container.autoHeight) {
        return 'flex-compute'
      }
      return vbox.governance.height(child)
    },
    width (child) {
      const box = child.container
      const flexAlign = child.flexAlign || box.itemsAlign
      if (flexAlign === 'stretch' && child.width == null) {
        return '100%'
      }
      return vbox.governance.width(child)
    }
  }
}

export default {
  extends: vbox,
  mixins: [legacyBoxBase],
  governance: LegacyVBoxGovernance,
  beforeCreate () {
    this._retainPercentageX = true
  },
  computed: {
    classes () {
      const cssClass = boxBase.computed.classes.call(this)
      if (this.justify && this.autoHeight) {
        delete cssClass[`justify-${this.justify}`]
      }
      return cssClass
    },
    floatingSpace: reactive(function floatingSpace () {
      if (this.flexCount) {
        let fixedSpace = 0
        for (let i = 0; i < this.children.length; i += 1) {
          // TODO: exclude non displayed
          if (!this.children[i].flex) {
            fixedSpace += this.children[i].outerHeight()
          }
          if (i > 0) {
            fixedSpace += this.spacing
          }
        }
        return this.innerHeight() - fixedSpace
      }
      return 0
    }, 0)
  }
}
</script>

<style>
.qxw.legacy-vbox > .qx-justify-helper {
  position: relative;
}

.qxw.legacy-vbox.justify-center > .qx-justify-helper {
  top: 50%;
  transform: translateY(-50%);
}

.qxw.legacy-vbox.justify-end > .qx-justify-helper {
  top: 100%;
  transform: translateY(-100%);
}

.qxw.legacy-vbox.align-start > .qx-justify-helper > *,
.qxw.legacy-vbox.align-start > .qx-justify-helper > .qxw.self-align-start {
  float: left;
  clear: both;
}

.qxw.legacy-vbox.align-center > .qx-justify-helper > *,
.qxw.legacy-vbox > .qx-justify-helper > .qxw.self-align-center {
  float: left;
  clear: both;
  left: 50%;
  transform: translateX(-50%);
}

.qxw.legacy-vbox.align-end > .qx-justify-helper > *,
.qxw.legacy-vbox > .qx-justify-helper > .qxw.self-align-end {
  float: right;
}
</style>
