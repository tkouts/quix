<template lang="pug">
  include ../mixins.pug
  +base()(class="box legacy")
    qx-rect(
      no-clip
      class="-align"
      :class="computedHeight && !flow ? 'valign-container' : ''"
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
      if (child.flex && !child.parent.autoWidth) {
        return 'flex-compute'
      }
      return hbox.governance.width(child)
    },
    height (child) {
      const box = child.parent
      const flexAlign = child.flexAlign || box.itemsAlign
      if (flexAlign === 'stretch' && child.height == null) {
        return box.height != null ? '100%' : box.innerHeight()
      }
      return hbox.governance.height(child)
    },
    top (child) {
      const box = child.parent
      const flexAlign = child.flexAlign || box.itemsAlign
      if (!box.flow && flexAlign !== box.itemsAlign) {
        // need to reposition child
        const container = box.$refs.root
        let childTop = 0
        let offset = 0

        if (box.itemsAlign === 'start' || box.itemsAlign === 'stretch') {
          if (flexAlign === 'center') {
            offset = ((box.innerHeight() - child.outerHeight()) / 2)
          } else if (flexAlign === 'end') {
            offset = box.innerHeight() - child.outerHeight()
          }
        } else if (box.itemsAlign === 'center') {
          childTop = ((container.outerHeight() - child.outerHeight()) / 2)
          if (flexAlign === 'start') {
            offset = -((box.innerHeight() - container.outerHeight()) / 2) - childTop - 1
          } else if (flexAlign === 'end') {
            offset = ((box.innerHeight() - container.outerHeight()) / 2) + childTop
          }
        } else if (box.itemsAlign === 'end') {
          childTop = (container.outerHeight() - child.outerHeight())
          if (flexAlign === 'center') {
            offset = -((box.innerHeight() - container.outerHeight()) / 2) - childTop
          } else if (flexAlign === 'start') {
            offset = -((box.innerHeight() - container.outerHeight())) - childTop - 1
          }
        }
        return offset
      }
      return hbox.governance.top(child)
    }
  }
}

export default {
  extends: hbox,
  mixins: [legacyBoxBase],
  governance: LegacyHBoxGovernance,
  beforeCreate () {
    this._retainPercentageX = true
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
.qxw.box.legacy > .-align {
  white-space: nowrap;
  text-align: left;
}

.qxw.box.legacy.align-center > .-align {
  top: 50%;
  transform: translateY(-50%);
}

.qxw.box.legacy.align-end > .-align {
  top: 100%;
  transform: translateY(-100%);
}

.qxw.box.legacy.align-stretch > .-align {
  height: 100%;
}

.qxw.box.legacy.flow > .-align {
    white-space: normal;
}

.qxw.box.legacy.justify-start > .-align {
    text-align: left;
}

.qxw.box.legacy.justify-center > .-align {
    text-align: center;
}

.qxw.box.legacy.justify-end > .-align {
    text-align: right;
}

.qxw.box.legacy > .-align > *,
.qxw.box.legacy > .-align > .qxw.self-align-start {
    vertical-align: top;
    display: inline-block;
}

.qxw.box.legacy.align-center > .-align > *,
.qxw.box.legacy > .-align > .qxw.self-align-center {
    vertical-align: middle;
    display: inline-block;
}

.qxw.box.legacy.align-end > .-align > *,
.qxw.box.legacy > .-align > .qxw.self-align-end {
    vertical-align: bottom;
    display: inline-block;
}
</style>
