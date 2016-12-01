<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

export default {
  mixins: [splitterBase],
  extends: box.vbox,
  class: {
    vsplitter: true
  }
}
</script>
