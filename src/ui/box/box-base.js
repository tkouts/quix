import { mutableInt, mutableString } from '../../core/prop-types'

export default {
  props: {
    flow: Boolean,
    spacing: mutableInt(2),
    itemsAlign: mutableString('start', ['start', 'end', 'center', 'stretch']),
    justify: mutableString('', ['start', 'end', 'center'])
  },
  beforeCreate () {
    this.orientation = 'h'
  }
}
