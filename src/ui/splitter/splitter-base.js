import Vue from 'vue'
import splitterhandle from './splitter-handle.vue'

export const SplitterHandle = Vue.extend(splitterhandle)

export const splitterBase = {
  props: {
    spacing: {
      type: Number,
      default: 0
    }
  },
  computed: {
    panes () {
      return this.children.filter(c => !(c instanceof SplitterHandle))
    }
  },
  watch: {
    panes (panes) {
      // const sizeAttr = this.orientation === 'h' ? 'width' : 'height'
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
