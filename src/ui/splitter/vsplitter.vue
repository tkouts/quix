<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

const VSplitterGovernance = Object.assign({}, box.vbox.governance, {
  height (child) {
    if (child.custom.paneSize != null) {
      return child.custom.paneSize
    }
    return box.vbox.governance.height(child)
  }
})

export default {
  name: 'qx-vsplitter',
  mixins: [splitterBase],
  extends: box.vbox,
  governance: VSplitterGovernance,
  class: {
    vsplitter: true
  }
}
</script>
