<template>
  <div class="qxw scroller"
      touch-action="none"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <qx-rect class="scroller-container" :padding="padding" ref="root">
      <slot></slot>
    </qx-rect>
  </div>
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
  tap: 'click'
}

function refreshScroller () {
  if (!this.refreshTimeout) {
    this.refreshTimeout = setTimeout(() => {
      this.scroller.refresh()
      this.refreshTimeout = null
    }, 60)
  }
}

export default {
  name: 'qx-scroller',
  mixins: [rect],
  props: {
    scrollX: Boolean,
    scrollY: {
      type: Boolean,
      default: true
    },
    probe: {
      type: Number,
      default: 0,
      validator: val => [0, 1, 2].indexOf(val) > -1
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
    const options = Object.assign({}, iScrollOptions, {
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      probeType: this.probe
    })
    this.scroller = new IScroll(this.$el, options)
    scrollers.push(this.scroller)
    // events
    const self = this
    this.scroller.on('scrollStart', function scrollStart () {
      let iScroll
      self.app.closeOverlay()
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
        this.scrollTop = this.y
        this.scrollLeft = this.x
        this.$emit('scroll')
      })
    }
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
      return classes
    },
    paddingStyle () {
      const cssPadding = {
        padding: `0 ${this.vScrollerSize}px ${this.hScrollerSize}px 0`
      }
      return cssPadding
    },
    vScrollerSize: reactive(function vScrollerSize () {
      const innerHeight = this.outerHeight() - this.borderTop - this.borderBottom
      if (this.scrollY &&
          this.$refs.root.outerHeight() > innerHeight &&
          capabilities.scrollBarSize) {
        return 12
      }
      return 0
    }, 0),
    hScrollerSize: reactive(function hScrollerSize () {
      const innerWidth = this.outerWidth() - this.borderLeft - this.borderRight
      if (this.scrollX &&
          this.$refs.root.outerWidth() > innerWidth &&
          capabilities.scrollBarSize) {
        return 12
      }
      return 0
    }, 0)
  },
  methods: {
    refresh: refreshScroller
  }
}
</script>

<style>
.qxw.scroller > .scroller-container {
  min-width: 100%;
  min-height: 100%;
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
