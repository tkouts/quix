<template lang="pug">
  include ../mixins.pug
  +base('a')(:href="href")
    slot
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'QxAnchor',
  extends: rect,
  qxClass: 'anchor',
  props: {
    href: {
      type: String,
      default: '',
    },
  },
}
</script>
