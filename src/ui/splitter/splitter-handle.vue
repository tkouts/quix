<template>
  <div class="qxw handle"
    v-movable
    @pointerdown="startResize"
    @move="resizeSibling">
  </div>
</template>

<script>
import rect from '../rect.vue'

let initialSiblingSize = 0

export default {
  name: 'qx-splitter-handle',
  extends: rect,
  beforeCreate () {
    this.isHandle = true
  },
  computed: {
    pane () {
      if (this.parent.justify === 'end') {
        return this.nextSibling
      }
      return this.previousSibling
    },
    offsetMultiplier () {
      if (this.pane === this.nextSibling) {
        return -1
      }
      return 1
    }
  },
  methods: {
    startResize (evt) {
      if (this.parent.orientation === 'h') {
        initialSiblingSize = this.pane.outerWidth()
      } else {
        initialSiblingSize = this.pane.outerHeight()
      }
    },
    resizeSibling (evt) {
      if (this.parent.orientation === 'h') {
        const offsetX = evt.detail.x
        const width = ((initialSiblingSize + (offsetX * this.offsetMultiplier)) /
          this.parent.innerWidth()) * 100
        this.pane.custom.paneSize = `${width}%`
      } else {
        const offsetY = evt.detail.y
        const height = ((initialSiblingSize + (offsetY * this.offsetMultiplier)) /
          this.parent.innerHeight()) * 100
        this.pane.custom.paneSize = `${height}%`
      }
      evt.preventDefault()
    }
  }
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
