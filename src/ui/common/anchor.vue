<template lang="pug">
  include ../mixins.pug
  +base('a')(:href="href")
    slot
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-a',
  extends: rect,
  qxClass: 'anchor',
  props: {
    href: String
  }
}
</script>
