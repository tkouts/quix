<script>
import overlay from '../overlay/overlay.vue'

export default {
  name: 'qx-contextmenu',
  mixins: [overlay],
  class: {
    'context-menu': true
  }
}
</script>

<style>
.qxw.overlay.context-menu {
    background-color: #CBE1E7;
    min-width: 120px;
}

.qxw.overlay.context-menu > * {
    padding: 4px 8px;
}

.qxw.overlay.context-menu > *:hover {
    background-color: #3F7ED1;
    color: white;
}
</style>
