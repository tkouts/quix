<template lang="pug">
include ../mixins.pug
+base()
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
  --qx-spacing: 2px;
}

.qxw.box > :first-child {
  margin: 0 !important;
}

.qxw.box > * {
  flex: var(--qx-flex);
  margin: 0 0 0 var(--qx-spacing) !important;
}

.qxw.box > *:not(.qxw) {
  --qx-flex: none;
}

.qxw.box.flow {
  --qx-vspacing: 2px;
}

.qxw.box.flow > * {
  margin: 0 var(--qx-hspacing) var(--qx-vspacing) 0 !important;
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

.qxw.box > .self-align-start {
  align-self: flex-start;
}

.qxw.box > .self-align-end {
  align-self: flex-end;
}

.qxw.box > .self-align-center {
  align-self: center;
}

.qxw.box > .self-align-stretch {
  align-self: stretch;
}

/* spacing presets */

.qxw.box.qx-spc-0 {
  --qx-spacing: 0;
  --qx-hspacing: 0;
}

.qxw.box.qx-spc-1 {
  --qx-spacing: 1px;
  --qx-hspacing: 1px;
}

.qxw.box.qx-spc-2 {
  --qx-spacing: 2px;
  --qx-hspacing: 2px;
}

.qxw.box.qx-spc-4 {
  --qx-spacing: 4px;
  --qx-hspacing: 4px;
}

.qxw.box.qx-spc-6 {
  --qx-spacing: 6px;
  --qx-hspacing: 6px;
}

.qxw.box.qx-spc-8 {
  --qx-spacing: 8px;
  --qx-hspacing: 8px;
}

.qxw.box.qx-spc-12 {
  --qx-spacing: 12px;
  --qx-hspacing: 12px;
}

.qxw.box.qx-spc-16 {
  --qx-spacing: 16px;
  --qx-hspacing: 16px;
}

.qxw.box.flow.qx-vspc-0 {
  --qx-vspacing: 0;
}

.qxw.box.flow.qx-vspc-1 {
  --qx-vspacing: 1px;
}

.qxw.box.flow.qx-vspc-2 {
  --qx-vspacing: 2px;
}

.qxw.box.flow.qx-vspc-4 {
  --qx-vspacing: 4px;
}

.qxw.box.flow.qx-vspc-6 {
  --qx-vspacing: 6px;
}

.qxw.box.flow.qx-vspc-8 {
  --qx-vspacing: 8px;
}

.qxw.box.flow.qx-vspc-12 {
  --qx-vspacing: 12px;
}

.qxw.box.flow.qx-vspc-16 {
  --qx-vspacing: 16px;
}
</style>
