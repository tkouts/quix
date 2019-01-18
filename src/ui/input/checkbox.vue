<template lang="pug">
  include ../mixins.pug
  +base('input')(
    type="checkbox"
    :checked="isChecked"
    :value="value"
    @change="onChange($event.target.checked)"
  )
</template>

<script>
import unique from 'array-unique'
import removeItemFromArray from '../../utils/index'
import rect from '../rect.vue'

export default {
  name: 'QxCheckbox',
  extends: rect,
  qxClass: 'checkbox',
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
      type: [Array, Boolean],
      default: false,
    },
  },
  computed: {
    isChecked() {
      if (typeof this.groupValue === 'boolean') {
        return this.groupValue
      }
      return this.groupValue.indexOf(this.value) > -1
    },
  },
  watch: {
    groupValue: {
      // TODO: sync is not part of the official API
      sync: true,
      handler(value) {
        if (typeof value !== 'boolean') {
          this.groupValue = unique(value)
        }
      },
    },
  },
  methods: {
    onChange(checked) {
      if (typeof this.groupValue === 'boolean') {
        this.$emit('change', checked)
      } else if (checked) {
        this.groupValue.push(this.value)
      } else {
        removeItemFromArray(this.groupValue, this.value)
      }
    },
  },
}
</script>

<style>
.qxw.checkbox {
  display: inline-block;
  vertical-align: middle;
}
</style>
