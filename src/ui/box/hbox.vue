<template lang="pug">
include ../mixins.pug
+base()
  div(
    class="box-container"
    :class="boxContainerClasses"
    :style="boxContainerStyle"
  )
    slot
</template>

<script>
import boxBase from './box-base'

export default {
  name: 'QxHBox',
  extends: boxBase,
  qxClass: 'box',
}
</script>

<style>
.qxw.box > .box-container {
  display: flex;
  height: 100%;
  --qx-spacing: 2px;
}

.qxw.box > .box-container > :first-child {
  margin: 0;
}

.qxw.box > .box-container > * {
  flex: var(--qx-flex);
  margin: 0 0 0 var(--qx-spacing);
}

.qxw.box > .box-container > *:not(.qxw) {
  --qx-flex: none;
}

.qxw.box > .box-container.flow {
  --qx-vspacing: 2px;
}

.qxw.box > .box-container.flow > * {
  margin: 0 var(--qx-spacing) var(--qx-vspacing) 0;
}

.qxw.box > .box-container.flow {
  flex-wrap: wrap;
  align-content: flex-start;
}

.qxw.box > .box-container.align-start {
  align-items: flex-start;
}

.qxw.box > .box-container.align-center {
  align-items: center;
}

.qxw.box > .box-container.align-end {
  align-items: flex-end;
}

.qxw.box > .box-container.align-stretch {
  align-items: stretch;
}

.qxw.box > .box-container.justify-start {
  justify-content: flex-start;
}

.qxw.box > .box-container.justify-center {
  justify-content: center;
}

.qxw.box > .box-container.justify-end {
  justify-content: flex-end;
}

.qxw.box > .box-container > .self-align-start {
  align-self: flex-start;
}

.qxw.box > .box-container > .self-align-end {
  align-self: flex-end;
}

.qxw.box > .box-container > .self-align-center {
  align-self: center;
}

.qxw.box > .box-container > .self-align-stretch {
  align-self: stretch;
}

/* spacing presets */

.qxw.box > .box-container.qx-spc-0 {
  --qx-spacing: 0;
}

.qxw.box > .box-container.qx-spc-1 {
  --qx-spacing: 1px;
}

.qxw.box > .box-container.qx-spc-2 {
  --qx-spacing: 2px;
}

.qxw.box > .box-container.qx-spc-4 {
  --qx-spacing: 4px;
}

.qxw.box > .box-container.qx-spc-6 {
  --qx-spacing: 6px;
}

.qxw.box > .box-container.qx-spc-8 {
  --qx-spacing: 8px;
}

.qxw.box > .box-container.qx-spc-12 {
  --qx-spacing: 12px;
}

.qxw.box > .box-container.qx-spc-16 {
  --qx-spacing: 16px;
}

.qxw.box > .box-container.flow.qx-vspc-0 {
  --qx-vspacing: 0;
}

.qxw.box > .box-container.flow.qx-vspc-1 {
  --qx-vspacing: 1px;
}

.qxw.box > .box-container.flow.qx-vspc-2 {
  --qx-vspacing: 2px;
}

.qxw.box > .box-container.flow.qx-vspc-4 {
  --qx-vspacing: 4px;
}

.qxw.box > .box-container.flow.qx-vspc-6 {
  --qx-vspacing: 6px;
}

.qxw.box > .box-container.flow.qx-vspc-8 {
  --qx-vspacing: 8px;
}

.qxw.box > .box-container.flow.qx-vspc-12 {
  --qx-vspacing: 12px;
}

.qxw.box > .box-container.flow.qx-vspc-16 {
  --qx-vspacing: 16px;
}
</style>
