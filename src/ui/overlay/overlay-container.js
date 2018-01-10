export default {
  data () {
    return {
      activeOverlay: null
    }
  },
  beforeCreate () {
    this.cascading = false
  },
  mounted () {
    this.$el.addEventListener('pointerdown', this.closeOverlay, true)
  },
  methods: {
    closeOverlay ({ target }) {
      if (this.activeOverlay && !this.activeOverlay.contains(target)) {
        this.activeOverlay.open = false
      }
    }
  },
  watch: {
    activeOverlay (newOverlay, oldOverlay) {
      if (oldOverlay) {
        const old = oldOverlay
        old.open = false
      }
    }
  }
}
