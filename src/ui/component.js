// Quix base component

export default {
  data () {
    return {
      ready: false,
      parent: null
    }
  },
  beforeCreate () {
    this.container = null
  },
  beforeMount () {
    let parent = this.$parent
    while (parent && !parent.children) {
      parent = parent.$parent
    }
    if (parent) {
      this.parent = this.container = parent
      this.app = parent.app
    }
  },
  mounted () {
    this.ready = true
  }
}
