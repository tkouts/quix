<script>
import HBox from '../box/hbox.vue'
import splitterBase from './splitter-base'

const HSplitterGovernance = {
  width(child) {
    if (child.custom.paneSize != null) {
      return child.custom.paneSize
    }
    return this.superGov.width(child)
  },
}

export default {
  name: 'QxHSplitter',
  extends: HBox,
  qxClass: 'hsplitter',
  mixins: [splitterBase],
  governance: HSplitterGovernance,
}
</script>
