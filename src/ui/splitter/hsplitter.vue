<script>
import box from '../box/box'
import { splitterBase } from './splitter-base'

export default {
  mixins: [splitterBase],
  extends: box.hbox,
  class: {
    hsplitter: true
  }
}
</script>
