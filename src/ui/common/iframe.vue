<template lang="pug">
  include ../mixins.pug
  +base('iframe')(:src="src")
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'QxIFrame',
  extends: rect,
  qxClass: 'iframe',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
}
</script>
