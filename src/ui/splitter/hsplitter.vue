<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

class HSplitterGovernance extends box.hbox.governance {
  static width (child) {
    if ('paneSize' in child.custom) {
      return child.custom.paneSize
    }
    return super.width(child)
  }
}

export default {
  mixins: [splitterBase],
  extends: box.hbox,
  governance: HSplitterGovernance,
  class: {
    hsplitter: true
  }
}
</script>
