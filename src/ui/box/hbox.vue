<template>
  <div class="qxw box" :class="classes" :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import rect from '../rect.vue'
import boxBase from './box-base'

const HBoxGovernance = Object.assign({}, rect.governance, {
  margin (child) {
    const hbox = child.parent
    if (child === hbox.firstChild && !hbox.flow) {
      return null
    }
    const spacing = hbox.spacing
    if (!hbox.flow) {
      return [0, 0, 0, spacing]
    }
    return [0, spacing, spacing, 0]
  }
})

// class HBoxGovernance extends rect.governance {
//   static margin (child) {
//     const hbox = child.parent
//     if (child === hbox.firstChild && !hbox.flow) {
//       return null
//     }
//     const spacing = hbox.spacing
//     if (!hbox.flow) {
//       return [0, 0, 0, spacing]
//     }
//     return [0, spacing, spacing, 0]
//   }
// }

export default {
  name: 'qx-hbox',
  mixins: [rect, boxBase],
  governance: HBoxGovernance,
  computed: {
    classes () {
      const cssClass = rect.computed.classes.call(this)
      if (this.itemsAlign) {
        cssClass[`align-${this.itemsAlign}`] = true
      }
      if (this.justify) {
        cssClass[`justify-${this.justify}`] = true
      }
      if (this.flow) {
        cssClass.flow = true
      }
      return cssClass
    }
  }
}
</script>

<style>
.qxw.box {
  display: flex;
}

.qxw.box > * {
    flex: none;
}

.qxw.box.flow {
    flex-wrap: wrap;
    align-content: flex-start;
}

.qxw.box.align-start {
  align-items: flex-start;
}

.qxw.box.align-center {
  align-items: center;
}

.qxw.box.align-end {
  align-items: flex-end;
}

.qxw.box.align-stretch {
  align-items: stretch;
}

.qxw.box.justify-start {
  justify-content: flex-start;
}

.qxw.box.justify-center {
  justify-content: center;
}

.qxw.box.justify-end {
  justify-content: flex-end;
}

.qxw.box > .qxw.self-align-start {
  align-self: flex-start;
}

.qxw.box > .qxw.self-align-end {
  align-self: flex-end;
}

.qxw.box > .qxw.self-align-center {
  align-self: center;
}

.qxw.box > .qxw.self-align-stretch {
  align-self: stretch;
}
</style>
