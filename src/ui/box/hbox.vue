<template lang="pug">
  include ../mixins.pug
  +base()(class="box")
    slot
</template>

<script>
import rect from '../rect.vue'
import boxBase from './box-base'
import capabilities from '../../core/capabilities'

const HBoxGovernance = {
  ...rect.governance,
  ...{
    margin (child) {
      if (!capabilities.cssVariables || child.orientation) {
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
      return null
    }
  }
}

export default {
  name: 'qx-hbox',
  extends: boxBase,
  governance: HBoxGovernance
}
</script>

<style>
.qxw.box {
  display: flex;
}

.qxw.box > * {
  flex: none;
}

.qxw.box > .qxw {
  margin: 0 0 0 var(--qx-spacing);
}

.qxw.box > .qxw:first-child {
  margin: 0;
}

.qxw.box.flow > .qxw {
  margin: 0 var(--qx-spacing) var(--qx-spacing) 0;
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
