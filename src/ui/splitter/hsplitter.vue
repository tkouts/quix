<script>
import box from '../box/box'
import splitterBase from './splitter-base'

const HSplitterGovernance = {
  width (child) {
    if (child.custom.paneSize != null) {
      return child.custom.paneSize
    }
    return this.superGov.width(child)
  }
}

export default {
  name: 'qx-hsplitter',
  extends: box.hbox,
  qxClass: 'hsplitter',
  mixins: [splitterBase],
  governance: HSplitterGovernance
}
</script>
