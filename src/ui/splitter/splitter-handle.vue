<template lang="pug">
  include ../mixins.pug
  +base()(v-movable)
</template>

<script>
import rect from '../rect.vue'

let initialSiblingSize = 0

export default {
  name: 'QxSplitterHandle',
  extends: rect,
  qxClass: 'handle',
  computed: {
    pane() {
      if (this.parent.justify === 'end') {
        return this.nextSibling
      }
      return this.previousSibling
    },
    offsetMultiplier() {
      if (this.pane === this.nextSibling) {
        return -1
      }
      return 1
    },
  },
  beforeCreate() {
    this.isHandle = true
  },
  mounted() {
    this.$on('startmove', this.startResize)
    this.$on('move', this.resizeSibling)
  },
  methods: {
    startResize() {
      if (this.parent.orientation === 'h') {
        initialSiblingSize = this.pane.outerWidth()
      } else {
        initialSiblingSize = this.pane.outerHeight()
      }
    },
    resizeSibling({ offsetX, offsetY, e }) {
      if (this.parent.orientation === 'h') {
        const width = ((initialSiblingSize + (offsetX * this.offsetMultiplier))
          / this.parent.innerWidth()) * 100
        this.pane.custom.paneSize = `${width}%`
      } else {
        const height = ((initialSiblingSize + (offsetY * this.offsetMultiplier))
          / this.parent.innerHeight()) * 100
        this.pane.custom.paneSize = `${height}%`
      }
      e.preventDefault()
    },
  },
}
</script>

<style>
.qxw.hsplitter > .qxw.handle,
.qxw.hsplitter > div:first-child > .qxw.handle {
  width: 12px;
  height: 100%;
  background-color: #ccc;
}
.qxw.vsplitter > div:first-child > .qxw.handle,
.qxw.vsplitter > .qxw.handle {
  width: 100%;
  height: 12px;
  background-color: #ccc;
}
</style>
