<template lang="pug">
  include mixins.pug
  +base()
    slot
</template>

<script>
import anime from 'animejs'

import QComponent from './component'
import removeItemFromArray from '../utils/index'
import { dynamicAttribute, cssBox, distinctValues } from '../core/prop-types'
import { reactive, geometryWatcher } from '../core/runtime'
import { componentUpdated } from '../core/repaint'
import RectGovernance from '../core/governance'
import calc from '../core/compute-engine'
import capabilities from '../core/capabilities'

function getCssBoxMetric (val) {
  if (val) {
    return val.map(v => (isNaN(v) ? v : `${v}px`)).join(' ')
  }
  return null
}

export default {
  name: 'qx-rect',
  extends: QComponent,
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
      parent: null,
      children: [],
      custom: {},
      rect: {
        // size
        ow: undefined,
        oh: undefined,
        iw: undefined,
        ih: undefined,
        // offsets
        it: undefined,
        ib: undefined,
        ir: undefined,
        il: undefined,
        // padding
        pt: undefined,
        pb: undefined,
        pl: undefined,
        pr: undefined,
        // border
        bt: undefined,
        bb: undefined,
        bl: undefined,
        br: undefined
      }
    }
  },
  beforeCreate () {
    this.__quix__ = true
  },
  beforeMount () {
    this.parent = this.container
  },
  mounted () {
    if (this.container) {
      // update container children
      const el = this.$el
      const parentEl = this.$el.parentElement
      // find node index
      const componentNodes = Array.prototype.filter.call(parentEl.childNodes, node => node.__vue__)
      const index = componentNodes.indexOf(el)
      this.container.children.splice(index, 0, this)
    }
    // define children
    const root = this.$refs.root
    if (root && root.$el) {
      this.children = root.children
      this.children.forEach((c) => {
        const ch = c
        ch.parent = this
      })
    }
    this.ready = true
  },
  beforeDestroy () {
    this.app.dynamic.removeComponent(this)
    removeItemFromArray(this.parent.children, this)
  },
  updated: componentUpdated,
  computed: {
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
      return this.container.$options.governance
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
      const parentChildren = this.container.children
      const index = parentChildren.indexOf(this)
      if (index > 0) {
        return parentChildren[index - 1]
      }
      return null
    },
    nextSibling () {
      const parentChildren = this.container.children
      const index = parentChildren.indexOf(this)
      if (index < parentChildren.length - 1) {
        return parentChildren[index + 1]
      }
      return null
    },
    scrollParent () {
      if (this.ready) {
        let parent = this.parent
        while (parent) {
          if ('scrollTop' in parent && parent.$el.contains(this.$el)) {
            return parent
          }
          parent = parent.parent
        }
      }
      return null
    },
    parentOverlay () {
      // locate parent overlay
      let parent
      if (this === this.app) {
        parent = this
      } else {
        parent = this.parent
        while (parent !== this.app) {
          if ('pointerReference' in parent) {
            break
          }
          parent = parent.parent
        }
      }
      return parent
    },
    // Repaint strategies
    autoWidth () {
      if (!this.container && this.width == null) {
        return false
      }
      const containerOrient = this.container.orientation
      if (this.flex && containerOrient === 'h') {
        return false
      }
      if (this.computedWidth == null) {
        if (containerOrient === 'v' &&
            (this.flexAlign || this.container.itemsAlign) === 'stretch' &&
            this.ready && this.$el.parentNode === this.container.$el) {
          return this.abs
        }
        return this.abs && (this.computedLeft == null || this.computedRight == null)
      }
      return this.computedWidth === 'contain' || this.computedMinWidth === 'contain'
    },
    autoHeight () {
      if (!this.container && this.height == null) {
        return false
      }
      const containerOrient = this.container.orientation
      if (this.flex && containerOrient === 'v') {
        return false
      }
      if (this.computedHeight == null) {
        if (containerOrient === 'h' &&
            (this.flexAlign || this.container.itemsAlign) === 'stretch' &&
            this.ready && this.$el.parentNode === this.container.$el) {
          return this.abs
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
      return this.$el.contains(el)
    },
    // DOM manipulation
    before (Component, propsData = {}) {
      const el = document.createElement('div')
      this.$el.parentNode.insertBefore(el, this.$el)
      const options = {
        el,
        parent: this.container,
        propsData
      }
      return new Component(options)
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
    paddingTop: geometryWatcher('pt'),
    paddingBottom: geometryWatcher('pb'),
    paddingRight: geometryWatcher('pr'),
    paddingLeft: geometryWatcher('pl'),
    borderTop: geometryWatcher('bt'),
    borderBottom: geometryWatcher('bb'),
    borderRight: geometryWatcher('br'),
    borderLeft: geometryWatcher('bl'),
    // Animation
    animate (options) {
      const animationOptions = options
      const self = this
      const userHook = animationOptions.progress

      if (!options.targets) {
        animationOptions.targets = this.$el
      }

      Object.assign(animationOptions, {
        run (anim) {
          componentUpdated.call(self)
          if (userHook) {
            // call user hook
            userHook.call(self, anim)
          }
        }
      })
      return anime(animationOptions)
    },
    stopAnimation (property = null) {
      const viewAnims = anime.running.filter((a) => {
        const target = a.animatables[0].target
        return this.$el === target || this === target
      })
      if (property == null) {
        viewAnims.forEach(a => a.pause())
      } else {
        for (let i = 0; i < viewAnims.length; i += 1) {
          const anima = viewAnims[i]
          for (let j = anima.animations.length - 1; j >= 0; j -= 1) {
            const animation = anima.animations[j]
            if (animation.property === property) {
              anima.animations.splice(j, 1)
              // anima.pause()
              break
            }
          }
        }
      }
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
}

div.valign-container:before {
  content: '';
  display: inline-block;
  height: 100%;
  min-height: inherit;
  width: 0;
  vertical-align: middle;
}

div.valign-container > .valign-start {
  display: inline-block;
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
