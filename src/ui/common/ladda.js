import 'ladda/dist/ladda-themeless.min.css'
import ladda from 'ladda'

export default {
  props: {
    laddaStyle: String
  },
  mounted () {
    this._ladda = null
    if (this.laddaStyle) {
      this._ladda = ladda.create(this.$el)
    }
  },
  methods: {
    toggle () {
      this._ladda.toggle()
    }
  },
  watch: {
    laddaStyle (v) {
      if (v) {
        if (!this._ladda) {
          this.$nextTick(() => {
            this._ladda = ladda.create(this.$el)
          })
        }
      } else if (this._ladda) {
        this._ladda.remove()
        this._ladda = null
      }
    }
  }
}
