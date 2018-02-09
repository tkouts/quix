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
    let container = this.$parent
    while (container && !container.__quix__) {
      container = container.$parent
    }
    if (container) {
      this.container = container
      this.app = this.container.app
    }
  },
  mounted () {
    this.ready = true
  }
}
