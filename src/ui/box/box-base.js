import rect from '../rect.vue'
// import capabilities from '../../core/capabilities'
import { distinctValues } from '../../core/prop-types'

const spacingPresets = new Set([0, 1, 2, 4, 6, 8, 12, 16])

export default {
  extends: rect,
  props: {
    flow: Boolean,
    spacing: Number,
    vspacing: Number,
    itemsAlign: distinctValues('stretch', ['start', 'end', 'center', 'stretch']),
    justify: distinctValues('', ['start', 'end', 'center']),
  },
  computed: {
    classes() {
      const cssClass = {}
      if (this.itemsAlign) {
        cssClass[`align-${this.itemsAlign}`] = true
      }
      if (this.justify) {
        cssClass[`justify-${this.justify}`] = true
      }
      if (this.flow) {
        cssClass.flow = true
        if (this.vspacing != null && spacingPresets.has(this.vspacing)) {
          cssClass[`--qx-vspc-${this.vspacing}`] = `${this.vspacing}px`
        }
      }
      if (this.spacing != null && spacingPresets.has(this.spacing)) {
        cssClass[`qx-spc-${this.spacing}`] = true
      }
      return [...rect.computed.classes.call(this), cssClass]
    },
    boxStyle() {
      const boxStyle = rect.computed.boxStyle.call(this)
      if (this.spacing != null && !spacingPresets.has(this.spacing)) {
        const spaceAttr = this.flow ? '--qx-hspacing' : '--qx-spacing'
        boxStyle[spaceAttr] = `${this.spacing}px`
      }
      if (this.flow && this.vspacing != null && !spacingPresets.has(this.vspacing)) {
        boxStyle['--qx-vspacing'] = `${this.vspacing}px`
      }
      return boxStyle
    },
  },
  beforeCreate() {
    this.orientation = 'h'
  },
}
