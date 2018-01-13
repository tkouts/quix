<template lang="pug">
  include ../mixins.pug
  +base('iframe')(class="iframe" :src="src")
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-iframe',
  mixins: [rect],
  props: {
    src: String
  }
}
</script>
