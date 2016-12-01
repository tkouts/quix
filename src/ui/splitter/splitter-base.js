import Vue from 'vue'
import splitterhandle from './splitter-handle.vue'
import { mutableString } from '../../core/prop-types'

export const SplitterHandle = Vue.extend(splitterhandle)

export const splitterBase = {
  props: {
    itemsAlign: mutableString('stretch', ['start', 'end', 'center', 'stretch'])
  },
  mounted () {
    const children = this.children.slice()
    for (let i = children.length - 1; i > 0; i -= 1) {
      this.children[i].before(SplitterHandle)
    }
  },
  computed: {
    spacing () {
      return 0
    }
  }
}
