<template lang="pug">
  include ../mixins.pug
  +base('input')(
    class="radio"
    type="radio"
    :checked="isChecked"
    :value="value"
    @change="onChange($event.target.checked)"
  )
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-radio',
  extends: rect,
  model: {
    prop: 'groupValue',
    event: 'change'
  },
  props: {
    value: null,
    groupValue: [String, Boolean]
  },
  computed: {
    isChecked () {
      if (typeof this.groupValue === 'boolean') {
        return this.groupValue
      }
      return this.groupValue === this.value
    }
  }
}
</script>

<style>
.qxw.radio {
  display: inline-block;
  vertical-align: middle;
}
</style>
