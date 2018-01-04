import rect from '../rect.vue'
import capabilities from '../../core/capabilities'
import { distinctValues } from '../../core/prop-types'

export default {
  extends: rect,
  props: {
    flow: Boolean,
    spacing: {
      type: Number,
      default: 2
    },
    itemsAlign: distinctValues('stretch', ['start', 'end', 'center', 'stretch']),
    justify: distinctValues('', ['start', 'end', 'center'])
  },
  beforeCreate () {
    this.orientation = 'h'
  },
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
    },
    boxStyle () {
      const boxStyle = rect.computed.boxStyle.call(this)
      if (capabilities.cssVariables) {
        boxStyle['--qx-spacing'] = `${this.spacing}px`
      }
      return boxStyle
    }
  }
}
