<template lang="pug">
  include ../mixins.pug
  +base('iframe')(:src="src")
</template>

<script>
import rect from '../rect.vue'

export default {
  name: 'qx-iframe',
  extends: rect,
  qxClass: 'iframe',
  props: {
    src: String
  }
}
</script>
