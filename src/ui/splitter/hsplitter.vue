<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

const HSplitterGovernance = Object.assign({}, box.hbox.governance, {
  width (child) {
    if ('paneSize' in child.custom) {
      return child.custom.paneSize
    }
    return box.hbox.governance.width(child)
  }
})

export default {
  mixins: [splitterBase],
  extends: box.hbox,
  governance: HSplitterGovernance,
  class: {
    hsplitter: true
  }
}
</script>
