import quix from '../../quix'

export default {
  props: {
    spacing: {
      type: Number,
      default: 0
    }
  },
  computed: {
    panes () {
      return this.children.filter(
        c => !(c instanceof quix.components.SplitterHandle)
      )
    }
  },
  watch: {
    panes (panes) {
      const SplitterHandle = quix.components.SplitterHandle
      if (this.firstChild instanceof SplitterHandle) {
        // first pane removed
        this.firstChild.destroy()
      }
      for (let i = panes.length - 1; i >= 0; i -= 1) {
        const pane = panes[i]
        if (!('paneSize' in pane.custom)) {
          pane.setCustom('paneSize', null)
        }
        if (i !== 0 && !(pane.previousSibling instanceof SplitterHandle)) {
          pane.before(SplitterHandle)
        }
      }
    }
  }
}
