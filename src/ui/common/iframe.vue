<template lang="pug">
  include ../mixins.pug
  +base('iframe')(class="anchor" :src="src")
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
