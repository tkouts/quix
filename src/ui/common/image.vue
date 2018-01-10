<template lang="pug">
  include ../mixins.pug
  +base('img')(class="image" :src="src")
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-image',
  mixins: [rect],
  props: {
    src: String
  }
}
</script>
