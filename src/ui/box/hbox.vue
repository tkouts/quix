<template lang="pug">
include ../mixins.pug
+base()
  div(
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
.qxw.box {
  display: flex;
}

.qxw.box > :first-child {
  display: flex;
  width: 100%;
  --qx-spacing: 2px;
}

.qxw.box > :first-child > :first-child {
  margin: 0;
}

.qxw.box > :first-child > * {
  flex: var(--qx-flex);
  margin: 0 0 0 var(--qx-spacing);
}

.qxw.box > :first-child > *:not(.qxw) {
  --qx-flex: none;
}

.qxw.box > :first-child.flow {
  --qx-vspacing: 2px;
}

.qxw.box > :first-child.flow > * {
  margin: 0 var(--qx-spacing) var(--qx-vspacing) 0;
}

.qxw.box > :first-child.flow {
  flex-wrap: wrap;
  align-content: flex-start;
}

.qxw.box > :first-child.align-start {
  align-items: flex-start;
}

.qxw.box > :first-child.align-center {
  align-items: center;
}

.qxw.box > :first-child.align-end {
  align-items: flex-end;
}

.qxw.box > :first-child.align-stretch {
  align-items: stretch;
}

.qxw.box > :first-child.justify-start {
  justify-content: flex-start;
}

.qxw.box > :first-child.justify-center {
  justify-content: center;
}

.qxw.box > :first-child.justify-end {
  justify-content: flex-end;
}

.qxw.box > :first-child > .self-align-start {
  align-self: flex-start;
}

.qxw.box > :first-child > .self-align-end {
  align-self: flex-end;
}

.qxw.box > :first-child > .self-align-center {
  align-self: center;
}

.qxw.box > :first-child > .self-align-stretch {
  align-self: stretch;
}

/* spacing presets */

.qxw.box > :first-child.qx-spc-0 {
  --qx-spacing: 0;
}

.qxw.box > :first-child.qx-spc-1 {
  --qx-spacing: 1px;
}

.qxw.box > :first-child.qx-spc-2 {
  --qx-spacing: 2px;
}

.qxw.box > :first-child.qx-spc-4 {
  --qx-spacing: 4px;
}

.qxw.box > :first-child.qx-spc-6 {
  --qx-spacing: 6px;
}

.qxw.box > :first-child.qx-spc-8 {
  --qx-spacing: 8px;
}

.qxw.box > :first-child.qx-spc-12 {
  --qx-spacing: 12px;
}

.qxw.box > :first-child.qx-spc-16 {
  --qx-spacing: 16px;
}

.qxw.box > :first-child.flow.qx-vspc-0 {
  --qx-vspacing: 0;
}

.qxw.box > :first-child.flow.qx-vspc-1 {
  --qx-vspacing: 1px;
}

.qxw.box > :first-child.flow.qx-vspc-2 {
  --qx-vspacing: 2px;
}

.qxw.box > :first-child.flow.qx-vspc-4 {
  --qx-vspacing: 4px;
}

.qxw.box > :first-child.flow.qx-vspc-6 {
  --qx-vspacing: 6px;
}

.qxw.box > :first-child.flow.qx-vspc-8 {
  --qx-vspacing: 8px;
}

.qxw.box > :first-child.flow.qx-vspc-12 {
  --qx-vspacing: 12px;
}

.qxw.box > :first-child.flow.qx-vspc-16 {
  --qx-vspacing: 16px;
}
</style>
