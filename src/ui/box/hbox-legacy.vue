<template lang="pug">
  include ../mixins.pug
  +base()
    div(class="qx-align-helper" :class="{ 'valign-container': requiresVerticalAlignment }" ref="root")
      slot
</template>

<script>
import hbox from './hbox.vue'
import boxBase from './box-base'
import { reactive } from '../../core/runtime'
import legacyBoxBase from './legacy-box-base'

const LegacyHBoxGovernance = {
  ...hbox.governance,
  ...{
    width (child) {
      const box = child.container
      if (!box.flow && child.flex && !box.autoWidth) {
        return 'flex-compute'
      }
      return this.superGov.width(child)
    },
    height (child) {
      const box = child.container
      const flexAlign = child.flexAlign || box.itemsAlign
      if (!box.flow && !child.abs && child.$el.parentElement === box.$refs.root && flexAlign === 'stretch' && child.height == null) {
        return box.autoHeight ? box.innerHeight() : '100%'
      }
      return this.superGov.height(child)
    },
    top (child) {
      const box = child.container
      const flexAlign = child.flexAlign || box.itemsAlign
      if (!box.flow && flexAlign !== box.itemsAlign) {
        // need to reposition child
        const containerHeight = box.$refs.root.offsetHeight
        let childTop = 0
        let offset = 0

        if (box.itemsAlign === 'start' || box.itemsAlign === 'stretch') {
          if (flexAlign === 'center') {
            offset = ((box.innerHeight() - child.outerHeight()) / 2)
          } else if (flexAlign === 'end') {
            offset = box.innerHeight() - child.outerHeight()
          }
        } else if (box.itemsAlign === 'center') {
          childTop = ((containerHeight - child.outerHeight()) / 2)
          if (flexAlign === 'start') {
            offset = -((box.innerHeight() - containerHeight) / 2) - childTop - 1
          } else if (flexAlign === 'end') {
            offset = ((box.innerHeight() - containerHeight) / 2) + childTop
          }
        } else if (box.itemsAlign === 'end') {
          childTop = containerHeight - child.outerHeight()
          if (flexAlign === 'center') {
            offset = -((box.innerHeight() - containerHeight) / 2) - childTop
          } else if (flexAlign === 'start') {
            offset = -((box.innerHeight() - containerHeight)) - childTop - 1
          }
        }
        return offset
      }
      return this.superGov.top(child)
    }
  }
}

export default {
  extends: boxBase,
  mixins: [legacyBoxBase],
  qxClass: 'legacy-box',
  governance: LegacyHBoxGovernance,
  beforeCreate () {
    this._retainPercentageX = true
  },
  computed: {
    classes () {
      const cssClass = {}
      if (!this.autoHeight && !this.flow) {
        cssClass.translate = true
      }
      return [...boxBase.computed.classes.call(this), cssClass]
    },
    requiresVerticalAlignment () {
      return !(this.flow || this.itemsAlign === 'start' || this.itemsAlign === 'stretch')
    },
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
.qxw.legacy-box > .qx-align-helper {
  position: relative;
  white-space: nowrap;
  text-align: left;
}

.qxw.legacy-box > .qx-align-helper > .qxw {
  margin: 0 0 0 var(--qx-spacing);
}

.qxw.legacy-box > .qx-align-helper > .qxw:first-child {
  margin: 0;
}

.qxw.legacy-box.flow > .qx-align-helper > .qxw {
  margin: 0 var(--qx-spacing) var(--qx-spacing) 0;
}

.qxw.legacy-box.align-center.translate > .qx-align-helper {
  top: 50%;
  transform: translateY(-50%);
}

.qxw.legacy-box.align-end.translate > .qx-align-helper {
  top: 100%;
  transform: translateY(-100%);
}

.qxw.legacy-box.align-stretch > .qx-align-helper {
  height: 100%;
}

.qxw.legacy-box.flow > .qx-align-helper {
  white-space: normal;
  top: 0;
  transform: none;
}

.qxw.legacy-box.justify-center > .qx-align-helper {
  text-align: center;
}

.qxw.legacy-box.justify-end > .qx-align-helper {
  text-align: right;
}

.qxw.legacy-box > .qx-align-helper > * {
  vertical-align: top;
  display: inline-block;
  white-space: normal;
}

.qxw.legacy-box.align-center > .qx-align-helper > *,
.qxw.legacy-box.flow > .qx-align-helper > .self-align-center {
  vertical-align: middle;
}

.qxw.legacy-box.align-end > .qx-align-helper > *,
.qxw.legacy-box.flow > .qx-align-helper > .self-align-end {
  vertical-align: bottom;
}
</style>
