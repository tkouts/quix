<template lang="pug">
  include ../mixins.pug
  +base('a')(class="anchor" :href="href")
    slot
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-a',
  mixins: [rect],
  props: {
    href: String
  }
}
</script>
