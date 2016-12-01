export default function embeddedOverlay (showOn, overlayPosition, autoClose) {
  return {
    data () {
      return {
        showOn,
        overlayPosition,
        autoClose
      }
    },
    beforeCreate () {
      this._retainPercentageX = true
      this._retainPercentageY = true
    },
    computed: {
      open: {
        get () {
          if (this.ready) {
            return this.$refs.root.open
          }
          return false
        },
        set (value) {
          this.$refs.root.open = value
        }
      },
      overlays () {
        return [this.$refs.root]
      }
    }
  }
}
