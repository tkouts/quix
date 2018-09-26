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
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(this.response)
          } else {
            xhr.onerror()
          }
        }
        xhr.onerror = () => {
          const result = {
            status: xhr.status,
            statusText: xhr.statusText
          }
          reject(result)
        }
        xhr.send(JSON.stringify(this.json()))
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
