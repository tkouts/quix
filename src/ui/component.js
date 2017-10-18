// Quix base component

export default {
  data () {
    return {
      ready: false
    }
  },
  beforeCreate () {
    this.container = null
    this.app = null
  },
  beforeMount () {
    let parent = this.$parent
    while (parent && !parent.__quix__) {
      parent = parent.$parent
    }
    if (parent) {
      this.container = parent
      this.app = parent.app
    }
  },
  mounted () {
    this.ready = true
  }
}
