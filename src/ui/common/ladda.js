import 'ladda/dist/ladda-themeless.min.css'
import * as ladda from 'ladda'

export default {
  props: {
    laddaStyle: String,
  },
  mounted() {
    this._ladda = null
    if (this.laddaStyle) {
      this._ladda = ladda.create(this.$el)
    }
  },
  methods: {
    toggle() {
      this._ladda.toggle()
    },
    isLoading() {
      return this._ladda.isLoading()
    },
  },
  watch: {
    laddaStyle(v) {
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
    },
  },
}
