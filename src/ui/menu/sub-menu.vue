<script>
import menu from './menu.vue'
import embeddedOverlay from '../overlay/overlay-embedded'
import { distinctValues } from '../../core/prop-types'

export default {
  name: 'qx-sub-menu',
  extends: menu,
  qxClass: 'sub',
  mixins: [embeddedOverlay('pointerenter', 'right-start', true)],
  props: {
    align: distinctValues('start', ['start', 'center', 'end'])
  },
  computed: {
    classes () {
      const classes = {
        active: this.open
      }
      return [...menu.computed.classes.call(this), classes]
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
