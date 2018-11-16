<script>
import box from '../box/box'
import splitterBase from './splitter-base'

const VSplitterGovernance = {
  height (child) {
    if (child.custom.paneSize != null) {
      return child.custom.paneSize
    }
    return this.superGov.height(child)
  }
}

export default {
  name: 'qx-vsplitter',
  extends: box.vbox,
  mixins: [splitterBase],
  qxClass: 'vsplitter',
  governance: VSplitterGovernance
}
</script>
