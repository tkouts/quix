<script>
import VBox from '../box/vbox.vue'
import splitterBase from './splitter-base'

const VSplitterGovernance = {
  height(child) {
    if (child.custom.paneSize != null) {
      return child.custom.paneSize
    }
    return this.superGov.height(child)
  },
}

export default {
  name: 'QxVSplitter',
  extends: VBox,
  mixins: [splitterBase],
  qxClass: 'vsplitter',
  governance: VSplitterGovernance,
}
</script>

<style>
.qxw.box.vsplitter {
  --qx-spacing: 0;
}
</style>
