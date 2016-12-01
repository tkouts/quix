<script>
import menu from './menu.vue'
import embeddedOverlay from '../overlay/overlay-embedded'
import { mutableString } from '../../core/prop-types'

export default {
  name: 'qx-sub-menu',
  mixins: [menu, embeddedOverlay('pointerenter', 'right', true)],
  class: {
    sub: true
  },
  props: {
    align: mutableString('start', ['start', 'center', 'end'])
  },
  computed: {
    classes () {
      const classes = menu.computed.classes.call(this)
      classes.active = this.open
      return classes
    }
  }
}
</script>

<style>
.qxw.icon.menu.sub {
  padding-right: 16px !important;
  background: no-repeat right 4px center/8px svg-load('../../assets/sub-menu.svg');
}

.qxw.icon.menu.sub.active {
  background-color: #3F7ED1;
  color: white;
}
</style>
