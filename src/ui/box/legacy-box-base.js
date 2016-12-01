export default {
  mounted () {
    // remove text nodes
    const rootEl = this.$el.firstChild
    // const root = this.$refs.root
    // if (root) {
    //   rootEl = root.$el || root
    // } else {
    //   rootEl = this.$el
    // }
    const textNodes = Array.prototype.filter.call(
      rootEl.childNodes,
      n => n.nodeType === Node.TEXT_NODE
    )
    for (let i = 0; i < textNodes.length; i += 1) {
      textNodes[i].parentNode.removeChild(textNodes[i])
    }
  },
  computed: {
    flexCount () {
      let flexSum = 0
      for (let i = 0; i < this.children.length; i += 1) {
        if (this.children[i].$flex) {
          // TODO: exclude non displayed
          flexSum += this.children[i].$flex
        }
      }
      return flexSum
    }
  },
  methods: {
    floatingSpace () {
      throw new TypeError('Must override method')
    }
  }
}
