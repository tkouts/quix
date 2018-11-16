<template lang="pug">
  include ../mixins.pug
  +base('img')(:src="src")
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-image',
  mixins: [rect],
  qxClass: 'image',
  props: {
    src: String
  }
}
</script>
