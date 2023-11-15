<template lang="pug">
include ../mixins.pug

+base()(:style="[boxStyle, sizeStyle, positionStyle]")
  qx-scroller(height="100%" v-if="!autoHeight")
    div(:class="{'valign-container': verticalAlign !== 'start'}")
      qx-hbox(
        flow
        class="inline"
        :class="vAlignClass"
        :spacing="spacing"
        :vspacing="vspacing"
        :justify="justify"
        :items-align="itemsAlign"
        :padding="padding"
        ref="root"
      )
        slot
  qx-hbox(
    v-else
    flow
    class="inline"
    :class="vAlignClass"
    :spacing="spacing"
    :vspacing="vspacing"
    :justify="justify"
    :items-align="itemsAlign"
    :padding="padding"
    ref="root"
  )
    slot
</template>

<script>
import rect from '../rect.vue'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'QxFlowbox',
  extends: rect,
  qxClass: 'flowbox',
  props: {
    spacing: {
      type: Number,
      default: null,
    },
    vspacing: {
      type: Number,
      default: null,
    },
    itemsAlign: distinctValues('stretch', ['start', 'end', 'center', 'stretch']),
    justify: distinctValues('', ['start', 'end', 'center']),
    verticalAlign: distinctValues('start', ['start', 'end', 'center']),
  },
  computed: {
    vAlignClass() {
      if (this.verticalAlign) {
        return `valign-${this.verticalAlign}`
      }
      return ''
    },
  },
  beforeCreate() {
    this._retainPercentageX = true
  },
}
</script>

<style>
.qxw.flowbox > .qxw.scroller .valign-container > .qxw.box > .box-container.flow.inline {
  display: inline-flex;
}

.qxw.flowbox > .qxw.scroller > .valign-container {
  display: inline;
}
</style>
