<template>
  <div class="qxw scroller"
      touch-action="none"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <qx-rect class="scroller-container" :padding="combinedPadding" ref="root">
      <slot></slot>
    </qx-rect>
  </div>
</template>

<script>
import IScroll from 'iscroll'
import rect from '../rect.vue'
import { reactive } from '../../core/runtime'
import { convertBoxMetric } from '../../core/governance'
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
      if (capabilities.scrollBarSize) {
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
      const cssPadding = {
        padding: `0 ${this.vScrollerSize}px ${this.hScrollerSize}px 0`
      }
      return cssPadding
    },
    paddingTop () {
      return 0
    },
    paddingRight () {
      return this.vScrollerSize
    },
    paddingBottom () {
      return this.hScrollerSize
    },
    paddingLeft () {
      return 0
    },
    combinedPadding () {
      const padding = convertBoxMetric(this.padding) || [0, 0, 0, 0]
      if (typeof padding[1] === 'undefined') {
        padding[1] = padding[0]
        if (typeof padding[2] === 'undefined') {
          padding[2] = padding[0]
        }
      }
      if (this.paddingBottom > 0) {
        padding[1] += this.paddingRight
      }
      if (this.paddingRight) {
        padding[2] += this.paddingBottom
      }
      return padding
    },
    vScrollerSize () {
      if (this.overflowY && capabilities.scrollBarSize) {
        return 12
      }
      return 0
    },
    hScrollerSize () {
      if (this.overflowX && capabilities.scrollBarSize) {
        return 12
      }
      return 0
    },
    overflowY: reactive(function hScrollerSize () {
      if (this.scrollY) {
        const innerHeight = this.outerHeight() - this.borderTop - this.borderBottom
        return this.$refs.root.outerHeight() > innerHeight
      }
      return false
    }, false),
    overflowX: reactive(function hScrollerSize () {
      if (this.scrollX) {
        const innerWidth = this.outerWidth() - this.borderLeft - this.borderRight
        return this.$refs.root.outerWidth() > innerWidth
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
.qxw.scroller > .scroller-container {
  width: 100%;
  height: 100%;
  float: left;
  clear: both;
}

.qxw.scroller.x > .scroller-container {
  min-width: 100%;
  width: auto;
}

.qxw.scroller.y > .scroller-container {
  min-height: 100%;
  height: auto;
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
