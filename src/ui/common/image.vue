<template lang="pug">
  include ../mixins.pug
  +base('img')(:src="src")
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'QxImage',
  mixins: [rect],
  qxClass: 'image',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
}
</script>
