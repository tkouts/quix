import capabilities from '../../core/capabilities'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: String
  },
  computed: {
    supportsPlaceholder () {
      return capabilities.placeholders
    }
  },
  methods: {
    update (e) {
      const keyCode = (window.event) ? e.which : e.keyCode
      if (e.ctrlKey || keyCode === 8) {
        this.$emit('input', e.target.value)
      }
    }
  }
}
