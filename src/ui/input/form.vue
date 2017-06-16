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
import quix from '../../quix'

export default {
  name: 'qx-form',
  mixins: [rect],
  props: {
    method: String,
    action: String
  },
  methods: {
    submit () {
      quix.ajax({
        method: this.method,
        url: this.action,
        data: serialize(this.$el, { hash: true })
      })
      .then(response => this.$emit('success', response))
      .catch(error => this.$emit('error', error))
    }
  }
}
</script>
