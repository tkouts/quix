<template>
  <div class="qxw"
      :class="classes"
      :style="[boxStyle, paddingStyle, sizeStyle, positionStyle]">
    <slot></slot>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'

import removeItemFromArray from '../utils/index'
import { dynamicAttribute, cssBox, distinctValues } from '../core/prop-types'
import { reactive, geometryWatcher } from '../core/runtime'
import { componentUpdated } from '../core/repaint'
import RectGovernance from '../core/governance'
import calc from '../core/compute-engine'
import capabilities from '../core/capabilities'

function getBoxMetric (value, index) {
  let ind = index
  if (!value) {
    return 0
  }
  while (ind > value.length - 1) {
    ind = ind === 1 ? 0 : ind - 2
  }
  return value[ind]
}

function getCssBoxMetric (val) {
  if (val) {
    return val.map(v => (isNaN(v) ? v : `${v}px`)).join(' ')
  }
  return null
}

export default {
  name: 'qx-rect',
  class: {},
  governance: RectGovernance,
  props: {
    // Position
    left: dynamicAttribute,
    right: dynamicAttribute,
    top: dynamicAttribute,
    bottom: dynamicAttribute,
    abs: Boolean,

    // Size
    width: dynamicAttribute,
    height: dynamicAttribute,
    minWidth: dynamicAttribute,
    minHeight: dynamicAttribute,

    // Box
    noClip: Boolean,
    padding: cssBox,
    margin: cssBox,
    border: cssBox,

    // Box flex
    flex: Number,
    flexAlign: distinctValues('', ['start', 'end', 'center', 'stretch']),

    disabled: Boolean
  },
  data () {
    return {
      ready: false,
      parent: null,
      children: [],
      custom: {},
      rect: {
        ow: undefined,
        oh: undefined,
        iw: undefined,
        ih: undefined,
        it: undefined,
        ib: undefined,
        ir: undefined,
        il: undefined
      }
    }
  },
  beforeCreate () {
    this.container = null
  },
  beforeMount () {
    let parent = this.$parent
    while (parent && !parent.children) {
      parent = parent.$parent
    }
    if (parent) {
      this.parent = this.container = parent
      this.app = parent.app
    }
  },
  beforeDestroy () {
    this.app.dynamic.removeComponent(this)
    if (this.parent.children) {
      removeItemFromArray(this.parent.children, this)
    }
  },
  mounted () {
    // update parent children
    if (this.parent) {
      const root = this.parent.$refs.root
      let parentEl
      let el = this.$el
      if (root) {
        parentEl = root.$el || root
      } else {
        parentEl = this.parent.$el
      }
      if (el !== parentEl && parentEl.contains(el)) {
        while (el.parentNode !== parentEl) {
          el = el.parentNode
        }
        // find node index
        const componentNodes = Array.prototype.filter.call(
          parentEl.childNodes,
          node => node.__vue__ && node.__vue__.children)
        const index = componentNodes.indexOf(el)
        this.parent.children.splice(index, 0, this)
      }
    }
    // define children
    const root = this.$refs.root
    if (root && root.$el) {
      this.children = root.children
      // } else {
      //   // root defined as simple element
      //   this.children = this.$children.slice()
      // }
      root.parent = this
      this.children.forEach(
        (c) => {
          const ch = c
          ch.parent = this
        })
    }
    this.ready = true
  },
  // beforeUpdate,
  updated: componentUpdated,
  computed: {
    paddingTop () {
      return getBoxMetric(this.computedPadding, 0)
    },
    paddingRight () {
      return getBoxMetric(this.computedPadding, 1)
    },
    paddingBottom () {
      return getBoxMetric(this.computedPadding, 2)
    },
    paddingLeft () {
      return getBoxMetric(this.computedPadding, 3)
    },
    borderTop () {
      return getBoxMetric(this.computedBorder, 0)
    },
    borderRight () {
      return getBoxMetric(this.computedBorder, 1)
    },
    borderBottom () {
      return getBoxMetric(this.computedBorder, 2)
    },
    borderLeft () {
      return getBoxMetric(this.computedBorder, 3)
    },
    classes () {
      const cssClass = {
        abs: this.abs,
        'no-clip': this.noClip,
        disabled: this.disabled
      }
      if (this.flexAlign && this.container.orientation && !this.container.flow) {
        cssClass[`self-align-${this.flexAlign}`] = true
      }
      return Object.assign(cssClass, this.$options.class)
    },
    sizeStyle: reactive(function sizeStyle () {
      const styleObj = {}
      if (this.computedWidth) styleObj.width = calc.call(this, 'width', this.computedWidth)
      if (this.computedHeight) styleObj.height = calc.call(this, 'height', this.computedHeight)
      if (this.computedMinWidth) styleObj.minWidth = calc.call(this, 'minWidth', this.computedMinWidth)
      if (this.computedMinHeight) styleObj.minHeight = calc.call(this, 'minHeight', this.computedMinHeight)
      return styleObj
    }, {}),
    positionStyle: reactive(function positionStyle () {
      const styleObj = {}
      if (this.computedLeft != null) styleObj.left = calc.call(this, 'left', this.computedLeft)
      if (this.computedRight != null) styleObj.right = calc.call(this, 'right', this.computedRight)
      if (this.computedTop != null) styleObj.top = calc.call(this, 'top', this.computedTop)
      if (this.computedBottom != null) styleObj.bottom = calc.call(this, 'bottom', this.computedBottom)
      return styleObj
    }, {}),
    boxStyle () {
      const styleObj = {}
      if (this.computedMargin) styleObj.margin = getCssBoxMetric(this.computedMargin)
      if (this.computedBorder) styleObj.borderWidth = getCssBoxMetric(this.computedBorder)
      if (capabilities.flexSupported && this.flex) {
        styleObj.flex = this.flex
      }
      return styleObj
    },
    paddingStyle () {
      const styleObj = {}
      // console.log('padding', this)
      if (this.computedPadding) styleObj.padding = getCssBoxMetric(this.computedPadding)
      return styleObj
    },
    // governance
    governance () {
      if (this.ready && this.parent.ready && this.parent.$refs.root) {
        const root = this.parent.$refs.root
        const rootEl = root.$el || root
        if (this.$el.contains(rootEl)) {
          return RectGovernance
        }
      }
      return this.parent.$options.governance
    },
    computedWidth () {
      return this.governance.width(this)
    },
    computedHeight () {
      return this.governance.height(this)
    },
    computedMinWidth () {
      return this.governance.minWidth(this)
    },
    computedMinHeight () {
      return this.governance.minHeight(this)
    },
    computedTop () {
      return this.governance.top(this)
    },
    computedLeft () {
      return this.governance.left(this)
    },
    computedBottom () {
      return this.governance.bottom(this)
    },
    computedRight () {
      return this.governance.right(this)
    },
    computedMargin () {
      return this.governance.margin(this)
    },
    computedPadding () {
      return this.governance.padding(this)
    },
    computedBorder () {
      return this.governance.border(this)
    },
    // DOM
    firstChild () {
      return this.children[0]
    },
    previousSibling () {
      // if (this.container.children) {
      const parentChildren = this.container.children
      const index = parentChildren.indexOf(this)
      if (index > 0) {
        return parentChildren[index - 1]
      }
      // }
      return null
    },
    nextSibling () {
      // if (this.container.children) {
      const parentChildren = this.container.children
      const index = parentChildren.indexOf(this)
      if (index < parentChildren.length - 1) {
        return parentChildren[index + 1]
      }
      // }
      return null
    },
    overlays () {
      return this.children.filter(c => c.showOn)
    },
    // Repaint strategies
    autoWidth () {
      if (!this.container && this.width == null) {
        return false
      }
      if (this.computedWidth == null) {
        if (this.container.orientation === 'v' && (this.flexAlign || this.container.itemsAlign) === 'stretch') {
          return false
        }
        return this.abs
      }
      return this.computedWidth === 'contain' || this.computedMinWidth === 'contain'
    },
    autoHeight () {
      if (!this.container && this.height == null) {
        return false
      }
      if (this.computedHeight == null) {
        if (this.container.orientation === 'h' && (this.flexAlign || this.container.itemsAlign) === 'stretch') {
          return false
        }
        return true
      }
      return this.computedHeight === 'contain' || this.computedMinHeight === 'contain'
    },
    hasVariableWidth () {
      if (!this.container && this.computedWidth == null) {
        return true
      }
      if (this.parent.hasVariableWidth) {
        return (!this.abs && this.computedWidth == null) ||
          isNaN(this.computedWidth) || !!this.flex
      }
      return false
    },
    hasVariableHeight () {
      if (!this.container && this.computedHeight == null) {
        return true
      }
      if (this.parent.hasVariableHeight) {
        return this.computedHeight == null || isNaN(this.computedHeight) || !!this.flex
      }
      return false
    },
    shouldUpdateParent () {
      if (!this.container) return false
      return this.container.autoWidth || this.container.autoHeight
    },
    repaintBox () {
      let box = this.container
      while (box !== this.app && box.shouldUpdateParent) {
        box = box.container
      }
      return box
    }
  },
  methods: {
    contains (el) {
      let contains = false
      if (this.overlays.length > 0) {
        contains = this.overlays.some(o => o.contains(el))
      }
      contains = contains || this.$el.contains(el)
      return contains
    },
    // DOM manipulation
    before (Vue, propsData = {}) {
      const el = document.createElement('div')
      this.$el.parentNode.insertBefore(el, this.$el)
      const options = {
        el,
        parent: this.container,
        propsData
      }
      return new Vue(options)
    },
    destroy () {},
    // custom props bag
    setCustom (key, value) {
      this.$set(this.custom, key, value)
    },
    // Geometry
    outerWidth: geometryWatcher('ow'),
    outerHeight: geometryWatcher('oh'),
    innerWidth: geometryWatcher('iw'),
    innerHeight: geometryWatcher('ih'),
    innerTop: geometryWatcher('it'),
    innerBottom: geometryWatcher('ib'),
    innerRight: geometryWatcher('ir'),
    innerLeft: geometryWatcher('il'),
    // Animation
    animate (properties, options = {}) {
      const self = this
      const userProgress = options.progress
      const animOptions = Object.assign(options, {
        progress (...args) {
          componentUpdated.call(self)
          if (userProgress) {
            // call user progress
            userProgress(...args)
          }
        }
      })
      return Velocity(this.$el, properties, animOptions)
      // return this
    }
  }
}
</script>

<style>
.qxw {
  display: block;
  border: 0 #000 solid;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  line-height: normal;
}

.qxw.abs {
  position: absolute;
}

.qxw.fixed {
  position: fixed;
}

.qxw.no-clip {
  overflow: visible;
}

.qxw.disabled {
  pointer-events: none;
  opacity: .5;
  cursor: default;
}

.qxw.disabled * {
  cursor: default !important;
}

/********************/
/* Helper Classes   */
/********************/

.qxw.text-align-center {
  text-align: center !important;
}

.qxw.text-align-start {
  text-align: left !important;
}

.qxw.text-align-end {
  text-align: right !important;
}

div.valign-container {
  white-space: nowrap;
  height: 100%;
}

div.valign-container:before {
  content: '';
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}

div.valign-container > .valign-start {
  display: inline-block;;
  vertical-align: top;
}

div.valign-container > .valign-center {
  display: inline-block;
  vertical-align: middle;
}

div.valign-container > .valign-end {
  display: inline-block;
  vertical-align: bottom;
}
</style>
