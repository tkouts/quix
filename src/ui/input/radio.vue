<template lang="pug">
  include ../mixins.pug
  +base('input')(
    type="radio"
    :checked="isChecked"
    :value="value"
    @change="$emit('change', $event.target.value)"
  )
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'QxRadio',
  extends: rect,
  qxClass: 'radio',
  model: {
    prop: 'groupValue',
    event: 'change',
  },
  props: {
    value: {
      type: null,
      default: null,
    },
    groupValue: {
      type: [String, Boolean],
      default: false,
    },
  },
  computed: {
    isChecked() {
      if (typeof this.groupValue === 'boolean') {
        return this.groupValue
      }
      return this.groupValue === this.value
    },
  },
  // methods: {
  //   onChange(checked) {
  //     if (typeof this.groupValue === 'boolean') {
  //       this.$emit('change', checked)
  //     } else if (checked) {
  //       this.$emit('change', this.value)
  //       // this.groupValue = this.value
  //     }
  //   },
  // },
}
</script>

<style>
.qxw.radio {
  display: inline-block;
  vertical-align: middle;
}
</style>
