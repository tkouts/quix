<template>
  <div class="qxw flowbox"
      :class="classes"
      :style="[boxStyle, sizeStyle, positionStyle]">
    <qx-scroller height="100%">
      <div class="valign-container">
        <qx-hbox flow
            class="inline"
            :class="vAlignClass"
            :spacing="spacing"
            :justify="justify"
            :items-align="itemsAlign"
            :padding="padding"
            width="100%"
            ref="root">
          <slot></slot>
        </qx-hbox>
      </div>
    </qx-scroller>
  </div>
</template>

<script>
import rect from '../rect.vue'
import boxBase from './box-base'
import box from './box'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-flowbox',
  mixins: [rect, boxBase],
  governance: box.hbox.governance,
  props: {
    flow: {
      type: Boolean,
      default: true
    },
    verticalAlign: distinctValues('', ['start', 'end', 'center'])
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
.qxw.flowbox .qxw.box.flow.inline {
  display: inline-flex;
}
</style>
