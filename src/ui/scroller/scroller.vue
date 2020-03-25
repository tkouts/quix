<template lang="pug">
  include ../mixins.pug
  +base()(@scroll="update")
    slot
</template>

<script>
import rect from '../rect.vue'
import capabilities from '../../core/capabilities'

export default {
  name: 'QxScroller',
  extends: rect,
  qxClass: 'scroller',
  props: {
    scrollX: Boolean,
    scrollY: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0,
    }
  },
  computed: {
    classes() {
      const classes = {
        'scroll-x': this.scrollX,
        'scroll-y': this.scrollY,
        touch: capabilities.scrollBarSize === 0,
      }
      return [...rect.computed.classes.call(this), classes]
    },
  },
  methods: {
    update() {
      const { scrollTop, scrollLeft } = this.$el
      this.scrollTop = scrollTop
      this.scrollLeft = scrollLeft
    },
  },
}
</script>

<style>
.qxw.scroller {
  -webkit-overflow-scrolling: touch;
  /* scrollbar-width: thin; */
}

.qxw.scroller.scroll-x {
  overflow-x: auto;
}

.qxw.scroller.scroll-y {
  overflow-y: auto;
}

/* Styled scrollbars */

/* .qxw.scroller:not(.touch)::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  background: var(--qx-scrollbar-bg);
}

.qxw.scroller:not(.touch)::-webkit-scrollbar-track {
  background: var(--qx-scrollbar-bg);
}

.qxw.scroller:not(.touch)::-webkit-scrollbar-thumb {
  background-color: var(--qx-thumb-bg) ;
  border-radius: 6px;
  border: 3px solid var(--qx-scrollbar-bg);
} */
</style>
