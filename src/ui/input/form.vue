<template lang="pug">
  include ../mixins.pug
  +base('form')(
    class="form"
    :method="method"
    :action="action"
    @submit.prevent="submit"
    @keydown.capture="preventSubmit"
  )
    slot
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
    preventSubmit (e) {
      if ((e.keyCode || e.which) === 13 &&
          e.target.tagName.toLocaleLowerCase() === 'input') {
        e.preventDefault()
      }
    },
    submit () {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.responseType = 'json'
        xhr.onload = () => {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response)
            this.$emit('success', this.response)
          } else {
            xhr.onerror()
          }
        }
        xhr.onerror = () => {
          const result = {
            status: this.status,
            statusText: xhr.statusText
          }
          reject(result)
          this.$emit('error', result)
        }
        xhr.send(JSON.stringify(this.json()))
      })
    },
    json () {
      return serialize(this.$el, { hash: true })
    }
  }
}
</script>
