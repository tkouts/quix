<template>
  <iframe class="qxw image"
    :class="classes"
    :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
    :src="src"/>
  </iframe>
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
