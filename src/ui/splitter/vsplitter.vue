<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

class VSplitterGovernance extends box.vbox.governance {
  static height (child) {
    if ('paneSize' in child.custom) {
      return child.custom.paneSize
    }
    return super.height(child)
  }
}

export default {
  mixins: [splitterBase],
  extends: box.vbox,
  governance: VSplitterGovernance,
  class: {
    vsplitter: true
  }
}
</script>
