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
    update (evt) {
      this.$nextTick(
        () => {
          this.$emit('input', evt.target.value)
        })
    }
  }
}
