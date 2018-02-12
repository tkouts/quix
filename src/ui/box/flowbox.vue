<template lang="pug">
  include ../mixins.pug

  +base()(class="flowbox" :style="[boxStyle, sizeStyle, positionStyle]")
    qx-scroller(height="100%" v-if="!autoHeight")
      div(:class="{'valign-container': verticalAlign !== 'start'}")
        qx-hbox(
          flow
          class="inline"
          :class="vAlignClass"
          :spacing="spacing"
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
      :justify="justify"
      :items-align="itemsAlign"
      :padding="padding"
      ref="root"
    )
      slot
</template>

<script>
import boxBase from './box-base'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-flowbox',
  extends: boxBase,
  props: {
    verticalAlign: distinctValues('start', ['start', 'end', 'center'])
  },
  beforeCreate () {
    this._retainPercentageX = true
  },
  computed: {
    vAlignClass () {
      if (this.verticalAlign) {
        return `valign-${this.verticalAlign}`
      }
      return ''
    }
  }
}
</script>

<style>
.qxw.flowbox .valign-container .qxw.box.flow.inline {
  display: inline-flex;
}
/*
.qxw.flowbox .qxw.scroller .valign-container {
  height: 100%;
}*/
</style>
