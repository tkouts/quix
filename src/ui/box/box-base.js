import { distinctValues } from '../../core/prop-types'

export default {
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
  }
}
