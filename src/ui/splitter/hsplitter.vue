<script>
import box from '../box/box'
import splitterBase from './splitter-base'

const HSplitterGovernance = Object.assign({}, box.hbox.governance, {
  width (child) {
    if (child.custom.paneSize != null) {
      return child.custom.paneSize
    }
    return box.hbox.governance.width(child)
  }
})

export default {
  name: 'qx-hsplitter',
  mixins: [splitterBase],
  extends: box.hbox,
  governance: HSplitterGovernance,
  class: {
    hsplitter: true
  }
}
</script>
