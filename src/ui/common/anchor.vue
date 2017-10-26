<template>
  <a class="qxw anchor"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]"
      :href="href">
    <slot></slot>
  </a>
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
