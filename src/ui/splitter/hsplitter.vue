<script>
import box from '../box/box'
import splitterBase from './splitter-base'

const HSplitterGovernance = {
  ...box.hbox.governance,
  ...{
    width (child) {
      if (child.custom.paneSize != null) {
        return child.custom.paneSize
      }
      return box.hbox.governance.width(child)
    }
  }
}

export default {
  name: 'qx-hsplitter',
  extends: box.hbox,
  mixins: [splitterBase],
  governance: HSplitterGovernance,
  class: {
    hsplitter: true
  }
}
</script>
