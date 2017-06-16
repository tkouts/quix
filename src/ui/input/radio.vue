<template>
  <input class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)">
  </input>
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-radio',
  mixins: [rect],
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
