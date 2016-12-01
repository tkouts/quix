<template>
  <div class="qxw box" :class="classes" :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import rect from '../rect.vue'
import boxBase from './box-base'

export default {
  name: 'qx-hbox',
  mixins: [rect, boxBase],
  mounted () {
    this.applyChildMargins()
  },
  computed: {
    classes () {
      const cssClass = rect.computed.classes.call(this)
      if (this.$itemsAlign) {
        cssClass[`align-${this.$itemsAlign}`] = true
      }
      if (this.$justify) {
        cssClass[`justify-${this.$justify}`] = true
      }
      if (this.flow) {
        cssClass.flow = true
      }
      return cssClass
    }
  },
  methods: {
    applyChildMargins () {
      if (this.children.length > 0) {
        if (!this.flow) {
          // TODO: apply to first visible
          this.children[0].$margin = null
          for (let i = 1; i < this.children.length; i += 1) {
            this.children[i].$margin = [0, 0, 0, this.$spacing]
          }
        } else {
          for (let i = 0; i < this.children.length; i += 1) {
            this.children[i].$margin = [0, this.$spacing, this.$spacing, 0]
          }
        }
      }
    }
  },
  watch: {
    children () {
      this.applyChildMargins()
    },
    $spacing () {
      this.applyChildMargins()
    }
  }
}
</script>

<style>
.qxw.box {
  display: flex;
}

.qxw.box > * {
    flex: none;
}

.qxw.box.flow {
    flex-wrap: wrap;
    align-content: flex-start;
}

.qxw.box.align-start {
  align-items: flex-start;
}

.qxw.box.align-center {
  align-items: center;
}

.qxw.box.align-end {
  align-items: flex-end;
}

.qxw.box.align-stretch {
  align-items: stretch;
}

.qxw.box.justify-start {
  justify-content: flex-start;
}

.qxw.box.justify-center {
  justify-content: center;
}

.qxw.box.justify-end {
  justify-content: flex-end;
}

.qxw.box > .qxw.self-align-start {
  align-self: flex-start;
}

.qxw.box > .qxw.self-align-end {
  align-self: flex-end;
}

.qxw.box > .qxw.self-align-center {
  align-self: center;
}

.qxw.box > .qxw.self-align-stretch {
  align-self: stretch;
}
</style>
