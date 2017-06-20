<template>
  <div class="qxw vbox-legacy" :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <div class="-justify" ref="root">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import vbox from './vbox.vue'
import hbox from './hbox.vue'
import legacyBoxBase from './legacy-box-base'
import { reactive } from '../../core/runtime'

const LegacyVBoxGovernance = Object.assign({}, vbox.governance, {
  height (child) {
    if (child.flex && !child.$parent.autoHeight) {
      return 'flex-compute'
    }
    return vbox.governance.height(child)
  },

  width (child) {
    const flexAlign = child.flexAlign || child.$parent.itemsAlign
    if (flexAlign === 'stretch' && child.width == null) {
      return '100%'
    }
    return vbox.governance.width(child)
  }
})

export default {
  mixins: [vbox, legacyBoxBase],
  governance: LegacyVBoxGovernance,
  beforeCreate () {
    this._retainPercentageX = true
  },
  computed: {
    classes () {
      const cssClass = hbox.computed.classes.call(this)
      if (this.justify && !this.height) {
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
            fixedSpace += this.children[i].outerHeight
          }
          if (i > 0) {
            fixedSpace += this.spacing
          }
        }
        return this.innerHeight - fixedSpace
      }
      return 0
    }, 0)
  }
}
</script>

<style>
.qxw.vbox-legacy > .-justify {
  position: relative;
  overflow: hidden;
}

/*.qxw.vbox-legacy > .-justify > * {*/
  /*display: table;*/
  /*float: left;*/
  /*clear: both;*/
/*}*/

.qxw.vbox-legacy.justify-center > .-justify {
  top: 50%;
  transform: translateY(-50%);
}

.qxw.vbox-legacy.justify-end > .-justify {
  top: 100%;
  transform: translateY(-100%);
}

/*.qxw.vbox-legacy.align-start > .-justify > *,*/
.qxw.vbox-legacy > .-justify > *,
.qxw.vbox-legacy > .-justify > .qxw.self-align-start {
  float: left;
  /*display: block;*/
  clear: both;
  /*margin: 0 auto 0 0;*/
  /*margin-left: 0 !important;
  margin-right: auto !important;*/
}

.qxw.vbox-legacy.align-center > .-justify > *,
.qxw.vbox-legacy > .-justify > .qxw.self-align-center {
  /*display: inline-block;
  float: none;
  clear: none;*/
  left: 50%;
  transform: translateX(-50%);
  /*margin-left: auto !important;
  margin-right: auto !important;*/
}

.qxw.vbox-legacy.align-end > .-justify > *,
.qxw.vbox-legacy > .-justify > .qxw.self-align-end {
  /*float: right;
  clear: both;*/
  /*margin: 0 0 0 auto;*/
  margin-left: auto !important;
  margin-right: 0 !important;
}
</style>
