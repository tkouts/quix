export default {
  data() {
    return {
      activeOverlay: null,
    }
  },
  watch: {
    activeOverlay(newOverlay, oldOverlay) {
      this.$el.removeEventListener('pointerdown', this.closeOverlay, true)
      if (newOverlay) {
        this.$el.addEventListener('pointerdown', this.closeOverlay, true)
      }
      if (oldOverlay) {
        const old = oldOverlay
        old.open = false
      }
    },
  },
  beforeCreate() {
    this.cascading = false
  },
  methods: {
    contains(el) {
      let contains = this.$el.contains(el)
      if (!contains && this.activeOverlay) {
        contains = this.activeOverlay.contains(el)
      }
      return contains
    },
    closeOverlay({ target }) {
      if (this.activeOverlay && !this.activeOverlay.contains(target)) {
        this.activeOverlay.open = false
      }
    },
  },
}
