<template>
  <form class="qxw form"
        :class="classes"
        :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
        :method="method"
        :action="action"
        @submit.prevent="submit"
        @keydown.capture="preventSubmit">
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
    preventSubmit (e) {
      if ((e.keyCode || e.which) === 13 &&
          e.target.tagName.toLocaleLowerCase() === 'input') {
        e.preventDefault()
      }
    },
    submit () {
      quix.ajax({
        method: this.method,
        url: this.action,
        data: this.json()
      })
      .then(response => this.$emit('success', response))
      .catch(error => this.$emit('error', error))
    },
    json () {
      return serialize(this.$el, { hash: true })
    }
  }
}
</script>
