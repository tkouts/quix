<template>
  <img class="qxw image"
    :class="classes"
    :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
    :src="src"/>
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
