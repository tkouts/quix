<template lang="pug">
  include ../mixins.pug
  +base()(class="scroller" touch-action="none")
    div(class="scroll-content-container" :style="paddingStyle" ref="root")
      slot
</template>

<script>
import IScroll from 'iscroll'
import rect from '../rect.vue'
import { reactive } from '../../core/runtime'
import capabilities from '../../core/capabilities'

const scrollers = []
const iScrollOptions = {
  mouseWheel: true,
  scrollbars: 'custom',
  shrinkScrollbars: capabilities.scrollBarSize ? false : 'clip',
  interactiveScrollbars: capabilities.scrollBarSize,
  fadeScrollbars: capabilities.scrollBarSize === 0,
  bounce: capabilities.scrollBarSize === 0,
  disableMouse: true,
  disableTouch: true,
  tap: true
}

function refreshScroller () {
  if (this.refreshTimeout) {
    clearTimeout(this.refreshTimeout)
  }
  this.refreshTimeout = setTimeout(() => {
    this.scroller.refresh()
    this.scrollTop = this.scroller.y
    this.scrollLeft = this.scroller.x
    this.refreshTimeout = null
  }, 60)
}

export default {
  name: 'qx-scroller',
  extends: rect,
  props: {
    scrollX: Boolean,
    scrollY: {
      type: Boolean,
      default: true
    },
    enabled: {
      type: Boolean,
      default: true
    },
    probe: {
      type: Number,
      default: 0,
      validator: val => [0, 1, 2, 3].indexOf(val) > -1
    }
  },
  data () {
    return {
      scrollTop: 0,
      scrollLeft: 0
    }
  },
  beforeCreate () {
    this.refreshTimeout = null
    this.scrollBarSize = capabilities.scrollBarSize
    // this._retainPercentageX = true
  },
  mounted () {
    const options = {
      ...iScrollOptions,
      ...{
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        probeType: this.probe
      }
    }
    this.scroller = new IScroll(this.$el, options)
    scrollers.push(this.scroller)
    // events
    const self = this
    this.scroller.on('scrollStart', function scrollStart () {
      let iScroll
      for (let i = 0; i < scrollers.length; i += 1) {
        iScroll = scrollers[i]
        if (iScroll !== this) {
          iScroll.enabled = false
        }
      }
      self.$emit('scrollstart')
    })
    this.scroller.on('scrollEnd', () => {
      let iScroll
      for (let i = 0; i < scrollers.length; i += 1) {
        iScroll = scrollers[i]
        iScroll.enabled = true
      }
      this.$emit('scrollend')
    })
    if (this.probe) {
      this.scroller.on('scroll', () => {
        // this.$nextTick(() => {
        this.scrollTop = this.scroller.y
        this.scrollLeft = this.scroller.x
        this.$emit('scroll')
        if (this.app.activeOverlay) {
          this.app.activeOverlay.update()
          this.$nextTick(() => {
            this.app.activeOverlay.update()
          })
        }
        // })
      })
    }
    this.scroller.enabled = this.enabled
  },
  updated: refreshScroller,
  computed: {
    classes () {
      const classes = rect.computed.classes.call(this)
      if (this.scrollBarSize) {
        classes.desktop = true
      } else {
        classes.touch = true
      }
      if (this.scrollX) {
        classes.x = true
      }
      if (this.scrollY) {
        classes.y = true
      }
      return classes
    },
    paddingStyle () {
      return { padding: `0 ${this.vScrollerSize}px ${this.hScrollerSize}px 0` }
    },
    vScrollerSize () {
      if (this.overflowY) {
        return 12
      }
      return 0
    },
    hScrollerSize () {
      if (this.overflowX) {
        return 12
      }
      return 0
    },
    clientWidth () {
      return this.outerWidth() - this.borderLeft() - this.borderRight()
    },
    clientHeight () {
      return this.outerHeight() - this.borderTop() - this.borderBottom()
    },
    overflowY: reactive(function overflowY () {
      if (this.scrollBarSize && this.scrollY && this.firstChild) {
        return this.firstChild.outerHeight() > this.clientHeight
      }
      return false
    }, false),
    overflowX: reactive(function overflowX () {
      if (this.scrollBarSize && this.scrollX && this.firstChild) {
        return this.firstChild.outerWidth() > this.clientWidth
      }
      return false
    }, false)
  },
  methods: {
    refresh: refreshScroller,
    scrollToComponent (c, duration = null, offsetX = 0, offsetY = 0, easing = 'quadratic') {
      this.scroller.scrollToElement(c.$el, duration, offsetX, offsetY, IScroll.utils.ease[easing])
    },
    scrollTo (x, y, time, easing = 'quadratic') {
      this.scroller.scrollTo(x, y, time, IScroll.utils.ease[easing])
      this.scrollLeft = x
      this.scrollTop = y
    }
  },
  watch: {
    enabled (en) {
      this.scroller.enabled = en
    }
  }
}
</script>

<style>
.qxw.scroller > .scroll-content-container {
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.qxw.scroller.no-clip > .scroll-content-container {
  overflow: visible;
}

.qxw.scroller.x > .scroll-content-container {
  width: auto;
  min-width: 100%;
}

.qxw.scroller.y > .scroll-content-container {
  height: auto;
  min-height: 100%;
}

.qxw.scroller > .scroll-content-container > :first-child {
  min-width: inherit;
  min-height: inherit;
}

/* Styled scrollbars */

/* common */

.qxw.scroller .iScrollHorizontalScrollbar {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

.qxw.scroller .iScrollVerticalScrollbar {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
}

.qxw.scroller.desktop .iScrollIndicator {
    box-sizing: border-box;
    position: absolute;
}

.qxw.scroller .iScrollHorizontalScrollbar .iScrollIndicator {
    height: 100%;
}

.qxw.scroller .iScrollVerticalScrollbar .iScrollIndicator {
    width: 100%;
}

/* desktop */

.qxw.scroller.desktop .iScrollHorizontalScrollbar {
    height: 12px;
}

.qxw.scroller.desktop .iScrollHorizontalScrollbar.iScrollBothScrollbars {
  right: 12px;
}

.qxw.scroller.desktop .iScrollVerticalScrollbar {
    width: 12px;
}

.qxw.scroller.desktop .iScrollVerticalScrollbar.iScrollBothScrollbars {
  bottom: 12px;
}

.qxw.scroller.desktop .iScrollIndicator {
    background: #8d8d8b;
    border: 1px solid #666;
}

/* touch */

.qxw.scroller.touch .iScrollHorizontalScrollbar {
    height: 4px;
}

.qxw.scroller.touch .iScrollHorizontalScrollbar.iScrollBothScrollbars {
  right: 4px;
}

.qxw.scroller.touch .iScrollHorizontalScrollbar .iScrollIndicator {
    height: 3px;
}

.qxw.scroller.touch .iScrollVerticalScrollbar .iScrollIndicator {
    width: 3px;
}

.qxw.scroller.touch .iScrollVerticalScrollbar {
    width: 4px;
}

.qxw.scroller.touch .iScrollVerticalScrollbar.iScrollBothScrollbars {
  bottom: 4px;
}

.qxw.scroller.touch .iScrollIndicator {
    background: #8d8d8b;
    border-radius: 2px;
}
</style>
