import quix from '../../quix'
import SplitterHandle from './splitter-handle.vue'

let SplitterComponent = null

export default {
  props: {
    spacing: {
      type: Number,
      default: 0
    }
  },
  beforeCreate () {
    if (SplitterComponent == null) {
      SplitterComponent = quix.$Vue.extend(SplitterHandle)
    }
  },
  computed: {
    panes () {
      return this.children.filter(c => !c.isHandle)
    }
  },
  watch: {
    panes (panes) {
      if (this.firstChild.isHandle) {
        // first pane removed
        this.firstChild.destroy()
      }
      for (let i = panes.length - 1; i >= 0; i -= 1) {
        const pane = panes[i]
        if (!('paneSize' in pane.custom)) {
          pane.setCustom('paneSize', null)
        }
        if (i !== 0 && !pane.previousSibling.isHandle) {
          pane.before(SplitterComponent)
        }
      }
    }
  }
}
