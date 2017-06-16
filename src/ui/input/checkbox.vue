<template>
  <input class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="onChange($event.target.checked)">
  </input>
</template>

<script>
import unique from 'array-unique'
import removeItemFromArray from '../../utils/index'
import rect from '../rect.vue'

export default {
  name: 'qx-checkbox',
  mixins: [rect],
  model: {
    prop: 'groupValue',
    event: 'change'
  },
  props: {
    value: null,
    groupValue: [Array, Boolean]
  },
  computed: {
    isChecked () {
      if (typeof this.groupValue === 'boolean') {
        return this.groupValue
      }
      return this.groupValue.indexOf(this.value) > -1
    }
  },
  methods: {
    onChange (checked) {
      if (typeof this.groupValue === 'boolean') {
        this.$emit('change', checked)
      } else if (checked) {
        this.groupValue.push(this.value)
      } else {
        removeItemFromArray(this.groupValue, this.value)
      }
    }
  },
  watch: {
    groupValue: {
      // TODO: sync is not part of the official API
      sync: true,
      handler (value) {
        if (typeof value !== 'boolean') {
          this.groupValue = unique(value)
        }
      }
    }
  }
}
</script>
