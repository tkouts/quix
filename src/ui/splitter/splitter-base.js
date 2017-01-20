import Vue from 'vue'
import splitterhandle from './splitter-handle.vue'
import { distinctValues } from '../../core/prop-types'

export const SplitterHandle = Vue.extend(splitterhandle)

export const splitterBase = {
  props: {
    itemsAlign: distinctValues('stretch', ['start', 'end', 'center', 'stretch'])
  },
  computed: {
    panes () {
      return this.children.filter(c => !(c instanceof SplitterHandle))
    },
    spacing () {
      return 0
    }
  },
  watch: {
    panes (panes) {
      const sizeAttr = this.orientation === 'h' ? 'width' : 'height'
      if (this.firstChild instanceof SplitterHandle) {
        // first pane removed
        this.firstChild.destroy()
      }
      for (let i = panes.length - 1; i > 0; i -= 1) {
        const pane = panes[i]
        if (!('paneSize' in pane.custom)) {
          pane.setCustom('paneSize', pane[sizeAttr])
        }
        if (!(pane.previousSibling instanceof SplitterHandle)) {
          pane.before(SplitterHandle)
        }
      }
    }
  }
}
