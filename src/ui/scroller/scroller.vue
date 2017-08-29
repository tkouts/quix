<template>
  <div class="qxw scroller"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
      <qx-rect class="scroller-container"
          min-width="100%"
          min-height="100%"
          :padding="padding"
          ref="root">
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
  scrollbars: capabilities.scrollBarSize ? 'custom' : true,
  shrinkScrollbars: capabilities.scrollBarSize ? false : 'clip',
  interactiveScrollbars: capabilities.scrollBarSize,
  fadeScrollbars: capabilities.scrollBarSize === 0,
  disableMouse: true,
  disableTouch: true,
  bounce: capabilities.scrollBarSize === 0,
  tap: true
}

function refreshScroller () {
  // console.log('refreshing scroller', this.$refs.root.scrollHeight())
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
  display: inline-block;
}

/* Styled scrollbars */

.qxw.scroller.desktop .iScrollHorizontalScrollbar {
    box-sizing: border-box;
    position: absolute;
    height: 12px;
    left: 0;
    right: 0;
    bottom: 0;
}

.qxw.scroller.desktop .iScrollHorizontalScrollbar.iScrollBothScrollbars {
  right: 12px;
}

.qxw.scroller.desktop .iScrollVerticalScrollbar {
    box-sizing: border-box;
    position: absolute;
    width: 12px;
    bottom: 0;
    top: 0;
    right: 0;
}

.qxw.scroller.desktop .iScrollVerticalScrollbar.iScrollBothScrollbars {
  bottom: 12px;
}

.qxw.scroller.desktop .iScrollIndicator {
    box-sizing: border-box;
    position: absolute;
    background: #8d8d8b;
    border: 1px solid #666;
}

.qxw.scroller.desktop .iScrollHorizontalScrollbar .iScrollIndicator {
    height: 100%;
}

.qxw.scroller.desktop .iScrollVerticalScrollbar .iScrollIndicator {
    width: 100%;
}
</style>
