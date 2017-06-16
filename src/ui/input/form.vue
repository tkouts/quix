<template>
  <form class="qxw form"
        :class="classes"
        :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
        :method="method"
        :action="action"
        @submit.prevent="submit">
      <slot></slot>
  </form>
</template>

<script>
import serialize from 'form-serialize'
import rect from '../rect.vue'

export default {
  name: 'qx-form',
  mixins: [rect],
  props: {
    method: String,
    action: String
  },
  methods: {
    submit () {
      console.log(serialize(this.$el, { hash: true }))
      // return false
    }
  }
}
</script>
