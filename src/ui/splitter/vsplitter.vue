<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

const VSplitterGovernance = Object.assign({}, box.vbox.governance, {
  height (child) {
    if ('paneSize' in child.custom) {
      return child.custom.paneSize
    }
    return box.vbox.governance.height(child)
  }
})

export default {
  mixins: [splitterBase],
  extends: box.vbox,
  governance: VSplitterGovernance,
  class: {
    vsplitter: true
  }
}
</script>
